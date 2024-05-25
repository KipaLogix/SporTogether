import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from './app/_layout';
import LoginScreen from './app/login';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import {useFonts} from 'expo-font';

export {
  ErrorBoundary,
  }  from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
      SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
    });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
      if (loaded){ SplashScreen.hideAsync();
    }
  }, [loaded]);

  if(!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      </Stack>
    </PaperProvider>
  );
}