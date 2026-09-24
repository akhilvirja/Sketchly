import express from "express"
import { profile, signin, signup } from "../../../controllers/auth.controller.js"
import { protect } from "../../../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup", signup)

router.post("/signin", signin)

router.get("/me", protect, profile)

export default router