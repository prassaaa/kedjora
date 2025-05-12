"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Import komponen Image
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  position: string | null;
  company: string | null;
  content: string;
  rating: number;
  imageUrl: string | null;
  featured: boolean;
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials?featured=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);
  
  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">Apa Kata Klien</h2>
            <p className="mt-4 text-lg text-slate-600">Memuat testimonial...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Fallback data jika tidak ada testimonial
  if (testimonials.length === 0) {
    const fallbackTestimonials = [
      {
        id: "1",
        name: "Ahmad Rizal",
        position: "CEO",
        company: "PT Maju Bersama",
        content: "Kedjora membantu kami mengembangkan website dan sistem manajemen yang sangat meningkatkan efisiensi operasional. Pelayanan profesional dan hasil yang memuaskan!",
        rating: 5,
        imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        featured: true
      },
      {
        id: "2",
        name: "Siti Nurhaliza",
        position: "Mahasiswa S1",
        company: "Universitas Terkemuka",
        content: "Berkat bantuan Kedjora, skripsi saya selesai tepat waktu dengan metodologi yang tepat. Terima kasih atas pendampingan yang luar biasa!",
        rating: 5,
        imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
        featured: true
      },
      {
        id: "3",
        name: "Budi Santoso",
        position: "Founder",
        company: "StartUp Lokal",
        content: "Aplikasi yang dibangun oleh tim Kedjora memiliki performa dan UI/UX yang luar biasa. Sangat responsif dan profesional dalam komunikasi.",
        rating: 5,
        imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
        featured: true
      }
    ];
    
    setTestimonials(fallbackTestimonials);
  }

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Apa Kata Klien</h2>
          <p className="mt-4 text-lg text-slate-600">
            Testimonial dari klien yang telah menggunakan layanan kami
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  {testimonial.imageUrl ? (
                    // Mengganti tag img dengan komponen Image
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-medium">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">
                      {testimonial.position}
                      {testimonial.position && testimonial.company && ', '}
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                {/* Perbaikan: Mengganti " " dengan &ldquo; &rdquo; */}
                <p className="text-slate-700 italic flex-grow">&ldquo;{testimonial.content}&rdquo;</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/testimonials" className="flex items-center">
              Lihat Semua Testimonial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}