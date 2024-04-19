import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const MapEvents = () => {
  // here will be city of user location
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        console.log('Permission denied');
        return;
      }
      getLocation();
    };

    const getLocation = async () => {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      console.log(currentLocation);
    };

    

    getPermission();
  }, []);

  // HOW TO WRITE CORRECT API_URL?
  // if running from local machine with web, use your local IP address (localhost)
  // if running from expo mobile, use your local IP address (ipv4)
  const API_URL = 'http://192.168.100.39:3000/api/users/50eac824-f36a-448a-b5e8-7bce45fdda2e';
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    axios.get(API_URL).then((response) => {
      console.log(response.data);
      setUser(response.data);
    }
    ).catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        showsMyLocationButton={true}
        showsUserLocation={true}
        region={location}
      />
      {user && (
        <View style={styles.userInfo}>
          <Text>Here is your location from endpoint, kid:</Text>
          <Text> Latitude: {user.latitude}</Text>
          <Text> Longitude: {user.longitude}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
});

export default MapEvents;