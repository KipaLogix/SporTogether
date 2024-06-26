import { Message } from "../../interfaces/Message";
import {MESSAGE_BASE_URL} from "./urls";
import axios from 'axios';

export const getMessages = async (eventId: string): Promise<Message[]> => {
    try {
        const response = await axios.get(`${MESSAGE_BASE_URL}/${eventId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages: ', error);
        throw error;
    }
}

export const createMessage = async (message: Message): Promise<Message> => {
    try {
        const response = await axios.post(MESSAGE_BASE_URL, message);
        return response.data;
    } catch (error) {
        console.error('Error creating message: ', error);
        throw error;
    }
}