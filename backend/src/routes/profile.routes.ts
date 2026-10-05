import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import { validateBody } from "../middleware/validateRequest";
import { UpdateProfileSchema } from "../validators/profile.validator";
import { getProfile, updateProfile } from "../controllers/profile.controller";

export const profileRouter = Router();

profileRouter.use(requireAuth);
profileRouter.get("/", getProfile);
profileRouter.patch("/", validateBody(UpdateProfileSchema), updateProfile);
