import { EVENT_BASE_URL } from './urls';
import { Event } from '../../interfaces/Event';
import axios from 'axios';
import { Sport } from '../../interfaces/Sport';

interface Params {
    title: string;
    description: string;
    date: Date;
    sportId: string;
    longitude: number;
    latitude: number;
    userId: string;
  }

export const getEventsByLocation = async (latitude: number, longitude: number, area: number = 160, sport: string | null = null): Promise<Event[]> => {
    return await axios.get(`${EVENT_BASE_URL}/latitude=${latitude}/longitude=${longitude}/area=${area}/${sport ? `${sport}` : ''}`)
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

export const getSports = async (): Promise<Sport[]> => {
    return await axios.get(`${EVENT_BASE_URL}/sports`)
        .then((response) => {
            return response.data as Sport[];
        }).catch((error) => {
            console.error('Error fetching sports: ', error);
            throw error;
        });
}