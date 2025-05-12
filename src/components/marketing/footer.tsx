import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-400">Kedjora</h2>
            <p className="text-slate-400">
              Solusi digital untuk bisnis dan kebutuhan akademik Anda. Kami membantu mewujudkan ide menjadi kenyataan.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white transition-colors">
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-slate-400 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/web-development" className="text-slate-400 hover:text-white transition-colors">
                  Pembuatan Website
                </Link>
              </li>
              <li>
                <Link href="/services/app-development" className="text-slate-400 hover:text-white transition-colors">
                  Pengembangan Aplikasi
                </Link>
              </li>
              <li>
                <Link href="/services/academic-assistance" className="text-slate-400 hover:text-white transition-colors">
                  Jasa Tugas Kuliah
                </Link>
              </li>
              <li>
                <Link href="/services/thesis" className="text-slate-400 hover:text-white transition-colors">
                  Penulisan Skripsi
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Jl. Contoh No. 123, Jakarta, Indonesia
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400">info@kedjora.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
          <p>© {currentYear} Kedjora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}