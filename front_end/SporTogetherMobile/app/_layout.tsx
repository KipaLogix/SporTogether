import { PaperProvider } from 'react-native-paper';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {useFonts} from 'expo-font';
import React from 'react';
import { TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useAuth} from './context/AuthContext';



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

  return  <RootLayoutNav />;

}

function RootLayoutNav() {
  const router = useRouter();
  const { authState, onLogout } = useAuth();

  useEffect(() => {
    if (!authState?.authenticated) {
      router.navigate('(auth)/Login');
    }
  }, [authState?.authenticated, router])

  return (
          <PaperProvider>
          <Stack>

            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="(auth)/Login" />

              <Stack.Screen name="(auth)/Register"/>
            <Stack.Screen name="event/[id]" options={{ headerTitle: ''}}/>
            <Stack.Screen name="(modals)/Booking" 
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='close-outline' size={28}/>
                </TouchableOpacity>
              ),
            }}/>  



        {/* {authState?.authenticated ? (
          <>

            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>

            <Stack.Screen name="event/[id]" options={{ headerTitle: ''}}/>
            <Stack.Screen name="(modals)/Booking" 
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='close-outline' size={28}/>
                </TouchableOpacity>
              ),
            }}/>




          </>
        ) : (
          <>
            <Stack.Screen name="(auth)/Login" />
            <Stack.Screen name="(auth)/Register"/>
          </>
        )}
 */}




        </Stack>
      </PaperProvider>
  );
}