import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import prisma from "@/lib/db";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug }
  });
  
  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan - Kedjora",
      description: "Layanan yang Anda cari tidak ditemukan.",
    };
  }
  
  return {
    title: `${service.title} - Kedjora`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  // Fetch service detail
  const service = await prisma.service.findUnique({
    where: { slug: params.slug }
  });
  
  if (!service || !service.isActive) {
    notFound();
  }
  
  // Parse features dari JSON string menjadi array
  const features = JSON.parse(service.features) as string[];
  
  // Fetch related services (other services)
  const relatedServices = await prisma.service.findMany({
    where: {
      isActive: true,
      id: { not: service.id }
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
            <h1 className="text-4xl font-bold text-white">{service.title}</h1>
            <p className="mt-4 text-xl text-slate-300">
              {service.description}
            </p>
            {service.price && (
              <div className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-medium">
                {service.price}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left column - Features */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Fitur Layanan</h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 mr-4 bg-green-100 rounded-full p-1">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{feature}</h3>
                      <p className="text-slate-600 mt-1">
                        {/* Description for each feature - static content for demonstration */}
                        Kami menyediakan {feature.toLowerCase()} dengan kualitas tinggi sesuai kebutuhan Anda.
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/contact" className="flex items-center">
                    Pesan Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Right column - Image or additional info */}
            <div>
              {service.imageUrl ? (
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden shadow-lg bg-slate-100 aspect-video flex items-center justify-center">
                  <div className="text-center p-8">
                    <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                    <p className="mt-2 text-slate-600">Solusi terbaik untuk kebutuhan Anda</p>
                    <div className="mt-6">
                      <Button asChild>
                        <Link href="/contact">Konsultasi Gratis</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Proses kerja - static content */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Proses Kerja</h2>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                      1
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-slate-900">Konsultasi</h3>
                      <p className="text-slate-600">Diskusikan kebutuhan dan ekspektasi Anda dengan tim kami</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                      2
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-slate-900">Perencanaan</h3>
                      <p className="text-slate-600">Kami menyusun rencana dan timeline pengerjaan proyek</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                      3
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-slate-900">Pengerjaan</h3>
                      <p className="text-slate-600">Tim kami mengerjakan proyek dengan standar kualitas tinggi</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                      4
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-slate-900">Revisi</h3>
                      <p className="text-slate-600">Anda dapat memberikan feedback untuk penyempurnaan hasil</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                      5
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-slate-900">Finalisasi</h3>
                      <p className="text-slate-600">Proyek diselesaikan dan diserahkan kepada Anda</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related services */}
      {relatedServices.length > 0 && (
        <div className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Layanan Lainnya</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => {
                // Parse features dari JSON string menjadi array
                const relatedFeatures = JSON.parse(relatedService.features) as string[];
                
                return (
                  <div key={relatedService.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{relatedService.title}</h3>
                      <p className="text-slate-600 mb-4">{relatedService.description}</p>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/services/${relatedService.slug}`}>Lihat Layanan</Link>
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
          <h2 className="text-3xl font-bold text-white">Siap Memulai Proyek Anda?</h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            Hubungi kami sekarang dan dapatkan konsultasi gratis untuk kebutuhan {service.title.toLowerCase()} Anda.
          </p>
          <div className="mt-8">
            <Button size="lg" variant="default" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}