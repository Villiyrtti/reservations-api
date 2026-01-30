import { Reservation, ErrorResponse } from "../models/types.js";
import { v4 as uuid } from 'uuid';
import { validateDate, isOverlapping } from "../utils.js";

const reservations: Reservation[] = [
  {
    id: "res1",
    userId: "u1",
    roomId: "room1",
    startTime: "2026-01-01T09:00:00Z",
    endTime: "2026-01-01T10:00:00Z"
  },
  {
    id: "res2",
    userId: "u2",
    roomId: "room2",
    startTime: "2026-01-01T11:00:00Z",
    endTime: "2026-01-01T12:00:00Z"
  }
];

export const ReservationService = {
  getAll: () => reservations,

  getById: (id: string) =>
    reservations.find(r => r.id === id),

  getByRoomId: (roomId: string) =>
    reservations.filter(r => r.roomId === roomId),

  create: (userId: string, roomId: string, startTime: string, endTime: string) => {
    const newStartTime = validateDate(startTime);
    const newEndTime = validateDate(endTime);
    const now = new Date();
    console.log(now)

    if (!newEndTime || !newStartTime || newStartTime >= newEndTime) {
      const error: ErrorResponse = new Error("Invalid date range");
      error.status = 400;
      throw error;
    }

    if (newStartTime < now) {
      const error: ErrorResponse = new Error("Cannot create reservation in the past");
      error.status = 400;
      throw error;
    }

    const overlapping: boolean = reservations.some((reservation) => {
      if (roomId === reservation.roomId) {
        return isOverlapping(newStartTime, newEndTime, new Date(reservation.startTime), new Date(reservation.endTime));
      };
    });

    if (overlapping) {
      const error: ErrorResponse = new Error("Room already reserved for that time");
      error.status = 409;
      throw error;
    }

    const newReservation: Reservation = {
      id: uuid(),
      userId,
      roomId,
      startTime: newStartTime.toISOString(),
      endTime: newEndTime.toISOString()
    }
    reservations.push(newReservation);
    return newReservation;
  },


  cancel: (reservationId: string, userId: string) => {
    const index = reservations.findIndex(r => r.id === reservationId);

    if (index === -1) {
      const error: ErrorResponse = new Error("Reservation not found");
      error.status = 404;
      throw error;
    }

    if (reservations[index].userId !== userId) {
      const error: ErrorResponse = new Error("User not allowed to cancel this reservation");
      error.status = 403;
      throw error;
    }

    reservations.splice(index, 1);
  }
};