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
      imageUrl: "https://images.unsplash.com/photo-1626776876729-bab4123b5041",
      category: "south-indian",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Vada",
      description:
        "Crispy fried doughnut shaped lentil fritters served with sambar and chutney.",
      price: 60,
      imageUrl: "https://images.unsplash.com/photo-1630383349978-80908d30a7c7",
      category: "south-indian",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Sambhar Rice",
      description:
        "Steamed rice mixed with lentil-based vegetable stew seasoned with spices.",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4",
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
      imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      category: "punjabi",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Chole Bhature",
      description:
        "Spicy chickpea curry served with fried bread, onions and pickle.",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1613292443284-8d11db225c8f",
      category: "punjabi",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Dal Makhani",
      description: "Creamy black lentils slow-cooked with butter and cream.",
      price: 160,
      imageUrl: "https://images.unsplash.com/photo-1612524886259-1860da475a8d",
      category: "punjabi",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Aloo Paratha",
      description: "Whole wheat flatbread stuffed with spiced mashed potatoes.",
      price: 110,
      imageUrl: "https://images.unsplash.com/photo-1606491048802-8342506d6471",
      category: "punjabi",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Rajma Chawal",
      description: "Red kidney bean curry served with steamed rice.",
      price: 140,
      imageUrl: "https://images.unsplash.com/photo-1589059030096-8a175de84329",
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
      imageUrl: "https://images.unsplash.com/photo-1607434472257-d9f8e57a643d",
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
      imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a254b6128",
      category: "chinese",
      isAvailable: true,
      isVegetarian: true,
    });

    await this.createFoodItem({
      name: "Sweet Corn Soup",
      description: "Creamy vegetable soup with sweet corn kernels.",
      price: 90,
      imageUrl: "https://images.unsplash.com/photo-1487511657539-124a21eb458f",
      category: "chinese",
      isAvailable: true,
      isVegetarian: true,
    });
  }
}

export const storage = new MemStorage();
