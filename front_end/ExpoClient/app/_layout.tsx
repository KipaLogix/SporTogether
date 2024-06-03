import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { authState } = useAuth();
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

  return(
    <Stack>
      <Stack.Screen
      name="(auth)/(tabs)"
      options={{
        headerShown: false,
      }}
      />
      <Stack.Screen
      name="(auth)/events"
      options={{
        headerShown: false,
      }}
      />
      <Stack.Screen
      name="(public)"
      options={{
        headerShown: false,
      }}
      />
    </Stack>
  )
}

const RootLayoutNav = () => {

  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SpaceMonoBold: require('../assets/fonts/SpaceMono-Bold.ttf'),
    SpaceMonoItalic: require('../assets/fonts/SpaceMono-Italic.ttf'),
    SpaceMonoBoldItalic: require('../assets/fonts/SpaceMono-BoldItalic.ttf'),
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
