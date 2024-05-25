import {USER_BASE_URL} from "./consts";
import axios from 'axios';

const getUser = async (userId: number) => {
    try {
        const response = await axios.get(USER_BASE_URL + userId);
        return response.data;
    } catch (error) {
        console.error('Error fetching user: ', error);
        throw error;
    }
}

const createUser = async (user: any) => {
    try {
        const response = await axios.post(USER_BASE_URL, user);
        return response.data;
    } catch (error) {
        console.error('Error creating user: ', error);
        throw error;
    }
}

const updateUser = async (userId: number, user: any) => {
    try {
        const response = await axios.put(USER_BASE_URL + userId, user);
        return response.data;
    } catch (error) {
        console.error('Error updating user: ', error);
        throw error;
    }
}

const deleteUser = async (userId: number) => {
    try {
        const response = await axios.delete(USER_BASE_URL + userId);
        return response.data;
    } catch (error) {
        console.error('Error deleting user: ', error);
        throw error;
    }
}

module.exports = {getUser, createUser, updateUser, deleteUser};