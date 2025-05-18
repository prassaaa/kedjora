"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Smartphone, GraduationCap, FileText, CheckCircle2, ArrowRight } from "lucide-react";

// Definisikan tipe untuk Service
type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string; // JSON string yang akan di-parse
  imageUrl: string | null;
  price: string | null;
  isPopular: boolean;
  isActive: boolean;
};

// Definisikan tipe untuk IconComponent
type IconComponent = typeof Code | typeof Smartphone | typeof GraduationCap | typeof FileText;
type IconMap = Record<string, IconComponent>;

// Definisikan tipe untuk props komponen
interface ServicesShowcaseProps {
  services: Service[];
}

export default function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Mendapatkan kategori unik dari layanan
  const categories = Array.from(
    new Set(services.map(service => {
      const slug = service.slug;
      if (slug.includes("web")) return "web";
      if (slug.includes("app")) return "app";
      if (slug.includes("academic")) return "academic";
      if (slug.includes("thesis")) return "thesis";
      return "other";
    }))
  );

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

  // Filter services berdasarkan tab yang aktif
  const filteredServices = activeTab
    ? services.filter(service => {
        if (activeTab === "web") return service.slug.includes("web");
        if (activeTab === "app") return service.slug.includes("app");
        if (activeTab === "academic") return service.slug.includes("academic");
        if (activeTab === "thesis") return service.slug.includes("thesis");
        return true;
      })
    : services;

  // Mapping nama kategori untuk tampilan
  const getCategoryName = (category: string) => {
    switch (category) {
      case "web": return "Website";
      case "app": return "Aplikasi";
      case "academic": return "Akademik";
      case "thesis": return "Skripsi";
      default: return "Lainnya";
    }
  };

  // Animasi untuk kartu
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -15, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };
  
  return (
    <div className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Layanan Kami</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Solusi lengkap untuk kebutuhan digital dan akademik Anda dengan standar kualitas tertinggi.
          </p>
        </motion.div>

        {/* Filter tabs */}
        {categories.length > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <button
              onClick={() => setActiveTab(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === null
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              Semua
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab || "all"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredServices.map((service: Service, index) => {
              // Parse features dari JSON string menjadi array
              const features = JSON.parse(service.features) as string[];
              const ServiceIcon = getIconBySlug(service.slug);
              
              return (
                <motion.div
                  key={service.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative"
                >
                  {service.isPopular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10 shadow-md">
                      POPULER
                    </div>
                  )}
                  <Card className="h-full flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700 relative z-0 bg-white dark:bg-slate-900 backdrop-blur-sm">
                    <CardHeader className="relative pb-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${hoveredId === service.id ? 'bg-blue-600' : 'bg-blue-100 dark:bg-blue-900'}`}>
                        <ServiceIcon className={`h-8 w-8 transition-all duration-300 ${hoveredId === service.id ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow pt-0">
                      <ul className="space-y-4">
                        {/* Hanya menampilkan 2 fitur */}
                        {features.slice(0, 2).map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                          >
                            <div className={`p-1.5 rounded-full mr-3 transition-colors duration-300 ${hoveredId === service.id ? 'bg-blue-100 dark:bg-blue-900' : 'bg-slate-100 dark:bg-slate-800'}`}>
                              <CheckCircle2 className={`h-5 w-5 ${hoveredId === service.id ? 'text-blue-600 dark:text-blue-400' : 'text-green-500 dark:text-green-400'}`} />
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                          </motion.li>
                        ))}
                        {features.length > 2 && (
                          <li className="text-sm font-medium text-blue-600 dark:text-blue-400 ml-9">
                            +{features.length - 2} fitur lainnya
                          </li>
                        )}
                      </ul>
                      {service.price && (
                        <div className="mt-6 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <span className="text-sm text-slate-500 dark:text-slate-400">Mulai dari</span>
                          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {service.price}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-4 bg-slate-50 dark:bg-slate-800 mt-4">
                      <Button 
                        variant="outline" 
                        className={`w-full border transition-all duration-300 group ${
                          hoveredId === service.id 
                            ? 'border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-800 hover:text-white'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                        asChild
                      >
                        <Link href={`/services/${service.slug}`} className="flex items-center justify-center">
                          <span>Selengkapnya</span>
                          <ArrowRight className={`ml-2 h-4 w-4 transition-all duration-300 ${
                            hoveredId === service.id ? 'group-hover:translate-x-1' : ''
                          }`} />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-16"
        >
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            asChild
          >
            <Link href="/services" className="flex items-center">
              Lihat Semua Layanan
              <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}