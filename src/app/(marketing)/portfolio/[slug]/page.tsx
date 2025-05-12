import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, Users } from "lucide-react";
import prisma from "@/lib/db";

// Definisikan interface Portfolio untuk memberikan tipe pada relatedPortfolio
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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { slug: params.slug }
  });
  
  if (!portfolio) {
    return {
      title: "Portfolio Tidak Ditemukan - Kedjora",
      description: "Portfolio yang Anda cari tidak ditemukan.",
    };
  }
  
  return {
    title: `${portfolio.title} - Portfolio Kedjora`,
    description: portfolio.description,
  };
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { slug: params.slug }
  });
  
  if (!portfolio) {
    notFound();
  }
  
  // Parse data from JSON strings to arrays
  const imageUrls = JSON.parse(portfolio.imageUrls) as string[];
  const technologies = JSON.parse(portfolio.technologies) as string[];
  
  // Format date
  const createdAt = new Date(portfolio.createdAt);
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
  }).format(createdAt);
  
  // Get related portfolios
  const relatedPortfolios = await prisma.portfolio.findMany({
    where: {
      id: { not: portfolio.id },
      serviceType: portfolio.serviceType
    },
    take: 3,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <>
      {/* Hero section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-blue-400 font-medium mb-2">{portfolio.serviceType}</div>
            <h1 className="text-4xl font-bold text-white">{portfolio.title}</h1>
            <p className="mt-4 text-xl text-slate-300">
              {portfolio.description}
            </p>
            {portfolio.demoUrl && (
              <div className="mt-6">
                <Button className="bg-white text-slate-900 hover:bg-slate-100" asChild>
                  <a href={portfolio.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Lihat Demo
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Gallery */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {imageUrls.map((url, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md">
                  {/* Ganti tag img dengan komponen Image dari Next.js */}
                  <Image 
                    src={url} 
                    alt={`${portfolio.title} - Image ${index + 1}`} 
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Tentang Proyek</h2>
              <p className="text-slate-600 mb-8">
                {portfolio.description}
              </p>
              
              {/* This would be replaced with actual detailed content */}
              <div className="space-y-4">
                <p className="text-slate-600">
                  Proyek ini dirancang untuk memenuhi kebutuhan {portfolio.clientName || 'klien'} dalam mengembangkan {portfolio.serviceType.toLowerCase()} yang memiliki performa tinggi dan desain yang menarik.
                </p>
                <p className="text-slate-600">
                  Kami menggunakan pendekatan modern dengan teknologi terkini untuk memastikan hasil yang optimal dan sesuai dengan tujuan bisnis klien.
                </p>
              </div>
              
              {/* Features */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Fitur Utama</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                      <Code className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-slate-600">
                      Dikembangkan dengan {technologies.slice(0, 3).join(', ')} dan teknologi pendukung lainnya
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-slate-600">
                      Dikerjakan oleh tim profesional dengan pengalaman di bidang {portfolio.serviceType.toLowerCase()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Detail Proyek</h3>
                <div className="space-y-4">
                  {portfolio.clientName && (
                    <div>
                      <div className="text-sm font-medium text-slate-500">Klien</div>
                      <div className="text-slate-900">{portfolio.clientName}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-slate-500">Kategori</div>
                    <div className="text-slate-900">{portfolio.serviceType}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">Tanggal</div>
                    <div className="text-slate-900">{formattedDate}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">Teknologi</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full" asChild>
                  <Link href="/contact">Konsultasi Proyek Serupa</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Projects */}
      {relatedPortfolios.length > 0 && (
        <div className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Proyek Serupa</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPortfolios.map((relatedPortfolio: Portfolio) => { // Tambahkan tipe Portfolio
                // Parse image URLs
                const relImageUrls = JSON.parse(relatedPortfolio.imageUrls) as string[];
                
                return (
                  <div key={relatedPortfolio.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="aspect-w-16 aspect-h-9 bg-slate-200">
                      {/* Ganti tag img dengan komponen Image dari Next.js */}
                      <Image 
                        src={relImageUrls[0] || 'https://placehold.co/600x400/3b82f6/ffffff?text=No+Image'} 
                        alt={relatedPortfolio.title} 
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{relatedPortfolio.title}</h3>
                      <p className="text-slate-600 mb-4">{relatedPortfolio.description.substring(0, 100)}...</p>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/portfolio/${relatedPortfolio.slug}`}>Lihat Detail</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* CTA section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Tertarik dengan Layanan Kami?</h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            Diskusikan kebutuhan Anda dan dapatkan solusi terbaik untuk bisnis atau proyek Anda.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}