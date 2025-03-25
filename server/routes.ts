import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import * as FoodController from "./controllers/food-controller";
import * as OrderController from "./controllers/order-controller";

export async function registerRoutes(app: Express): Promise<Server> {
  // set up authentication routes
  setupAuth(app);

  // Food API routes
  app.get("/api/foods", FoodController.getAllFoodItems);
  app.get("/api/foods/category/:category", FoodController.getFoodItemsByCategory);
  app.get("/api/foods/:id", FoodController.getFoodItemById);
  app.post("/api/foods", FoodController.createFoodItem);
  app.put("/api/foods/:id", FoodController.updateFoodItem);
  app.delete("/api/foods/:id", FoodController.deleteFoodItem);

  // Order API routes
  app.get("/api/orders", OrderController.getAllOrders);
  app.get("/api/orders/user", OrderController.getUserOrders);
  app.get("/api/orders/:id", OrderController.getOrderById);
  app.post("/api/orders", OrderController.createOrder);
  app.patch("/api/orders/:id/status", OrderController.updateOrderStatus);

  const httpServer = createServer(app);

  return httpServer;
}
