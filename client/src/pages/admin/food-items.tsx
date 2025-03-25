import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FoodItem } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/layout/admin-layout';
import FoodItemForm from '@/components/admin/food-item-form';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Plus, Pencil, Trash2, Search } from 'lucide-react';

const FoodItems = () => {
  const [search, setSearch] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: foodItems, isLoading } = useQuery<FoodItem[]>({
    queryKey: ['/api/foods'],
    queryFn: async () => {
      const response = await fetch('/api/foods');
      if (!response.ok) throw new Error('Failed to fetch food items');
      return response.json();
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/foods/${id}`);
    },
    onSuccess: () => {
      toast({
        title: 'Food item deleted',
        description: 'The food item has been deleted successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/foods'] });
      setDeletingItemId(null);
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to delete food item',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  const filteredItems = foodItems?.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleDeleteConfirm = () => {
    if (deletingItemId !== null) {
      deleteMutation.mutate(deletingItemId);
    }
  };
  
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'south-indian':
        return <Badge variant="outline" className="bg-green-100 text-green-800">South Indian</Badge>;
      case 'punjabi':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Punjabi</Badge>;
      case 'chinese':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Chinese</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };
  
  return (
    <AdminLayout title="Food Items">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search food items..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Food Item</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Food Item</DialogTitle>
                <DialogDescription>
                  Create a new food item that will be displayed on the menu.
                </DialogDescription>
              </DialogHeader>
              <FoodItemForm onSuccess={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !filteredItems || filteredItems.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Food Items</CardTitle>
              <CardDescription>
                {search ? 'No food items match your search criteria.' : 'There are no food items available. Add one to get started.'}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Food Items</CardTitle>
              <CardDescription>Manage your restaurant's menu items.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>₹{item.price}</TableCell>
                        <TableCell>{getCategoryBadge(item.category)}</TableCell>
                        <TableCell>
                          {item.isAvailable ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800">Available</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800">Unavailable</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog
                              open={editingItem?.id === item.id}
                              onOpenChange={(open) => !open && setEditingItem(null)}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setEditingItem(item)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Food Item</DialogTitle>
                                  <DialogDescription>
                                    Make changes to the food item.
                                  </DialogDescription>
                                </DialogHeader>
                                {editingItem && (
                                  <FoodItemForm
                                    foodItem={editingItem}
                                    onSuccess={() => setEditingItem(null)}
                                  />
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => setDeletingItemId(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete {item.name} from the menu.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setDeletingItemId(null)}>
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteConfirm}
                                    className="bg-red-500 hover:bg-red-600"
                                    disabled={deleteMutation.isPending}
                                  >
                                    {deleteMutation.isPending ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                      </>
                                    ) : (
                                      'Delete'
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default FoodItems;
