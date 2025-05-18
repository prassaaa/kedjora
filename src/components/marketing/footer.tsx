import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Github } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-1 mr-1">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-400 dark:text-blue-300">Kedjora</h2>
            </div>
            <p className="text-slate-400 dark:text-slate-500">
              Solusi digital untuk bisnis dan kebutuhan akademik Anda. Kami membantu mewujudkan ide menjadi kenyataan.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github size={20} />
              </Link>
            </div>
            
            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-2 pt-2">
              <span className="text-sm text-slate-400">Mode Tampilan:</span>
              <ThemeToggle />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-slate-200">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors">
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-slate-200">Layanan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/web-development" className="text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors">
                  Pembuatan Website
                </Link>
              </li>
              <li>
                <Link href="/services/app-development" className="text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors">
                  Pengembangan Aplikasi
                </Link>
              </li>
              <li>
                <Link href="/services/academic-assistance" className="text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors">
                  Jasa Tugas Kuliah
                </Link>
              </li>
              <li>
                <Link href="/services/thesis" className="text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors">
                  Penulisan Skripsi
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-slate-200">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-blue-400 dark:text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 dark:text-slate-500">
                  Jl. Contoh No. 123, Jakarta, Indonesia
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-400 dark:text-blue-500 flex-shrink-0" />
                <span className="text-slate-400 dark:text-slate-500">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400 dark:text-blue-500 flex-shrink-0" />
                <span className="text-slate-400 dark:text-slate-500">info@kedjora.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 dark:border-slate-900 mt-12 pt-8 text-center text-slate-400 dark:text-slate-500 text-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p>© {currentYear} Kedjora. All rights reserved.</p>
            <div className="mt-4 sm:mt-0 flex space-x-4">
              <Link href="/privacy-policy" className="text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white dark:hover:text-slate-200 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}