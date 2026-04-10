import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import employeesRouter from "./routes/employees.js";
import connectToDatabase from "./db/db.js";

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api/employees", employeesRouter);

// connect DB
connectToDatabase();

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});