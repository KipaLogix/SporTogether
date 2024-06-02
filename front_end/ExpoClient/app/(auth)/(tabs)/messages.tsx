import { View, Text } from 'react-native'
import React from 'react'
import Chat from '../../components/Chat';
import { useAuth } from '../../context/AuthContext';

const messages = () => {

  const { user } = useAuth().authState!;

  return (
    <Chat eventId='63adc8e3-214a-47e1-bb59-516b3661b8a5' eventTitle='Sport' user={user!}/>
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Text>Messages</Text>
    // </View>
  )
}

export default messages;