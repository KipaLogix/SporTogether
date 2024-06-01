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
import Listings from '../../components/Listings';

const explore = () => {

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const [category, setCategory] = useState<string>('');

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
    if (location) {
      getEventsByLocation(location.latitude, location.longitude).then((resp) => {
        setEvents(resp);
      });
    }
  }, [location]);

  const onDataChanged = (category: string) => {
    setCategory(category);
  }

  return (
    <PaperProvider>
      {/* <EventsMap events={events} location={location} /> */}
      <View style={{ flex: 1, marginTop: 130 }}>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
          }}
        />
        <Listings listings={[]} category={category} />
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
