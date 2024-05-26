import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs} from 'expo-router';
import Colors from '@/constants/Colors';
import {Ionicons} from '@expo/vector-icons';


const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: 'SpaceMono',
      }
    }}>
        {/* <Tabs.Screen name="Index" options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color, size}) =>
            <Ionicons name='search' color={color} size={size}/>
        }} />
        <Tabs.Screen name="MyEvents" options={{
          tabBarLabel: 'My Events',
          tabBarIcon: ({color, size}) =>
            <Ionicons name='football' color={color} size={size}/>
        }} />
        <Tabs.Screen name="Messages" options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color, size}) =>
            <Ionicons name='chatbubbles' color={color} size={size}/>
        }} />
        <Tabs.Screen name="Profile" options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) =>
            <Ionicons name='person' color={color} size={size}/>
        }} /> */}
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {}
});
