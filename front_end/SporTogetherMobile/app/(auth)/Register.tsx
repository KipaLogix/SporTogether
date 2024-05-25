import { View, Button, StyleSheet, TextInput } from 'react-native';
import React, {useState} from 'react';
import { useAuth } from '../context/AuthContext';


const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {onLogin, onRegister} = useAuth();

    const register = async () => {
        const result = await onRegister!(email, username, password);
        if (result && result.error) {
            alert(result.msg);
        } else {
            login();
        }
    }

    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder='Username' onChangeText={(text: string) => setUsername(text)} value={username}></TextInput>
                <TextInput style={styles.input} placeholder='Email' onChangeText={(text: string) => setEmail(text)} value={email}></TextInput>
                <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text: string) => setPassword(text)} value={password}></TextInput>
                
                <View style={styles.buttonContainer}>
                    <Button onPress={register} title='Create Account'/>
                    {/* <Button onPress={() => navigation.navigate('Login')} title='Sign in'/> */}
                </View>        
            </View>
        </View>
    )


};

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

    buttonContainer: {
        marginTop: 50,
        flexDirection: 'column',
        gap: 10,
    }
})


export default Register;