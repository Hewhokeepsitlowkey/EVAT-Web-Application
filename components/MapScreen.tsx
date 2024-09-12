import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ExpandableHeader from './ExpandableHeader';
import Amenities from './icons/Amenities';
import Station from './icons/Station';
import Search from './icons/Search';
import MapFilter from './icons/MapFilter';
import AvailiableIcon from './icons/Availiable';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Availiable from './Availiable';
import SearchComponent from './SearchComponent'; // Import the SearchComponent

const { width: w, height: h } = Dimensions.get('window');
const menuItemWidth = w / 6;

const Map = () => {
  const translateY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const menuHeight = insets.top + menuItemWidth + 50;

  const [state, setState] = useState({
    active: '2',
    region: {
      latitude: -37.8136,
      longitude: 144.9631,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    userLocation: null,
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
        },
        error => console.log('Error:', error), // Debugging log
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, []);

  const menus = [
    { id: '1', name: 'Search', icon: color => <Search color={color} /> },
    { id: '2', name: 'Map Filters', icon: color => <MapFilter color={color} /> },
    { id: '3', name: 'Availiable', icon: color => <AvailiableIcon color={color} /> },
    { id: '4', name: 'Stations', icon: color => <Station color={color} /> },
    { id: '5', name: 'Amenities', icon: color => <Amenities color={color} /> },
  ];

  const handlePress = id => {
    if (id === '1') {
      translateY.value = withSpring(-menuHeight);
    } else {
      translateY.value = withSpring(0);
    }
    setState(prevState => ({ ...prevState, active: id }));
  };

  const mapShow = id => id === '1' || id === '2';

  const handleClose = () => {
    setState(prevState => ({ ...prevState, active: '2' }));
    translateY.value = withSpring(0);
  };

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
        </MapView>
      ) : null}
      {state.active === '1' ? (
        <SearchComponent state={state} handleClose={handleClose} />
      ) : null}
      {state.active === '3' ? (
        <View style={[styles.availiable, { paddingTop: menuHeight + 8 }]}>
          <Availiable />
        </View>
      ) : null}
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
});

export default Map;
