import { Reservation, ErrorResponse } from "../models/types.js";
import { v4 as uuid } from 'uuid';
import { validateDate, isOverlapping } from "../utils.js";
import { reservations } from "../database/data.js";

export const ReservationService = {
  getAll: () => reservations,

  getById: (id: string) =>
    reservations.find(reservation => reservation.id === id),

  getByRoomId: (roomId: string) =>
    reservations.filter(reservation => reservation.roomId === roomId),

  getByUserId: (userId: string) =>
    reservations.filter(reservation => reservation.createdById === userId),

  getByDateTimeRange: (startTime?: string, endTime?: string) => {
    const start = startTime && validateDate(startTime);
    const end = endTime && validateDate(endTime);

    if (start && end && start < end) {
      return reservations.filter((reservation) => new Date(reservation.startTime) >= start && new Date(reservation.endTime) <= end);
    } else if (start) {
      return reservations.filter((reservation) => new Date(reservation.startTime) >= start)
    } else if (end) {
      return reservations.filter((reservation) => new Date(reservation.endTime) <= end)
    }
    return [];
  },

  /**
   * Create a new reservation
   * Handle overlapping with other resvervations
   */
  create: (createdById: string, roomId: string, startTime: string, endTime: string, title?: string) => {
    const newStartTime = validateDate(startTime);
    const newEndTime = validateDate(endTime);
    const now = new Date();

    if (!newEndTime || !newStartTime || newStartTime >= newEndTime) {
      const error: ErrorResponse = new Error("Invalid time range");
      error.status = 400;
      throw error;
    }

    if (newStartTime < now) {
      const error: ErrorResponse = new Error("Cannot create reservation in the past");
      error.status = 400;
      throw error;
    }

    const overlap: boolean = reservations.some((reservation) => {
      if (roomId === reservation.roomId) {
        return isOverlapping(newStartTime, newEndTime, new Date(reservation.startTime), new Date(reservation.endTime));
      };
    });

    if (overlap) {
      const error: ErrorResponse = new Error("Room already reserved for that time");
      error.status = 409;
      throw error;
    }

    const newReservation: Reservation = {
      id: uuid(),
      createdById,
      roomId,
      startTime: newStartTime.toISOString(),
      endTime: newEndTime.toISOString(),
      title,
      createdAt: now.toISOString(),
      lastUpdatedAt: now.toISOString()
    }
    reservations.push(newReservation);
    return newReservation;
  },

  /**
   * Modify existing reservation
   * Handle overlapping with other resvervations
   * Only change given request parameters in the request
   */
  modifyReservation: (reservationId: string, userId: string, roomId?: string, startTime?: string, endTime?: string, title?: string) => {
    const matchingReservation = reservations.find((reservation) => reservation.id === reservationId);
    const now = new Date();

    if (!matchingReservation) {
      const error: ErrorResponse = new Error("Reservation not found");
      error.status = 404;
      throw error;
    };

    if (matchingReservation.createdById !== userId) {
      const error: ErrorResponse = new Error("User not allowed to cancel this reservation");
      error.status = 403;
      throw error;
    };

    if (new Date(matchingReservation.startTime) < now) {
      const error: ErrorResponse = new Error("Cannot modify past reservations");
      error.status = 400;
      throw error;
    }

    const modifiedStart = startTime && validateDate(startTime) || new Date(matchingReservation.startTime);
    const modifiedEnd = endTime && validateDate(endTime) || new Date(matchingReservation.endTime);

    if ((startTime && !validateDate(startTime)) || (endTime && !validateDate(endTime)) || modifiedStart > modifiedEnd) {
      throw new Error("Invalid date parameters");
    };

    if (modifiedStart < now) {
      const error: ErrorResponse = new Error("Cannot modify reservation to start in the past");
      error.status = 400;
      throw error;
    }

    const overlap: boolean = reservations.some((reservation) => {
      if ((roomId || matchingReservation.roomId) === reservation.roomId) {
        return isOverlapping(modifiedStart, modifiedEnd, new Date(reservation.startTime), new Date(reservation.endTime));
      };
    });

    if (overlap) {
      const error: ErrorResponse = new Error("Room is already reserved for that time");
      error.status = 409;
      throw error;
    }

    const modifiedReservation: Reservation = {
        ...matchingReservation,
        roomId: roomId || matchingReservation.roomId,
        startTime: modifiedStart.toISOString(),
        endTime: modifiedEnd.toISOString(),
        title: title || matchingReservation.title,
        lastUpdatedAt: now.toISOString()
      };

    const index = reservations.findIndex(reservation => reservation.id === reservationId);
    reservations.splice(index, 1, modifiedReservation);
    return modifiedReservation;
  },

  cancel: (reservationId: string, userId: string) => {
    const index = reservations.findIndex(reservation => reservation.id === reservationId);

    if (index === -1) {
      const error: ErrorResponse = new Error("Reservation not found");
      error.status = 404;
      throw error;
    } else if (reservations[index].createdById !== userId) {
      const error: ErrorResponse = new Error("User not allowed to cancel this reservation");
      error.status = 403;
      throw error;
    } else {
      reservations.splice(index, 1);
    }
  }
};