import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../../../context/AuthContext';

const profile = () => {
  const { authState, onLogout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello: {authState?.user?.username} </Text>
    </View>
  )
}

export default profile;