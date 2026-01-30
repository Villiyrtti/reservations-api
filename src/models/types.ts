import { Request } from "express";

export type User = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  lastUpdatedAt: string;
}

export type Room = {
  id: string;
  name: string;
  createdAt: string;
  lastUpdatedAt: string;
}

export type Reservation = {
  id: string;
  createdById: string;
  roomId: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  lastUpdatedAt: string;
  title?: string;
}

export type ByIdRequest = Request<{ id: string }>;
export type ErrorResponse = {
  message: string;
  status?: number;
  details?: string;
};