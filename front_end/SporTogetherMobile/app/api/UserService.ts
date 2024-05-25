import axios from 'axios';
import {LoginRequest} from '../interfaces/LoginRequest';
import {RegisterRequest} from '../interfaces/RegisterRequest';
import {AuthenticationResponse} from '../interfaces/AuthenticationResponse';
import {User} from '../interfaces/User';


const API_URL = 'http://192.168.1.129:56789/api/users';

export const register = async (registerRequest : RegisterRequest): Promise<AuthenticationResponse> => {
    return await axios.post(`${API_URL}/register`, registerRequest);
}

export const login = async (loginRequest: LoginRequest): Promise<AuthenticationResponse> => {
    return await axios.post(`${API_URL}/login`, loginRequest);
}

export const getUserById = async (id: number): Promise<User> => {
    return await axios.get(`${API_URL}/${id}`);
}

export const getAllUsers = async(): Promise<User[]> => {
    return await axios.get(`${API_URL}`);
}

export const updateUser = async(user: User): Promise<User> => {
    return await axios.put(`${API_URL}/${user.id}`, user);
}

export const deleteUser = async(id: number): Promise<void> => {
    return await axios.delete(`${API_URL}/${id}`);
}
