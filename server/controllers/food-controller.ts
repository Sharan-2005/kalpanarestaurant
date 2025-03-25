import { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import { insertFoodItemSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Get all food items
export const getAllFoodItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foods = await storage.getAllFoodItems();
    res.json(foods);
  } catch (error) {
    next(error);
  }
};

// Get food items by category
export const getFoodItemsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.params;
    const foods = await storage.getFoodItemsByCategory(category);
    res.json(foods);
  } catch (error) {
    next(error);
  }
};

// Get a single food item by ID
export const getFoodItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const food = await storage.getFoodItem(id);
    
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    
    res.json(food);
  } catch (error) {
    next(error);
  }
};

// Create a new food item (admin only)
export const createFoodItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }
    
    // Validate request body
    const result = insertFoodItemSchema.safeParse(req.body);
    
    if (!result.success) {
      const errorMessage = fromZodError(result.error).message;
      return res.status(400).json({ message: errorMessage });
    }
    
    const newFood = await storage.createFoodItem(result.data);
    res.status(201).json(newFood);
  } catch (error) {
    next(error);
  }
};

// Update a food item (admin only)
export const updateFoodItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }
    
    const id = parseInt(req.params.id);
    
    // Validate that the food item exists
    const existingFood = await storage.getFoodItem(id);
    if (!existingFood) {
      return res.status(404).json({ message: "Food item not found" });
    }
    
    // Update the food item
    const updatedFood = await storage.updateFoodItem(id, req.body);
    res.json(updatedFood);
  } catch (error) {
    next(error);
  }
};

// Delete a food item (admin only)
export const deleteFoodItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }
    
    const id = parseInt(req.params.id);
    
    // Validate that the food item exists
    const existingFood = await storage.getFoodItem(id);
    if (!existingFood) {
      return res.status(404).json({ message: "Food item not found" });
    }
    
    // Delete the food item
    await storage.deleteFoodItem(id);
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
