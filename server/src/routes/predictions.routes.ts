import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getPrediction } from "../controllers/predictions.controller";

const router = Router();

router.use(authMiddleware);
router.get("/", getPrediction);

export default router;
