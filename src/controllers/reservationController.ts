import { Request, Response } from "express";
import { UserService } from "../services/userService.js";
import { RoomService } from "../services/roomService.js";
import { ReservationService } from "../services/reservationService.js";
import { ByIdRequest, ErrorResponse } from "../models/types.js";

type CancelRequest = Request<{ id: string }, any, any, { userId: string }>
type CreateReservationRequest = Request<any, any, any, {
  userId: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
}>;

export const ReservationController = {
  getAll: (_: Request, res: Response) => {
    res.json(ReservationService.getAll());
  },

  getById: (req: ByIdRequest, res: Response) => {
    const reservation = ReservationService.getById(req.params.id);
    if (!reservation) return res.status(404).send("Reservation not found");
    res.json(reservation);
  },

  create: (req: CreateReservationRequest, res: Response) => {
    const { userId, roomId, startTime, endTime } = req.body;
    if (!userId || !roomId || !startTime || !endTime) {
      return res.status(400).send("Missing fields");
    };

    if (!UserService.getById(userId) || !RoomService.getById(roomId)) {
      return res.status(404).send("User or room not found");
    };

    try {
      const reservation = ReservationService.create(
        userId,
        roomId,
        startTime,
        endTime
      );
      res.status(201).json(reservation);
    } catch (error: ErrorResponse | any) {
      res.status(error.status? error.status : 400).send(error.message);
    }
  },

  cancel: (req: CancelRequest, res: Response) => {
    const reservationId = req.params.id;
    const userId = req.body.userId;

    try {
      ReservationService.cancel(
        reservationId,
        userId
      );
      res.status(204).send();
    } catch (error: ErrorResponse | any) {
      res.status(error.status? error.status : 400).send(error.message);
    }
  }
};