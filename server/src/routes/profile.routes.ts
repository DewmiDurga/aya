import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateBody } from "../middleware/validateRequest";
import { updateProfileSchema } from "../validators/profile.validator";
import { getProfile, updateProfile } from "../controllers/profile.controller";

const router = Router();

router.use(authMiddleware);
router.get("/", getProfile);
router.patch("/", validateBody(updateProfileSchema), updateProfile);

export default router;
