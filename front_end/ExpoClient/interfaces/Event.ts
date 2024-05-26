import { User } from './User';
import { Sport } from './Sport';

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string; // ISO date string
    latitude?: number;
    longitude?: number;
    sport: Sport[];
    createdAt: string; // ISO date string
    createdBy: number;
    userId: string;
    Participants: User[];
  }