import { Request, Response } from "express";
import { ReservationService } from "../services/reservationService.js";

export const ReservationController = {
  getAll: (_: Request, res: Response) => {
    res.json(ReservationService.getAll());
  },

  getById: (req: Request, res: Response) => {
    const reservation = ReservationService.getById(req.params.id);
    if (!reservation) return res.status(404).send("Reservation not found");
    res.json(reservation);
  },

  create: (req: Request, res: Response) => {
    try {
      const reservation = ReservationService.create({
        ...req.body,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime)
      });
      res.status(201).json(reservation);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },

  cancel: (req: Request, res: Response) => {
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