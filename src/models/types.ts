import { Request } from "express";

export type User = {
  id: string;
  name: string;
}

export type Room = {
  id: string;
  name: string;
}

export type Reservation = {
  id: string;
  userId: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
}

export type ByIdRequest = Request<{ id: string }>;
export type ErrorResponse = {
  message: string;
  status?: number;
  details?: string;
};