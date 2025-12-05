import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Example routes with async/await and error handling

  app.get("/api/users", async (req, res, next) => {
    try {
      // For simplicity, return all users (in real app, paginate)
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/users/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/users", async (req, res, next) => {
    try {
      const insertUser = req.body;
      // Basic validation
      if (!insertUser.username) {
        return res.status(400).json({ message: "Username is required" });
      }
      const user = await storage.createUser(insertUser);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  });

  return httpServer;
}
