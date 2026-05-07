import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import documentRoutes from "./routes/documentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { initSocket } from "./sockets/socket.js";
import http from "http";

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

initSocket(server);

app.use(cors({
  origin: process.env.CLIENT_URL,
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/documents", documentRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});