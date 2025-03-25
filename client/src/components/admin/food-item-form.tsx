import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { insertFoodItemSchema, FoodItem } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';

// Extend the schema with custom validation
const foodItemFormSchema = insertFoodItemSchema.extend({
  price: z.coerce.number().min(1, "Price must be at least ₹1"),
});

type FoodItemFormProps = {
  foodItem?: FoodItem;
  onSuccess?: () => void;
};

const FoodItemForm: React.FC<FoodItemFormProps> = ({ foodItem, onSuccess }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!foodItem;
  
  const form = useForm<z.infer<typeof foodItemFormSchema>>({
    resolver: zodResolver(foodItemFormSchema),
    defaultValues: foodItem || {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      category: 'south-indian',
      isAvailable: true,
      isVegetarian: true,
    },
  });
  
  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof foodItemFormSchema>) => {
      const response = await apiRequest('POST', '/api/foods', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Food item created',
        description: 'The food item has been created successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/foods'] });
      form.reset();
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create food item',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: async (data: z.infer<typeof foodItemFormSchema>) => {
      const response = await apiRequest('PUT', `/api/foods/${foodItem!.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Food item updated',
        description: 'The food item has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/foods'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update food item',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  const isPending = createMutation.isPending || updateMutation.isPending;
  
  const onSubmit = (data: z.infer<typeof foodItemFormSchema>) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Food item name" 
                    {...field} 
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    step="0.01" 
                    placeholder="0.00" 
                    {...field} 
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="south-indian">South Indian</SelectItem>
                    <SelectItem value="punjabi">Punjabi</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://example.com/image.jpg" 
                    {...field} 
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Available</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Show this item on the menu
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isVegetarian"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Vegetarian</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Is this a vegetarian dish
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the food item..." 
                  className="resize-none" 
                  rows={4} 
                  {...field} 
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            isEditing ? 'Update Food Item' : 'Create Food Item'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FoodItemForm;
