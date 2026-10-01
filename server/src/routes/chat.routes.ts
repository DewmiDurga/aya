import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateBody } from "../middleware/validateRequest";
import { chatMessageSchema } from "../validators/chat.validator";
import { sendChatMessage } from "../controllers/chat.controller";

const router = Router();

router.use(authMiddleware);
router.post("/", validateBody(chatMessageSchema), sendChatMessage);

export default router;
