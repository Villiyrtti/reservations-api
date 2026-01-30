import { User } from "../models/types.js";
import { v4 as uuid } from 'uuid';

const users: User[] = [
  { id: "u1", name: "Alice" },
  { id: "u2", name: "Bob" }
];

export const UserService = {
  getAll: () => users,

  getById: (id: string) => users.find(u => u.id === id),

  create: (name: string) => {
    const newUser: User = {
      id: uuid(),
      name
    }
    users.push(newUser);
    return newUser;
  }
};