import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import EventsMap from '../../../components/EventsMap';
import { Event } from '../../../interfaces/Event';
import { getEventsByLocation } from '../../../service/api/EventService';
import { getPermissionAndLocation } from '../../../service/utils/LocationService';
import { useAuth } from '../../../context/AuthContext';
import EventsList from '../../../components/EventsList';

const explore = () => {

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getPermissionAndLocation().then((loc) => {
      setLocation({
        latitude: loc?.coords?.latitude ?? useAuth().authState?.user?.latitude ?? 0,
        longitude:  loc?.coords?.longitude ?? useAuth().authState?.user?.longitude ?? 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    });
  }, []);

  useEffect(() => {
    if (location) {
      getEventsByLocation(location.latitude, location.longitude).then((resp) => {
        setEvents(resp);
      });
    }
  }, [location]);

  return (
    <PaperProvider>
      <EventsList events={events} sportCategoryId="" />
      {/* <EventsMap events={events} location={location} /> */}
    </PaperProvider>
  );
};

export default explore;

const styles = StyleSheet.create({
});
