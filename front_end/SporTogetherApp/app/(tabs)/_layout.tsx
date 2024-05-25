import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Tabs} from 'expo-router';
import Colors from '@/constants/Colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';


const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: 'SpaceMono',
      }
    }}>
        <Tabs.Screen name="index" options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color, size}) =>
            <Ionicons name='search' color={color} size={size}/>
        }} />
        <Tabs.Screen name="myevents" options={{
          tabBarLabel: 'My Events',
          tabBarIcon: ({color, size}) =>
            <Ionicons name='football' color={color} size={size}/>
        }} />
        <Tabs.Screen name="messages" options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color, size}) =>
            <Ionicons name='chatbubbles' color={color} size={size}/>
        }} />
        <Tabs.Screen name="profile" options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) =>
            <Ionicons name='person' color={color} size={size}/>
        }} />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {}
});
