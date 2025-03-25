import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Package, 
  UserCircle,
  LogOut, 
  ChevronLeft,
  Menu,
  X
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type AdminLayoutProps = {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = [
    { 
      path: '/admin/dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      path: '/admin/food-items', 
      label: 'Food Items', 
      icon: <UtensilsCrossed className="h-5 w-5" /> 
    },
    { 
      path: '/admin/orders', 
      label: 'Orders', 
      icon: <Package className="h-5 w-5" /> 
    }
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center border-b">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <Link href="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
              <span className="font-bold text-sm">K</span>
            </div>
            <h1 className="font-bold text-lg">Kalpana Admin</h1>
          </Link>
        </div>
        <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
          <AvatarFallback>{user ? getInitials(user.name) : 'AD'}</AvatarFallback>
        </Avatar>
      </div>

      {/* Mobile Sidebar (Overlay) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="w-64 h-full bg-white p-4">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                  <span className="font-bold text-sm">K</span>
                </div>
                <h1 className="font-bold text-lg">Kalpana Admin</h1>
              </Link>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-1 mb-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={location === item.path ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
            
            <div className="space-y-1">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="ml-2">Back to Website</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden md:block bg-white border-r ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            {sidebarOpen ? (
              <>
                <Link href="/" className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                    <span className="font-bold text-sm">K</span>
                  </div>
                  <h1 className="font-bold text-lg">Kalpana Admin</h1>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleSidebar}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                className="mx-auto"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <ScrollArea className="flex-grow">
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={location === item.path ? "default" : "ghost"}
                    className={`w-full justify-${sidebarOpen ? 'start' : 'center'}`}
                  >
                    {item.icon}
                    {sidebarOpen && <span className="ml-2">{item.label}</span>}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t space-y-1">
            <Link href="/">
              <Button
                variant="ghost"
                className={`w-full justify-${sidebarOpen ? 'start' : 'center'}`}
              >
                <ChevronLeft className="h-5 w-5" />
                {sidebarOpen && <span className="ml-2">Back to Website</span>}
              </Button>
            </Link>
            <Button
              variant="ghost"
              className={`w-full justify-${sidebarOpen ? 'start' : 'center'} text-red-500 hover:text-red-600 hover:bg-red-50`}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              {sidebarOpen && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <header className="hidden md:flex items-center justify-between bg-white p-4 border-b">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{user.name}</span>
              </div>
            )}
          </div>
        </header>
        
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
