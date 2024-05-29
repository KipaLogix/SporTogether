import { User } from './User';
import { Sport } from './Sport';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  createdBy: User;
  userId: string;
  Participants: User[];
  Sport: Sport;
  sportId: string;
}