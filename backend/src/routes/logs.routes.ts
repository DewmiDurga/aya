import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import { validateBody } from "../middleware/validateRequest";
import { UpsertDailyLogSchema } from "../validators/logs.validator";
import { listDailyLogs, upsertDailyLog } from "../controllers/logs.controller";

export const logsRouter = Router();

logsRouter.use(requireAuth);
logsRouter.get("/", listDailyLogs);
logsRouter.post("/", validateBody(UpsertDailyLogSchema), upsertDailyLog);
