import express from "express"
import { protect } from "../../../middleware/auth.middleware.js"
import { getMessagesByRoomId } from "../../../controllers/chat/chat.controller.js"

const router = express.Router()

router.use(protect)

router.get("/:roomId", getMessagesByRoomId)

export default router