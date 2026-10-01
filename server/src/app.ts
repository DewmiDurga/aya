import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";

import profileRoutes from "./routes/profile.routes";
import periodsRoutes from "./routes/periods.routes";
import logsRoutes from "./routes/logs.routes";
import predictionsRoutes from "./routes/predictions.routes";
import chatRoutes from "./routes/chat.routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/profile", profileRoutes);
  app.use("/api/periods", periodsRoutes);
  app.use("/api/logs", logsRoutes);
  app.use("/api/predictions", predictionsRoutes);
  app.use("/api/chat", chatRoutes);

  app.use(errorHandler);

  return app;
}
