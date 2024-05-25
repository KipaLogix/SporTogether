import { PaperProvider } from 'react-native-paper';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import EventsMap from './components/EventsMap';
import { Event } from './interfaces/types'; // Import the Event type

export default function App() {
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
      const root_URL = 'http://192.168.100.39:3000/api/';
      const GET_EVENTS_API_URL = root_URL + 'events/';
      try {
        const response = await axios.get<Event[]>(GET_EVENTS_API_URL, {
          params: {
            latitude: latitude,
            longitude: longitude,
            area: 160,
            sport: null,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (location) {
      fetchEventsByLocation(location.latitude, location.longitude);
    }
  }, [location]);

  return (
    <PaperProvider>
      <EventsMap events={events} location={location} />
    </PaperProvider>
  );
}
