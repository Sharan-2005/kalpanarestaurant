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
      <section className="py-16 bg-kalpana-black relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-12 bg-kalpana-yellow"></div>
              <h5 className="mx-4 text-kalpana-yellow font-semibold tracking-widest uppercase text-sm">Testimonials</h5>
              <div className="h-px w-12 bg-kalpana-yellow"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">What Our <span className="text-kalpana-yellow">Customers</span> Say</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Read what our happy customers have to say about our food and service.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "SP Kumar",
                role: "Local Guide",
                comment: "It's Very famous Hangout Place, Pure Veg Restaurant, Good food, Nice Management and staff. it's lot of people's Memories Hiden Here, More Than 50 years History for Locals and Visitors. Still people love to come for re collect old Memories.",
                avatar: "S",
                ratings: {
                  food: 5,
                  service: 4,
                  atmosphere: 4
                }
              },
              {
                name: "Ravi Vishwakarma",
                role: "Local Guide",
                comment: "Highly recommend this vegetarian restaurant! The food is delicious, fresh, and flavorful, with a great variety of options to choose from. The best part is the reasonable pricing, making it an excellent value for money. Perfect spot for a satisfying meal!",
                avatar: "R",
                mealType: "Lunch",
                priceRange: "₹1–200",
                ratings: {
                  food: 5,
                  service: 4,
                  atmosphere: 4
                },
                recommendedDishes: ["Veg Thali", "Veg Kolhapuri", "Veg Pulay"]
              },
              {
                name: "Vijin Joseph",
                comment: "Very fabulous food, got some great service experience & very affordable for family as well as individuals.",
                avatar: "V",
                serviceType: "Dine in",
                ratings: {
                  food: 5,
                  service: 5,
                  atmosphere: 5
                },
                recommendedDishes: ["Veg Thali", "Masala Dosa"]
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="testimonial-card bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-kalpana-yellow/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start mb-6">
                  <div className="h-14 w-14 rounded-full bg-kalpana-yellow text-kalpana-black flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-bold text-xl">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    {testimonial.role && (
                      <div className="text-gray-400 text-sm mb-1">{testimonial.role}</div>
                    )}
                    <div className="flex text-kalpana-yellow mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    {testimonial.mealType && (
                      <div className="text-xs text-gray-400 mb-1">
                        <span className="text-kalpana-yellow font-medium">Meal type: </span> 
                        {testimonial.mealType}
                        {testimonial.priceRange && (
                          <span className="ml-2">• <span className="text-kalpana-yellow font-medium">Price: </span>{testimonial.priceRange}</span>
                        )}
                      </div>
                    )}
                    {testimonial.serviceType && (
                      <div className="text-xs text-gray-400 mb-1">
                        <span className="text-kalpana-yellow font-medium">Service: </span>{testimonial.serviceType}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <svg className="absolute text-kalpana-yellow h-8 w-8 -left-2 -top-4 opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.032-.52.112-1.08.239-.573.134-1.054.253-1.446.36l-.857-1.743c1.014-.345 1.82-.6 2.424-.765.604-.166 1.147-.254 1.628-.254 1.104 0 2.038.232 2.803.697.765.463 1.342 1.12 1.732 1.97.39.852.584 1.86.584 3.023 0 .97-.17 1.894-.507 2.77-.337.88-.823 1.608-1.457 2.188-.635.58-1.375.87-2.22.87-.97 0-1.81-.25-2.524-.754-.714-.502-1.259-1.176-1.637-2.018-.379-.843-.568-1.792-.568-2.848 0-1.378.32-2.596.957-3.654.638-1.058 1.594-1.842 2.868-2.353L9.47 13.43c-.147.025-.3.05-.455.076-.155.025-.278.05-.37.07zm5.632 0c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.032-.52.112-1.08.239-.573.134-1.054.253-1.446.36l-.857-1.743c1.014-.345 1.82-.6 2.424-.765.604-.166 1.147-.254 1.628-.254 1.104 0 2.038.232 2.803.697.765.463 1.342 1.12 1.732 1.97.39.852.584 1.86.584 3.023 0 .97-.17 1.894-.507 2.77-.337.88-.823 1.608-1.457 2.188-.635.58-1.375.87-2.22.87-.97 0-1.81-.25-2.524-.754-.714-.502-1.259-1.176-1.637-2.018-.379-.843-.568-1.792-.568-2.848 0-1.378.32-2.596.957-3.654.638-1.058 1.594-1.842 2.868-2.353l1.45 1.362c-.147.025-.3.05-.455.076-.155.025-.278.05-.37.07z" />
                  </svg>
                  <p className="text-gray-300 relative pl-4 food-item-slide">{testimonial.comment}</p>
                </div>
                
                {testimonial.ratings && (
                  <div className="grid grid-cols-3 gap-2 text-xs text-center mb-4 border-t border-gray-800 pt-4">
                    <div>
                      <div className="text-kalpana-yellow font-medium mb-1">Food</div>
                      <div className="text-white">{testimonial.ratings.food}/5</div>
                    </div>
                    <div>
                      <div className="text-kalpana-yellow font-medium mb-1">Service</div>
                      <div className="text-white">{testimonial.ratings.service}/5</div>
                    </div>
                    <div>
                      <div className="text-kalpana-yellow font-medium mb-1">Atmosphere</div>
                      <div className="text-white">{testimonial.ratings.atmosphere}/5</div>
                    </div>
                  </div>
                )}
                
                {testimonial.recommendedDishes && testimonial.recommendedDishes.length > 0 && (
                  <div className="text-xs">
                    <span className="text-kalpana-yellow font-medium">Recommended dishes: </span>
                    <span className="text-gray-300">{testimonial.recommendedDishes.join(', ')}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link 
                href="/about#reviews" 
                className="text-kalpana-yellow border border-kalpana-yellow hover:bg-kalpana-yellow/10 px-6 py-3 rounded-full inline-flex items-center font-medium transition-colors"
              >
                <span>View All Reviews</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Menu Preview */}
      <MenuSection />
    </div>
  );
};

export default HomePage;
