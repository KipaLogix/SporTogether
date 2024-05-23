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
  // const [events, setEvents] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        console.log('Permission denied');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      console.log('Location:', currentLocation);
    };

    getPermissionAndLocation();
  }, []);

  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      fetchEventsByLocation(location.latitude, location.longitude);
    }
  }, [location]);


  // HOW TO WRITE CORRECT API_URL?
  // if running from local machine with web, use your local IP address (localhost)
  // if running from expo mobile, use your local IP address (ipv4)
  const root_URL = 'http://192.168.100.39:3000/api/'
  const GET_USER_API_URL = root_URL + 'users/50eac824-f36a-448a-b5e8-7bce45fdda2e';
  const GET_EVENTS_API_URL = root_URL + 'events/';

  const fetchUser = async () => {
    axios.get(GET_USER_API_URL).then((response) => {
      console.log("USER DATA:");
      console.log(response.data);
      setUser(response.data);
    }
    ).catch((error) => {
      console.log(error);
    });
  };

  const fetchEventsByLocation = async (latitude, longitude) => {
    try{
      const reqBody = {
        latitude: latitude,
        longitude: longitude,
        area: 160,
        sport: null
      };
      const response = await axios.get(GET_EVENTS_API_URL, {
        params: {
          latitude: latitude,
          longitude: longitude,
          area: 160,
          sport: null
        }
      });
      
      // You can return the response data or do further processing here
      // parse events
      console.log("EVENTS DATA:");
      const newMarkers = response.data.map((event: any) => ({
        id: event.id,
        coordinate: {
          latitude: event.latitude,
          longitude: event.longitude
        },
        title: event.title,
        description: event.description
      }));
      setMarkers(newMarkers);
      for (let i = 0; i < newMarkers.length; i++) {
        console.log(newMarkers[i]);
      }

    } catch (error) {
      // Handle errors
      console.error('Error fetching events:', error);
      throw error; // Optionally rethrow the error
    }
  };

  
  useEffect(() => {
    fetchUser();
  },[]);
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        showsMyLocationButton={true}
        showsUserLocation={true}
        region={location}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      {user && (
        <View style={styles.userInfo}>
          <Text>Here is your location from endpoint:</Text>
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