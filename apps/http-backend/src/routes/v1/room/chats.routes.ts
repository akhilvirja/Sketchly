import express from "express"
import { createRoom, roomDetailsBySlug } from "../../../controllers/room/room.controller.js"
import { protect } from "../../../middleware/auth.middleware.js"

const router = express.Router()

router.use(protect)

router.post("/", createRoom)
router.get("/:slug", roomDetailsBySlug)

export default router