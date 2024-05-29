import { AuthState } from './AuthState';

export interface AuthProps {
    authState? : AuthState;
    onRegister? : (email: string, username: string, password: string) => Promise<any>;
    onLogin? : (email: string, password: string) => Promise<any>;
    onLogout? : () => Promise<any>;
}