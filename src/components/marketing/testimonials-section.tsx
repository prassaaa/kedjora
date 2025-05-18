"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Quote } from "lucide-react";

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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
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
  
  // Fallback data jika tidak ada testimonial atau masih loading
  if (isLoading) {
    return (
      <div className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="opacity-0 animate-fade-in">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Apa Kata Klien</h2>
              <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-slate-600 dark:text-slate-300">Memuat testimonial...</p>
            </div>
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

  const getRandomColor = (id: string) => {
    const colors = ['blue', 'indigo', 'purple', 'rose', 'amber', 'emerald', 'teal'];
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const getColorClasses = (color: string, isHovered: boolean) => {
    const colorMap: Record<string, { light: string, medium: string, dark: string, lightDark: string, mediumDark: string, darkDark: string }> = {
      blue: { 
        light: 'bg-blue-50', 
        medium: 'bg-blue-100', 
        dark: 'bg-blue-600',
        lightDark: 'dark:bg-blue-900/30',
        mediumDark: 'dark:bg-blue-900/50',
        darkDark: 'dark:bg-blue-700'
      },
      indigo: { 
        light: 'bg-indigo-50', 
        medium: 'bg-indigo-100', 
        dark: 'bg-indigo-600',
        lightDark: 'dark:bg-indigo-900/30',
        mediumDark: 'dark:bg-indigo-900/50',
        darkDark: 'dark:bg-indigo-700'
      },
      purple: { 
        light: 'bg-purple-50', 
        medium: 'bg-purple-100', 
        dark: 'bg-purple-600',
        lightDark: 'dark:bg-purple-900/30',
        mediumDark: 'dark:bg-purple-900/50',
        darkDark: 'dark:bg-purple-700'
      },
      rose: { 
        light: 'bg-rose-50', 
        medium: 'bg-rose-100', 
        dark: 'bg-rose-600',
        lightDark: 'dark:bg-rose-900/30',
        mediumDark: 'dark:bg-rose-900/50',
        darkDark: 'dark:bg-rose-700'
      },
      amber: { 
        light: 'bg-amber-50', 
        medium: 'bg-amber-100', 
        dark: 'bg-amber-600',
        lightDark: 'dark:bg-amber-900/30',
        mediumDark: 'dark:bg-amber-900/50',
        darkDark: 'dark:bg-amber-700'
      },
      emerald: { 
        light: 'bg-emerald-50', 
        medium: 'bg-emerald-100', 
        dark: 'bg-emerald-600',
        lightDark: 'dark:bg-emerald-900/30',
        mediumDark: 'dark:bg-emerald-900/50',
        darkDark: 'dark:bg-emerald-700'
      },
      teal: { 
        light: 'bg-teal-50', 
        medium: 'bg-teal-100', 
        dark: 'bg-teal-600',
        lightDark: 'dark:bg-teal-900/30',
        mediumDark: 'dark:bg-teal-900/50',
        darkDark: 'dark:bg-teal-700'
      }
    };
    
    return {
      bgColor: isHovered 
        ? `${colorMap[color].medium} ${colorMap[color].mediumDark}` 
        : `${colorMap[color].light} ${colorMap[color].lightDark}`,
      textColor: `text-${color}-600 dark:text-${color}-400`,
      accentColor: `${colorMap[color].dark} ${colorMap[color].darkDark}`
    };
  };

  return (
    <div className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Apa Kata Klien</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Testimonial dari klien yang telah menggunakan layanan kami
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => {
            const color = getRandomColor(testimonial.id);
            const colors = getColorClasses(color, hoveredId === testimonial.id);
            
            return (
              <div
                key={testimonial.id}
                className={`rounded-2xl p-8 shadow-lg transition-all duration-500 opacity-0 animate-fade-up ${colors.bgColor} hover:shadow-xl hover:-translate-y-2`}
                style={{ animationDelay: `${i * 150}ms` }}
                onMouseEnter={() => setHoveredId(testimonial.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative mb-6">
                  <Quote className={`absolute -top-4 -left-4 h-8 w-8 opacity-20 ${colors.textColor}`} />
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic mb-6 relative z-10">&ldquo;{testimonial.content}&rdquo;</p>
                
                <div className="flex justify-between items-end">
                  <div className="flex items-center">
                    {testimonial.imageUrl ? (
                      <div className="mr-4 border-2 border-white dark:border-slate-800 rounded-full shadow-md overflow-hidden">
                        <Image
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md ${colors.accentColor} text-white`}>
                        <span className="text-lg font-medium">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {testimonial.position}
                        {testimonial.position && testimonial.company && ', '}
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-16 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <Button 
            variant="outline" 
            className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white group transition-all duration-300 px-6 py-3 text-base shadow hover:shadow-lg"
            asChild
          >
            <Link href="/testimonials" className="flex items-center">
              <span>Lihat Semua Testimonial</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}