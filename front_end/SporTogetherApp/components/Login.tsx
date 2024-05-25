import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login logic here
        console.log('Logging in...');
    };

    return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput label="Email" style={styles.form_input}/>
        <TextInput label="Password" style={styles.form_input} secureTextEntry={true}/>
        <Button icon="soccer" mode="contained" style={styles.form_input} onPress={() => console.log('Pressed')}>
          <Text>Sign In</Text>
        </Button>
      </View>
    </PaperProvider>
    );

    
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form_input: {
      margin: 10
    }
  });

export default Login;