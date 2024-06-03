
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Animated, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams, router } from 'expo-router'
import { SlideInDown, SlideInUp, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'

import Colors from '../../../constants/Colors';
import { cancelEvent, getEventById, joinEvent, leaveEvent } from '../../../service/api/EventService';
import { SportIcon } from '../../../components/SportIcon';
import { Event } from '../../../interfaces/Event';
import { getAddressFromCoordinates } from '../../../service/utils/LocationService';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { defaultStyles } from '../../../constants/Styles';
import Chat from '../../../components/Chat';

const EventPage = () => {
  const { authState, onLogout } = useAuth();
  const [event, setEvent] = useState<Event>();

  const [loading, setLoading] = useState<boolean>(true);
  const [address, setAddress] = useState<string | null>(null);
  const [isChatVisible, setChatVisible] = React.useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [check, setCheck] = useState<boolean>(true);
  const [owner, setOwner] = useState<boolean>(false);
  const user = authState?.user!;
  const token = authState?.token!;

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
            if (resp_event.Participants?.findIndex((participant) => participant.id === authState?.user?.id) !== -1) {
              setCheck(false);
            }
            if (resp_event.createdBy?.id === authState?.user?.id) {
              setOwner(true);
            }
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

  const join = async () => {
    if (authState?.user) {

      joinEvent(id!, authState.user.id).then((resp) => {
        setCheck(false);
        alert('Successfully joined event!');
      }).catch((error) => {
        console.error('Error joining event: ', error);
      });
    }
  }

  const leave = async () => {
    if (authState?.user) {

      leaveEvent(id!, authState.user.id).then((resp) => {
        setCheck(true);
        alert('Successfully left event!');
      }).catch((error) => {
        console.error('Error leaving event: ', error);
      });
    }
  }

  const cancel = async () => {
    if (authState?.user) {
      const confirm = await new Promise((resolve) => {
        Alert.alert(
          'Confirmation',
          'Are you sure you want to cancel the event?',
          [
            { text: 'Cancel', onPress: () => resolve(false) },
            { text: 'Confirm', onPress: () => resolve(true) },
          ],
          { cancelable: false }
        );
      });

      if (confirm) {
        cancelEvent(id!, authState.user.id)
          .then((resp) => {
            setCheck(true);
            alert('Event canceled successfully!');
            router.back();
          })
          .catch((error) => {
            console.error('Error canceling event: ', error);
          });
      }
    }
  }

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
    <View style={{flex:1}}>
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

            <View style={styles.creatorView}>
              <View>
                <Text style={styles.creatorView}>Initiated by {event.createdBy!.username}</Text>
                <Text style={styles.creatorView}>Current participant count: {event.Participants?.length}</Text>
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
          <TouchableOpacity 
            style={{ padding: '5%' }}
            onPress={() => setChatVisible(true)} >
            <Ionicons name='chatbubbles' color={Colors.grey} size={30} />
            <Text style={styles.description}>Chat</Text>
          </TouchableOpacity>
          {
            owner ? (
              <TouchableOpacity style={{ padding: '5%', alignItems: 'center' }} onPress={() => cancel()}>
                <Ionicons name='trash' color={Colors.grey} size={30} />
                <Text style={styles.description}>Cancel</Text>
              </TouchableOpacity>
            ) : check ? (
              <TouchableOpacity style={{ padding: '5%', alignItems: 'center' }} onPress={() => join()}>
                <Ionicons name='checkmark' color={Colors.grey} size={30} />
                <Text style={styles.description}>Join</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{ padding: '5%', alignItems: 'center' }} onPress={() => leave()}>
                <Ionicons name='close' color={Colors.grey} size={30} />
                <Text style={styles.description}>Leave</Text>
              </TouchableOpacity>
            )}
        </View>
      </Animated.View>
      </View>
      {isChatVisible && <Chat event={event} user={user} fullscreen={true} closeChat={() => setChatVisible(false) } token={token}/>}
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
  creatorView: {
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