import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils, Leaf } from 'lucide-react';

const cuisineCategories = [
  {
    title: 'South Indian',
    description: 'Crispy dosas, fluffy idlis, and flavorful sambars prepared in authentic South Indian style.',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f24a1',
    link: '/menu?category=south-indian',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
    specialties: ['Masala Dosa', 'Idli Sambhar', 'Vada'],
  },
  {
    title: 'Punjabi',
    description: 'Rich curries, hearty dals, and freshly baked rotis that bring the taste of Punjab to your table.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    link: '/menu?category=punjabi',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><path d="M12 3v18" /><circle cx="12" cy="12" r="8" /></svg>,
    specialties: ['Paneer Butter Masala', 'Dal Makhani', 'Chole Bhature'],
  },
  {
    title: 'Chinese',
    description: 'Stir-fried vegetables, flavorful noodles, and Indo-Chinese specialties with a vegetarian twist.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d',
    link: '/menu?category=chinese',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><path d="M8 3v4h4l-6 6-6-6h4V3h4z" transform="translate(12, 9)" /></svg>,
    specialties: ['Veg Manchurian', 'Hakka Noodles', 'Chilli Paneer'],
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
    <section className="py-16 bg-gradient-to-b from-kalpana-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-kalpana-yellow"></div>
            <h5 className="mx-4 text-kalpana-yellow font-semibold tracking-widest uppercase text-sm">Pure Vegetarian</h5>
            <div className="h-px w-12 bg-kalpana-yellow"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Our <span className="text-kalpana-yellow">Specialties</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our handcrafted vegetarian dishes from three distinct culinary 
            traditions, prepared with fresh ingredients and authentic recipes.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {cuisineCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="cuisine-card rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-gray-800 hover:border-kalpana-yellow/50"
              variants={item}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center mb-2">
                    <div className="mr-3 text-kalpana-yellow">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-white">
                      <span className="text-kalpana-yellow">{category.title}</span>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">{category.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-kalpana-yellow font-semibold mb-2 text-sm uppercase tracking-wider">Signature Dishes</h4>
                  <ul className="space-y-2">
                    {category.specialties.map((specialty, i) => (
                      <li key={i} className="flex items-center text-gray-200">
                        <Leaf className="h-4 w-4 mr-2 text-kalpana-yellow" />
                        <span>{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href={category.link}
                  className="text-kalpana-yellow font-medium flex items-center hover:text-white transition-colors mt-4"
                >
                  <Utensils className="mr-2 h-4 w-4" />
                  <span>Explore Menu</span>
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
