import { User } from "../models/types.js";
import { v4 as uuid } from 'uuid';
import { users } from "../database/data.js";

export const UserService = {
  getAll: () => users,

  getById: (id: string) => users.find(user => user.id === id),

  create: (fullName: string, email: string) => {
    const now = new Date();
    const newUser: User = {
      id: uuid(),
      fullName,
      email,
      createdAt: now.toISOString(),
      lastUpdatedAt: now.toISOString()
    };
    users.push(newUser);
    return newUser;
  }
};