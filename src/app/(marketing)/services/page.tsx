import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Code, Smartphone, GraduationCap, FileText, ArrowRight } from "lucide-react";
import prisma from "@/lib/db";

// Definisikan interface untuk Service
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

// Definisikan tipe untuk iconMap yang lebih spesifik
type IconComponent = typeof Code | typeof Smartphone | typeof GraduationCap | typeof FileText;
type IconMap = Record<string, IconComponent>;

export const metadata = {
  title: "Layanan - Kedjora",
  description: "Berbagai layanan yang kami tawarkan: pembuatan website, aplikasi, joki tugas, dan penulisan skripsi.",
};

export default async function ServicesPage() {
  // Fetch all active services
  const services = await prisma.service.findMany({
    where: {
      isActive: true
    },
    orderBy: [
      {
        isPopular: 'desc'
      },
      {
        title: 'asc'
      }
    ]
  });

  // Mapping icon berdasarkan slug
  const getIconBySlug = (slug: string) => {
    const iconMap: IconMap = {
      "web-development": Code,
      "app-development": Smartphone,
      "academic-assistance": GraduationCap,
      "thesis": FileText,
    };
    
    // Find partial match
    const slugKey = Object.keys(iconMap).find(key => slug.includes(key));
    return slugKey ? iconMap[slugKey] : Code; // Default to Code if no match
  };

  // Mendapatkan kategori layanan
  const getCategories = () => {
    const categories: string[] = [];
    services.forEach(service => {
      const slug = service.slug;
      let category = "";
      
      if (slug.includes("web")) category = "Website";
      else if (slug.includes("app")) category = "Aplikasi";
      else if (slug.includes("academic")) category = "Akademik";
      else if (slug.includes("thesis")) category = "Skripsi";
      else category = "Lainnya";
      
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
    
    return categories;
  };

  const categories = getCategories();

  return (
    <>
      {/* Hero section */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-950 dark:to-blue-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 dark:bg-blue-600 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 dark:bg-purple-600 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative">
            <h1 className="text-5xl font-bold text-white mb-4 opacity-0 animate-fade-in">Layanan Kami</h1>
            <div className="w-24 h-1 bg-blue-400 dark:bg-blue-500 mx-auto mb-6 rounded-full opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}></div>
            <p className="mt-4 text-xl text-slate-200 max-w-3xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
              Solusi lengkap untuk kebutuhan digital dan akademik Anda dengan standar kualitas tertinggi.
            </p>
          </div>
        </div>
      </div>
      
      {/* Category filter */}
      {categories.length > 1 && (
        <div className="bg-slate-50 dark:bg-slate-900 py-8 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <Link 
                href="#semua" 
                className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Semua Layanan
              </Link>
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`#${category.toLowerCase()}`}
                  className="px-5 py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Services grid */}
      <div className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-2xl opacity-0 animate-fade-in" style={{ animationDelay: '700ms' }}>
                <p className="text-lg">Belum ada layanan yang tersedia.</p>
                <p className="mt-2">Silakan kunjungi kembali nanti.</p>
              </div>
            ) : (
              services.map((service: Service, i) => {
                // Parse features dari JSON string menjadi array
                const features = JSON.parse(service.features) as string[];
                const ServiceIcon = getIconBySlug(service.slug);
                
                return (
                  <div
                    key={service.id}
                    id={service.slug}
                    className={`opacity-0 animate-fade-up`}
                    style={{ animationDelay: `${700 + (i * 150)}ms` }}
                  >
                    <Card 
                      className={`h-full flex flex-col overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                        service.isPopular 
                          ? 'border-blue-200 dark:border-blue-800 shadow-lg' 
                          : 'border-slate-200 dark:border-slate-700 shadow'
                      } dark:bg-slate-900`}
                    >
                      {service.isPopular && (
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 text-center">
                          Layanan Populer
                        </div>
                      )}
                      <CardHeader className="relative pb-2">
                        <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                          <ServiceIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{service.title}</CardTitle>
                        <p className="text-slate-600 dark:text-slate-300 mt-2">{service.description}</p>
                      </CardHeader>
                      <CardContent className="flex-grow pt-4">
                        <ul className="space-y-3">
                          {features.slice(0, 5).map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 mr-3 flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                            </li>
                          ))}
                          {features.length > 5 && (
                            <li className="text-sm font-medium text-blue-600 dark:text-blue-400 ml-8">
                              +{features.length - 5} fitur lainnya
                            </li>
                          )}
                        </ul>
                        {service.price && (
                          <div className="mt-6 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Mulai dari</span>
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              {service.price}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                        <Button 
                          className="w-full bg-slate-900 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 group transition-colors duration-300" 
                          asChild
                        >
                          <Link href={`/services/${service.slug}`} className="flex items-center justify-center">
                            <span>Lihat Detail</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white"></div>
          </div>
          
          <div className="relative">
            <div className="max-w-3xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '900ms' }}>
              <h2 className="text-3xl font-bold text-white mb-3">Punya Pertanyaan?</h2>
              <div className="w-16 h-1 bg-white opacity-60 mx-auto mb-6 rounded-full"></div>
              <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                Jika Anda memiliki pertanyaan atau ingin konsultasi terkait layanan kami, silakan hubungi kami.
              </p>
              <div className="mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '1100ms' }}>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-700 hover:bg-blue-50 dark:hover:bg-slate-100 px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  asChild
                >
                  <Link href="/contact" className="flex items-center">
                    Hubungi Kami
                    <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}