import { Sport } from '../../interfaces/Sport';
import { SPORT_BASE_URL } from './urls';
import axios from 'axios';

export const getSports = async (): Promise<Sport[]> => {
    try {
        const response = await axios.get(SPORT_BASE_URL + '/');
        return response.data;
    } catch (error) {
        console.error('Error fetching sports: ', error);
        throw error;
    }
}