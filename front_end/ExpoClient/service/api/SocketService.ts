import { io } from 'socket.io-client';
import { CHAT_SOCKET_URL } from './urls';
import {Message} from '../../interfaces/Message'

let socket: any;

export const initiateSocketConnection = (token: string, eventId: string) => {
    socket = io(CHAT_SOCKET_URL, {
        auth: {
            token
        },
    });
    joinRoom(eventId);
    console.log("Connectig socket...");
}

export const disconnectSocket = (eventId: string) => {
    console.log('Disconnecting socket...');
    if(socket) {
        leaveRoom(eventId);
        socket.disconnect();   
    }
}

export const subscribeToChat = (cb : any) => {
    socket.on('broadcast', (msg : Message) => {
        return cb(null, msg);
    });
}

export const leaveChat = (eventId: string) => {
    socket.leave(eventId);
}

export const sendMessage = ({message, roomName} : {message: Message, roomName: string}, cb : any) => {
    if (socket) {
        socket.emit('message', {message , roomName}, cb)
    }
}

const joinRoom = (roomName: string) => {
    socket.emit("join", roomName);
};

const leaveRoom = (roomName: string) => {
    socket.emit("leave", roomName);
}