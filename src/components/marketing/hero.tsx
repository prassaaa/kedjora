"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-slate-900 dark:bg-slate-950 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 dark:bg-blue-700 rounded-full opacity-10 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 dark:bg-purple-700 rounded-full opacity-10 translate-y-1/2 -translate-x-1/4" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              <span className="block">Wujudkan Ide Anda</span>
              <span className="block text-blue-400 dark:text-blue-300">Bersama Kedjora</span>
            </h1>
            <p className="mt-6 text-xl text-slate-300 max-w-xl">
              Layanan pembuatan website, aplikasi, joki tugas kuliah, sempro, dan skripsi dengan kualitas terbaik dan harga terjangkau.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
              size="lg"
              className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
              asChild
              >
              <Link href="/contact" className="dark:text-white">
                Konsultasi Gratis
              </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-slate-900 border-white hover:bg-slate-100 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700" asChild>
                <Link href="/services" className="flex items-center">
                  Lihat Layanan
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-w-16 aspect-h-9 bg-slate-800 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 opacity-80 absolute"></div>
                <div className="relative z-10 text-center p-6">
                  <div className="flex justify-center items-center mb-4">
                    <Image 
                      src="/logo.png" 
                      alt="Kedjora Logo" 
                      width={100} 
                      height={100}
                      className="object-contain" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Kediri Jorah [Kedjora]</h3>
                  <p className="mt-2 text-white opacity-90">Menerangi jalan digital Anda dari Kediri ke dunia</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-yellow-400 dark:bg-yellow-500 rounded-lg opacity-20 -z-10"></div>
            <div className="absolute -top-4 -left-4 w-36 h-36 bg-blue-400 dark:bg-blue-500 rounded-lg opacity-20 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}