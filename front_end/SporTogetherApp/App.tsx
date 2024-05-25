import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from './app/index';
import LoginScreen from './app/login';
import { SplashScreen } from 'expo-router';
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
}


const Stack = createNativeStackNavigator();


// export default function App() {
//   return (
//     <PaperProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name="Login" component={LoginScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//       <StatusBar style="auto" />
//     </PaperProvider>
//   );
// }
