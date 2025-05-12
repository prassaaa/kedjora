"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { Toaster } from "sonner";

const CursorEffect = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor-fx');
    if (cursor) {
      const handleMouseMove = (e: MouseEvent) => {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);
  
  return (
    <div id="cursor-fx" className="fixed w-5 h-5 rounded-full bg-blue-600 opacity-70 pointer-events-none z-50 hidden md:block" />
  );
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(children);

  // Improved navigation loading
  useEffect(() => {
    let isMounted = true;
    let loadingTimeout: NodeJS.Timeout | null = null;

    const minLoadingDelay = 200; 
    
    setContent(children); 

    loadingTimeout = setTimeout(() => {
      if (isMounted) {
        setIsLoading(true);
      }
    }, minLoadingDelay);

    const navigationTime = 100;
    setTimeout(() => {
      if (isMounted) {
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
          loadingTimeout = null;
        }
        setIsLoading(false);
      }
    }, navigationTime);
    
    return () => {
      isMounted = false;
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [pathname, children]);

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
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster position="top-right" />
      
      {/* Komponen cursor effect terpisah */}
      <CursorEffect />
      
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
    </div>
  );
}