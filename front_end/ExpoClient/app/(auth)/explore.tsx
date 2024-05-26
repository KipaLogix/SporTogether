import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Link} from "expo-router";
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { PaperProvider } from 'react-native-paper';
import EventsMap from '../../components/EventsMap';



const explore = () => {

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
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
      console.log('Got permission forLocation:', currentLocation);
    };

    getPermissionAndLocation();
  }, []);

  useEffect(() => {
    const fetchEventsByLocation = async (latitude: number, longitude: number) => {
      try {

        const url = `http://192.168.1.129:56789/api/events/latitude=${latitude}/longitude=${longitude}/area=${160}/`;
        const response = await axios.get(url);

        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (location) {
      fetchEventsByLocation(46.770439, 23.591423);
      //  location.latitude
      // location.longitude
    }
  }, [location]);

  return (
    <PaperProvider>
      <EventsMap events={events} location={location} />
    </PaperProvider>
  );














  return (
    <View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Explore</Text>
        </View>
        {/* <Link href={"/(modals)/login"}> Login </Link> */}
        {/* <Link href={"/(modals)/Booking"}> Booking </Link>
        <Link href={"/event/1337"}> Event details </Link> */}
    </View>
  );
};

export default explore;

const styles = StyleSheet.create({
});
