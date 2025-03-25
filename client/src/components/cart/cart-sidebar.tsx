import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar = () => {
  const { cartState, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  const handleCheckout = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/checkout');
    }
    closeCart();
  };
  
  // Calculate additional fees
  const deliveryFee = 40;
  const taxRate = 0.05; // 5% tax
  const tax = Math.round(cartState.totalAmount * taxRate);
  const totalPayable = cartState.totalAmount + deliveryFee + tax;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeCart}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-kalpana-black text-white shadow-lg z-50"
          >
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h2 className="font-bold text-xl text-kalpana-yellow">Your Cart</h2>
                <Button variant="ghost" size="icon" onClick={closeCart} className="text-white hover:bg-gray-800">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {cartState.items.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-8 w-8 text-kalpana-yellow"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                  <p className="text-gray-400 text-center mb-6">
                    Add some delicious items from our menu and they will appear here.
                  </p>
                  <Button
                    className="flex items-center gap-2 bg-kalpana-yellow text-kalpana-black hover:bg-kalpana-yellow/90"
                    onClick={() => {
                      navigate('/menu');
                      closeCart();
                    }}
                  >
                    <span>Browse Menu</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <ScrollArea className="flex-grow p-6">
                    <div className="space-y-6">
                      <AnimatePresence>
                        {cartState.items.map(item => (
                          <motion.div 
                            key={item.id}
                            className="flex items-center space-x-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-grow">
                              <h4 className="font-medium text-white">{item.name}</h4>
                              <p className="text-kalpana-yellow text-sm">₹{item.price} x {item.quantity}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="w-6 h-6 rounded-full p-0 border-gray-700 text-white hover:bg-gray-800"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-6 text-center text-white">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="w-6 h-6 rounded-full p-0 border-gray-700 text-white hover:bg-gray-800"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-gray-400 hover:text-kalpana-yellow"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>
                  
                  <div className="p-6 border-t border-gray-800">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="font-medium text-white">₹{cartState.totalAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Delivery Fee</span>
                        <span className="font-medium text-white">₹{deliveryFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax</span>
                        <span className="font-medium text-white">₹{tax}</span>
                      </div>
                      <Separator className="my-2 bg-gray-800" />
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-white">Total</span>
                        <span className="text-kalpana-yellow">₹{totalPayable}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full flex items-center justify-center bg-kalpana-yellow text-kalpana-black hover:bg-kalpana-yellow/90"
                      onClick={handleCheckout}
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
