import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CreateEvent from '../../../components/CreateEvent';
import { FAB, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../../context/AuthContext';
import { getPermissionAndLocation } from '../../../service/utils/LocationService';
import { createEvent, getMyEvents } from '../../../service/api/EventService';
import { getSports } from '../../../service/api/SportService';
import { Sport } from '../../../interfaces/Sport';
import { Event } from '../../../interfaces/Event';
import EventsList from '../../../components/EventsList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Params {
  title: string;
  description: string;
  date: Date;
  sportId: string;
  longitude: number;
  latitude: number;
  userId: string;
}

const myevents = () => {
  const { authState } = useAuth();
  const [isCreateEventVisible, setCreateEventVisible] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [sports, setSports] = useState<Sport[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [refresh, setRefresh] = useState(0);

  React.useEffect(() => {
    getMyEvents(authState!.user!.id).then((events) => {
      setEvents(events);
    }).catch((error) => {
      console.error('Error fetching my events: ', error);
      throw error;
    });
    console.log(refresh);
  }, [refresh]);

  const handleCreateEvent = async ({title, description, date, sportId, longitude, latitude, userId} : Params) => {
    await createEvent({title, description, date, sportId, longitude, latitude, userId});
  };

  useEffect(() => {
    getPermissionAndLocation().then((loc) => {
      setUserLocation({
        latitude: loc?.coords?.latitude ?? useAuth().authState?.user?.latitude ?? 0,
        longitude: loc?.coords?.longitude ?? useAuth().authState?.user?.longitude ?? 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    });
  }, []);

  useEffect(() => {
    getSports().then((resp) => {
      setSports(resp);
    });
  }, []);

  const onRefreshChanged = () => {
    console.log("Refreshing MyEvents: " + refresh);
    var newVal = refresh + 1;
    setRefresh(refresh => refresh + 1);
  }

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <EventsList events={events} onRefreshChanged={onRefreshChanged} refresh={refresh} isBottomSheet={false} />
      </GestureHandlerRootView>
      <CreateEvent
        isVisible={isCreateEventVisible}
        onClose={() => setCreateEventVisible(false)}
        onCreate={handleCreateEvent}
        sports={sports}
        userId={useAuth().authState?.user?.id!}
        userLocation={userLocation}
      />
      <Animatable.View
        animation="pulse"
        easing="ease-in-out"
        iterationCount="infinite"
        style={styles.fabContainer}
        duration={2500}
      >
        <FAB
          placement="right"
          color='blue'
          onPress={() => {
            setCreateEventVisible(true);
          }}
          visible={true}
          icon={
            <Icon
              name="add"
              color="#FFFFFF"
              size={24}
            />
          }
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default myevents;