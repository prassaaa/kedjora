"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { Toaster } from "sonner";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Add a loading state effect
  useEffect(() => {
    // Simulate a loading state to show the animation
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              className="fixed inset-0 z-50 flex items-center justify-center bg-white"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            </motion.div>
          ) : (
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster position="top-right" />
      
      {/* Add animated cursor effect */}
      <div id="cursor-fx" className="fixed w-5 h-5 rounded-full bg-blue-600 opacity-70 pointer-events-none z-50 hidden md:block"></div>
      
      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
      
      {/* Add cursor animation script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const cursor = document.getElementById('cursor-fx');
            if (cursor) {
              document.addEventListener('mousemove', function(e) {
                cursor.style.transform = 'translate(' + (e.clientX - 10) + 'px, ' + (e.clientY - 10) + 'px)';
              });
            }
          });
        `
      }} />
      
      {/* Add smooth scroll behavior */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Animation classes */
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.7s ease-in-out forwards;
        }
        
        .animate-fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.7s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}