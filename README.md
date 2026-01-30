# Meeting Room Reservation API

A simple RESTful API for managing meeting room reservations.

Built with **TypeScript**, **Express**, and **ES Modules**, using an **in-memory database** for simplicity and easy testing.

---

## 🚀 Features

- Create users, rooms, and reservations
- Prevent overlapping reservations in the same room
- Prevent reservations in the past
- Users can only cancel their own reservations
- Fetch reservations by room
- Clean architecture:
  - Routes
  - Controllers (request/response)
  - Services (business logic + data)

---

## 🧱 Tech Stack

- Node.js
- TypeScript
- Express
- ES Modules (ESM)
- In-memory data storage

---

## 📁 Project Structure

```

src/
├─ app.ts
├─ routes/
├─ controllers/
├─ services/
└─ models/

````

---

## 📦 Installation

```bash
npm install
````

---

## ▶️ Running the App

### Development mode (with hot reload)

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## 🏗 Build & Run (Production-like)

```bash
npm run build
npm start
```

---

## 🔗 API Endpoints

### Users

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/users`     | Get all users  |
| GET    | `/users/:id` | Get user by ID |
| POST   | `/users`     | Create user    |

---

### Rooms

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| GET    | `/rooms`                  | Get all rooms               |
| GET    | `/rooms/:id`              | Get room by ID              |
| POST   | `/rooms`                  | Create room                 |
| GET    | `/rooms/:id/reservations` | Get reservations for a room |

---

### Reservations

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/reservations`     | Get all reservations            |
| GET    | `/reservations/:id` | Get reservation by ID           |
| POST   | `/reservations`     | Create reservation              |
| DELETE | `/reservations/:id` | Cancel reservation (only owner) |

---

## 🧪 Seed Data

The application starts with predefined in-memory data for easier testing:

### Users

* `u1` – Alice
* `u2` – Bob

### Rooms

* `room1` – Conference Room A
* `room2` – Conference Room B

### Reservations

* Future-dated reservations (year 2026)
* No overlapping reservations

---

## 📝 Example Reservation Payload

```json
{
  "id": "res3",
  "userId": "u1",
  "roomId": "room1",
  "startTime": "2026-01-01T13:00:00Z",
  "endTime": "2026-01-01T14:00:00Z"
}
```

---

## ⚠️ Notes & Limitations

* Data is stored **in memory** — restarting the server resets everything
* No authentication middleware (userId is passed in request body)
* Designed for learning, testing, and demos

---

## 🔮 Possible Improvements

* Authentication & authorization
* Persistent database (PostgreSQL, MongoDB)
* Validation (Zod / Joi)
* UUID generation
* Unit & integration tests

---

## 📄 License

MIT