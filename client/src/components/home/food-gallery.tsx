import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FoodItem } from '@shared/schema';

const FoodGallery = () => {
  const { data: foodItems } = useQuery<FoodItem[]>({
    queryKey: ['/api/foods'],
    queryFn: async () => {
      const res = await fetch('/api/foods');
      if (!res.ok) throw new Error('Failed to fetch food items');
      return res.json();
    }
  });
  
  // Get popular items (this would normally come from a dedicated API endpoint)
  const popularItems = foodItems 
    ? [...foodItems].sort(() => 0.5 - Math.random()).slice(0, 6) 
    : [];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-kalpana-black">
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
            <h5 className="mx-4 text-kalpana-yellow font-semibold tracking-widest uppercase text-sm">Food Gallery</h5>
            <div className="h-px w-12 bg-kalpana-yellow"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            <span className="text-highlight">Feast Your Eyes</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Take a visual journey through our mouthwatering dishes before you experience them in person.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {popularItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-lg aspect-square group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <h3 className="text-white font-bold text-xl mb-1">{item.name}</h3>
                <p className="text-kalpana-yellow font-semibold">₹{item.price}</p>
                <div className="flex items-center mt-2 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                  <span className="text-white text-xs ml-2">5.0</span>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-kalpana-yellow text-kalpana-black px-2 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotating-shine">
                Popular
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            asChild
            className="bg-kalpana-yellow text-kalpana-black hover:bg-kalpana-yellow/90 btn-hover-lift"
          >
            <Link href="/menu" className="flex items-center">
              Explore Full Menu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FoodGallery;