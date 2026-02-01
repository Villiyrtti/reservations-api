import { Request, Response } from "express";
import { UserService } from "../services/userService.js";
import { RoomService } from "../services/roomService.js";
import { ReservationService } from "../services/reservationService.js";
import { ByIdRequest, ErrorResponse, CreateReservation, ModifyReservation } from "../models/types.js";

type CancelRequest = Request<{ id: string }, any, any, { userId: string }>
type CreateReservationRequest = Request<any, any, CreateReservation>;
type ModifyReservationRequest = Request<{ id: string }, any, ModifyReservation>;

export const ReservationController = {
  getAll: (req: Request<any, any, any, { startTime?: string, endTime?: string }>, res: Response) => {
    const { startTime, endTime } = req.query;
    if (startTime || endTime) {
      try {
        const reservations = ReservationService.getByDateTimeRange(startTime, endTime);
        res.status(201).json(reservations);
      } catch (error: ErrorResponse | any) {
        res.status(error.status? error.status : 400).send(error.message);
      }
    } else {
      res.json(ReservationService.getAll());
    }
  },

  getById: (req: ByIdRequest, res: Response) => {
    const reservationId = req.params.id;
    const reservation = ReservationService.getById(reservationId);
    if (!reservation) {
      return res.status(404).send("Reservation not found");
    }
    res.json(reservation);
  },

  createReservation: (req: CreateReservationRequest, res: Response) => {
    const { userId, roomId, startTime, endTime, title } = req.body;
    if (!userId || !roomId || !startTime || !endTime) {
      return res.status(400).send("Missing fields");
    };

    if (!UserService.getById(userId) || !RoomService.getById(roomId)) {
      return res.status(404).send("User or room not found");
    };

    if (title && typeof title !== 'string') {
      return res.status(400).send("Invalid title");
    };

    try {
      const reservation = ReservationService.createReservation({
        userId,
        roomId,
        startTime,
        endTime,
        title
      });
      res.status(201).json(reservation);
    } catch (error: ErrorResponse | any) {
      res.status(error.status? error.status : 400).send(error.message);
    }
  },

  modifyReservation: (req: ModifyReservationRequest, res: Response) => {
    const reservationId = req.params.id;
    const { userId, roomId, startTime, endTime, title } = req.body;

    if (!userId) {
      return res.status(400).send("Missing userId field");
    }

    try {
      const modifiedReservation = ReservationService.modifyReservation({
        reservationId,
        userId,
        roomId,
        startTime,
        endTime,
        title
      });
      res.status(200).json(modifiedReservation);
    } catch (error: ErrorResponse | any) {
      res.status(error.status? error.status : 400).send(error.message);
    }
  },

  cancelReservation: (req: CancelRequest, res: Response) => {
    const reservationId = req.params.id;
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).send("Missing userId field");
    }
  
    try {
      ReservationService.cancelReservation(reservationId, userId);
      res.status(204).send();
    } catch (error: ErrorResponse | any) {
      res.status(error.status? error.status : 400).send(error.message);
    }
  }
};