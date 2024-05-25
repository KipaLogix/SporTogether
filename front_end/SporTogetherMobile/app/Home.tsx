
import { PaperProvider } from 'react-native-paper';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import EventsMap from '@/components/EventsMap';
import { Event } from './interfaces/Event'; // Import the Event type
import RootLayoutNav  from '@/app/_layout'; // Import the RootLayoutNav component

export default function Home() {
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
      {/* <RootLayoutNav /> */}
    </PaperProvider>
  );
}
