"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag } from "lucide-react";

// Define interface for BlogPost
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Placeholder categories - in a real app, you would derive these from blog posts
  const categories = ["Teknologi", "Web Development", "Mobile App", "Akademik", "Tips & Trik"];

  // Format date function
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

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

  // Get random color for each post
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
            <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-6 rounded-full"></div>
            <p className="mt-4 text-xl text-slate-200 max-w-3xl mx-auto">
              Artikel dan tips seputar teknologi, pengembangan web, dan akademik
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Category filter tabs */}
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
      
      {/* Blog posts grid */}
      <div className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-slate-500 bg-slate-100 rounded-2xl opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <p className="text-lg">Belum Ada Artikel</p>
              <p className="mt-2">Kami sedang menyiapkan artikel-artikel menarik untuk Anda. Silakan kunjungi kembali nanti.</p>
              <Button className="mt-8" asChild>
                <Link href="/">Kembali ke Beranda</Link>
              </Button>
            </div>
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
                {posts.map((post: BlogPost, i) => {
                  // Get random color based on post id
                  const color = getRandomColor(post.id);
                  const colors = getColorClasses(color, hoveredId === post.id);
                  
                  return (
                    <motion.div
                      key={post.id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      onMouseEnter={() => setHoveredId(post.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${colors.cardBg} border ${colors.cardBorder} ${colors.shadow}`}
                    >
                      {post.imageUrl && (
                        <div className="relative overflow-hidden group">
                          <div className="aspect-w-16 aspect-h-9">
                            <Image 
                              src={post.imageUrl} 
                              alt={post.title} 
                              width={600}
                              height={337}
                              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center text-sm text-slate-500 mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <time dateTime={post.createdAt.toISOString()}>
                            {formatDate(post.createdAt)}
                          </time>
                          <div className="mx-2">•</div>
                          <Tag className="h-4 w-4 mr-1" />
                          <span>{activeCategory || categories[i % categories.length]}</span>
                        </div>
                        
                        <h2 className={`text-xl font-bold ${colors.cardText} mb-2 hover:underline`}>
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>
                        
                        <p className="text-slate-600 mb-4 line-clamp-3">
                          {post.excerpt || post.content.substring(0, 150)}...
                        </p>
                        
                        <Button 
                          variant="outline" 
                          className={`w-full border-${color}-200 ${colors.cardText} hover:bg-${color}-600 hover:text-white hover:border-${color}-600 group transition-all duration-300`}
                          asChild
                        >
                          <Link href={`/blog/${post.slug}`} className="flex items-center justify-center">
                            <span>Baca Selengkapnya</span>
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
      
      {/* Newsletter section */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-white"></div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Dapatkan Update Terbaru</h2>
            <div className="w-16 h-1 bg-white opacity-60 mx-auto mb-6 rounded-full"></div>
            <p className="text-blue-100 mb-6">
              Berlangganan newsletter kami untuk mendapatkan artikel dan tips terbaru langsung ke inbox Anda.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email Anda"
                className="px-4 py-3 rounded-lg border-0 shadow-lg focus:ring-2 focus:ring-blue-300 flex-grow"
                required
              />
              <Button 
                type="submit"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Berlangganan
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}