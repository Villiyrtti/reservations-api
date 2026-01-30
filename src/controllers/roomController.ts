import { Request, Response } from "express";
import { RoomService } from "../services/roomService.js";
import { ReservationService } from "../services/reservationService.js";
import { ByIdRequest } from "../models/types.js";

type CreateRoomRequest = Request<any, any, any, { name: string }>;

export const RoomController = {
  getAll: (_: Request, res: Response) => {
    res.json(RoomService.getAll());
  },

  getById: (req: ByIdRequest, res: Response) => {
    const room = RoomService.getById(req.params.id);
    if (!room) return res.status(404).send("Room not found");
    res.json(room);
  },

  create: (req: CreateRoomRequest, res: Response) => {
    const { name } = req.body;
    if(!name) {
      return res.status(400).send("Missing fields");
    };

    const room = RoomService.create(name);
    res.status(201).json(room);
  },

  getReservations: (req: ByIdRequest, res: Response) => {
    const roomId = req.params.id;
    res.json(ReservationService.getByRoomId(roomId));
  }
};