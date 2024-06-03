
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ListRenderItem, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { format } from 'date-fns';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

import { getAddressFromCoordinates } from '../service/utils/LocationService';

import { Event } from '../interfaces/Event';
import { defaultStyles } from '../constants/Styles';

interface Props {
  events: Event[];
  refresh: number;
  isBottomSheet: boolean;
}

const EventsList = ({ events, refresh, isBottomSheet }: Props) => {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Record<string, string>>({});
  const listRef = useRef<FlatList>(null);
  const bottomSheetListRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    console.log('Reload listings: ', events);
    setLoading(true);

    const fetchAddresses = async () => {
      const newAddresses: Record<string, string> = {};

      for (const event of events) {
        try {
          const address = await getAddressFromCoordinates(event.latitude ?? 0, event.longitude ?? 0);
          newAddresses[event.id ?? 0] = address;
        } catch (error) {
          newAddresses[event.id ?? 0] = 'Error fetching address';
        }
      }

      setAddresses(newAddresses);
      setLoading(false);
    };

    fetchAddresses().catch((error) => {
      console.error('Error fetching addresses: ', error);
    });
  }, [events]);

  useEffect(() => {
    if (isBottomSheet) {
      if (refresh) {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
      }
    }
  }, [refresh]);


  const renderRow: ListRenderItem<Event> = ({ item }) => {
    const formattedDate = format(new Date(item.date), 'PPpp');
    const address = addresses[item.id ?? ''];

    return (
      <Link href={`/events/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View style={styles.event} entering={FadeInRight} exiting={FadeOutLeft}>
            <Image source={require('../assets/images/default-event-icon.png')} style={styles.image} />
            <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
              <Ionicons name="heart-outline" size={24} color="black" />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontFamily: 'SpaceMono' }}>{item.title}</Text>
              <Text style={{ fontSize: 16, fontFamily: 'SpaceMono' }}>{item.Sport?.sport}</Text>
            </View>

            <Text style={{ fontFamily: 'SpaceMono' }}>initiated by {item.createdBy?.username}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: 'SpaceMono' }}>{formattedDate}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: 'SpaceMono' }}>{address}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>

    );
  };

  return (
    <View style={defaultStyles.container}>
      {isBottomSheet ? (
        <BottomSheetFlatList
          data={loading ? [] : events}
          renderItem={renderRow}
          ref={bottomSheetListRef}
          ListHeaderComponent={<Text style={styles.info}>{events.length} events</Text>}
        />
      ) : (
        <FlatList
          data={loading ? [] : events}
          renderItem={renderRow}
          ref={listRef}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  event: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    backgroundColor: 'gray',
  },
  info: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 4,
    marginBottom: 4,
  },
})

export default EventsList;

