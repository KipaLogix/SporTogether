import { EVENT_BASE_URL } from './urls';
import { Event } from '../../interfaces/Event';
import axios from 'axios';

interface Params {
    title: string;
    description: string;
    date: Date;
    sportId: string;
    longitude: number;
    latitude: number;
    userId: string;
}

export const getEventsByLocation = async (latitude: number, longitude: number, sportId: string | null = null, area: number = 160): Promise<Event[]> => {
    return await axios.get(EVENT_BASE_URL, {
        params: {
            latitude,
            longitude,
            area,
            sportId
        }
    })
        .then((response) => {
            return response.data as Event[];
        }).catch((error) => {
            console.error('Error fetching events: ', error);
            throw error;
        });
}

export const createEvent = async (event: Event): Promise<Event> => {
    try {
        const response = await axios.post(`${EVENT_BASE_URL}/`, event);
        return response.data as Event;
    } catch (error) {
        console.error('Error creating event: ', error);
        throw error;
    }
}