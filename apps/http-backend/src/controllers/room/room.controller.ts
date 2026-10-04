import { createRoomSchema } from "@repo/common/types"
import { prisma } from "@repo/db/client"
import {Request, Response} from "express"

export const createRoom = async (req: Request, res: Response) =>{
    try {
        const parsedData = createRoomSchema.safeParse(req.body)

        if(!parsedData.success){
            return res.status(400).json({
                success: false,
                message: parsedData.error.flatten()
            })
        }

        const roomExists = await prisma.room.findFirst({
            where: {
                slug: parsedData.data.name,
            }
        })

        if(roomExists){
            return res.status(409).json({
                success: false,
                message: "Room Already exist with this name please choose other name."
            })
        }

        const userId = req.user?.id

        if(!userId){
            return res.status(404).json("Invalid User id")
        }

        const room = await prisma.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        return res.status(201).json({
            success: true,
            message: "Room created successfully",
            data: {
                roomId: room.id
            }
        })
    } catch (error) {
        console.log("Error in createRoom controller", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getUserRooms = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const rooms = await prisma.room.findMany({
            where: {
                adminId: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json({
            success: true,
            data: {
                rooms,
            },
        });
    } catch (error) {
        console.log("Error in getUserRooms controller", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const roomDetailsBySlug = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug as string;

        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid slug or room ID",
            });
        }

        const numericId = Number(slug);
        const room = await prisma.room.findFirst({
            where: !isNaN(numericId)
                ? {
                    OR: [
                        { id: numericId },
                        { slug },
                    ],
                }
                : {
                    slug,
                },
        });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Room fetched successfully",
            data: {
                room,
            },
        });
    } catch (error) {
        console.log("Error in roomDetailsBySlug controller", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};