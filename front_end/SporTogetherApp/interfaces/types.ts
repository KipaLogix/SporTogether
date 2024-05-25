// types.ts

// Enum for Role
export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
  }
  
  // Enum for Sport
  export enum Sport {
    FOOTBALL = "FOOTBALL",
    BASKETBALL = "BASKETBALL",
    TENNIS = "TENNIS",
    VOLLEYBALL = "VOLLEYBALL",
    HANDBALL = "HANDBALL",
    RUGBY = "RUGBY",
    SWIMMING = "SWIMMING",
    RUNNING = "RUNNING",
    CYCLING = "CYCLING",
    GOLF = "GOLF",
    BOXING = "BOXING",
    MARTIAL_ARTS = "MARTIAL_ARTS",
    YOGA = "YOGA",
    DANCE = "DANCE",
    FITNESS = "FITNESS",
    GYMNASTICS = "GYMNASTICS",
    SKIING = "SKIING",
    SNOWBOARDING = "SNOWBOARDING",
    ICE_SKATING = "ICE_SKATING",
    ICE_HOCKEY = "ICE_HOCKEY",
    CURLING = "CURLING",
    SQUASH = "SQUASH",
    BADMINTON = "BADMINTON",
    TABLE_TENNIS = "TABLE_TENNIS",
    BILLIARDS = "BILLIARDS",
    DARTS = "DARTS",
    CHESS = "CHESS",
    POKER = "POKER",
    BRIDGE = "BRIDGE",
    BACKGAMMON = "BACKGAMMON",
    VIDEO_GAMES = "VIDEO_GAMES",
    BOARD_GAMES = "BOARD_GAMES",
    CARD_GAMES = "CARD_GAMES",
    OTHER = "OTHER",
  }
  
  // Interface for User
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
  
  // Interface for Event
  export interface Event {
    id: string;
    title: string;
    description: string;
    date: string; // ISO date string
    latitude?: number;
    longitude?: number;
    sport: Sport[];
    createdAt: string; // ISO date string
    createdBy: User;
    userId: string;
    Participants: User[];
  }
  