import { Router } from "express";
import { ReservationController } from "../controllers/reservationController.js";

const router = Router();

router.get("/", ReservationController.getAll);
router.get("/:id", ReservationController.getById);
router.post("/", ReservationController.create);
router.delete("/:id", ReservationController.cancel);

export default router;