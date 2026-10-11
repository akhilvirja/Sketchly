import http from "node:http";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { setupWebSocket } from "./ws.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint (for keep-alive monitoring and cloud health checks)
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", routes);

const server = http.createServer(app);

// Attach WebSocket server on the same HTTP server & port
setupWebSocket(server);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server (HTTP + WebSocket) is Running on Port ${PORT}`);
});

export default app;