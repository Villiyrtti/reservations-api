import { Room } from "../models/types.js";

const rooms: Room[] = [
  { id: "room1", name: "Conference Room A" },
  { id: "room2", name: "Conference Room B" }
];

export const RoomService = {
  getAll: () => rooms,

  getById: (id: string) => rooms.find(r => r.id === id),

  create: (room: Room) => {
    rooms.push(room);
    return room;
  }
};