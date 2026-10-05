import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import { getPredictions } from "../controllers/predictions.controller";

export const predictionsRouter = Router();

predictionsRouter.use(requireAuth);
predictionsRouter.get("/", getPredictions);
