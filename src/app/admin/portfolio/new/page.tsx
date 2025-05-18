"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, PlusCircle, X } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

// Skema validasi dengan Zod
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Judul harus minimal 3 karakter",
  }),
  slug: z.string().min(3, {
    message: "Slug harus minimal 3 karakter",
  }).regex(/^[a-z0-9-]+$/, {
    message: "Slug hanya boleh mengandung huruf kecil, angka, dan tanda hubung",
  }),
  description: z.string().min(10, {
    message: "Deskripsi harus minimal 10 karakter",
  }),
  clientName: z.string(),
  serviceType: z.string().min(1, {
    message: "Tipe layanan harus diisi",
  }),
  demoUrl: z.string().url({
    message: "URL demo tidak valid",
  }),
  featured: z.boolean(),
});

// Definisikan tipe dari skema validasi
type FormSchemaType = z.infer<typeof formSchema>;

export default function NewPortfolioPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [technologies, setTechnologies] = useState<string[]>(['']);

  // Gunakan tipe FormSchemaType untuk useForm
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      clientName: '',
      serviceType: '',
      demoUrl: '',
      featured: false,
    },
  });
  
  // Generate slug otomatis dari judul
  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    form.setValue('slug', slug);
  };
  
  // Handle image URLs
  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };
  
  const updateImageUrl = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };
  
  const removeImageUrl = (index: number) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };
  
  // Handle technologies
  const addTechnology = () => {
    setTechnologies([...technologies, '']);
  };
  
  const updateTechnology = (index: number, value: string) => {
    const newTechnologies = [...technologies];
    newTechnologies[index] = value;
    setTechnologies(newTechnologies);
  };
  
  const removeTechnology = (index: number) => {
    if (technologies.length > 1) {
      setTechnologies(technologies.filter((_, i) => i !== index));
    }
  };

  // Gunakan SubmitHandler<FormSchemaType> untuk onSubmit
  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      setIsSubmitting(true);
      
      // Validasi imageUrls dan technologies
      const validImageUrls = imageUrls.filter(url => url.trim() !== '');
      if (validImageUrls.length === 0) {
        toast.error('Tambahkan minimal satu URL gambar');
        setIsSubmitting(false);
        return;
      }
      
      const validTechnologies = technologies.filter(tech => tech.trim() !== '');
      if (validTechnologies.length === 0) {
        toast.error('Tambahkan minimal satu teknologi');
        setIsSubmitting(false);
        return;
      }
      
      // Konversi arrays menjadi JSON strings
      const imageUrlsJson = JSON.stringify(validImageUrls);
      const technologiesJson = JSON.stringify(validTechnologies);
      
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          imageUrls: imageUrlsJson,
          technologies: technologiesJson,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create portfolio');
      }
      
      toast.success('Portfolio berhasil ditambahkan');
      router.push('/admin/portfolio');
      router.refresh();
    } catch (error) {
      console.error('Error creating portfolio:', error);
      toast.error('Gagal menambahkan portfolio');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tambah Portfolio Baru</h1>
      </div>
      
      <div className="border rounded-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Portfolio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Website E-commerce"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          generateSlug(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (URL)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: website-ecommerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsi portfolio..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Klien (opsional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama klien atau perusahaan"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori Layanan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Website, Mobile App, UI/UX Design"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>URL Gambar</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addImageUrl}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Tambah URL Gambar
                </Button>
              </div>
              <div className="space-y-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={url}
                      onChange={(e) => updateImageUrl(index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImageUrl(index)}
                      disabled={imageUrls.length === 1}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Teknologi</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTechnology}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Tambah Teknologi
                </Button>
              </div>
              <div className="space-y-2">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={tech}
                      onChange={(e) => updateTechnology(index, e.target.value)}
                      placeholder="Contoh: React, Node.js, MySQL"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTechnology(index)}
                      disabled={technologies.length === 1}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="demoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Demo (opsional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Portfolio Unggulan</FormLabel>
                    <div className="text-sm text-slate-500">
                      Tandai sebagai portfolio unggulan di halaman utama
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/portfolio')}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}