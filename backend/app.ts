import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import authRoutes from "./routes/user.routes";
import noteRoutes from "./routes/note.routes";

dotenv.config();

const app = express();
app.use(cors()); 
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", authRoutes); 
app.use("/api", noteRoutes);

export default app;
