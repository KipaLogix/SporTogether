import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import EventsMap from '../../components/EventsMap';
import { Event } from '../../interfaces/Event';
import { getEventsByLocation } from '../../service/api/EventService';
import { getPermissionAndLocation } from '../../service/utils/LocationService';
import { useAuth } from '../../context/AuthContext';

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
