import AdminLayout from '@/components/layout/admin-layout';
import OrderList from '@/components/admin/order-list';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { Order } from '@shared/schema';

const Orders = () => {
  const { data: orders } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
    queryFn: async () => {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    }
  });
  
  // Filter orders by status
  const pendingOrders = orders?.filter(order => order.status === 'pending') || [];
  const confirmedOrders = orders?.filter(order => order.status === 'confirmed') || [];
  const deliveredOrders = orders?.filter(order => order.status === 'delivered') || [];
  const cancelledOrders = orders?.filter(order => order.status === 'cancelled') || [];
  
  return (
    <AdminLayout title="Orders">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Confirmed Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{confirmedOrders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Delivered Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveredOrders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cancelled Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cancelledOrders.length}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <OrderList />
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
                <CardDescription>Orders that need your attention.</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingOrders.length === 0 ? (
                  <div className="text-center p-6 text-gray-500">
                    No pending orders at the moment.
                  </div>
                ) : (
                  <OrderList />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="confirmed">
            <Card>
              <CardHeader>
                <CardTitle>Confirmed Orders</CardTitle>
                <CardDescription>Orders that are being prepared or in delivery.</CardDescription>
              </CardHeader>
              <CardContent>
                {confirmedOrders.length === 0 ? (
                  <div className="text-center p-6 text-gray-500">
                    No confirmed orders at the moment.
                  </div>
                ) : (
                  <OrderList />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="delivered">
            <Card>
              <CardHeader>
                <CardTitle>Delivered Orders</CardTitle>
                <CardDescription>Successfully completed orders.</CardDescription>
              </CardHeader>
              <CardContent>
                {deliveredOrders.length === 0 ? (
                  <div className="text-center p-6 text-gray-500">
                    No delivered orders at the moment.
                  </div>
                ) : (
                  <OrderList />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cancelled">
            <Card>
              <CardHeader>
                <CardTitle>Cancelled Orders</CardTitle>
                <CardDescription>Orders that were cancelled.</CardDescription>
              </CardHeader>
              <CardContent>
                {cancelledOrders.length === 0 ? (
                  <div className="text-center p-6 text-gray-500">
                    No cancelled orders at the moment.
                  </div>
                ) : (
                  <OrderList />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Orders;
