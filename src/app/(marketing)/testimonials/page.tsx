import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Quote } from "lucide-react";
import prisma from "@/lib/db";

export const metadata = {
  title: "Testimonial - Kedjora",
  description: "Apa kata klien tentang layanan Kedjora",
};

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [
      {
        featured: 'desc'
      },
      {
        createdAt: 'desc'
      }
    ]
  });

  // Fungsi untuk menghasilkan warna acak berdasarkan ID
  const getRandomColor = (id: string) => {
    const colors = ['blue', 'indigo', 'purple', 'rose', 'amber', 'emerald', 'teal'];
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Fungsi untuk mendapatkan kelas warna berdasarkan nama warna
  const getColorClasses = (color: string) => {
    const colorClasses: Record<string, { light: string, medium: string, dark: string, text: string, border: string, darkBg: string, darkText: string, darkBorder: string }> = {
      blue: { 
        light: 'bg-blue-50', 
        medium: 'bg-blue-100', 
        dark: 'bg-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-200',
        darkBg: 'dark:bg-slate-800',
        darkText: 'dark:text-blue-400',
        darkBorder: 'dark:border-blue-900'
      },
      indigo: { 
        light: 'bg-indigo-50', 
        medium: 'bg-indigo-100', 
        dark: 'bg-indigo-600',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        darkBg: 'dark:bg-slate-800',
        darkText: 'dark:text-indigo-400',
        darkBorder: 'dark:border-indigo-900'
      },
      purple: { 
        light: 'bg-purple-50', 
        medium: 'bg-purple-100', 
        dark: 'bg-purple-600',
        text: 'text-purple-600',
        border: 'border-purple-200',
        darkBg: 'dark:bg-slate-800',
        darkText: 'dark:text-purple-400',
        darkBorder: 'dark:border-purple-900'
      },
      rose: { 
        light: 'bg-rose-50', 
        medium: 'bg-rose-100', 
        dark: 'bg-rose-600',
        text: 'text-rose-600',
        border: 'border-rose-200',
        darkBg: 'dark:bg-slate-800',
        darkText: 'dark:text-rose-400',
        darkBorder: 'dark:border-rose-900'
      },
      amber: { 
        light: 'bg-amber-50', 
        medium: 'bg-amber-100', 
        dark: 'bg-amber-600',
        text: 'text-amber-600',
        border: 'border-amber-200',
        darkBg: 'dark:bg-slate-800',
        darkText: 'dark:text-amber-400',
        darkBorder: 'dark:border-amber-900'
      },
      emerald: { 
        light: 'bg-emerald-50', 
        medium: 'bg-emerald-100', 
        dark: 'bg-emerald-600',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        darkBg: 'dark:bg-slate-800',
        darkText: 'dark:text-emerald-400',
        darkBorder: 'dark:border-emerald-900'
      },
      teal: { 
        light: 'bg-teal-50', 
        medium: 'bg-teal-100', 
        dark: 'bg-teal-600',
        text: 'text-teal-600',
        border: 'border-teal-200',
        darkBg: 'dark:bg-slate-800',
        darkText: 'dark:text-teal-400',
        darkBorder: 'dark:border-teal-900'
      }
    };
    
    return colorClasses[color] || colorClasses.blue;
  };

  return (
    <>
      {/* Hero section */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-950 dark:to-blue-950 py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 dark:bg-blue-700 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500 dark:bg-purple-700 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-5xl font-bold text-white mb-4">Testimonial</h1>
            <div className="w-24 h-1 bg-blue-400 dark:bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="mt-4 text-xl text-slate-200 max-w-3xl mx-auto">
              Apa kata klien tentang layanan kami
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonials grid */}
      <div className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials.length === 0 ? (
            <div className="text-center py-16 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-2xl opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <p className="text-lg">Belum ada testimonial.</p>
              <p className="mt-2">Silakan kunjungi kembali nanti.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => {
                const color = getRandomColor(testimonial.id);
                const colorClasses = getColorClasses(color);
                const animationDelay = 400 + (i * 150);
                
                return (
                  <div 
                    key={testimonial.id} 
                    className={`rounded-2xl p-8 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 opacity-0 animate-fade-up ${
                      testimonial.featured ? `${colorClasses.light} ${colorClasses.darkBg}` : 'bg-white dark:bg-slate-900'
                    }`}
                    style={{ animationDelay: `${animationDelay}ms` }}
                  >
                    <div className="relative mb-6">
                      <Quote className={`absolute -top-4 -left-4 h-8 w-8 opacity-20 ${colorClasses.text} ${colorClasses.darkText}`} />
                    </div>
                    
                    <blockquote className="text-slate-700 dark:text-slate-300 italic mb-6 relative z-10">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>
                    
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
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md ${colorClasses.dark} dark:bg-blue-800 text-white`}>
                            <span className="text-lg font-medium">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h3>
                          {(testimonial.position || testimonial.company) && (
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {testimonial.position}
                              {testimonial.position && testimonial.company && ', '}
                              {testimonial.company}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    {testimonial.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white text-xs font-bold rounded-full shadow-md">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="mt-16 text-center opacity-0 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              Bergabunglah dengan ratusan klien yang telah mempercayakan project mereka pada kami.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              asChild
            >
              <Link href="/contact" className="flex items-center">
                Hubungi Kami Sekarang
                <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
              </Link>
            </Button>
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
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '900ms' }}>
            <h2 className="text-4xl font-bold text-white mb-3">Siap Untuk Bergabung?</h2>
            <div className="w-20 h-1 bg-white opacity-60 mx-auto mb-6 rounded-full"></div>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Jadilah bagian dari klien kami yang puas dengan layanan berkualitas tinggi
            </p>
            <div className="mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '1100ms' }}>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 dark:text-blue-700 hover:bg-blue-50 dark:hover:bg-slate-100 px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                asChild
              >
                <Link href="/contact" className="flex items-center">
                  Konsultasi Gratis
                  <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}