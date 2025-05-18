"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Main navigation items
const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Layanan", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Tentang", href: "/about" },
  { name: "Kontak", href: "/contact" },
];

// Dropdown contents for the Services menu
const servicesDropdown = [
  { name: "Web Development", href: "/services/web-development", icon: "🌐" },
  { name: "App Development", href: "/services/app-development", icon: "📱" },
  { name: "Academic Assistance", href: "/services/academic-assistance", icon: "🎓" },
  { name: "Thesis Writing", href: "/services/thesis", icon: "📝" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Detect scroll for shadow effect on header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Toggle dropdown menu
  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <header className={cn(
      "bg-white/95 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300",
      scrolled ? "shadow-lg dark:shadow-slate-800/20 py-2" : "py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-1 mr-2">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-400 bg-clip-text text-transparent">Kedjora</span>
              </div>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href));
              
              // Special handling for Services dropdown
              if (item.name === "Layanan") {
                return (
                  <div key={item.name} className="relative group">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center",
                        isActive 
                          ? "text-blue-600 dark:text-blue-400" 
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800"
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.name ? "rotate-180" : ""
                      )} />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-1 w-60 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black dark:ring-slate-700 ring-opacity-5 z-10"
                        >
                          <div className="py-1">
                            {servicesDropdown.map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                className={cn(
                                  "px-4 py-2 text-sm transition-colors flex items-center",
                                  pathname.startsWith(service.href)
                                    ? "bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-300"
                                )}
                              >
                                <span className="mr-2">{service.icon}</span>
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive 
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800" 
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <ThemeToggle />
            
            <Button 
              size="sm" 
              className="ml-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" 
              asChild
            >
              <Link href="/contact">
                Konsultasi Gratis
              </Link>
            </Button>
          </nav>
          
          {/* Mobile menu button and theme toggle */}
          <div className="flex items-center md:hidden gap-2">
            <ThemeToggle />
            
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 focus:outline-none transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="block h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="block h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-slate-900 shadow-xl dark:shadow-slate-800/20">
              {navigation.map((item, i) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname.startsWith(item.href));
                
                // Special handling for Services dropdown in mobile view
                if (item.name === "Layanan") {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={cn(
                          "w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium",
                          isActive 
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800" 
                            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          activeDropdown === item.name ? "rotate-180" : ""
                        )} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="mt-1 ml-4 space-y-1 border-l-2 border-blue-100 dark:border-blue-900 pl-4"
                          >
                            {servicesDropdown.map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                className={cn(
                                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                  pathname.startsWith(service.href)
                                    ? "bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                                )}
                              >
                                <span className="mr-2">{service.icon}</span>
                                {service.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium",
                        isActive 
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800" 
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navigation.length * 0.05 }}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 mt-2" 
                  asChild
                >
                  <Link href="/contact" className="flex items-center justify-center">
                    Konsultasi Gratis
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}