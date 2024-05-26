import { Button, StyleSheet, View} from 'react-native';
import {AuthProvider, useAuth} from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import Register from './app/screens/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  // return (
  //   <AuthProvider> 
  //     <Layout></Layout>
  //   </AuthProvider>
  // );
  return(
    <View>
        Salut
    </View>
  )
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (<NavigationContainer>
    <Stack.Navigator>
      {authState?.authenticated ? 
        (<Stack.Screen name="Home" component={Home} 
        options={{
          headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
        }}/>) :
        
        (<>
          < Stack.Screen name="Login" component={Login} />
          < Stack.Screen name="Register" component={Register} />
        </> )}
    </Stack.Navigator>
  </NavigationContainer>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
