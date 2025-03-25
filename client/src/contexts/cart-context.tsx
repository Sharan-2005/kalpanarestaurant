import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, FoodItem } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

// Type definitions
type CartAction = 
  | { type: 'ADD_ITEM', payload: FoodItem }
  | { type: 'REMOVE_ITEM', payload: { id: number } }
  | { type: 'UPDATE_QUANTITY', payload: { id: number, quantity: number } }
  | { type: 'CLEAR_CART' };

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
};

type CartContextType = {
  cartState: CartState;
  addItem: (item: FoodItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      
      // If item already exists, increase quantity
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1
        };
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + newItem.price
        };
      }
      
      // Otherwise add new item
      const cartItem: CartItem = {
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        quantity: 1,
        imageUrl: newItem.imageUrl,
        category: newItem.category
      };
      
      return {
        ...state,
        items: [...state.items, cartItem],
        totalItems: state.totalItems + 1,
        totalAmount: state.totalAmount + newItem.price
      };
    }
    
    case 'REMOVE_ITEM': {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (!existingItem) return state;
      
      const updatedItems = state.items.filter(item => item.id !== id);
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - existingItem.quantity,
        totalAmount: state.totalAmount - (existingItem.price * existingItem.quantity)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) return state;
      
      const existingItemIndex = state.items.findIndex(item => item.id === id);
      
      if (existingItemIndex === -1) return state;
      
      const existingItem = state.items[existingItemIndex];
      const quantityDifference = quantity - existingItem.quantity;
      
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity
      };
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDifference,
        totalAmount: state.totalAmount + (existingItem.price * quantityDifference)
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
}

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as CartState;
        // Dispatch each item individually to ensure correct state
        dispatch({ type: 'CLEAR_CART' });
        parsedCart.items.forEach(item => {
          dispatch({ 
            type: 'ADD_ITEM', 
            payload: {
              id: item.id,
              name: item.name,
              price: item.price,
              imageUrl: item.imageUrl,
              category: item.category,
              description: '',
              isAvailable: true,
              isVegetarian: true
            }
          });
          if (item.quantity > 1) {
            dispatch({ 
              type: 'UPDATE_QUANTITY', 
              payload: { id: item.id, quantity: item.quantity }
            });
          }
        });
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);
  
  // Cart actions
  const addItem = (item: FoodItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };
  
  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  
  return (
    <CartContext.Provider value={{
      cartState,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
