import { Reservation } from "../models/types.js";

const reservations: Reservation[] = [
  {
    id: "res1",
    userId: "u1",
    roomId: "room1",
    startTime: new Date("2026-01-01T09:00:00Z"),
    endTime: new Date("2026-01-01T10:00:00Z")
  },
  {
    id: "res2",
    userId: "u2",
    roomId: "room2",
    startTime: new Date("2026-01-01T11:00:00Z"),
    endTime: new Date("2026-01-01T12:00:00Z")
  }
];

const isOverlapping = (
  roomId: string,
  start: Date,
  end: Date
): boolean => {
  return reservations.some(r =>
    r.roomId === roomId &&
    start < r.endTime &&
    end > r.startTime
  );
};

export const ReservationService = {
  getAll: () => reservations,

  getById: (id: string) =>
    reservations.find(r => r.id === id),

  getByRoomId: (roomId: string) =>
    reservations.filter(r => r.roomId === roomId),

  create: (reservation: Reservation) => {
    const now = new Date();

    if (reservation.startTime >= reservation.endTime) {
      throw new Error("End time must be after start time");
    }

    if (reservation.startTime < now) {
      throw new Error("Cannot create reservation in the past");
    }

    if (
      isOverlapping(
        reservation.roomId,
        reservation.startTime,
        reservation.endTime
      )
    ) {
      throw new Error("Room already reserved for that time");
    }

    reservations.push(reservation);
    return reservation;
  },


  cancel: (reservationId: string, userId: string) => {
    const index = reservations.findIndex(r => r.id === reservationId);

    if (index === -1) {
      throw new Error("Reservation not found");
    }

    if (reservations[index].userId !== userId) {
      throw new Error("User not allowed to cancel this reservation");
    }

    reservations.splice(index, 1);
  }
};