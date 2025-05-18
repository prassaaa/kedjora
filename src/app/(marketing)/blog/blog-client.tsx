"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

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

  // Card animation variants
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

  return (
    <>
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-950 dark:to-blue-950 py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 dark:bg-blue-700 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500 dark:bg-purple-700 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
            <div className="w-24 h-1 bg-blue-400 dark:bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="mt-4 text-xl text-slate-200 max-w-3xl mx-auto">
              Artikel dan tips seputar teknologi, pengembangan web, dan akademik
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Category filter tabs */}
      <div className="bg-slate-50 dark:bg-slate-900 py-8 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === null
                  ? "bg-blue-600 dark:bg-blue-700 text-white shadow-md"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
              )}
            >
              Semua Kategori
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === category
                    ? "bg-blue-600 dark:bg-blue-700 text-white shadow-md"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Blog posts grid */}
      <div className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-2xl opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
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
                  const isHovered = hoveredId === post.id;
                  
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
                      className={cn(
                        "rounded-2xl overflow-hidden border transition-all duration-500 shadow-lg",
                        color === 'blue' ? "border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-slate-800/80" : "",
                        color === 'indigo' ? "border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-slate-800/80" : "",
                        color === 'purple' ? "border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-slate-800/80" : "",
                        color === 'rose' ? "border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-slate-800/80" : "",
                        color === 'amber' ? "border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-slate-800/80" : "",
                        color === 'emerald' ? "border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-slate-800/80" : "",
                        color === 'teal' ? "border-teal-200 dark:border-teal-900 bg-teal-50 dark:bg-slate-800/80" : "",
                        isHovered ? (
                          color === 'blue' ? "border-blue-600 dark:border-blue-500 bg-blue-100 dark:bg-slate-800" : 
                          color === 'indigo' ? "border-indigo-600 dark:border-indigo-500 bg-indigo-100 dark:bg-slate-800" : 
                          color === 'purple' ? "border-purple-600 dark:border-purple-500 bg-purple-100 dark:bg-slate-800" : 
                          color === 'rose' ? "border-rose-600 dark:border-rose-500 bg-rose-100 dark:bg-slate-800" : 
                          color === 'amber' ? "border-amber-600 dark:border-amber-500 bg-amber-100 dark:bg-slate-800" : 
                          color === 'emerald' ? "border-emerald-600 dark:border-emerald-500 bg-emerald-100 dark:bg-slate-800" : 
                          "border-teal-600 dark:border-teal-500 bg-teal-100 dark:bg-slate-800"
                        ) : ""
                      )}
                    >
                      <div className="relative overflow-hidden group">
                        {post.imageUrl && (
                          <>
                            <div className="aspect-w-16 aspect-h-9 bg-slate-200 dark:bg-slate-700">
                              <Image 
                                src={post.imageUrl} 
                                alt={post.title} 
                                width={600}
                                height={337}
                                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <time dateTime={post.createdAt.toISOString()}>
                            {formatDate(post.createdAt)}
                          </time>
                          <div className="mx-2">•</div>
                          <Tag className="h-4 w-4 mr-1" />
                          <span>{activeCategory || categories[i % categories.length]}</span>
                        </div>
                        
                        <h2 className={cn(
                          "text-xl font-bold mb-2 hover:underline",
                          color === 'blue' ? "text-blue-600 dark:text-blue-400" : "",
                          color === 'indigo' ? "text-indigo-600 dark:text-indigo-400" : "",
                          color === 'purple' ? "text-purple-600 dark:text-purple-400" : "",
                          color === 'rose' ? "text-rose-600 dark:text-rose-400" : "",
                          color === 'amber' ? "text-amber-600 dark:text-amber-400" : "",
                          color === 'emerald' ? "text-emerald-600 dark:text-emerald-400" : "",
                          color === 'teal' ? "text-teal-600 dark:text-teal-400" : ""
                        )}>
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>
                        
                        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                          {post.excerpt || post.content.substring(0, 150)}...
                        </p>
                        
                        <Button 
                          variant="outline" 
                          className={cn(
                            "w-full group transition-all duration-300",
                            color === 'blue' ? "border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white hover:border-blue-600 dark:hover:border-blue-700" : "",
                            color === 'indigo' ? "border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 dark:hover:bg-indigo-700 hover:text-white hover:border-indigo-600 dark:hover:border-indigo-700" : "",
                            color === 'purple' ? "border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-600 dark:hover:bg-purple-700 hover:text-white hover:border-purple-600 dark:hover:border-purple-700" : "",
                            color === 'rose' ? "border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-600 dark:hover:bg-rose-700 hover:text-white hover:border-rose-600 dark:hover:border-rose-700" : "",
                            color === 'amber' ? "border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-600 dark:hover:bg-amber-700 hover:text-white hover:border-amber-600 dark:hover:border-amber-700" : "",
                            color === 'emerald' ? "border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 dark:hover:bg-emerald-700 hover:text-white hover:border-emerald-600 dark:hover:border-emerald-700" : "",
                            color === 'teal' ? "border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400 hover:bg-teal-600 dark:hover:bg-teal-700 hover:text-white hover:border-teal-600 dark:hover:border-teal-700" : ""
                          )}
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
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-700 dark:to-blue-800 py-16 relative overflow-hidden">
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
                className="px-4 py-3 rounded-lg border-0 shadow-lg focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 dark:bg-slate-800 dark:text-white flex-grow"
                required
              />
              <Button 
                type="submit"
                className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-slate-200 dark:hover:bg-white dark:text-blue-700 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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