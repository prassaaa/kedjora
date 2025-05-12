import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Code, Smartphone, GraduationCap, FileText } from "lucide-react";
import prisma from "@/lib/db";

// Definisikan interface untuk Service
interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string; // JSON string yang akan di-parse
  imageUrl: string | null;
  price: string | null;
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Definisikan tipe untuk iconMap yang lebih spesifik
type IconComponent = typeof Code | typeof Smartphone | typeof GraduationCap | typeof FileText;
type IconMap = Record<string, IconComponent>;

export const metadata = {
  title: "Layanan - Kedjora",
  description: "Berbagai layanan yang kami tawarkan: pembuatan website, aplikasi, joki tugas, dan penulisan skripsi.",
};

export default async function ServicesPage() {
  // Fetch all active services
  const services = await prisma.service.findMany({
    where: {
      isActive: true
    },
    orderBy: [
      {
        isPopular: 'desc'
      },
      {
        title: 'asc'
      }
    ]
  });

  // Mapping icon berdasarkan slug
  const getIconBySlug = (slug: string) => {
    const iconMap: IconMap = {
      "web-development": Code,
      "app-development": Smartphone,
      "academic-assistance": GraduationCap,
      "thesis": FileText,
    };
    
    // Find partial match
    const slugKey = Object.keys(iconMap).find(key => slug.includes(key));
    return slugKey ? iconMap[slugKey] : Code; // Default to Code if no match
  };

  return (
    <>
      {/* Hero section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white">Layanan Kami</h1>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            Solusi lengkap untuk kebutuhan digital dan akademik Anda dengan standar kualitas tertinggi.
          </p>
        </div>
      </div>
      
      {/* Services grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500">
                Belum ada layanan yang tersedia. Silakan kunjungi kembali nanti.
              </div>
            ) : (
              services.map((service: Service) => {
                // Parse features dari JSON string menjadi array
                const features = JSON.parse(service.features) as string[];
                const ServiceIcon = getIconBySlug(service.slug);
                
                return (
                  <Card 
                    key={service.id} 
                    className={`h-full flex flex-col ${service.isPopular ? 'border-blue-200 shadow-md' : 'border-slate-200'}`}
                  >
                    {service.isPopular && (
                      <div className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 text-center">
                        Populer
                      </div>
                    )}
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                        <ServiceIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-slate-600">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        {features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {service.price && (
                        <div className="mt-4 text-sm font-medium text-blue-600">
                          {service.price}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <Link href={`/services/${service.slug}`}>Lihat Detail</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Punya Pertanyaan?</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Jika Anda memiliki pertanyaan atau ingin konsultasi terkait layanan kami, silakan hubungi kami.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}