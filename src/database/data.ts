import { User, Room, Reservation } from "../models/types.js";

const users: User[] = 
[{ 
    id: "user1", 
    fullName: "Alice Smith", 
    email: "alice.smith@mail.com", 
    createdAt: "2026-01-30T13:00:00Z",
    lastUpdatedAt: "2026-01-30T13:00:00Z"
}, 
{ 
    id: "user2", 
    fullName: "Bob John", 
    email: "bob.john@mail.com",
    createdAt: "2026-01-30T13:00:00Z",
    lastUpdatedAt: "2026-01-30T13:00:00Z"
}];

const rooms: Room[] = 
[{ 
    id: "room1", 
    name: "Conference Room A",
    createdAt: "2026-01-30T13:00:00Z",
    lastUpdatedAt: "2026-01-30T13:00:00Z"
},
{ 
    id: "room2",
    name: "Conference Room B",
    createdAt: "2026-01-30T13:00:00Z",
    lastUpdatedAt: "2026-01-30T13:00:00Z"
}];

const reservations: Reservation[] = [
  {
    id: "res1",
    createdById: "user1",
    roomId: "room1",
    startTime: "2026-01-01T09:00:00Z",
    endTime: "2026-01-01T10:00:00Z",
    createdAt: "2026-01-01T07:00:00Z",
    lastUpdatedAt: "2026-01-01T07:00:00Z"
  },
  {
    id: "res2",
    createdById: "user2",
    roomId: "room2",
    startTime: "2026-01-31T13:00:00Z",
    endTime: "2026-01-31T14:00:00Z",
    createdAt: "2026-01-30T13:00:00Z",
    lastUpdatedAt: "2026-01-30T13:00:00Z"
  }
];

export { users, rooms, reservations }