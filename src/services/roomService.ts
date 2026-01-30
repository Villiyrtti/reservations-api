import { Room } from "../models/types.js";
import { v4 as uuid } from 'uuid';

const rooms: Room[] = [
  { id: "room1", name: "Conference Room A" },
  { id: "room2", name: "Conference Room B" }
];

export const RoomService = {
  getAll: () => rooms,

  getById: (id: string) => rooms.find(r => r.id === id),

  create: (name: string) => {
    const newRoom: Room = {
      id: uuid(),
      name
    };
    rooms.push(newRoom);
    return newRoom;
  }
};