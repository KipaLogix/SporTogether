import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Chat from '../../../components/Chat';
import { useAuth } from '../../../context/AuthContext';
import { getUserById } from '../../../service/api/UserService';
import { Event } from '../../../interfaces/Event';
import { SportIcon } from '../../../components/SportIcon';
import Colors from '../../../constants/Colors';
import { useNavigation } from 'expo-router';

const messages = () => {

  const { user } = useAuth().authState!;
  const [events, setEvents] = React.useState<Event[]>([]);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const navigation = useNavigation();
  const slideAnim = React.useRef(new Animated.Value(-1000)).current;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserById(user!.id)
      .then((u) => {
        console.log('User: ', u);
        setEvents(u.Participations);
      })
      .catch((error) => {
        console.error('Error fetching user events: ', error);
      });
    setRefreshing(false);
  }, []);

  useEffect(() => {
    onRefresh();
  }, [refreshing]);

  const handleCloseChat = () => {
    startSlideOutAnimation();
    setTimeout(() => {
      setIsChatOpen(false);
      navigation.setOptions({
        headerTitle: "Chats",
        headerLeft: null
      });
    }, 500);
  }

  const startSlideInAnimation = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const startSlideOutAnimation = () => {
    Animated.timing(slideAnim, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleOpenChat = (event: Event) => {
    startSlideInAnimation();
    setSelectedEvent(event);
    setIsChatOpen(true);
  };


  return isChatOpen ?
    (
      <Animated.View style={{ flex: 1, transform: [{ translateX: slideAnim }] }}>
        <Chat event={selectedEvent!} user={user!} closeChat={handleCloseChat} />
      </Animated.View>
    ) : (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {events.map((event) => (
            <View key={event.id}>
              <TouchableOpacity
                style={styles.group}
                onPress={() => handleOpenChat(event)}
              >
                {SportIcon(event.Sport!, Colors.grey, 40, false)}
                <View style={{ flex: 1 }}>
                  <Text>{event.title}</Text>
                  <Text style={{ color: '#888' }}>
                    {new Date(event.date).toLocaleString(undefined, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                      weekday: 'short',
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f5ea'
  },
  group: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.25,
  }
})

export default messages;
