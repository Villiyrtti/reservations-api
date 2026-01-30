import { Request, Response } from "express";
import { UserService } from "../services/userService.js";
import { ByIdRequest } from "../models/types.js";

type CreateRoomRequest = Request<any, any, { fullName: string, email: string }>;

export const UserController = {
  getAll: (_: Request, res: Response) => {
    res.json(UserService.getAll());
  },

  getById: (req: ByIdRequest, res: Response) => {
    const user = UserService.getById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  },

  create: (req: CreateRoomRequest, res: Response) => {
    const { fullName, email } = req.body;
    if(!fullName || !email) {
      return res.status(400).send("Missing fields");
    };

    const user = UserService.create(fullName, email);
    res.status(201).json(user);
  }
};