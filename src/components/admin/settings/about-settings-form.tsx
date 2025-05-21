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
  title: z.string().min(3, {
    message: "Judul harus minimal 3 karakter",
  }),
  subtitle: z.string().min(5, {
    message: "Subjudul harus minimal 5 karakter",
  }),
  content: z.string().min(10, {
    message: "Konten harus minimal 10 karakter",
  }),
  imageUrl: z.string().url({
    message: "URL gambar harus berupa URL yang valid",
  }).optional().or(z.literal(''))
});

interface AboutSettingsFormProps {
  initialData: z.infer<typeof formSchema>;
  onSave: (data: z.infer<typeof formSchema>) => Promise<void>;
}

export default function AboutSettingsForm({ initialData, onSave }: AboutSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "Tentang Kedjora",
      subtitle: initialData.subtitle || "Solusi digital terbaik untuk bisnis dan kebutuhan akademik Anda",
      content: initialData.content || "Kedjora adalah penyedia layanan digital profesional yang berkomitmen memberikan solusi berkualitas tinggi untuk kebutuhan digital dan akademik. Didirikan dengan visi untuk membantu bisnis dan individu dalam transformasi digital, kami telah melayani berbagai klien dari berbagai sektor industri.",
      imageUrl: initialData.imageUrl || "",
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 dark:text-slate-200">Judul Halaman</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 dark:text-slate-200">Subjudul</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 dark:text-slate-200">Konten Utama</FormLabel>
              <FormControl>
                <Textarea 
                  className="min-h-[200px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200" 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 dark:text-slate-200">URL Gambar (opsional)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  value={field.value || ''} 
                  className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
          >
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