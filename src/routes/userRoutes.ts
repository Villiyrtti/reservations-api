import { Router } from "express";
import { UserController } from "../controllers/userController.js";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", UserController.create);
router.get("/:id/reservations", UserController.getUserReservations);

export default router;