import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";
import { periodsRouter } from "./routes/periods.routes";
import { logsRouter } from "./routes/logs.routes";
import { predictionsRouter } from "./routes/predictions.routes";
import { chatRouter } from "./routes/chat.routes";
import { profileRouter } from "./routes/profile.routes";

export const app = express();

app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Eya Backend API",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/periods", periodsRouter);
app.use("/api/logs", logsRouter);
app.use("/api/predictions", predictionsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/profile", profileRouter);

// Global Error Handler
app.use(errorHandler);
