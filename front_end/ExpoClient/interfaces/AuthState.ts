import { User } from './User';

export interface AuthState { 
    token: string | null,
    authenticated: boolean | null,
    user: User | null
};