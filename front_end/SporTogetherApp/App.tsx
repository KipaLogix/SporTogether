import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, TextInput, Button } from 'react-native-paper';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { AuthContextProvider } from './context/AuthContext';
import 'react-native-gesture-handler';
import React, { useDebugValue } from 'react';
import { NativeRouter } from 'react-router-native';
import { Router, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

export default function App() {
  // let { user } = useAuthContext();
  return (

    <AuthContextProvider>
      {/* {user} = useAuthContext() */}

      <NativeRouter>

        <Routes>
          <Route
            path='/'
            element={<SignUp />}
          >
          </Route>

          {/* <Route
            path='/'
            element={user ? <Home /> : <Navigate to='/login' />}
          />
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/' />}
          />
          <Route
            path='/register'
            element={!user ? <SignUp /> : <Navigate to='/' />}
          /> */}

        </Routes>
      </NativeRouter>
    </AuthContextProvider>

  );
}