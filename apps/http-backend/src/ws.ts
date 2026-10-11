import http from "node:http";
import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/db/client";

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

const checkUser = async (token: string): Promise<string | null> => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (error) {
    return null;
  }
};

/**
 * Attaches the WebSocket server to the provided Node HTTP server instance.
 * Allows both HTTP REST endpoints and WebSocket connections to run on the exact same port.
 */
export function setupWebSocket(server: http.Server): WebSocketServer {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws, request) => {
    const url = request.url;
    const queryParams = new URLSearchParams(url?.split("?")[1]);
    const token = queryParams.get("token") || "";
    const userId = await checkUser(token);

    if (userId === null) {
      ws.close();
      return;
    }

    const currentUser: User = {
      userId,
      rooms: [],
      ws,
    };

    users.push(currentUser);

    ws.on("message", async (data) => {
      try {
        const parsedData = JSON.parse(data as unknown as string);

        if (parsedData.type === "join_room") {
          const user = users.find((x) => x.ws === ws);
          if (user && !user.rooms.includes(parsedData.roomId)) {
            user.rooms.push(parsedData.roomId);
          }
        }

        if (parsedData.type === "leave_room") {
          const user = users.find((x) => x.ws === ws);
          if (user) {
            user.rooms = user.rooms.filter((x) => x !== parsedData.roomId);
          }
        }

        if (parsedData.type === "chat") {
          const roomId = parsedData.roomId;
          const message = parsedData.message;

          await prisma.chat.create({
            data: {
              roomId: Number(roomId),
              message,
              userId,
            },
          });

          users.forEach((user) => {
            if (user.rooms.includes(roomId) && user.ws.readyState === WebSocket.OPEN) {
              user.ws.send(
                JSON.stringify({
                  type: "chat",
                  message: message,
                })
              );
            }
          });
        }
      } catch (err) {
        console.error("Error processing websocket message:", err);
      }
    });

    ws.on("close", () => {
      const index = users.findIndex((x) => x.ws === ws);
      if (index !== -1) {
        users.splice(index, 1);
      }
    });

    ws.on("error", (err) => {
      console.error("WebSocket client error:", err);
    });
  });

  console.log("WebSocket server attached to HTTP server");
  return wss;
}
