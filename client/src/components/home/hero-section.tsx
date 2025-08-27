import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Leaf, Utensils, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-kalpana-black overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-kalpana-black to-black">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <img 
          src="/Kalpana_indoor.jpg"
          alt="Kalpana Restaurant interior" 
          className="w-full h-full object-cover mix-blend-overlay opacity-60"
        />
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10 text-white">
        <motion.div 
          className="max-w-3xl mx-auto text-center md:text-left md:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center md:justify-start mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-kalpana-yellow p-3 rounded-full mr-3"
            >
              <Leaf className="h-6 w-6 text-kalpana-black" />
            </motion.div>
            <motion.span 
              className="text-kalpana-yellow font-semibold tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Pure Vegetarian Restaurant
            </motion.span>
          </div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-kalpana-yellow text-fade-in text-shimmer inline-block">KALPANA</span> <br className="md:hidden" />
            <span className="text-white text-fade-in inline-block" style={{ animationDelay: '0.4s' }}>RESTAURANT</span>
          </motion.h1>
          
          <motion.div 
            className="text-2xl font-light mb-8 flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
              <div className="h-px w-12 bg-kalpana-yellow"></div>
              <span className="text-kalpana-yellow uppercase tracking-widest text-sm font-semibold">Authentic Cuisine</span>
              <div className="h-px w-12 bg-kalpana-yellow"></div>
            </div>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
              Savor the authentic flavors of South Indian, Punjabi and Chinese vegetarian 
              delicacies prepared with passion and tradition at Kalpana Restaurant.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-kalpana-yellow hover:bg-kalpana-yellow/90 text-kalpana-black font-bold rounded-full"
            >
              <Link href="/menu" className="flex items-center">
                <Utensils className="mr-2 h-5 w-5" />
                <span>Explore Menu</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-kalpana-yellow text-kalpana-yellow hover:bg-kalpana-yellow/10 font-medium rounded-full"
            >
              <a 
                href="https://www.swiggy.com/city/mumbai/kalpana-restaurant-badlapur-road-kalpana-restaurant-rest804147?is_retargeting=true&media_source=GooglePlaceOrder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>Order on Swiggy</span>
              </a>
            </Button>
          </motion.div>
          
          <motion.div
            className="mt-12 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-black/50 backdrop-blur p-3 sm:p-4 rounded-lg border border-kalpana-yellow/20 text-center">
              <h3 className="text-kalpana-yellow font-bold text-sm sm:text-base mb-1">South Indian</h3>
              <p className="text-xs sm:text-sm text-gray-300">Crispy Dosas & Flavorful Sambhar</p>
            </div>
            <div className="bg-black/50 backdrop-blur p-3 sm:p-4 rounded-lg border border-kalpana-yellow/20 text-center">
              <h3 className="text-kalpana-yellow font-bold text-sm sm:text-base mb-1">Punjabi</h3>
              <p className="text-xs sm:text-sm text-gray-300">Rich Curries & Fresh Bread</p>
            </div>
            <div className="bg-black/50 backdrop-blur p-3 sm:p-4 rounded-lg border border-kalpana-yellow/20 text-center">
              <h3 className="text-kalpana-yellow font-bold text-sm sm:text-base mb-1">Chinese</h3>
              <p className="text-xs sm:text-sm text-gray-300">Spicy Noodles & Manchurian</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-kalpana-black to-transparent"></div>
    </section>
  );
};

export default HeroSection;
