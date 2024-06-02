import { Slot, SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { authState, onLogout } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {

    const inTabsGroup = segments[0] === '(auth)';

    if (authState?.authenticated && !inTabsGroup) {
      router.replace('/explore');
    } else if (!authState?.authenticated) {
      router.replace('/login');
    }

  }, [authState?.authenticated]);

  return <Slot />
}

const RootLayoutNav = () => {

  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>

  );
}

export default RootLayoutNav;
