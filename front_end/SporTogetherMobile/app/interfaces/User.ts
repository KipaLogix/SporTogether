import { Event } from './Event';
import { Role } from './Role';

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    city?: string;
    role: Role;
    first_name?: string;
    last_name?: string;
    createdAt: string; // ISO date string
    Event: Event[]; // Events created by the user
    Participations: Event[]; // Events the user is participating in
  }