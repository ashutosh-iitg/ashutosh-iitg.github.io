import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  app.post("/api/messages", async (req, res) => {
    try {
      const data = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(data);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
