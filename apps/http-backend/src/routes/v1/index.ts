import express from "express"
import authRouter from "./auth/auth.routes.js"
import roomRouter from "./room/chats.routes.js"
import chatsRouter from "./room/chats.routes.js"

const router = express.Router()

router.use("/auth", authRouter)
router.use("/room", roomRouter)
router.use("/chats", chatsRouter)

export default router