import { USER_BASE_URL, EVENT_BASE_URL, MESSAGE_BASE_URL } from "./consts";
import axios from 'axios';

export const getEventsByLocation = async (latitude: number, longitude: number) => {
    try {
        const response = await axios.get(EVENT_BASE_URL, {
            params: {
                latitude: latitude,
                longitude: longitude,
                area: 160,
                sport: null
            }
        });
        return response.data;
        } catch (error) {
            console.error('Error fetching events: ', error);
            throw error;
        }
    }