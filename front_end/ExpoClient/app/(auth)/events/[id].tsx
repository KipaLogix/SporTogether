import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import Animated, { SlideInDown, SlideInUp, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import Colors from '../../../constants/Colors';
import { getEventById } from '../../../service/api/EventService';
import { SportIcon } from '../../../components/SportIcon';
import { Event } from '../../../interfaces/Event';
import { getAddressFromCoordinates } from '../../../service/utils/LocationService';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { defaultStyles } from '../../../constants/Styles';
const EventPage = () => {
  const { authState, onLogout } = useAuth();
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [address, setAddress] = useState<string | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();



  useEffect(() => {
    if (id) {
      getEventById(id)
        .then((resp_event) => {
          console.log('Event useEffect: ', resp_event);
          setEvent(resp_event);
          if (resp_event !== undefined) {
            fetchAddress(resp_event.latitude ?? 0, resp_event.longitude ?? 0).then().catch((error) => {
              throw new Error('Error fetching address: ' + error);
            });
          } else {
            throw new Error('Event is undefined');
          }
        })
        .catch((error) => {
          console.error('Error fetching event: ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const fetchAddress = async (lat: number, lon: number) => {
    const address = await getAddressFromCoordinates(lat, lon);
    setAddress(address);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Event not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}>
        <Animated.Image source={require('../../../assets/images/default-event-icon.png')} style={[styles.image]} />
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.sport}>
              {SportIcon(event.Sport!, Colors.grey)}
            </View>
          </View>
          <Text style={styles.location}>
            {address}
          </Text>
          <View style={styles.divider} />

          {/* <View style={{ flexDirection: 'row', gap: 4 }}>

            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews} reviews
            </Text>
          </View> */}

          {/* <View style={styles.divider} /> */}

          <View style={styles.hostView}>
            {/* <Image source={{ uri: listing.host_picture_url }} style={styles.host} /> */}

            <View>
              <Text style={styles.hostView}>Initiated by {event.createdBy!.username}</Text>
              <Text style={styles.hostView}>Current participant count: {event.Participants?.length}</Text>
            </View>
          </View>

          <View style={styles.divider} />
          <Text style={{ fontFamily: 'SpaceMonoBold' }}>Description: </Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
        <View style={styles.infoContainer}>

        </View>
      </Animated.ScrollView>
      <Animated.View style={defaultStyles.footer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Link href={`/`} asChild style={{}}>
            <TouchableOpacity style={{ padding: '5%' }} >
              <Ionicons name='chatbubbles' color={Colors.grey} size={30} />
              <Text style={styles.description}>Chat</Text>
            </TouchableOpacity>
          </Link>
          {event.Participants?.findIndex((participant) => participant.id === authState?.user?.id) === -1 ? (
            <Link href={`/`} asChild style={{}}>
              <TouchableOpacity style={{ padding: '5%' }} >
                <Ionicons name='checkmark' color={Colors.grey} size={30} />
                <Text style={styles.description}>Join</Text>
              </TouchableOpacity>
            </Link>) : (
            <Link href={`/`} asChild style={{}}>
              <TouchableOpacity style={{ padding: '5%' }} >
                <Ionicons name='close' color={Colors.grey} size={30} />
                <Text style={styles.description}>Leave</Text>
              </TouchableOpacity>
            </Link>)}
        </View>
      </Animated.View>
    </View>
  )
};

const IMG_HEIGHT = 300;
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: IMG_HEIGHT,
    width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontFamily: 'SpaceMonoBold',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'SpaceMono',
  },
  sport: {
    alignItems: 'center',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'SpaceMono',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
    fontFamily: 'SpaceMono',
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    fontFamily: 'SpaceMono',
  },
  description: {
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'SpaceMono',
  },
})

export default EventPage;