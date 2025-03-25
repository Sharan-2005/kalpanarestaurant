import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FoodItem } from '@shared/schema';
import FoodItemCard from '@/components/ui/food-item-card';
import { Button } from '@/components/ui/button';
import { ArrowDown, Loader2, Utensils, ChefHat, Coffee } from 'lucide-react';
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
    { id: 'all', label: 'All', icon: <Utensils className="h-4 w-4 mr-2" /> },
    { id: 'south-indian', label: 'South Indian', icon: <Coffee className="h-4 w-4 mr-2" /> },
    { id: 'punjabi', label: 'Punjabi', icon: <ChefHat className="h-4 w-4 mr-2" /> },
    { id: 'chinese', label: 'Chinese', icon: <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg> }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-kalpana-yellow"></div>
            <h5 className="mx-4 text-kalpana-yellow font-semibold tracking-widest uppercase text-sm">Explore Our Menu</h5>
            <div className="h-px w-12 bg-kalpana-yellow"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Delicious <span className="text-kalpana-yellow">Vegetarian</span> Options</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our wide range of vegetarian delicacies from South Indian, Punjabi, and Chinese cuisine, prepared with love and tradition.
          </p>
        </motion.div>
        
        {/* Menu Tabs */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Button
                  variant={activeCategory === cat.id ? 'default' : 'outline'}
                  className={`btn-hover-lift px-6 py-2 rounded-full flex items-center ${
                    activeCategory === cat.id 
                      ? 'bg-kalpana-yellow text-kalpana-black font-semibold' 
                      : 'bg-transparent border-kalpana-yellow/50 text-kalpana-yellow hover:bg-kalpana-yellow/10'
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.icon}
                  {cat.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Menu Items Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-kalpana-yellow" />
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {displayedItems?.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <FoodItemCard food={item} />
                </motion.div>
              ))}
            </motion.div>
            
            {hasMoreItems && (
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button 
                  variant="outline"
                  className="border border-kalpana-yellow text-kalpana-yellow hover:bg-kalpana-yellow hover:text-kalpana-black"
                  onClick={loadMore}
                >
                  <span>Load More</span>
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
