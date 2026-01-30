import { Router } from "express";
import { RoomController } from "../controllers/roomController.js";

const router = Router();

router.get("/", RoomController.getAll);
router.get("/:id", RoomController.getById);
router.post("/", RoomController.create);
router.get("/:id/reservations", RoomController.getReservations);

export default router;