import { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import { insertOrderSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Get all orders (admin only)
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }
    
    const orders = await storage.getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Get orders for logged in user
export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const orders = await storage.getOrdersByUser(req.user.id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Get a single order by ID
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const id = parseInt(req.params.id);
    const order = await storage.getOrder(id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Only allow admins or the order owner to view the order
    if (!req.user.isAdmin && order.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: You don't have permission to view this order" });
    }
    
    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Create a new order
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    // Validate request body
    const result = insertOrderSchema.safeParse({
      ...req.body,
      userId: req.user.id, // Ensure the user ID is from the authenticated user
    });
    
    if (!result.success) {
      const errorMessage = fromZodError(result.error).message;
      return res.status(400).json({ message: errorMessage });
    }
    
    const newOrder = await storage.createOrder(result.data);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

// Update an order status (admin only)
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }
    
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status || !["pending", "confirmed", "delivered", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    
    // Validate that the order exists
    const existingOrder = await storage.getOrder(id);
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Update the order status
    const updatedOrder = await storage.updateOrderStatus(id, status);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
