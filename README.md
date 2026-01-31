# Meeting Room Reservation API

A simple RESTful API for managing meeting room reservations.

Built with **TypeScript**, **Express**, and **ES Modules**, using an **in-memory database** for simplicity and easy testing.

#### Assignment requirements
* Create a API for handling meeting room reservations
* User can create reservations
* User can cancel reservation
* List reservations by room

* Reservations cannot overlap
* Reservations cannot be created to the past
* Starting time needs to be before ending time in the reservation

#### Additional functions added to the API
* Rooms and users can be created
* Rooms, users and reservations can be searched with ID
* User can modify their reservations
* List reservations by user
* Reservations can be filtered by starting time and ending time

* DateTimes is saved to API as a ISO string
* Canceling reservation is restricted to only its creator
* User, Room and Resrvation objects contain `lastUpdatedAt` property which is updated to present time when PATCH request is done succesfully (currently only implemented to reservations)
* Modified reservations cannot be moved to the past
* API will ignore unsupported fields with request calls
---

## Features

- Create users, rooms, and reservations
- Modify reservations starting and ending time, room location or reservation title
- Prevent overlapping reservations in the same room while creating new or modifying reservations
- Prevent creating or modifying reservations in the past
- Users can only cancel their own reservations
- Fetch reservations by roomID or by userID

---

## Tech Stack

- Node.js
- TypeScript
- Express
- ES Modules (ESM)
- In-memory data storage

---

## Installation

```bash
npm install
````

---

## Running the App

### Development mode (with hot reload)

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## Build & Run (Production-like)

```bash
npm run build
npm start
```

---

## Notes & Limitations

* Data is stored **in memory** — restarting the server resets everything
* Currently only deleting reservations is possible, for future development also adding deletion of users and rooms would be ideal. This could be implemented alongside with authorization (role based access - admin/user) and creating more restrictions who can delete or create new items
* Additionally modifying is only implemented for reservations
* No authentication middleware (userId is passed in request body)
* API will ignore unsupported fields

## API Endpoints

### Users

| Method | Endpoint                   | Description                  |
| ------ | -------------------------  | ---------------------------- |
| GET    | `/users`                   | Get all users                |
| GET    | `/users/:id`               | Get user by ID               |
| GET    | `/users/:id/reservations`  | Get reservations for a user  |
| POST   | `/users`                   | Create user                  |

---

### Rooms

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| GET    | `/rooms`                  | Get all rooms               |
| GET    | `/rooms/:id`              | Get room by ID              |
| GET    | `/rooms/:id/reservations` | Get reservations for a room |
| POST   | `/rooms`                  | Create room                 |

---

### Reservations

| Method | Endpoint                              | Description                                      |
| ------ | ------------------------------------- | ------------------------------------------------ |
| GET    | `/reservations`                       | Get all reservations                             |
| GET    | `/reservations?startTime=&endTime=`   | Filter all reservations with startDate/ endDate  |
| GET    | `/reservations/:id`                   | Get reservation by ID                            |
| POST   | `/reservations`                       | Create reservation                               |
| PATCH  | `/reservations/:id`                   | Modify reservation (only owner)                  |
| DELETE | `/reservations/:id`                   | Cancel reservation (only owner)                  |

---

## Object type structures

### Reservation

| Name          | Type    | Description                                    |
| -----------   | ------- | --------------------------------------------   |
| id            | string  | reservation ID                                 | 
| createdById   | string  | user ID who created reservation                |
| roomId        | string  | room ID                                        |
| startTime     | string  | UTC starting time of reservation               |
| endTime       | string  | UTC ending time of reservation                 |
| createdAt     | string  | UTC time of when reservation was created       |
| lastUpdatedAt | string  | UTC time of reservation last has been updated  |
| title         | string  | title of the reservation (optional)            |

---

### User

| Name          | Type    | Description                                    |
| -----------   | ------- | --------------------------------------------   |
| id            | string  | user ID                                        | 
| fullName      | string  | users name                                     |
| email         | string  | users email                                    |
| createdAt     | string  | UTC time of when reservation was created       |
| lastUpdatedAt | string  | UTC time of reservation last has been updated  |

---

### Room

| Name          | Type    | Description                                    |
| -----------   | ------- | --------------------------------------------   |
| id            | string  | room ID                                        | 
| name          | string  | rooms name                                     |
| createdAt     | string  | UTC time of when reservation was created       |
| lastUpdatedAt | string  | UTC time of reservation last has been updated  |

---

## Example Requests

### Get all reservations or with query parameters return a filtered list
`startTime` and `endTime` are optional query parameters

```json
GET /reservations?startTime=2026-01-31
[
    {
        "id": "res2",
        "createdById": "user2",
        "roomId": "room2",
        "startTime": "2026-02-03T13:00:00Z",
        "endTime": "2026-02-03T14:00:00Z",
        "createdAt": "2026-01-30T13:00:00Z",
        "lastUpdatedAt": "2026-01-30T13:00:00Z"
    }
]
```

### Create a new request
`createdById`, `roomId`, `startTime` and `endTime` are required in request body

```json
POST /reservations
{
    "createdById": "user1",
    "roomId": "room1",
    "startTime": "2026-02-04T09:00:00",
    "endTime": "2026-02-04T10:00:00",
    "title": "Sprint planning"
}

Response
{
    "id": "77a28ec8-06c6-4d08-8149-5ba910f651ce",
    "createdById": "user1",
    "roomId": "room1",
    "startTime": "2026-02-04T07:00:00.000Z",
    "endTime": "2026-02-04T08:00:00.000Z",
    "title": "Sprint planning",
    "createdAt": "2026-01-30T15:49:50.628Z",
    "lastUpdatedAt": "2026-01-30T15:49:50.628Z"
}
```

### Modify existing reservation
`userId` is required in request body

```json
PATCH /reservations/res2
{
    "userId": "user2",
    "startTime": "2026-01-31T10:00:00",
    "endTime": "2026-01-31T11:30:00",
    "title": "Morning meeting"
}

Response
{
    "id": "res2",
    "createdById": "user2",
    "roomId": "room2",
    "startTime": "2026-02-03T08:00:00.000Z",
    "endTime": "2026-02-03T09:30:00.000Z",
    "createdAt": "2026-01-30T13:00:00Z",
    "lastUpdatedAt": "2026-01-30T15:56:06.323Z",
    "title": "Morning meeting"
}
```

### Delete reservation (only creator can delete it)
`userId` is required in request body

```json
DELETE /reservations/res2
{
    "userId": "user2"
}
```

### Create new user
`fullName` and `email` are required in request body

```json
POST /users
{
    "fullName": "Tiina Lumi",
    "email": "tiina.lumi@mail.com"
}

Response
{
    "id": "189a6d9f-75f3-470d-ba50-d7f33b1de58f",
    "fullName": "Tiina Lumi",
    "email": "tiina.lumi@mail.com",
    "createdAt": "2026-01-30T16:03:40.925Z",
    "lastUpdatedAt": "2026-01-30T16:03:40.925Z"
}
```

### Create new room
`name` is required in request body

```json
POST /rooms
{
    "name": "Conference room"
}

Response
{
    "id": "761a682d-0eb9-4847-9211-37031f60e422",
    "name": "Conference room",
    "createdAt": "2026-01-30T18:06:17.921Z",
    "lastUpdatedAt": "2026-01-30T18:06:17.921Z"
}
```

## Example bad requests

### 400 Bad request
```json
POST /reservations
{
    "createdById": "user1",
    "roomId": "room1",
    "startTime": "2026-01-29T09:00:00",
    "endTime": "2026-01-29T10:00:00"
}

Message: Cannot create reservation in the past
```

### 403 Forbidden
```json
DELETE /reservations/res1
{
    "userId": "user2"
}

Message: User not allowed to cancel this reservation
```

### 404 Not found
```json
GET /reservations/res11

Message: Reservation not found
```

### 409 Conflict
```json
POST /reservations
{
    "createdById": "user1",
    "roomId": "room2",
    "startTime": "2026-02-03T15:30:00",
    "endTime": "2026-02-03T16:00:00"
}

Message: Room already reserved for that time
```

---

## License

MIT