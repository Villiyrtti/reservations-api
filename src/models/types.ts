export interface User {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  name: string;
}

export interface Reservation {
  id: string;
  userId: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
}