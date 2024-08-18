import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
<<<<<<< HEAD
import { useNavigation } from '@react-navigation/native';

const FooterNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Map')}>
=======

const FooterNavigation = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
>>>>>>> 915caf62d74450b4b508de73df4822c15ebf6d74
        <Icon name="map" size={25} color="#0000ff" />
        <Text>Map</Text>
      </TouchableOpacity>

<<<<<<< HEAD
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('TripPlanner')}>
=======
      <TouchableOpacity style={styles.navItem}>
>>>>>>> 915caf62d74450b4b508de73df4822c15ebf6d74
        <Icon name="clipboard-text-outline" size={25} color="#0000ff" />
        <Text>Trip planner</Text>
      </TouchableOpacity>

<<<<<<< HEAD
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Save')}>
=======
      <TouchableOpacity style={styles.navItem}>
>>>>>>> 915caf62d74450b4b508de73df4822c15ebf6d74
        <Icon name="star-outline" size={25} color="#0000ff" />
        <Text>Save</Text>
      </TouchableOpacity>

<<<<<<< HEAD
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Me')}>
=======
      <TouchableOpacity style={styles.navItem}>
>>>>>>> 915caf62d74450b4b508de73df4822c15ebf6d74
        <Icon name="account-outline" size={25} color="#0000ff" />
        <Text>Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#87CEEB',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  navItem: {
    alignItems: 'center'
  }
});

export default FooterNavigation;
