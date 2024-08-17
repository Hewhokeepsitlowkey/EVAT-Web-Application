import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import FooterNavigation from './components/FooterNavigation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.fancyText}>Happy Coding EVAT Legends</Text>
      <FooterNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f0f8ff', // Light blue background for a fancy touch
  },
  fancyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b0082', // Indigo color for the text
    textShadowColor: '#ff69b4', // Pink shadow for a fancy effect
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    textAlign: 'center',
    margin: 20,
  },
});

export default App;
