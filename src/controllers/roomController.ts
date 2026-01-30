import { Request, Response } from "express";
import { RoomService } from "../services/roomService.js";
import { ReservationService } from "../services/reservationService.js";

export const RoomController = {
  getAll: (_: Request, res: Response) => {
    res.json(RoomService.getAll());
  },

  getById: (req: Request, res: Response) => {
    const room = RoomService.getById(req.params.id);
    if (!room) return res.status(404).send("Room not found");
    res.json(room);
  },

  create: (req: Request, res: Response) => {
    const room = RoomService.create(req.body);
    res.status(201).json(room);
  },

  getReservations: (req: Request, res: Response) => {
    res.json(
      ReservationService.getByRoomId(req.params.id)
    );
  }
};