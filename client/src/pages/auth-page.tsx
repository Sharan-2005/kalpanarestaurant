import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertUserSchema } from '@shared/schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Login schema
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Registration schema
const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();
  
  // If user is already logged in, redirect to home
  if (user) {
    navigate('/');
    return null;
  }
  
  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      agreeTerms: false,
      isAdmin: false,
    },
  });
  
  // Submit handlers
  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate('/');
      }
    });
  };
  
  const onRegisterSubmit = (data: RegisterFormValues) => {
    // Remove confirmPassword and agreeTerms before submitting
    const { confirmPassword, agreeTerms, ...userData } = data;
    
    registerMutation.mutate(userData, {
      onSuccess: () => {
        navigate('/');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-kalpana-black to-gray-900 py-12">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-start mb-4">
            <Button 
              variant="outline" 
              className="text-white border-gray-700 hover:bg-gray-800"
              onClick={() => navigate('/')}
            >
              ← Back to Home
            </Button>
          </div>
          <div className="flex flex-col md:flex-row shadow-lg rounded-xl overflow-hidden">
            {/* Auth Forms */}
            <div className="w-full md:w-1/2 bg-black/30 backdrop-blur-sm border-r border-gray-800 p-8 md:p-12">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">Welcome to <span className="text-kalpana-yellow">Kalpana</span> Restaurant</h1>
                <p className="text-gray-400">Sign in or create an account to order delicious food</p>
              </div>
              
              <Tabs 
                defaultValue="login" 
                value={activeTab} 
                onValueChange={setActiveTab} 
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-800">
                  <TabsTrigger value="login" className="data-[state=active]:bg-kalpana-yellow data-[state=active]:text-kalpana-black">Login</TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-kalpana-yellow data-[state=active]:text-kalpana-black">Create Account</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your username" 
                                {...field} 
                                disabled={loginMutation.isPending}
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                {...field} 
                                disabled={loginMutation.isPending}
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" className="border-gray-600 data-[state=checked]:bg-kalpana-yellow data-[state=checked]:text-kalpana-black" />
                          <label 
                            htmlFor="remember" 
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          >
                            Remember me
                          </label>
                        </div>
                        
                        <Button variant="link" className="p-0 h-auto text-kalpana-yellow hover:text-kalpana-yellow/80">
                          Forgot password?
                        </Button>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-kalpana-yellow text-kalpana-black hover:bg-kalpana-yellow/90" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field} 
                                disabled={registerMutation.isPending}
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your@email.com" 
                                {...field} 
                                disabled={registerMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Create a username" 
                                  {...field} 
                                  disabled={registerMutation.isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="+91 9876543210" 
                                  {...field} 
                                  disabled={registerMutation.isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={registerForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your delivery address" 
                                {...field} 
                                disabled={registerMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  {...field} 
                                  disabled={registerMutation.isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  {...field} 
                                  disabled={registerMutation.isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={registerForm.control}
                        name="agreeTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                                disabled={registerMutation.isPending}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-kalpana-yellow text-kalpana-black hover:bg-kalpana-yellow/90" 
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Hero Section */}
            <motion.div 
              className="w-full md:w-1/2 bg-kalpana-black p-8 md:p-12 flex flex-col justify-center relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-kalpana-yellow/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-kalpana-yellow/10 rounded-full blur-3xl"></div>
              
              <div className="text-white relative z-10">
                <h2 className="text-3xl font-bold mb-4">Delicious <span className="text-kalpana-yellow">Vegetarian</span> Cuisine</h2>
                <p className="mb-6 text-gray-300">
                  Experience the authentic flavors of South Indian, Punjabi, and Chinese vegetarian
                  delicacies at Kalpana Restaurant.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Easy online ordering",
                    "Quick home delivery",
                    "Special discounts for members",
                    "Earn loyalty points with every order"
                  ].map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center text-gray-300"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    >
                      <svg 
                        className="h-5 w-5 mr-2 text-kalpana-yellow" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1588166524941-3bf61a9c41db" 
                    alt="Vegetarian Food" 
                    className="rounded-lg shadow-lg border border-gray-800"
                  />
                  <div className="absolute top-2 right-2 bg-kalpana-yellow text-kalpana-black px-3 py-1 rounded-full font-bold text-sm rotating-shine">
                    Pure Veg
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
