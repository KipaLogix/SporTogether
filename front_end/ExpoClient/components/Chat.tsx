import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ListRenderItem, FlatList, Keyboard } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { createMessage } from '../service/api/MessageService';
import { getMessages } from '../service/api/MessageService';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '../interfaces/Message';
import { User } from '../interfaces/User';
import { Event } from '../interfaces/Event';
import Modal from 'react-native-modal';


interface Params {
    event: Event;
    user: User;
    fullscreen: boolean;
    closeChat?: () => void;
}

const Chat = ({event, user, fullscreen, closeChat}: Params) => {
    const navigation = useNavigation();
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isClosing, setIsClosing] = useState(false);
    const listRef = useRef<FlatList>(null);
        
    useEffect(() => {
        console.log('Fetching messages for event: ', event.id);
        getMessages(event.id!)
            .then(setMessages)
            .catch((err) => {
                alert('Error fetching messages: ' + err);
                setMessages([]);
            });
        !fullscreen && navigation.setOptions({
            headerTitle: event.title,
        })
    }, [event.id]);

    useEffect(() => {
        setTimeout(() => {
            listRef.current?.scrollToEnd({animated: true});
        }, 200);
    }, [messages]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 20)
        );
      
        return () => {
          keyboardDidShowListener.remove();
        };
      }, []);

    
    const handleSendMessage = () => {
        Keyboard.dismiss(); 
        createMessage({
            senderId: user.id,
            eventId: event.id!,
            content: newMessage
        });

        setNewMessage(''); 
    }

    const renderMessage: ListRenderItem<Message> = ({item}) => {
        const isUserMessage = JSON.stringify(item.sender) === JSON.stringify(user);
        return (
            <View style={[styles.messageContainer, isUserMessage? styles.userMessageContainer: styles.otherMessageContainer]}>
                {item.content !== '' && <Text style={[styles.messageText, isUserMessage? styles.userMessageText: null]}>{item.content}</Text>}
                <Text style={styles.timestamp}>{new Date(item.createdAt!).toLocaleTimeString()} - {item.sender!.username}</Text>
            </View>
        );
    }

    const chatView = (
        <>
            {fullscreen && (
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => {
                    setIsClosing(true);
                    setTimeout(() => closeChat && closeChat(), 300);
                }}>
                    <Ionicons name='arrow-back-outline' style={styles.backIcon}/>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>{event.title}</Text>
            </View>
            )}
            <KeyboardAvoidingView style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={fullscreen ? 0: 130}>
                <FlatList 
                    ref={listRef} 
                    ListFooterComponent={<View style={{ padding: 10 }}></View>} 
                    data={messages} 
                    renderItem={renderMessage} 
                    keyExtractor={(item: Message) => item.id!}/>
                
                <View style={styles.inputContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput style={styles.textInput}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder='Type a message...'
                        multiline={true}/>
                        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={newMessage === ''}>
                            <Ionicons name='send-outline' style={styles.sendButtonText}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
    

    return fullscreen? (
        <Modal 
        isVisible={fullscreen && !isClosing} 
        animationIn='slideInUp'
        animationOut='slideOutRight'
        onSwipeComplete={() => closeChat && closeChat()}
        swipeDirection={['right', 'left']}
        style={{margin:0, justifyContent: 'flex-end'}}>
            {chatView}
        </Modal>
    ) : (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            {chatView}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f5ea',
    },
    inputContainer: {
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        minHeight: 40,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    sendButton: {
        backgroundColor: '#eea217',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
        alignSelf: 'flex-end',
    },
    sendButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },

    messageContainer: {
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    userMessageContainer: {
        backgroundColor: '#791363',
        alignSelf: 'flex-end',
    },
    otherMessageContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        flexWrap: 'wrap',
    },
    userMessageText: {
        color: '#fff',
    },
    timestamp: {
        fontSize: 12,
        color: 'c7c7c7',
    },
    header: {
        height: 50,
        backgroundColor: '#f8f5ea',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        left: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 20,
    },
    backText: {
        fontSize: 16,
        marginLeft: 5,
    },
})

export default Chat;