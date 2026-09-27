import { prisma } from "@repo/db/client";
import { Request, Response } from "express";

export const getMessagesByRoomId = async (req: Request, res: Response) => {
    try {
        const roomId = Number(req.params.roomId)

        const messages = await prisma.chat.findMany({
            where: {
                roomId,
            },
            orderBy: {
                id: "desc"
            },
            take: 1000,
        })

        res.status(200).json({
            success: true,
            message: "Chats fetched successfully",
            data: {
                messages
            }
        })
    } catch (error) {
        console.log("Error in getMessagesByRoomId controller", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}