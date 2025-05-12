"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Loader2, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

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
  price: z.string().optional(),
  imageUrl: z.string().optional(),
  isPopular: z.boolean(), // required boolean
  isActive: z.boolean(),  // required boolean
});

// Definisikan tipe untuk form
type FormValues = z.infer<typeof formSchema>;

// Interface untuk Service yang akan digunakan di dalam komponen
interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string; // JSON string yang akan di-parse 
  imageUrl: string | null;
  price: string | null;
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState<string[]>(['']);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      price: '',
      imageUrl: '',
      isPopular: false,
      isActive: true,
    },
  });
  
  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/services/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch service');
        }
        
        const service: Service = await response.json();
        
        // Set form values
        form.reset({
          title: service.title,
          slug: service.slug,
          description: service.description,
          price: service.price || '',
          imageUrl: service.imageUrl || '',
          isPopular: service.isPopular,
          isActive: service.isActive,
        });
        
        // Parse features from JSON string to array
        const parsedFeatures = service.features ? JSON.parse(service.features) : [];
        setFeatures(parsedFeatures.length > 0 ? parsedFeatures : ['']);
      } catch (error) {
        console.error('Error fetching service:', error);
        toast.error('Gagal memuat data layanan');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchService();
  }, [id, form]);
  
  // Handle features
  const addFeature = () => {
    setFeatures([...features, '']);
  };
  
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };
  
  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };
  
  // Menggunakan SubmitHandler untuk onSubmit
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      setIsSubmitting(true);
      
      // Validate features
      const validFeatures = features.filter(f => f.trim() !== '');
      if (validFeatures.length === 0) {
        toast.error('Tambahkan minimal satu fitur');
        setIsSubmitting(false);
        return;
      }
      
      // Convert features array to JSON string
      const featuresJson = JSON.stringify(validFeatures);
      
      const response = await fetch(`/api/services/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          features: featuresJson,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update service');
      }
      
      toast.success('Layanan berhasil diperbarui');
      router.push('/admin/services');
      router.refresh();
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Gagal memperbarui layanan');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Edit Layanan</h1>
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
                    <FormLabel>Judul Layanan</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
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
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Fitur-fitur</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Tambah Fitur
                </Button>
              </div>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Fitur ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      disabled={features.length === 1}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga (opsional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Gambar (opsional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="isPopular"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Layanan Populer</FormLabel>
                      <div className="text-sm text-slate-500">
                        Tandai sebagai layanan populer di halaman utama
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
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Status</FormLabel>
                      <div className="text-sm text-slate-500">
                        Aktifkan layanan agar muncul di website
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
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/services')}
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
                  "Simpan Perubahan"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}