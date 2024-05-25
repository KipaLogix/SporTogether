import {MESSAGE_BASE_URL} from "./consts";
import axios from 'axios';

const getMessages = async (eventId: number) => {
    try {
        const response = await axios.get(MESSAGE_BASE_URL + eventId);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages: ', error);
        throw error;
    }
}

const createMessage = async (message: any) => {
    try {
        const response = await axios.post(MESSAGE_BASE_URL, message);
        return response.data;
    } catch (error) {
        console.error('Error creating message: ', error);
        throw error;
    }
}

module.exports = {getMessages, createMessage};