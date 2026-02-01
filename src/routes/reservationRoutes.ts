import { Router } from "express";
import { ReservationController } from "../controllers/reservationController.js";

const router = Router();

router.get("/", ReservationController.getAll);
router.get("/:id", ReservationController.getById);
router.post("/", ReservationController.createReservation);
router.patch("/:id", ReservationController.modifyReservation);
router.delete("/:id", ReservationController.cancelReservation);

export default router;