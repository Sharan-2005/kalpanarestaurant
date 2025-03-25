import { useQuery } from '@tanstack/react-query';
import AdminLayout from '@/components/layout/admin-layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderList from '@/components/admin/order-list';
import { Order, FoodItem } from '@shared/schema';
import { 
  CircleDollarSign, 
  ShoppingBag, 
  UtensilsCrossed, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2 
} from 'lucide-react';

const Dashboard = () => {
  const { data: orders, isLoading: isLoadingOrders } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
    queryFn: async () => {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    }
  });
  
  const { data: foodItems, isLoading: isLoadingFoodItems } = useQuery<FoodItem[]>({
    queryKey: ['/api/foods'],
    queryFn: async () => {
      const response = await fetch('/api/foods');
      if (!response.ok) throw new Error('Failed to fetch food items');
      return response.json();
    }
  });
  
  const isLoading = isLoadingOrders || isLoadingFoodItems;
  
  // Calculate statistics
  const totalOrders = orders?.length || 0;
  const totalRevenue = orders?.reduce((acc, order) => acc + order.totalAmount, 0) || 0;
  const completedOrders = orders?.filter(order => order.status === 'delivered').length || 0;
  const totalFoodItems = foodItems?.length || 0;
  
  // Calculate category counts
  const southIndianCount = foodItems?.filter(item => item.category === 'south-indian').length || 0;
  const punjabiCount = foodItems?.filter(item => item.category === 'punjabi').length || 0;
  const chineseCount = foodItems?.filter(item => item.category === 'chinese').length || 0;
  
  if (isLoading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +4.1%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +12.5%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Food Items</CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFoodItems}</div>
              <p className="text-xs text-muted-foreground">
                {southIndianCount} South Indian, {punjabiCount} Punjabi, {chineseCount} Chinese
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalOrders > 0 ? `${Math.round((completedOrders / totalOrders) * 100)}%` : '0%'}
              </div>
              <p className="text-xs text-muted-foreground">
                {completedOrders} of {totalOrders} orders delivered
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className="space-y-4">
            <OrderList />
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  View detailed statistics and trends for your restaurant.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                  Analytics dashboard will be available in the next update.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
