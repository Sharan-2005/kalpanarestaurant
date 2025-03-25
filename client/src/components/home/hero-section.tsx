import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" 
          alt="Restaurant interior" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 text-white">
        <motion.div 
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Authentic Vegetarian Cuisine
          </motion.h1>
          
          <motion.p 
            className="text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Experience the rich flavors of South Indian, Punjabi and Chinese vegetarian 
            delicacies at Kalpana Restaurant.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full"
            >
              <Link href="/menu" className="flex items-center">
                <span>Explore Menu</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="bg-white hover:bg-white/90 text-gray-900 font-medium rounded-full"
            >
              <Link href="/reservation" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Book a Table</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
