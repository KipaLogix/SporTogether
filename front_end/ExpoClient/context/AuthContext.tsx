import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { login, register, getUserById } from '../service/api/UserService';
import { AuthProps } from '../interfaces/AuthProps';
import { AuthState } from '../interfaces/AuthState';
import { AuthenticationResponse } from '../interfaces/AuthenticationResponse';
import { User } from '../interfaces/User';
import { jwtDecode } from 'jwt-decode';
import { router } from 'expo-router';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

//This provider will be used to wrap the entire application
export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<AuthState>({
        token: null,
        authenticated: null,
        user: null,
    });

    // Right when the app starts, we will check if the user is already logged in
    useEffect(() => {
        const loadTokenAndUser = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const user = await SecureStore.getItemAsync(USER_KEY);

            if (token && isTokenValid(token)) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                setAuthState({
                    token,
                    authenticated: true,
                    user: user ? JSON.parse(user) : null
                });

            } else {
                handleLogout();
            }
        }
        loadTokenAndUser();
    }, []);

    const handleRegister = async (email: string, username: string, password: string) => {
        try {
            const response = await register({email, username, password});
            return response;
        } catch (error) {
            return {error: true, msg: (error as any).response.data.message};
        }
    };

    const getUserFromToken = (token: string): User => {
        const decodedPayload = jwtDecode(token);
        const user = (decodedPayload as any).id as User
        return user;
    }

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await login({email, password});
            const token = (response as any).data.token;
            const user = getUserFromToken(token);
            setAuthState({
                token,
                authenticated: true,
                user
            });

            //attach token to all the future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, token);
            await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));

            return response;
        } catch (error) {
            return {error: true, msg: (error as any).response.data.error};
        }
    };

    const handleLogout = async () => {
        //Delete user and token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);

        // Update HTTP Headers
        axios.defaults.headers.common['Authorization'] = '';

        //Reset auth state
        setAuthState({
            token: null,
            authenticated: false,
            user: null
        });
    }

    const isTokenValid = (token: string) => {
        const decodedPayload = jwtDecode(token);
        const expiration = new Date((decodedPayload as any).exp * 1000);
        const now = new Date();
        return now < expiration;
    }

    const value = {
        onRegister: handleRegister,
        onLogin: handleLogin,
        onLogout: handleLogout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}