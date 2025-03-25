import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/contexts/cart-context';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, ChevronDown, User, LogOut, Package, Settings, MapPin } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { cartState, openCart } = useCart();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' }
  ];

  return (
    <header className="bg-kalpana-black shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src="/images/kalpana-server-logo.svg" alt="Kalpana Restaurant Logo" className="h-12 w-12 mr-3" />
            <h1 className="restaurant-name text-2xl">
              KALPANA <span className="text-white font-normal">RESTAURANT</span>
            </h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`font-medium transition-colors ${location === link.path ? 'text-kalpana-yellow' : 'text-white hover:text-kalpana-yellow'}`}
            >
              {link.label}
            </Link>
          ))}
          
          <a 
            href="https://maps.app.goo.gl/EENqvjw4ReTcGTqo8" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-white hover:text-kalpana-yellow transition-colors"
          >
            <MapPin className="h-5 w-5 mr-1" />
            <span className="text-sm">Location</span>
          </a>
          
          <div className="relative cursor-pointer" onClick={openCart}>
            <ShoppingCart className="h-5 w-5 text-white hover:text-kalpana-yellow transition-colors" />
            {cartState.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-kalpana-yellow text-kalpana-black font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartState.totalItems}
              </span>
            )}
          </div>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 focus:outline-none p-0 text-white hover:text-kalpana-yellow hover:bg-transparent">
                  <Avatar className="h-8 w-8 bg-kalpana-yellow text-kalpana-black font-bold">
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium hidden lg:inline">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-kalpana-black border-kalpana-yellow">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full flex items-center text-white hover:text-kalpana-yellow hover:bg-kalpana-black">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="w-full flex items-center text-white hover:text-kalpana-yellow hover:bg-kalpana-black">
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>
                {user.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="w-full flex items-center text-white hover:text-kalpana-yellow hover:bg-kalpana-black">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-kalpana-black flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="bg-kalpana-yellow text-kalpana-black hover:bg-kalpana-yellow/90 hover:text-kalpana-black" asChild>
              <Link href="/auth">Login</Link>
            </Button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-kalpana-yellow hover:text-white hover:bg-transparent"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-kalpana-black px-4 py-3 border-t border-gray-800"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`font-medium transition-colors ${location === link.path ? 'text-kalpana-yellow' : 'text-white hover:text-kalpana-yellow'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <a 
                href="https://maps.app.goo.gl/EENqvjw4ReTcGTqo8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-white hover:text-kalpana-yellow transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin className="h-5 w-5 mr-2" />
                <span>Location</span>
              </a>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8 bg-kalpana-yellow text-kalpana-black">
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-white">{user.name}</span>
                  </div>
                ) : (
                  <Button 
                    className="bg-kalpana-yellow text-kalpana-black hover:bg-kalpana-yellow/90 hover:text-kalpana-black" 
                    asChild 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/auth">Login</Link>
                  </Button>
                )}
                
                <div className="relative cursor-pointer" onClick={() => { openCart(); setMobileMenuOpen(false); }}>
                  <ShoppingCart className="h-5 w-5 text-white hover:text-kalpana-yellow transition-colors" />
                  {cartState.totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-kalpana-yellow text-kalpana-black font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartState.totalItems}
                    </span>
                  )}
                </div>
              </div>
              
              {user && (
                <>
                  <Link 
                    href="/profile" 
                    className="flex items-center text-white hover:text-kalpana-yellow transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link 
                    href="/orders" 
                    className="flex items-center text-white hover:text-kalpana-yellow transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                  {user.isAdmin && (
                    <Link 
                      href="/admin/dashboard" 
                      className="flex items-center text-white hover:text-kalpana-yellow transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    className="flex items-center justify-start text-red-400 px-0 hover:bg-transparent hover:text-red-300"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
