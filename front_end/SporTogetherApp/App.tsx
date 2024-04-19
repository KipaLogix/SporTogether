import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { PaperProvider, TextInput, Button } from 'react-native-paper';
import Login from './components/Login';
import MapEvents from './components/MapEvents';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function App() {
  return (
    <PaperProvider>
      <MapEvents />
    </PaperProvider>
  );
}