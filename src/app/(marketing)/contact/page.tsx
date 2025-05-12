"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Definisikan interface untuk Service
interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string;
  imageUrl: string | null;
  price: string | null;
  isPopular: boolean;
  isActive: boolean;
}

// Interface untuk contact info
interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  mapUrl: string;
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Nama harus minimal 3 karakter",
  }),
  email: z.string().email({
    message: "Email tidak valid",
  }),
  phone: z.string().min(10, {
    message: "Nomor telepon harus minimal 10 digit",
  }),
  serviceId: z.string().min(1, {
    message: "Pilih layanan yang diinginkan",
  }),
  message: z.string().min(10, {
    message: "Pesan harus minimal 10 karakter",
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  
  // Fetch services for the dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoadingServices(true);
        const response = await fetch('/api/services');
        
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const servicesData = await response.json();
        // Filter only active services
        const activeServices = servicesData.filter((service: Service) => service.isActive);
        setServices(activeServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Gagal memuat data layanan');
      } finally {
        setIsLoadingServices(false);
      }
    };
    
    fetchServices();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceId: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Kirim data ke API untuk membuat order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          serviceId: values.serviceId,
          message: values.message,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      toast.success('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Gagal mengirim pesan. Silakan coba lagi nanti.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch contact information from settings (if available)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "Jl. Contoh No. 123, Jakarta, Indonesia",
    email: "info@kedjora.com",
    phone: "+62 812 3456 7890",
    mapUrl: ""
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/api/settings?section=contact');
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setContactInfo(data[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };
    
    fetchContactInfo();
  }, []);

  return (
    <>
      {/* Hero section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white">Hubungi Kami</h1>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            Hubungi kami untuk konsultasi atau pertanyaan terkait layanan yang kami tawarkan.
          </p>
        </div>
      </div>
      
      {/* Contact content */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Kirim Pesan</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan nama lengkap Anda" {...field} />
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
                            <Input type="email" placeholder="email@example.com" {...field} />
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
                            <Input placeholder="08xxxxxxxxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="serviceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Layanan yang Diinginkan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih layanan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isLoadingServices ? (
                              <SelectItem value="loading" disabled>Memuat layanan...</SelectItem>
                            ) : services.length > 0 ? (
                              services.map((service) => (
                                <SelectItem key={service.id} value={service.id}>
                                  {service.title}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>Tidak ada layanan tersedia</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pesan</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jelaskan kebutuhan Anda secara detail"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      "Kirim Pesan"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Informasi Kontak</h2>
              
              <div className="bg-slate-50 rounded-lg p-6 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-slate-900">Alamat</h3>
                    <p className="text-slate-600 mt-1 whitespace-pre-line">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-slate-900">Email</h3>
                    <p className="text-slate-600 mt-1">
                      <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
                        {contactInfo.email}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-slate-900">Telepon</h3>
                    <p className="text-slate-600 mt-1">
                      <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">
                        {contactInfo.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-6 rounded-lg overflow-hidden h-80">
                {contactInfo.mapUrl ? (
                  <iframe
                    src={contactInfo.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <div className="bg-slate-200 h-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-slate-600">Peta Lokasi</p>
                      <p className="text-sm text-slate-500 mt-1">
                        (Integrasikan Google Maps di pengaturan)
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Office hours */}
              <div className="mt-6 bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-2">Jam Operasional</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Senin - Jumat</span>
                    <span className="font-medium">09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sabtu</span>
                    <span className="font-medium">09:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Minggu</span>
                    <span className="font-medium">Tutup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Pertanyaan Umum</h2>
          <p className="text-slate-600 mb-8">
            Beberapa pertanyaan yang sering ditanyakan
          </p>
          
          <div className="space-y-4 text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-slate-900">Berapa lama waktu pengerjaan proyek?</h3>
              <p className="mt-2 text-slate-600">
                Durasi pengerjaan bervariasi tergantung pada kompleksitas proyek. Untuk proyek sederhana seperti landing page bisa selesai dalam 1-2 minggu, sedangkan proyek yang lebih kompleks seperti aplikasi dengan database bisa memakan waktu 1-3 bulan.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-slate-900">Bagaimana proses pembayaran?</h3>
              <p className="mt-2 text-slate-600">
                Kami menerapkan sistem pembayaran bertahap: 50% di awal sebagai uang muka, dan 50% setelah proyek selesai. Untuk proyek besar, pembayaran dapat dibagi menjadi beberapa tahap berdasarkan milestone proyek.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-slate-900">Apakah ada garansi untuk layanan yang diberikan?</h3>
              <p className="mt-2 text-slate-600">
                Ya, kami memberikan garansi maintenance selama 1 bulan untuk setiap proyek website dan aplikasi. Selama periode tersebut, kami akan memperbaiki bug atau masalah yang muncul tanpa biaya tambahan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}