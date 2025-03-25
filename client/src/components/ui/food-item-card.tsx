import React from 'react';
import { FoodItem } from '@shared/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Leaf, Timer, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/cart-context';

type FoodItemCardProps = {
  food: FoodItem;
};

const FoodItemCard: React.FC<FoodItemCardProps> = ({ food }) => {
  const { addItem } = useCart();
  
  const categoryInfo: Record<string, { icon: JSX.Element, color: string, label: string }> = {
    'south-indian': {
      icon: <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 14a4 4 0 110-8 4 4 0 010 8z"/></svg>,
      color: 'border-green-500 bg-green-500/10 text-green-500',
      label: 'South Indian'
    },
    'punjabi': {
      icon: <Flame className="h-4 w-4 mr-1" />,
      color: 'border-amber-500 bg-amber-500/10 text-amber-500',
      label: 'Punjabi'
    },
    'chinese': {
      icon: <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.822 14.973l1.834-1.8c.346-.34.922-.339 1.267.003l.066.069c.339.345.341.919-.003 1.263l-1.834 1.8a.894.894 0 01-1.267-.003l-.066-.069a.896.896 0 01.003-1.263zM12.2 11.4c.493.489 1.293.484 1.79-.01l2.669-2.667c.497-.495.5-1.295.007-1.788l-.069-.069a1.256 1.256 0 00-1.789.007l-2.669 2.667a1.269 1.269 0 00-.008 1.79l.069.07z"></path><path d="M5.033 23a.8.8 0 01-.533-1.4L19.033 7.467a.8.8 0 111.067 1.2L5.567 22.8a.8.8 0 01-.534.2z"></path><path d="M3.567 16.467a.8.8 0 01-.534-1.4l9.067-9.067a.8.8 0 111.067 1.2l-9.067 9.067a.8.8 0 01-.533.2zM12.033 8.8a.8.8 0 01-.533-1.4l2.266-2.267a.8.8 0 111.067 1.2L12.566 8.6a.8.8 0 01-.533.2z"></path></svg>,
      color: 'border-red-500 bg-red-500/10 text-red-500',
      label: 'Chinese'
    }
  };
  
  return (
    <motion.div 
      className="rounded-xl overflow-hidden transition-all duration-300"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
          <img 
            src={food.imageUrl} 
            alt={food.name} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 z-20">
            <Badge variant="outline" className={`${categoryInfo[food.category].color} border px-3 py-1 flex items-center`}>
              {categoryInfo[food.category].icon}
              {categoryInfo[food.category].label}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="font-bold text-xl text-white">{food.name}</h3>
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-gray-400 text-sm">
                <Timer className="h-4 w-4 mr-1 text-gray-500" />
                <span>20-30 min</span>
              </div>
              {food.isVegetarian && (
                <div className="flex items-center text-green-500 text-sm font-medium">
                  <Leaf className="h-4 w-4 mr-1" />
                  <span>Veg</span>
                </div>
              )}
            </div>
            <div className="text-xl font-bold text-kalpana-yellow">₹{food.price}</div>
          </div>
          <p className="text-gray-300 text-sm mb-4 flex-grow">{food.description}</p>
          <Button 
            className="w-full flex items-center justify-center gap-2 mt-2 bg-kalpana-yellow text-kalpana-black hover:bg-kalpana-yellow/90"
            onClick={() => addItem(food)}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodItemCard;
