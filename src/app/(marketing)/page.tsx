import Hero from "@/components/marketing/hero";
import ServicesShowcase from "@/components/marketing/services-showcase";
import FeaturesSection from "@/components/marketing/features-section";
import CTASection from "@/components/marketing/cta-section";
import prisma from "@/lib/db";

export default async function HomePage() {
  // Fetch services from database
  const services = await prisma.service.findMany({
    where: {
      isActive: true
    },
    orderBy: [
      {
        isPopular: 'desc'
      },
      {
        createdAt: 'desc'
      }
    ],
    take: 4 // Hanya tampilkan 4 layanan di homepage
  });

  // Fetch featured portfolio items
  const featuredPortfolio = await prisma.portfolio.findMany({
    where: {
      featured: true
    },
    take: 3
  });

  return (
    <>
      <Hero />
      
      <ServicesShowcase services={services} />
      
      <FeaturesSection />
      
      {/* Featured Portfolio Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Portfolio Terbaru</h2>
            <p className="mt-4 text-lg text-slate-600">
              Beberapa proyek terbaik yang telah kami kerjakan
            </p>
          </div>
          
          {featuredPortfolio.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              Portfolio sedang dalam tahap pengembangan. Silakan kunjungi kembali nanti.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPortfolio.map((item) => {
                // Parse imageUrls dari JSON string menjadi array
                const imageUrls = JSON.parse(item.imageUrls) as string[];
                // Parse technologies dari JSON string menjadi array
                const technologies = JSON.parse(item.technologies) as string[];
                
                return (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-slate-200">
                    <div className="aspect-w-16 aspect-h-9 bg-slate-200">
                      <img 
                        src={imageUrls[0] || 'https://placehold.co/600x400/4f46e5/ffffff?text=No+Image'} 
                        alt={item.title} 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm font-medium text-blue-600 mb-1">{item.serviceType}</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 mb-4">{item.description}</p>
                      <Button variant="outline" asChild>
                        <Link href={`/portfolio/${item.slug}`}>Lihat Detail</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      
      <CTASection />
    </>
  );
}