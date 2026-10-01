import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateBody } from "../middleware/validateRequest";
import { createDailyLogSchema } from "../validators/logs.validator";
import { upsertDailyLog, listDailyLogs } from "../controllers/logs.controller";

const router = Router();

router.use(authMiddleware);
router.get("/", listDailyLogs);
router.post("/", validateBody(createDailyLogSchema), upsertDailyLog);

export default router;
