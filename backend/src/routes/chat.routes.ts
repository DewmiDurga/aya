import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import { validateBody } from "../middleware/validateRequest";
import { SendChatMessageSchema } from "../validators/chat.validator";
import { handleChatMessage } from "../controllers/chat.controller";

export const chatRouter = Router();

chatRouter.use(requireAuth);
chatRouter.post("/", validateBody(SendChatMessageSchema), handleChatMessage);
