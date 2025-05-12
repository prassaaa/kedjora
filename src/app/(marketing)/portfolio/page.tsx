"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Definisikan interface Portfolio untuk memberikan tipe pada parameter
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

export const metadata = {
  title: "Portfolio - Kedjora",
  description: "Proyek-proyek terbaik yang telah kami kerjakan - Kedjora",
};

export default function PortfolioPage({ portfolios }: { portfolios: Portfolio[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(
    new Set(
      portfolios.map((portfolio) => {
        return portfolio.serviceType;
      })
    )
  );

  // Filter portfolios based on active category
  const filteredPortfolios = activeCategory
    ? portfolios.filter((portfolio) => portfolio.serviceType === activeCategory)
    : portfolios;

  // Card variants for animations
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

  // Get random color for each portfolio
  const getRandomColor = (id: string) => {
    const colors = ['blue', 'indigo', 'purple', 'rose', 'amber', 'emerald', 'teal'];
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Dynamic color handler function
  const getColorClasses = (color: string, isHovered: boolean) => {
    const baseClasses = {
      blue: {
        bg: "bg-blue-50",
        bgHover: "bg-blue-100",
        border: "border-blue-200",
        borderHover: "border-blue-600",
        textColor: "text-blue-600",
        shadow: "shadow-blue-200/50"
      },
      indigo: {
        bg: "bg-indigo-50",
        bgHover: "bg-indigo-100",
        border: "border-indigo-200",
        borderHover: "border-indigo-600",
        textColor: "text-indigo-600",
        shadow: "shadow-indigo-200/50"
      },
      purple: {
        bg: "bg-purple-50",
        bgHover: "bg-purple-100",
        border: "border-purple-200",
        borderHover: "border-purple-600",
        textColor: "text-purple-600",
        shadow: "shadow-purple-200/50"
      },
      rose: {
        bg: "bg-rose-50",
        bgHover: "bg-rose-100",
        border: "border-rose-200",
        borderHover: "border-rose-600",
        textColor: "text-rose-600",
        shadow: "shadow-rose-200/50"
      },
      amber: {
        bg: "bg-amber-50",
        bgHover: "bg-amber-100",
        border: "border-amber-200",
        borderHover: "border-amber-600",
        textColor: "text-amber-600",
        shadow: "shadow-amber-200/50"
      },
      emerald: {
        bg: "bg-emerald-50",
        bgHover: "bg-emerald-100",
        border: "border-emerald-200",
        borderHover: "border-emerald-600",
        textColor: "text-emerald-600",
        shadow: "shadow-emerald-200/50"
      },
      teal: {
        bg: "bg-teal-50",
        bgHover: "bg-teal-100",
        border: "border-teal-200",
        borderHover: "border-teal-600",
        textColor: "text-teal-600",
        shadow: "shadow-teal-200/50"
      }
    };

    const colors = baseClasses[color as keyof typeof baseClasses];

    return {
      cardBg: isHovered ? colors.bgHover : colors.bg,
      cardBorder: isHovered ? colors.borderHover : colors.border,
      cardText: colors.textColor,
      shadow: colors.shadow
    };
  };

  return (
    <>
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4">Portfolio</h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-6 rounded-full"></div>
            <p className="mt-4 text-xl text-slate-200 max-w-3xl mx-auto">
              Beberapa proyek terbaik yang telah kami kerjakan untuk klien
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Category filter tabs */}
      {categories.length > 1 && (
        <div className="bg-slate-50 py-8 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-2"
            >
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === null
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                Semua Kategori
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      )}
      
      {/* Portfolio grid */}
      <div className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {portfolios.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 text-slate-500 bg-slate-100 rounded-2xl"
            >
              <p className="text-lg">Portfolio sedang dalam tahap pengembangan. Silakan kunjungi kembali nanti.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory || "all"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPortfolios.map((portfolio: Portfolio, i) => {
                  // Parse imageUrls dari JSON string menjadi array
                  const imageUrls = JSON.parse(portfolio.imageUrls) as string[];
                  
                  // Parse technologies dari JSON string menjadi array
                  const technologies = JSON.parse(portfolio.technologies) as string[];
                  
                  // Get random color based on portfolio id
                  const color = getRandomColor(portfolio.id);
                  const colors = getColorClasses(color, hoveredId === portfolio.id);
                  
                  return (
                    <motion.div
                      key={portfolio.id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      onMouseEnter={() => setHoveredId(portfolio.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${colors.cardBg} border ${colors.cardBorder} ${colors.shadow}`}
                    >
                      <div className="relative overflow-hidden group">
                        {imageUrls[0] ? (
                          <>
                            <div className="aspect-w-16 aspect-h-9">
                              <Image 
                                src={imageUrls[0] || 'https://placehold.co/600x400/3b82f6/ffffff?text=No+Image'} 
                                alt={portfolio.title} 
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
                          <span className={`px-3 py-1 ${colors.cardText} bg-white/80 backdrop-blur-sm text-xs font-bold rounded-full shadow-md`}>
                            {portfolio.serviceType}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className={`text-xl font-bold ${colors.cardText} mb-2`}>{portfolio.title}</h3>
                        <p className="text-slate-600 mb-4 line-clamp-2">{portfolio.description}</p>
                        
                        {technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-5">
                            {technologies.slice(0, 3).map((tech, idx) => (
                              <span key={idx} className="px-2 py-1 bg-white/60 text-slate-700 text-xs rounded-full border border-slate-200">
                                {tech}
                              </span>
                            ))}
                            {technologies.length > 3 && (
                              <span className="px-2 py-1 bg-white/60 text-slate-700 text-xs rounded-full border border-slate-200">
                                +{technologies.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                        
                        <Button 
                          variant="outline" 
                          className={`w-full border-${color}-200 ${colors.cardText} hover:bg-${color}-600 hover:text-white hover:border-${color}-600 group transition-all duration-300`}
                          asChild
                        >
                          <Link href={`/portfolio/${portfolio.slug}`} className="flex items-center justify-center">
                            <span>Lihat Detail</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 relative overflow-hidden">
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
            <h2 className="text-4xl font-bold text-white mb-3">Siap Memulai Proyek Anda?</h2>
            <div className="w-20 h-1 bg-white opacity-60 mx-auto mb-6 rounded-full"></div>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Konsultasikan kebutuhan Anda dengan tim kami dan dapatkan solusi terbaik.
            </p>
            <div className="mt-8">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                asChild
              >
                <Link href="/contact" className="flex items-center">
                  Hubungi Kami
                  <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}