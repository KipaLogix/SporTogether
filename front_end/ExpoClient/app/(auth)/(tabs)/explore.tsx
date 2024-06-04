import * as React from 'react';
import { View } from 'react-native';
import { useEffect, useState } from 'react';

import { PaperProvider } from 'react-native-paper';

import EventsMap from '../../../components/EventsMap';
import { Event } from '../../../interfaces/Event';
import { getEventsByLocation } from '../../../service/api/EventService';
import { getPermissionAndLocation } from '../../../service/utils/LocationService';
import { useAuth } from '../../../context/AuthContext';

import { Stack } from 'expo-router';
import ExploreHeader from '../../../components/ExploreHeader';
import { Sport } from '../../../interfaces/Sport';
import { getSports } from '../../../service/api/SportService';
import EventsBottomSheetList from '../../../components/EventsBottomSheetList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

  const [refresh, setRefresh] = useState<number>(0);


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
  }, [location, sportId, refresh]);

  useEffect(() => {
    getSports().then((resp) => {
      setSports(resp);
    }).catch((err) => {
      alert(err);
    });
  }, []);

  const onDataChanged = (sportId: string) => {
    setSportId(sportId);
  }

  return (

    <PaperProvider>

      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader onSportChanged={onDataChanged} sports={sports} />,
          }}
        />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <EventsMap events={events} location={location} />
          <EventsBottomSheetList events={events} refresh={refresh} setRefresh={setRefresh} />
        </GestureHandlerRootView>

      </View>

    </PaperProvider>

  );
};

export default explore;
