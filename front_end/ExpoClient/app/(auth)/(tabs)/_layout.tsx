import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import { Tabs} from 'expo-router';
import Colors from '../../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import {useAuth} from '../../../context/AuthContext';
import { useEffect } from 'react';
import {useFonts} from 'expo-font';


const Layout = () => {

  const [loaded, error] = useFonts({

    SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),

  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);


  const { authState, onLogout } = useAuth();
  
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: 'SpaceMono',
      }
    }}>

      <Tabs.Screen name="explore" options={{
        tabBarLabel: 'Explore',
        headerTitle: 'Explore',
        tabBarIcon: ({ color, size }) =>
          <Ionicons name='search' color={color} size={size} />
      }} />
      <Tabs.Screen name="myevents" options={{
        tabBarLabel: 'My Events',
        headerTitle: 'My Events',
        tabBarIcon: ({ color, size }) =>
          <Ionicons name='football' color={color} size={size} />
      }} />
      <Tabs.Screen name="messages" options={{
        tabBarLabel: 'Chats',
        headerTitle: 'Chats',
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) =>
          <Ionicons name='chatbubbles' color={color} size={size} />
      }} />

      <Tabs.Screen name="profile" options={{
        headerTitle: 'My Profile',
        tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        tabBarLabel: 'My Profile',
        headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
      }}
        redirect={!authState?.authenticated}
      />

    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {}
});
