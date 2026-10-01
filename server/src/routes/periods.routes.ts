import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateBody } from "../middleware/validateRequest";
import { createPeriodLogSchema } from "../validators/periods.validator";
import { createPeriodLog, listPeriodLogs, deletePeriodLog } from "../controllers/periods.controller";

const router = Router();

router.use(authMiddleware);
router.get("/", listPeriodLogs);
router.post("/", validateBody(createPeriodLogSchema), createPeriodLog);
router.delete("/:id", deletePeriodLog);

export default router;
