import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

export const metadata = {
  title: "Portfolio - Kedjora",
  description: "Proyek-proyek terbaik yang telah kami kerjakan - Kedjora",
};

export default async function PortfolioPage() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: [
      {
        featured: 'desc'
      },
      {
        createdAt: 'desc'
      }
    ]
  });

  return (
    <>
      {/* Hero section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white">Portfolio</h1>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            Beberapa proyek terbaik yang telah kami kerjakan untuk klien
          </p>
        </div>
      </div>
      
      {/* Portfolio grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {portfolios.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              Portfolio sedang dalam tahap pengembangan. Silakan kunjungi kembali nanti.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((portfolio) => {
                // Parse imageUrls dari JSON string menjadi array
                const imageUrls = JSON.parse(portfolio.imageUrls) as string[];
                
                // Parse technologies dari JSON string menjadi array
                const technologies = JSON.parse(portfolio.technologies) as string[];
                
                return (
                  <div key={portfolio.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-slate-200">
                    <div className="aspect-w-16 aspect-h-9 bg-slate-200">
                      <img 
                        src={imageUrls[0] || 'https://placehold.co/600x400/3b82f6/ffffff?text=No+Image'} 
                        alt={portfolio.title} 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm font-medium text-blue-600 mb-1">{portfolio.serviceType}</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{portfolio.title}</h3>
                      <p className="text-slate-600 mb-4">{portfolio.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {technologies.slice(0, 4).map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                            {tech}
                          </span>
                        ))}
                        {technologies.length > 4 && (
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                            +{technologies.length - 4}
                          </span>
                        )}
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/portfolio/${portfolio.slug}`}>Lihat Detail</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Siap Memulai Proyek Anda?</h2>
          <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto">
            Konsultasikan kebutuhan Anda dengan tim kami dan dapatkan solusi terbaik.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
              <Link href="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}