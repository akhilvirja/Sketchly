import { email, z } from "zod"

export const signupSchema = z.object({
    email: z.email(),
    password: z.string(),
    name: z.string(),
})

export const signinSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export const createRoomSchema = z.object({
    name: z.string().min(3).max(20),
})