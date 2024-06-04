import { Event } from "./Event"
import { User } from "./User"

export interface Message {
    id?: string
    sender?: User
    senderId: string
    event?: Event
    eventId: string
    content: string
    createdAt?: Date
  }