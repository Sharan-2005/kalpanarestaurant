import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const cuisineCategories = [
  {
    title: 'South Indian',
    description: 'Crispy dosas, fluffy idlis, and flavorful sambars prepared in authentic South Indian style.',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f24a1',
    link: '/menu?category=south-indian'
  },
  {
    title: 'Punjabi',
    description: 'Rich curries, hearty dals, and freshly baked rotis that bring the taste of Punjab to your table.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    link: '/menu?category=punjabi'
  },
  {
    title: 'Chinese',
    description: 'Stir-fried vegetables, flavorful noodles, and Indo-Chinese specialties with a vegetarian twist.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d',
    link: '/menu?category=chinese'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const FoodCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Cuisine</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handcrafted vegetarian dishes from three distinct culinary 
            traditions, prepared with fresh ingredients and authentic recipes.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {cuisineCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Link 
                  href={category.link}
                  className="text-primary font-medium flex items-center hover:underline"
                >
                  <span>Explore Dishes</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FoodCategories;
