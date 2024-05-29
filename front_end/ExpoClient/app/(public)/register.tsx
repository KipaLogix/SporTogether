import { View, TextInput, StyleSheet, Button, Pressable, Text } from 'react-native'
import React, {useState} from 'react'
import { useAuth } from '../../context/AuthContext';
import {Link} from 'expo-router';


const register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin, onRegister} = useAuth();

    const onLoginPress = async () => {
      const result = await onLogin!(email, password);
      if (result && result.error) {
          alert(result.msg);
      }
    }

    const onRegisterPress = async () => {
        const result = await onRegister!(email, username, password);
        if (result && result.error) {
            alert(result.msg);
        } else {
            onLoginPress();
        }
    }


  return (
    <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder='Username' onChangeText={(text: string) => setUsername(text)} value={username}></TextInput>
                <TextInput style={styles.input} placeholder='Email' onChangeText={(text: string) => setEmail(text)} value={email}></TextInput>
                <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text: string) => setPassword(text)} value={password}></TextInput>
                
                <View style={styles.buttonContainer}>
                    <Button onPress={onRegisterPress} title='Create Account'/>
                    <Link href="/login" asChild>
                        <Pressable style={styles.button}>
                            <Text>Log in</Text>
                        </Pressable>
                    </Link>
                </View>        
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },

  form: {
      width: '80%',
      margin: 20,
  },

  input: {
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
  },

  button: {
    margin: 8,
    alignItems: 'center',
  },

  buttonContainer: {
      marginTop: 50,
      flexDirection: 'column',
      gap: 10,
  }
})

export default register;