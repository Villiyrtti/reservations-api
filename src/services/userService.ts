import { User } from "../models/types.js";

const users: User[] = [
  { id: "u1", name: "Alice" },
  { id: "u2", name: "Bob" }
];

export const UserService = {
  getAll: () => users,

  getById: (id: string) => users.find(u => u.id === id),

  create: (user: User) => {
    users.push(user);
    return user;
  }
};