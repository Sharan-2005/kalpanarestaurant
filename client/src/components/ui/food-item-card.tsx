import React from 'react';
import { FoodItem } from '@shared/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/cart-context';

type FoodItemCardProps = {
  food: FoodItem;
};

const FoodItemCard: React.FC<FoodItemCardProps> = ({ food }) => {
  const { addItem } = useCart();
  
  const categoryColors: Record<string, string> = {
    'south-indian': 'bg-green-100 text-green-800',
    'punjabi': 'bg-yellow-100 text-yellow-800',
    'chinese': 'bg-red-100 text-red-800'
  };
  
  const categoryLabel: Record<string, string> = {
    'south-indian': 'South Indian',
    'punjabi': 'Punjabi',
    'chinese': 'Chinese'
  };
  
  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col">
        <div className="relative">
          <img 
            src={food.imageUrl} 
            alt={food.name} 
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-xl mb-1">{food.name}</h3>
              <div className="flex items-center">
                <Badge variant="outline" className={categoryColors[food.category]}>
                  {categoryLabel[food.category]}
                </Badge>
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900">₹{food.price}</div>
          </div>
          <p className="text-gray-600 text-sm mb-4 flex-grow">{food.description}</p>
          <Button 
            className="w-full flex items-center justify-center gap-2 mt-2"
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
