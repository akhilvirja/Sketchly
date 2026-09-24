import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { signinSchema, signupSchema} from "@repo/common/types"
import { prisma } from "@repo/db/client"

export const signup = async (req: Request, res: Response) => {
    try {

        const parsedData = signupSchema.safeParse(req.body)

        if(!parsedData.success){
            return res.status(400).json({
                success: false,
                message: parsedData.error.flatten()
            })
        }

        const emailExists = await prisma.user.findFirst({
            where: {
                email: parsedData.data.email,
            }
        })

        if(emailExists){
            return res.status(400).json({
                success: false,
                message: "Email already exist"
            })
        }

        const nameExists = await prisma.user.findFirst({
            where: {
                name: parsedData.data.name
            }
        })

        if(nameExists){
            return res.status(400).json({
                success: false,
                message: "Name already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(parsedData.data.password, 7)

        const user = await prisma.user.create({
            data: {
                email: parsedData.data.email,
                password: hashedPassword,
                name: parsedData.data.name
            },
        })

        res.status(201).json({
            success: true,
            message: "User created Successfully",
            data: user,
        })
        
    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const parsedData = signinSchema.safeParse(req.body)

        if(!parsedData.success){
            return res.status(400).json({
                success: false,
                message: parsedData.error.flatten()
            })
        }

        const user = await prisma.user.findFirst({
            where: {
                email: parsedData.data.email
            }
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const matchPassword = await bcrypt.compare(parsedData.data.password, user.password)

        if(!matchPassword){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET!)

        res.status(200).json({
            success: true,
            message: "User Signed in Successfully",
            token,
        })

    } catch (error) {
        console.log("Error in signin controller", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const profile = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                id: req.user.id,
                email: req.user.email,
                name: req.user.name,
            }
        })
    } catch (error) {
        console.log("Error in profile controller", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}