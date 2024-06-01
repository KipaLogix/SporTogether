import { EVENT_BASE_URL } from './urls';
import { Event } from '../../interfaces/Event';
import axios from 'axios';

export const getEventsByLocation = async (latitude: number, longitude: number, area: number = 160, sport: string | null = null): Promise<Event[]> => {
    return await axios.get(`${EVENT_BASE_URL}/latitude=${latitude}/longitude=${longitude}/area=${area}/${sport ? `${sport}` : ''}`)
        .then((response) => {
            console.log(response.data);
            return response.data as Event[];
        }).catch((error) => {
            console.error('Error fetching events: ', error);
            throw error;
        });
}

export const createEvent = async (event: Event): Promise<Event> => {
    try {
        const response = await axios.post(EVENT_BASE_URL, event);
        return await response.data;
    } catch (error) {
        console.error('Error creating event: ', error);
        throw error;
    }
}

export const getEventById = async (id: string): Promise<Event> => {
    try {
        const response = await axios.get(`${EVENT_BASE_URL}/${id}`);
        return await response.data;
    } catch (error) {
        console.error('Error fetching event by id: ', error);
        throw error;
    }
}