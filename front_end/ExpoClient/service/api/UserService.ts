import axios from 'axios';
import {LoginRequest} from '../../interfaces/LoginRequest';
import {RegisterRequest} from '../../interfaces/RegisterRequest';
import {AuthenticationResponse} from '../../interfaces/AuthenticationResponse';
import {User} from '../../interfaces/User';
import {USER_BASE_URL} from "./urls";


export const register = async (registerRequest : RegisterRequest): Promise<AuthenticationResponse> => {
    return await axios.post(`${USER_BASE_URL}/register`, registerRequest);
}

export const login = async (loginRequest: LoginRequest): Promise<AuthenticationResponse> => {
    return await axios.post(`${USER_BASE_URL}/login`, loginRequest);
}

export const getUserById = async (id: string): Promise<User> => {
    return (await axios.get(`${USER_BASE_URL}/${id}`)).data;
}

export const getAllUsers = async(): Promise<User[]> => {
    return await axios.get(`${USER_BASE_URL}`);
}

export const updateUser = async(user: User): Promise<User> => {
    return await axios.put(`${USER_BASE_URL}/${user.id}`, user);
}

export const deleteUser = async(id: string): Promise<void> => {
    return await axios.delete(`${USER_BASE_URL}/${id}`);
}
