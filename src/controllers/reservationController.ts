import { Request, Response } from "express";
import { ReservationService } from "../services/reservationService.js";
import { ByIdRequest } from "../models/types.js";

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
    try {
      const reservation = ReservationService.create(
        userId,
        roomId,
        new Date(startTime),
        new Date(endTime)
      );
      res.status(201).json(reservation);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },

  cancel: (req: CancelRequest, res: Response) => {
    try {
      ReservationService.cancel(
        req.params.id,
        req.body.userId
      );
      res.status(204).send();
    } catch (err: any) {
      res.status(403).send(err.message);
    }
  }
};