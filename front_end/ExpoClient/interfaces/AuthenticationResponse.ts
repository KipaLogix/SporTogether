import { User } from './User';

export interface AuthenticationResponse {
    token?: string;
    error?: string;
    user?: User;
};