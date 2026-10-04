import { prisma } from "@repo/db/client";
import { Request, Response } from "express";

export const getMessagesByRoomId = async (req: Request, res: Response) => {
    try {
        const param = req.params.roomId as string;
        let roomId = Number(param);

        if (isNaN(roomId)) {
            const room = await prisma.room.findFirst({
                where: { slug: param },
            });
            if (!room) {
                return res.status(404).json({
                    success: false,
                    message: "Room not found",
                    data: {
                        messages: [],
                    },
                });
            }
            roomId = room.id;
        }

        const messages = await prisma.chat.findMany({
            where: {
                roomId,
            },
            orderBy: {
                id: "desc",
            },
            take: 1000,
        });

        res.status(200).json({
            success: true,
            message: "Chats fetched successfully",
            data: {
                messages,
            },
        });
    } catch (error) {
        console.log("Error in getMessagesByRoomId controller", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: {
                messages: [],
            },
        });
    }
};