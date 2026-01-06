import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


app.get("/ping", (req, res) => {
  res.json({ status: "ok", message: "pong" });
});


app.listen(5001, () => {
  console.log("✅ Server running on http://localhost:5001");
});
