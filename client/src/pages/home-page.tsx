import HeroSection from '@/components/home/hero-section';
import FoodCategories from '@/components/home/food-categories';
import MenuSection from '@/components/menu/menu-section';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Star } from 'lucide-react';

const HomePage = () => {
  const { data: foodItems } = useQuery({
    queryKey: ['/api/foods'],
    queryFn: async () => {
      const res = await fetch('/api/foods');
      if (!res.ok) throw new Error('Failed to fetch food items');
      return res.json();
    }
  });
  
  // Get random food items for featured section
  const featuredItems = foodItems 
    ? [...foodItems].sort(() => 0.5 - Math.random()).slice(0, 3) 
    : [];
  
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Food Categories */}
      <FoodCategories />
      
      {/* Featured Items */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Dishes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our chef's special selection of signature dishes that you must try.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div 
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    <span className="text-sm font-bold">Featured</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">₹{item.price}</span>
                    <span className="text-sm text-gray-500 capitalize">{item.category.replace('-', ' ')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild>
              <Link href="/menu" className="flex items-center gap-2">
                View Full Menu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Read what our happy customers have to say about our food and service.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Amit Sharma",
                comment: "The South Indian cuisine here is exceptional! The dosas are crispy and the sambhar is flavorful. This is my go-to place for authentic vegetarian food.",
                avatar: "A"
              },
              {
                name: "Priya Patel",
                comment: "I'm in love with their Paneer Butter Masala. It's rich, creamy and has the perfect balance of spices. The service is prompt and the staff is friendly.",
                avatar: "P"
              },
              {
                name: "Rahul Verma",
                comment: "The best Indo-Chinese food in town! Their Veg Manchurian and Hakka Noodles combo is my favorite. Great ambiance and reasonable prices too.",
                avatar: "R"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                    <span className="font-bold text-lg">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Menu Preview */}
      <MenuSection />
    </div>
  );
};

export default HomePage;
