import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import FooterNavigation from './components/FooterNavigation';
import MapScreen from './components/MapScreen';
import TripPlannerScreen from './components/TripPlannerScreen';
import SaveScreen from './components/SaveScreen';
import MeScreen from './components/MeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Text style={styles.fancyText}>Happy Coding EVAT legends</Text>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="TripPlanner" component={TripPlannerScreen} />
          <Stack.Screen name="Save" component={SaveScreen} />
          <Stack.Screen name="Me" component={MeScreen} />
        </Stack.Navigator>
        <FooterNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f0f8ff',
  },
  fancyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b0082',
    textShadowColor: '#ff69b4',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    textAlign: 'center',
    margin: 20,
  },
});

export default App;
