"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// Definisikan interface untuk Order
interface Order {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  serviceId: string;
  service: {
    id: string;
    title: string;
  };
  message: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}

const formSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
});

type OrderStatusFormProps = {
  order: Order; // Gunakan interface Order yang sudah didefinisikan
};

export default function OrderStatusForm({ order }: OrderStatusFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: order.status,
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: values.status,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      
      toast.success('Status pesanan berhasil diperbarui');
      router.refresh();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Gagal memperbarui status pesanan');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get status badge className
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Status Saat Ini</div>
        <div 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            getStatusBadgeClass(order.status)
          }`}
        >
          {order.status === 'PENDING' && 'Pending'}
          {order.status === 'IN_PROGRESS' && 'In Progress'}
          {order.status === 'COMPLETED' && 'Completed'}
          {order.status === 'CANCELLED' && 'Cancelled'}
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 dark:text-slate-200">Update Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectItem value="PENDING" className="text-slate-900 dark:text-slate-200">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS" className="text-slate-900 dark:text-slate-200">In Progress</SelectItem>
                    <SelectItem value="COMPLETED" className="text-slate-900 dark:text-slate-200">Completed</SelectItem>
                    <SelectItem value="CANCELLED" className="text-slate-900 dark:text-slate-200">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memperbarui...
              </>
            ) : (
              "Update Status"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}