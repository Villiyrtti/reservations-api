import express from "express";
import userRoutes from "./routes/userRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/reservations", reservationRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});