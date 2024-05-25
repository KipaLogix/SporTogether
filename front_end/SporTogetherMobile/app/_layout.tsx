import { PaperProvider } from 'react-native-paper';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {useFonts} from 'expo-font';
import React from 'react';
import { TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {AuthProvider, useAuth} from './context/AuthContext';
import Home from './Home';
import Login from './(auth)/Login';
import Register from './(auth)/Register';


export {
  ErrorBoundary,
  }  from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)/Login',
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

  return (<AuthProvider>
            <RootLayoutNav />
          </AuthProvider> ); 
}

function RootLayoutNav() {
  const router = useRouter();
  const { authState, onLogout } = useAuth();


  return (
    <PaperProvider>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{headerShown: false}}/>

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
        }}/> */}



        {authState?.authenticated ? (
          <>
            {/* <Stack.Screen name="Home"  options={{
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
            }} /> */}
            


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
            {/* <Stack.Screen name="(auth)/Login" component={Login} />
            <Stack.Screen name="(auth)/Register" component={Register} /> */}
            <Stack.Screen name="(auth)/Login" />
            <Stack.Screen name="(auth)/Register"/>
          </>
        )}





      </Stack>
    </PaperProvider>
  );
}