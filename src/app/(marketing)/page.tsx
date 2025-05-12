import Hero from "@/components/marketing/hero";
import ServicesShowcase from "@/components/marketing/services-showcase";
import FeaturesSection from "@/components/marketing/features-section";
import TestimonialsSection from "@/components/marketing/testimonials-section";
import CTASection from "@/components/marketing/cta-section";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import prisma from "@/lib/db";

// Definisikan interface untuk item Portfolio sesuai dengan model Prisma Anda
interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  clientName: string | null;
  serviceType: string;
  imageUrls: string; // JSON string yang akan di-parse
  featured: boolean;
  technologies: string; // JSON string yang akan di-parse
  demoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default async function HomePage() {
  // Fetch services from database
  const services = await prisma.service.findMany({
    where: {
      isActive: true
    },
    orderBy: [
      {
        isPopular: 'desc'
      },
      {
        createdAt: 'desc'
      }
    ],
    take: 4 // Hanya tampilkan 4 layanan di homepage
  });

  // Fetch featured portfolio items
  const featuredPortfolio = await prisma.portfolio.findMany({
    where: {
      featured: true
    },
    take: 3
  });

  return (
    <>
      <Hero />
      
      <ServicesShowcase services={services} />
      
      <FeaturesSection />
      
      {/* Featured Portfolio Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Portfolio Terbaru</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-slate-600">
              Beberapa proyek terbaik yang telah kami kerjakan
            </p>
          </div>
          
          {featuredPortfolio.length === 0 ? (
            <div className="text-center py-16 text-slate-500 bg-slate-100 rounded-2xl opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <p className="text-lg">Portfolio sedang dalam tahap pengembangan.</p>
              <p className="mt-2">Silakan kunjungi kembali nanti.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPortfolio.map((item: Portfolio, i) => {
                // Parse imageUrls dari JSON string menjadi array
                const imageUrls = JSON.parse(item.imageUrls) as string[];
                // Parse technologies dari JSON string menjadi array
                const technologies = JSON.parse(item.technologies) as string[];
                
                // Compute animation delay based on index
                const delay = i * 150;
                
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:border-blue-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 opacity-0 animate-fade-up"
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    <div className="relative overflow-hidden group">
                      {imageUrls[0] ? (
                        <>
                          <div className="aspect-w-16 aspect-h-9 bg-slate-200 overflow-hidden">
                            <Image 
                              src={imageUrls[0]} 
                              alt={item.title} 
                              width={600}
                              height={400}
                              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </>
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-slate-200 text-slate-600">
                          <span className="text-lg font-medium">No Image</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md">
                          {item.serviceType}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-600 mb-4 line-clamp-2">{item.description}</p>
                      
                      {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                              {tech}
                            </span>
                          ))}
                          {technologies.length > 3 && (
                            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                              +{technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 group transition-all duration-300"
                        asChild
                      >
                        <Link href={`/portfolio/${item.slug}`} className="flex items-center justify-center">
                          <span>Lihat Detail</span>
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="text-center mt-16 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              asChild
            >
              <Link href="/portfolio" className="flex items-center">
                Lihat Semua Portfolio
                <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      <CTASection />
    </>
  );
}