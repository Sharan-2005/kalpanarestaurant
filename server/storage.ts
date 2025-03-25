import {
  users,
  type User,
  type InsertUser,
  foodItems,
  type FoodItem,
  type InsertFoodItem,
  orders,
  type Order,
  type InsertOrder,
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Food operations
  getAllFoodItems(): Promise<FoodItem[]>;
  getFoodItemsByCategory(category: string): Promise<FoodItem[]>;
  getFoodItem(id: number): Promise<FoodItem | undefined>;
  createFoodItem(foodItem: InsertFoodItem): Promise<FoodItem>;
  updateFoodItem(
    id: number,
    foodItem: Partial<InsertFoodItem>,
  ): Promise<FoodItem | undefined>;
  deleteFoodItem(id: number): Promise<boolean>;

  // Order operations
  getAllOrders(): Promise<Order[]>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private foodItems: Map<number, FoodItem>;
  private orders: Map<number, Order>;
  sessionStore: session.SessionStore;
  currentUserId: number;
  currentFoodItemId: number;
  currentOrderId: number;

  constructor() {
    this.users = new Map();
    this.foodItems = new Map();
    this.orders = new Map();
    this.currentUserId = 1;
    this.currentFoodItemId = 1;
    this.currentOrderId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });

    // Seed food items
    this.seedFoodItems();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Food operations
  async getAllFoodItems(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values());
  }

  async getFoodItemsByCategory(category: string): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values()).filter(
      (item) => item.category === category,
    );
  }

  async getFoodItem(id: number): Promise<FoodItem | undefined> {
    return this.foodItems.get(id);
  }

  async createFoodItem(insertFoodItem: InsertFoodItem): Promise<FoodItem> {
    const id = this.currentFoodItemId++;
    const foodItem: FoodItem = { ...insertFoodItem, id };
    this.foodItems.set(id, foodItem);
    return foodItem;
  }

  async updateFoodItem(
    id: number,
    foodItem: Partial<InsertFoodItem>,
  ): Promise<FoodItem | undefined> {
    const existingFoodItem = this.foodItems.get(id);
    if (!existingFoodItem) return undefined;

    const updatedFoodItem = { ...existingFoodItem, ...foodItem };
    this.foodItems.set(id, updatedFoodItem);
    return updatedFoodItem;
  }

  async deleteFoodItem(id: number): Promise<boolean> {
    return this.foodItems.delete(id);
  }

  // Order operations
  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = {
      ...insertOrder,
      id,
      orderDate: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(
    id: number,
    status: string,
  ): Promise<Order | undefined> {
    const existingOrder = this.orders.get(id);
    if (!existingOrder) return undefined;

    const updatedOrder = { ...existingOrder, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Seed food items for initial data
  private async seedFoodItems() {
    // South Indian Items
    await this.createFoodItem({
      name: "Masala Dosa",
      description:
        "Crispy rice crepe stuffed with spiced potato filling, served with sambar and chutney.",
      price: 120,
      imageUrl:
        "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "south-indian",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Idli Sambar",
      description:
        "Steamed rice cakes served with lentil soup and coconut chutney.",
      price: 80,
      imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
      category: "south-indian",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Uttapam",
      description: "Thick pancake topped with onions, tomatoes, and chilies.",
      price: 100,
      imageUrl: "https://images.unsplash.com/photo-1725483990257-59313381ad1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRvc2F8ZW58MHx8MHx8fDA%3D",
      category: "south-indian",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Vada",
      description:
        "Crispy fried doughnut shaped lentil fritters served with sambar and chutney.",
      price: 60,
      imageUrl: "https://media.istockphoto.com/id/1329053965/photo/vada-pav.webp?a=1&b=1&s=612x612&w=0&k=20&c=fc2fFQXYJeAlDPVOMMfp5PrzN34bR7lOlfwk4eM-U3E=",
      category: "south-indian",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Sambhar Rice",
      description:
        "Steamed rice mixed with lentil-based vegetable stew seasoned with spices.",
      price: 150,
      imageUrl: "https://media.istockphoto.com/id/1221366840/photo/bisibele-bath-hot-lentil-rice-dish.webp?a=1&b=1&s=612x612&w=0&k=20&c=H74qv4-l3t7N1VzKFxeD8oOrTq8lBdH_4O_guXi4rg0=",
      category: "south-indian",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Rava Upma",
      description: "Savory semolina porridge with vegetables and curry leaves.",
      price: 90,
      imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
      category: "south-indian",
      isAvailable: true,
      isVegetarian: true,
    });

    // Punjabi Items
    await this.createFoodItem({
      name: "Paneer Butter Masala",
      description:
        "Cottage cheese cubes in rich tomato and butter gravy with aromatic spices.",
      price: 180,
      imageUrl: "https://images.unsplash.com/photo-1708793873401-e8c6c153b76a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFuZWVyJTIwYnV0dGVyJTIwbWFzYWxhfGVufDB8fDB8fHww",
      category: "punjabi",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Chole Bhature",
      description:
        "Spicy chickpea curry served with fried bread, onions and pickle.",
      price: 150,
      imageUrl: "https://media.istockphoto.com/id/1290033452/photo/fried-puri-and-chole-ki-sabzi-famous-indian-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=RcLFZS8UOJjOM9VF0piRfS2_UgiwX1hbhReg7qPtl58=",
      category: "punjabi",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Dal Makhani",
      description: "Creamy black lentils slow-cooked with butter and cream.",
      price: 160,
      imageUrl: "https://media.istockphoto.com/id/1793736673/photo/dal-makhani-with-lacha-paratha-in-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=oXqeA4kV__WQygre-8tP6FD8qy5cpqBIx_rxgZSYhfs=",
      category: "punjabi",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Aloo Paratha",
      description: "Whole wheat flatbread stuffed with spiced mashed potatoes.",
      price: 110,
      imageUrl: "https://media.istockphoto.com/id/1279134709/photo/image-of-metal-tray-with-aloo-paratha-pile-topped-with-red-onion-rings-and-sprinkle-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=BqI3olbZz2Ljg3LaEiLWYq2vQ8wfORCYdPrwKmJ2WbU=",
      category: "punjabi",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Rajma Chawal",
      description: "Red kidney bean curry served with steamed rice.",
      price: 140,
      imageUrl: "https://media.istockphoto.com/id/1432801316/photo/rajma-chawal-is-a-popular-north-indian-food-rajma-is-a-socked-red-kidney-beans-cooked-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=CgFWWryTgDWfkQVNVRVNGljBShbur57KMD1buuiC4Rg=",
      category: "punjabi",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Punjabi Kadhi Pakora",
      description: "Yogurt curry with gram flour fritters, served with rice.",
      price: 130,
      imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      category: "punjabi",
      isAvailable: true,
      isVegetarian: true,
    });

    // Chinese Items
    await this.createFoodItem({
      name: "Veg Hakka Noodles",
      description:
        "Stir-fried noodles with mixed vegetables and aromatic Indo-Chinese sauces.",
      price: 140,
      imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
      category: "chinese",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Veg Manchurian",
      description:
        "Vegetable dumplings tossed in a spicy, sweet and tangy sauce.",
      price: 160,
      imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f",
      category: "chinese",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Veg Spring Rolls",
      description:
        "Crispy rolls filled with shredded vegetables and served with dipping sauce.",
      price: 120,
      imageUrl: "https://media.istockphoto.com/id/497480338/photo/chinese-spring-rolls-with-vegetable.webp?a=1&b=1&s=612x612&w=0&k=20&c=OOPfuP8GryJJ4PGI2AlqdaXKIFaxo7M0-oFd4eIcuRs=",
      category: "chinese",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Veg Fried Rice",
      description:
        "Stir-fried rice with mixed vegetables, soy sauce, and aromatic spices.",
      price: 130,
      imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
      category: "chinese",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Chilli Paneer",
      description:
        "Cottage cheese cubes tossed with bell peppers in spicy sauce.",
      price: 170,
      imageUrl: "https://media.istockphoto.com/id/1325272041/photo/green-peas-or-matar-paneer-curry.webp?a=1&b=1&s=612x612&w=0&k=20&c=7PK66_rtELkYCBtrkBXtTLAp85zSlPQnibh01NNXYE4=",
      category: "chinese",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Sweet Corn Soup",
      description: "Creamy vegetable soup with sweet corn kernels.",
      price: 90,
      imageUrl: "https://media.istockphoto.com/id/494154858/photo/hot-homemade-corn-chowder.webp?a=1&b=1&s=612x612&w=0&k=20&c=yna2jxOhiMs5VP-Ko-gp1tAG90O3ubCjRGKmTYKnx7w=",
      category: "chinese",
      isAvailable: true,
      isVegetarian: true,
    });
  }
}

export const storage = new MemStorage();