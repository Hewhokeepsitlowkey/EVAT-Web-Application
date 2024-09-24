import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import ExpandableHeader from './ExpandableHeader';
import Search from './icons/Search';
import MapFilter from './icons/MapFilter';
import AvailiableIcon from './icons/Availiable';
import Station from './icons/Station';
import Amenities from './icons/Amenities';


const { width: w } = Dimensions.get('window');
const menuItemWidth = w / 6;

const Map = () => {
  const translateY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const menuHeight = insets.top + menuItemWidth + 50;

  const [state, setState] = useState<{
    active: string;
    region: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
    userLocation: { latitude: number; longitude: number } | null;
    chargers: any[];
    loading: boolean;
    error: string | null;
    selectedCharger: any | null;
    directions: any | null;
  }>({
    active: '2',
    region: {
      latitude: -37.8136,
      longitude: 144.9631,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    userLocation: null,
    chargers: [],
    loading: true,
    error: null,
    selectedCharger: null,
    directions: null,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show your position on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          console.log('Position:', position); // Debugging log
          const { latitude, longitude } = position.coords;
          setState(prevState => ({
            ...prevState,
            userLocation: { latitude, longitude },
            region: {
              ...prevState.region,
              latitude,
              longitude,
            },
          }));
          fetchChargers(latitude, longitude);
        },
        error => {
          console.log('Error:', error); // Debugging log
          setState(prevState => ({
            ...prevState,
            loading: false,
            error: error.message,
          }));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    interface Charger {
      place_id: string;
      geometry: {
      location: {
        lat: number;
        lng: number;
      };
      };
      name: string;
      rating?: number;
      details?: any;
    }

    const fetchChargers = async (latitude: number, longitude: number): Promise<void> => {
      try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&type=charging_station&key=AIzaSyDbfaYzyw__K8paspxDS6c7Pw5VP6q_R48`);
      const data = await response.json();
      console.log('API Response:', data); // Debugging log

      const chargersWithDetails: Charger[] = await Promise.all(data.results.map(async (charger: Charger) => {
        const details = await fetchPlaceDetails(charger.place_id);
        return { ...charger, details };
      }));

      setState(prevState => ({
        ...prevState,
        chargers: chargersWithDetails,
        loading: false,
      }));
      } catch (error: any) {
      console.log('Error fetching chargers:', error); // Debugging log
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: error.message,
      }));
      }
    };

    interface PlaceDetails {
      result: any;
    }

    const fetchPlaceDetails = async (placeId: string): Promise<PlaceDetails> => {
      try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyDbfaYzyw__K8paspxDS6c7Pw5VP6q_R48`);
      const data: PlaceDetails = await response.json();
      return data.result;
      } catch (error) {
      console.log('Error fetching place details:', error); // Debugging log
      return {} as PlaceDetails;
      }
    };


    requestLocationPermission();
  }, []);



  interface Charger {
    place_id: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    name: string;
    rating?: number;
    details?: any;
  }

  const handleMarkerPress = async (charger: Charger) => {
    setState(prevState => ({
      ...prevState,
      selectedCharger: charger,
    }));
  };


  interface Menu {
    id: string;
    name: string;
    icon: (color: string) => JSX.Element;
  }

  const menus: Menu[] = [
    { id: '1', name: 'Search', icon: color => <Search color={color} /> },
    { id: '2', name: 'Map Filters', icon: color => <MapFilter color={color} /> },
    { id: '3', name: 'Available', icon: color => <AvailiableIcon color={color} /> },
    { id: '4', name: 'Stations', icon: color => <Station color={color} /> },
    { id: '5', name: 'Amenities', icon: color => <Amenities color={color} /> },
  ];

  const handlePress = (id: string) => {
    if (id === '1') {
      translateY.value = withSpring(-menuHeight);
    } else {
      translateY.value = withSpring(0);
    }
    setState(prevState => ({ ...prevState, active: id }));
  };

  const mapShow = (id: string) => id === '1' || id === '2';


  return (
    <View style={styles.container}>
      <ExpandableHeader
        menuData={menus}
        onPress={handlePress}
        active={state.active}
        translateY={translateY}
        menuItemWidth={menuItemWidth}
        menuHeight={menuHeight}
      />
      {mapShow(state.active) ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: state.userLocation ? state.userLocation.latitude : -37.8136,
            longitude: state.userLocation ? state.userLocation.longitude : 144.9631,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={state.region}
          showsUserLocation={true}
        >
          {state.userLocation && (
            <Marker
              coordinate={state.userLocation}
              title="You are here"
            />
          )}
          {state.chargers.map((charger, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: charger.geometry.location.lat, longitude: charger.geometry.location.lng }}
              title={charger.name}
              description={`Rating: ${charger.rating || 'N/A'}`}
              onPress={() => handleMarkerPress(charger)}
            >
              <Image
                source={{ uri: 'https://drive.google.com/uc?export=view&id=1n6iTeDkLc7PjyEm57SCZLb972tN9lGKF' }} 
                style={{ width: 30, height: 30 }}
              />
            </Marker>
          ))}
        </MapView>

      ) : (
        <View style={styles.placeholder}>
          <Text>Select a menu option to view the map</Text>
        </View>
      )}
      {state.loading && <ActivityIndicator size="large" color="#0000ff" />}
      {state.error && <Text style={styles.error}>{state.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  search: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '50%',
    position: 'relative',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderRadius: 25,
    padding: 8,
    height: 50,
    backgroundColor: '#fff',
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
  },
  availiable: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Map;