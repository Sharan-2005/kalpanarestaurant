import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FoodItem } from '@shared/schema';
import FoodItemCard from '@/components/ui/food-item-card';
import { Button } from '@/components/ui/button';
import { ArrowDown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

type MenuSectionProps = {
  category?: string;
};

const MenuSection: React.FC<MenuSectionProps> = ({ category }) => {
  const [activeCategory, setActiveCategory] = useState<string>(category || 'all');
  const [visibleItems, setVisibleItems] = useState<number>(6);
  
  const { data: foodItems, isLoading } = useQuery<FoodItem[]>({
    queryKey: ['/api/foods'],
    queryFn: async () => {
      const res = await fetch('/api/foods');
      if (!res.ok) throw new Error('Failed to fetch food items');
      return res.json();
    }
  });
  
  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? foodItems 
    : foodItems?.filter(item => item.category === activeCategory);
  
  const displayedItems = filteredItems?.slice(0, visibleItems);
  const hasMoreItems = filteredItems && visibleItems < filteredItems.length;
  
  const loadMore = () => {
    setVisibleItems(prev => prev + 6);
  };
  
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'south-indian', label: 'South Indian' },
    { id: 'punjabi', label: 'Punjabi' },
    { id: 'chinese', label: 'Chinese' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Menu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of vegetarian delicacies prepared with love and tradition.
          </p>
        </div>
        
        {/* Menu Tabs */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                className={`px-6 py-2 rounded-full ${
                  activeCategory === cat.id 
                    ? 'bg-primary text-white' 
                    : 'bg-white hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Menu Items Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              {displayedItems?.map(item => (
                <FoodItemCard key={item.id} food={item} />
              ))}
            </motion.div>
            
            {hasMoreItems && (
              <div className="text-center mt-12">
                <Button 
                  variant="outline"
                  className="border border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={loadMore}
                >
                  <span>Load More</span>
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
