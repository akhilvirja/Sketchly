import { prisma } from "@repo/db/client"
import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

interface JwtPayloadWithUserId extends JwtPayload {
  userId: string
}

export const protect = async (req : Request, res: Response, next: NextFunction) =>{
    try {
        const authHeader = req.headers["authorization"] || ""
        
        const token = authHeader.split(" ")[1]

        if(!token){
            return res.status(401).json({
                success: false,
                message: "token is required"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

        const user = await prisma.user.findFirst({
            where: {
                id: decoded.userId
            }
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not found"
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.log("Error in protect controller", error)
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}