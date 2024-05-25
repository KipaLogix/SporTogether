import { PaperProvider } from 'react-native-paper';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {useFonts} from 'expo-font';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export {
  ErrorBoundary,
  }  from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
  const router = useRouter();

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        <Stack.Screen name="(modals)/login" options={{
          title: 'Login or Register',
          presentation: 'modal',
          headerTitleStyle: {
            fontFamily: 'SpaceMono',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='close-outline' size={28}/>
            </TouchableOpacity>
          ),
        }}/>
        <Stack.Screen name="event/[id]" options={{ headerTitle: ''}}/>
        <Stack.Screen name="(modals)/booking" 
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='close-outline' size={28}/>
            </TouchableOpacity>
          ),
        }}/>
      </Stack>
    </PaperProvider>
  );
}