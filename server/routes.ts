import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data on startup
  await storage.seedData();

  app.get(api.units.list.path, async (req, res) => {
    const units = await storage.getAllUnits();
    res.json(units);
  });

  app.get(api.units.get.path, async (req, res) => {
    const unit = await storage.getUnit(Number(req.params.id));
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    res.json(unit);
  });

  app.get(api.topics.get.path, async (req, res) => {
    const topic = await storage.getTopic(Number(req.params.id));
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  });

  return httpServer;
}
