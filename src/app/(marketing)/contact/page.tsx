"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
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

// Define Service interface
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

// Define ContactInfo interface
interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  mapUrl: string;
}

// Validation schema for the form
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
  
  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
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

  // Sample contact information - in a real app, you would get this from the database
  const contactInfo: ContactInfo = {
    address: "Jl. Contoh No. 123, Jakarta, Indonesia",
    email: "info@kedjora.com",
    phone: "+62 812 3456 7890",
    mapUrl: ""
  };

  return (
    <>
      {/* Hero section */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-950 dark:to-blue-900 py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 dark:bg-blue-700 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500 dark:bg-purple-700 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4">Hubungi Kami</h1>
            <div className="w-24 h-1 bg-blue-400 dark:bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="mt-4 text-xl text-slate-200 max-w-3xl mx-auto">
              Hubungi kami untuk konsultasi atau pertanyaan terkait layanan yang kami tawarkan.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Contact content */}
      <div className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Kirim Pesan</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-slate-300">Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Masukkan nama lengkap Anda" 
                            {...field}
                            className="border-slate-300 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 dark:bg-slate-800 dark:text-white"
                          />
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
                          <FormLabel className="dark:text-slate-300">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="email@example.com" 
                              {...field}
                              className="border-slate-300 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 dark:bg-slate-800 dark:text-white"
                            />
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
                          <FormLabel className="dark:text-slate-300">Nomor Telepon</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="08xxxxxxxxxx" 
                              {...field}
                              className="border-slate-300 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 dark:bg-slate-800 dark:text-white"
                            />
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
                        <FormLabel className="dark:text-slate-300">Layanan yang Diinginkan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-slate-300 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 dark:bg-slate-800 dark:text-white">
                              <SelectValue placeholder="Pilih layanan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                            {isLoadingServices ? (
                              <SelectItem value="loading" disabled>Memuat layanan...</SelectItem>
                            ) : services.length > 0 ? (
                              services.map((service) => (
                                <SelectItem key={service.id} value={service.id} className="dark:text-white">
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
                        <FormLabel className="dark:text-slate-300">Pesan</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jelaskan kebutuhan Anda secara detail"
                            className="min-h-[120px] border-slate-300 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 dark:bg-slate-800 dark:text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-700 dark:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
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
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Informasi Kontak</h2>
                
                <div className="space-y-8">
                  <motion.div 
                    className="flex items-start"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                  >
                    <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-slate-900 dark:text-white">Alamat</h3>
                      <p className="text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-line">
                        {contactInfo.address}
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                  >
                    <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-slate-900 dark:text-white">Email</h3>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">
                        <a href={`mailto:${contactInfo.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {contactInfo.email}
                        </a>
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                  >
                    <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-slate-900 dark:text-white">Telepon</h3>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">
                        <a href={`tel:${contactInfo.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {contactInfo.phone}
                        </a>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-80 bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-700">
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
                  <div className="bg-slate-100 dark:bg-slate-800 h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <MapPin className="h-12 w-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                      <p className="text-slate-600 dark:text-slate-300 font-medium">Peta Lokasi</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        Lihat lokasi kami di peta
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Office hours */}
              <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Jam Operasional</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">Senin - Jumat</span>
                    <span className="font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm">09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">Sabtu</span>
                    <span className="font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm">09:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">Minggu</span>
                    <span className="font-medium px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm">Tutup</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* FAQ section */}
      <div className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Pertanyaan Umum</h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto my-6 rounded-full"></div>
            <p className="text-slate-600 dark:text-slate-300">
              Beberapa pertanyaan yang sering ditanyakan oleh klien kami
            </p>
          </motion.div>
          
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Berapa lama waktu pengerjaan proyek?</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Durasi pengerjaan bervariasi tergantung pada kompleksitas proyek. Untuk proyek sederhana seperti landing page bisa selesai dalam 1-2 minggu, sedangkan proyek yang lebih kompleks seperti aplikasi dengan database bisa memakan waktu 1-3 bulan.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Bagaimana proses pembayaran?</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Kami menerapkan sistem pembayaran bertahap: 50% di awal sebagai uang muka, dan 50% setelah proyek selesai. Untuk proyek besar, pembayaran dapat dibagi menjadi beberapa tahap berdasarkan milestone proyek.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Apakah ada garansi untuk layanan yang diberikan?</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Ya, kami memberikan garansi maintenance selama 1 bulan untuk setiap proyek website dan aplikasi. Selama periode tersebut, kami akan memperbaiki bug atau masalah yang muncul tanpa biaya tambahan.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-white"></div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-white mb-3">Masih Ada Pertanyaan?</h2>
            <div className="w-20 h-1 bg-white opacity-60 mx-auto mb-6 rounded-full"></div>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan lain atau ingin mendiskusikan proyek Anda.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50 dark:hover:bg-slate-100 px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                asChild
              >
                <a href={`mailto:${contactInfo.email}`} className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Kami
                </a>
              </Button>
              
              <Button 
                size="lg" 
                className="bg-transparent text-white border-2 border-white hover:bg-white/10 dark:hover:bg-white/20 px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                asChild
              >
                <a href={`tel:${contactInfo.phone}`} className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Telepon Kami
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}