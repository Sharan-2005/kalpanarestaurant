import { Switch, Route } from "wouter";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/contexts/cart-context";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import MenuPage from "@/pages/menu-page";
import CheckoutPage from "@/pages/checkout-page";
import OrdersPage from "@/pages/orders-page";
import AboutPage from "@/pages/about-page";
import ContactPage from "@/pages/contact-page";
import ProfilePage from "@/pages/profile-page";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminFoodItems from "@/pages/admin/food-items";
import AdminOrders from "@/pages/admin/orders";
import { ProtectedRoute, AdminRoute } from "./lib/protected-route";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartSidebar from "@/components/cart/cart-sidebar";
import PageLayout from "@/components/layout/page-layout";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={() => <PageLayout><HomePage /></PageLayout>} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/menu" component={() => <PageLayout><MenuPage /></PageLayout>} />
      <Route path="/about" component={() => <PageLayout><AboutPage /></PageLayout>} />
      <Route path="/contact" component={() => <PageLayout><ContactPage /></PageLayout>} />
      
      {/* Protected Routes */}
      <ProtectedRoute path="/checkout" component={() => <PageLayout><CheckoutPage /></PageLayout>} />
      <ProtectedRoute path="/orders" component={() => <PageLayout><OrdersPage /></PageLayout>} />
      <ProtectedRoute path="/profile" component={() => <PageLayout><ProfilePage /></PageLayout>} />
      
      {/* Admin Routes */}
      <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
      <AdminRoute path="/admin/food-items" component={AdminFoodItems} />
      <AdminRoute path="/admin/orders" component={AdminOrders} />
      
      {/* 404 Route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router />
          <CartSidebar />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
