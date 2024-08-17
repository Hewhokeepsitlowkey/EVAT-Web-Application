import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FooterNavigation = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="map" size={25} color="#0000ff" />
        <Text>Map</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Icon name="clipboard-text-outline" size={25} color="#0000ff" />
        <Text>Trip planner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Icon name="star-outline" size={25} color="#0000ff" />
        <Text>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
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
