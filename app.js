import React from 'react';
<<<<<<< HEAD
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
=======
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import FooterNavigation from './components/FooterNavigation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.fancyText}>Happy Coding EVAT Legends</Text>
      <FooterNavigation />
    </SafeAreaView>
>>>>>>> 915caf62d74450b4b508de73df4822c15ebf6d74
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
<<<<<<< HEAD
    backgroundColor: '#f0f8ff',
=======
    backgroundColor: '#f0f8ff', // Light blue background for a fancy touch
>>>>>>> 915caf62d74450b4b508de73df4822c15ebf6d74
  },
  fancyText: {
    fontSize: 24,
    fontWeight: 'bold',
<<<<<<< HEAD
    color: '#4b0082',
    textShadowColor: '#ff69b4',
=======
    color: '#4b0082', // Indigo color for the text
    textShadowColor: '#ff69b4', // Pink shadow for a fancy effect
>>>>>>> 915caf62d74450b4b508de73df4822c15ebf6d74
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    textAlign: 'center',
    margin: 20,
  },
});

export default App;
