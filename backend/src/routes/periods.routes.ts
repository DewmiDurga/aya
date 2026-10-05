import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import { validateBody } from "../middleware/validateRequest";
import { CreatePeriodSchema } from "../validators/periods.validator";
import { listPeriods, createPeriod, deletePeriod } from "../controllers/periods.controller";

export const periodsRouter = Router();

periodsRouter.use(requireAuth);
periodsRouter.get("/", listPeriods);
periodsRouter.post("/", validateBody(CreatePeriodSchema), createPeriod);
periodsRouter.delete("/:id", deletePeriod);
