import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { List, PaperProvider } from 'react-native-paper';
import EventsMap from '../../components/EventsMap';
import { Event } from '../../interfaces/Event';
import { getEventsByLocation } from '../../service/api/EventService';
import { getPermissionAndLocation } from '../../service/utils/LocationService';
import { useAuth } from '../../context/AuthContext';
import { Stack } from 'expo-router';
import ExploreHeader from '../../components/ExploreHeader';
import { Sport } from '../../interfaces/Sport';
import { getSports } from '../../service/api/SportService';

const explore = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);

  const [sportId, setSportId] = useState<string>('');

  useEffect(() => {
    getPermissionAndLocation().then((loc) => {
      setLocation({
        latitude: loc?.coords?.latitude ?? useAuth().authState?.user?.latitude ?? 0,
        longitude: loc?.coords?.longitude ?? useAuth().authState?.user?.longitude ?? 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    });
  }, []);

  useEffect(() => {
    if (location && sportId !== '') {
      getEventsByLocation(location.latitude, location.longitude, sportId).then((resp) => {
        setEvents(resp);
      }).catch((err) => {
        alert(err);
      });
    } else if (location) {
      getEventsByLocation(location.latitude, location.longitude).then((resp) => {
        setEvents(resp);
      }).catch((err) => {
        alert(err);
      });
    }
  }, [location, sportId]);

  useEffect(() => {
    getSports().then((resp) => {
      setSports(resp);
    });
  }, []);

  const onDataChanged = (sportId: string) => {
    setSportId(sportId);
  }

  return (
    <PaperProvider>
      <View style={{ flex: 1, marginTop: 20 }}>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader onSportChanged={onDataChanged} sports={sports} />,
          }}
        />
        <EventsMap events={events} location={location} />

      </View>
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
