"use client";

import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  address: z.string().min(5, {
    message: "Alamat harus minimal 5 karakter",
  }),
  email: z.string().email({
    message: "Email harus valid",
  }),
  phone: z.string().min(5, {
    message: "Nomor telepon harus minimal 5 karakter",
  }),
  mapUrl: z.string().url({
    message: "URL peta harus berupa URL yang valid",
  }).optional().or(z.literal(''))
});

// Definisikan tipe berdasarkan skema Zod
type ContactFormValues = z.infer<typeof formSchema>;

// Tipe untuk data inisialisasi form
interface ContactFormInitialData {
  address?: string;
  email?: string;
  phone?: string;
  mapUrl?: string;
}

interface ContactSettingsFormProps {
  initialData: ContactFormInitialData;
  onSave: (data: ContactFormValues) => Promise<void>;
}

export default function ContactSettingsForm({ initialData, onSave }: ContactSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: initialData.address || "Jl. Contoh No. 123, Jakarta, Indonesia",
      email: initialData.email || "info@kedjora.com",
      phone: initialData.phone || "+62 812 3456 7890",
      mapUrl: initialData.mapUrl || "",
    },
  });
  
  const onSubmit = async (values: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      await onSave(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Textarea className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="mapUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Peta Embed (opsional)</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
              <p className="text-sm text-slate-500 mt-1">
                URL iframe Google Maps (contoh: https://www.google.com/maps/embed?pb=...)
              </p>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}