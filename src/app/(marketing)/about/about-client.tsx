"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Define PageContent interface with null types to match Prisma
interface PageContent {
  id: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  imageUrl: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  updatedAt: Date;
}

// Define TeamMember interface
interface TeamMember {
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
}

export default function AboutPageClient({ aboutContent }: { aboutContent?: PageContent }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Placeholder team members - in a real app, you would get these from a database
  const teamMembers: TeamMember[] = [
    {
      name: "Ahmad Rizal",
      position: "CEO & Founder",
      bio: "Berpengalaman lebih dari 8 tahun dalam pengembangan web dan aplikasi.",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Siti Nurlaela",
      position: "UI/UX Designer",
      bio: "Memiliki passion dalam menciptakan pengalaman pengguna yang intuitif dan menarik.",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Budi Santoso",
      position: "Full Stack Developer",
      bio: "Ahli dalam berbagai teknologi web dan mobile, dari frontend hingga backend.",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      name: "Dewi Anggraini",
      position: "Konsultan Akademik",
      bio: "Berpengalaman dalam penelitian dan penulisan akademik di berbagai bidang.",
      imageUrl: "https://randomuser.me/api/portraits/women/4.jpg"
    }
  ];

  // Core values
  const coreValues = [
    {
      title: "Kualitas",
      description: "Kami berkomitmen untuk memberikan hasil dengan kualitas terbaik dalam setiap proyek."
    },
    {
      title: "Integritas",
      description: "Kami menjunjung tinggi kejujuran dan profesionalisme dalam setiap aspek pekerjaan."
    },
    {
      title: "Inovasi",
      description: "Kami selalu mengikuti perkembangan teknologi dan tren terbaru untuk memberikan solusi terbaik."
    },
    {
      title: "Kepuasan Klien",
      description: "Kepuasan klien adalah prioritas utama kami dalam setiap layanan yang kami berikan."
    }
  ];

  // Features/advantages
  const features = [
    "Tim profesional dan berpengalaman",
    "Kualitas hasil yang terjamin",
    "Harga kompetitif dan transparan",
    "Revisi hingga klien puas",
    "Support berkelanjutan",
    "Berorientasi pada solusi"
  ];

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
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <>
      {/* Hero section */}
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
            <h1 className="text-5xl font-bold text-white mb-4">
              {aboutContent?.title || "Tentang Kedjora"}
            </h1>
            <div className="w-24 h-1 bg-blue-400 dark:bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="mt-4 text-xl text-slate-200 max-w-3xl mx-auto">
              {aboutContent?.subtitle || "Solusi digital terbaik untuk bisnis dan kebutuhan akademik Anda"}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Kisah Kami</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-300">
                  {aboutContent?.content || 
                    "Kedjora adalah penyedia layanan digital profesional yang berkomitmen memberikan solusi berkualitas tinggi untuk kebutuhan digital dan akademik. Didirikan dengan visi untuk membantu bisnis dan individu dalam transformasi digital, kami telah melayani berbagai klien dari berbagai sektor industri."}
                </p>
                <p className="text-slate-600 dark:text-slate-300 mt-4">
                  Kami memahami bahwa setiap klien memiliki kebutuhan unik, oleh karena itu kami menawarkan layanan yang dapat disesuaikan untuk memenuhi kebutuhan spesifik Anda. Dengan tim yang terdiri dari profesional berpengalaman di bidangnya, kami siap membantu Anda mewujudkan ide dan proyek Anda.
                </p>
                <p className="text-slate-600 dark:text-slate-300 mt-4">
                  Dari pengembangan website dan aplikasi hingga bantuan tugas akademik, kami menawarkan solusi komprehensif dengan standar kualitas tertinggi. Kami percaya bahwa kesuksesan klien adalah kesuksesan kami.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="rounded-lg overflow-hidden shadow-2xl relative"
            >
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-yellow-400 dark:bg-yellow-500 rounded-lg opacity-20 -z-10"></div>
              <div className="absolute -top-4 -left-4 w-36 h-36 bg-blue-400 dark:bg-blue-500 rounded-lg opacity-20 -z-10"></div>
              <Image 
                src={aboutContent?.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"} 
                alt="Tim Kedjora" 
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </div>
          
          {/* Core Values */}
          <div className="mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Nilai-Nilai Kami</h2>
              <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto my-6 rounded-full"></div>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Prinsip yang menjadi landasan kami dalam memberikan layanan terbaik
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "p-8 rounded-2xl border transition-all duration-300",
                    hoveredIndex === index 
                      ? "border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-slate-800" 
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors duration-300",
                    hoveredIndex === index 
                      ? "bg-blue-600 dark:bg-blue-700" 
                      : "bg-blue-100 dark:bg-blue-900"
                  )}>
                    <span className={cn(
                      "text-xl font-bold transition-colors duration-300",
                      hoveredIndex === index 
                        ? "text-white" 
                        : "text-blue-600 dark:text-blue-400"
                    )}>{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Why Choose Us */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 dark:bg-blue-600 rounded-full opacity-20 -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 dark:bg-blue-600 rounded-full opacity-20 translate-y-1/2 -translate-x-1/4"></div>
                <h2 className="text-3xl font-bold mb-6 relative z-10">Mengapa Memilih Kami?</h2>
                <p className="text-blue-100 mb-8 relative z-10">
                  Kami membedakan diri dengan pendekatan yang berfokus pada kualitas dan kepuasan klien. Inilah alasan mengapa klien memilih Kedjora:
                </p>
                <ul className="space-y-4 relative z-10">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                      className="flex items-start"
                    >
                      <CheckCircle2 className="h-5 w-5 text-blue-200 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Fokus Pada Solusi</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Kami tidak hanya menyediakan layanan, tapi juga memberikan solusi untuk kebutuhan Anda. Kami memahami bahwa setiap klien adalah unik, dengan tantangan dan tujuan yang berbeda.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Analisis Kebutuhan</h3>
                    <p className="text-slate-600 dark:text-slate-300">Kami memulai dengan memahami kebutuhan dan tujuan bisnis Anda</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Solusi Kustom</h3>
                    <p className="text-slate-600 dark:text-slate-300">Merancang solusi yang sesuai dengan kebutuhan spesifik Anda</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Pengerjaan Profesional</h3>
                    <p className="text-slate-600 dark:text-slate-300">Tim ahli kami mengerjakan proyek dengan standar kualitas tinggi</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white group transition-all duration-300"
                  asChild
                >
                  <Link href="/services" className="flex items-center">
                    <span>Lihat Layanan Kami</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Team Section */}
          <div className="mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Tim Kami</h2>
              <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto my-6 rounded-full"></div>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Mengenal para profesional di balik Kedjora
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 text-center"
                >
                  <div className="relative aspect-square bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <Image 
                      src={member.imageUrl} 
                      alt={member.name} 
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 mb-3">{member.position}</p>
                    <p className="text-slate-600 dark:text-slate-300">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-4xl font-bold text-white mb-3">Siap Untuk Bekerja Sama?</h2>
            <div className="w-20 h-1 bg-white opacity-60 mx-auto mb-6 rounded-full"></div>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Diskusikan kebutuhan Anda dan temukan solusi terbaik untuk bisnis atau proyek Anda.
            </p>
            <div className="mt-8">
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
          </motion.div>
        </div>
      </div>
    </>
  );
}