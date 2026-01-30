import { Request, Response } from "express";
import { UserService } from "../services/userService.js";
import { ByIdRequest } from "../models/types.js";

export const UserController = {
  getAll: (_: Request, res: Response) => {
    res.json(UserService.getAll());
  },

  getById: (req: ByIdRequest, res: Response) => {
    const user = UserService.getById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  },

  create: (req: Request, res: Response) => {
    const user = UserService.create(req.body);
    res.status(201).json(user);
  }
};