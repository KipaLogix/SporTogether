import {EVENT_BASE_URL} from './urls';
import axios from 'axios';

export const getEvents = async (latitude: number, longitude: number, area: number = 160, sport: string | null = null) => {
    try {
        const response = await axios.get(EVENT_BASE_URL, {
            params: {
                latitude: latitude,
                longitude: longitude,
                area: area,
                sport: sport
            }
        });
        return response.data;
        } catch (error) {
            console.error('Error fetching events: ', error);
            throw error;
        }
    }

export const createEvent = async (event: any) => {
    try {
        const response = await axios.post(EVENT_BASE_URL, event);
        return response.data;
    } catch (error) {
        console.error('Error creating event: ', error);
        throw error;
    }
}
