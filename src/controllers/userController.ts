import { Request, Response } from "express";
import { UserService } from "../services/userService.js";
import { ReservationService } from "../services/reservationService.js";
import { ByIdRequest } from "../models/types.js";

type CreateRoomRequest = Request<any, any, { fullName: string, email: string }>;

export const UserController = {
  getAll: (_: Request, res: Response) => {
    res.json(UserService.getAll());
  },

  getById: (req: ByIdRequest, res: Response) => {
    const userId = req.params.id;
    const user = UserService.getById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    };
    res.json(user);
  },

  getUserReservations: (req: ByIdRequest, res: Response) => {
      const userId = req.params.id;
      res.json(ReservationService.getByUserId(userId));
  },

  create: (req: CreateRoomRequest, res: Response) => {
    const { fullName, email } = req.body;
    if(!fullName || !email) {
      return res.status(400).send("Missing fields");
    };

    if ([fullName, email].some((property: any) => typeof property !== 'string')) {
      return res.status(400).send("Invalid fullName or email");
    };

    const user = UserService.create(fullName, email);
    res.status(201).json(user);
  }
};