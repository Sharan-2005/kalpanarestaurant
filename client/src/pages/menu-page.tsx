import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FoodItem } from '@shared/schema';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import MenuSection from '@/components/menu/menu-section';

const MenuPage = () => {
  const [location] = useLocation();
  const [category, setCategory] = useState<string>('all');

  // Check if there's a category in the URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Menu Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Explore our wide range of vegetarian delicacies from South Indian, Punjabi, and Chinese cuisines.
          </p>
        </div>
      </div>
      
      {/* Menu Content */}
      <MenuSection category={category} />
    </motion.div>
  );
};

export default MenuPage;
