import { WebSocketServer, WebSocket } from "ws"
import jwt from "jsonwebtoken"
import { prisma } from "@repo/db/client"

const PORT = Number(process.env.PORT) || 8080;
const wss = new WebSocketServer({ port: PORT });
console.log(`WebSocket server running on port ${PORT}`);

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string,
}

const users: User[] = [];

const checkUser = async (token: string): Promise<string | null> => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)

        if (typeof decoded === "string") {
            return null
        }

        if (!decoded || !decoded.userId) {
            return null
        }

        return decoded.userId
    } catch (error) {
        return null
    }
}

wss.on("connection", async (ws, request) => {

    const url = request.url

    const queryParams = new URLSearchParams(url?.split("?")[1])
    const token = queryParams.get("token") || ""
    const userId = await checkUser(token)

    if (userId === null) {
        ws.close()
        return null
    }

    users.push({
        userId,
        rooms: [],
        ws,
    })

    ws.on("message", async (data) => {
        const parsedData = JSON.parse(data as unknown as string)

        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId)
        }

        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws)
            if (!user) {
                return
            }
            user.rooms = user.rooms.filter(x => x !== parsedData.roomId);
        }

        console.log("message received")
        console.log(parsedData)

        if (parsedData.type == "chat") {
            const roomId = parsedData.roomId
            const message = parsedData.message
            console.log("--------", message)

            await prisma.chat.create({
                data: {
                    roomId: Number(roomId),
                    message,
                    userId,
                }
            })

            console.log("db success")

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                    }))
                }
            })
        }
    })
})