import { Room } from "../models/types.js";
import { v4 as uuid } from 'uuid';
import { rooms } from "../database/data.js";

export const RoomService = {
  getAll: () => rooms,

  getById: (id: string) => rooms.find(room => room.id === id),

  create: (name: string) => {
    const now = new Date();
    const newRoom: Room = {
      id: uuid(),
      name,
      createdAt: now.toISOString(),
      lastUpdatedAt: now.toISOString()
    };
    rooms.push(newRoom);
    return newRoom;
  }
};