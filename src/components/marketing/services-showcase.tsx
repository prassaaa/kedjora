"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Smartphone, GraduationCap, FileText, CheckCircle2 } from "lucide-react";

type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string; // JSON string yang akan di-parse
  imageUrl: string | null;
  price: string | null;
  isPopular: boolean;
  isActive: boolean;
};

export default function ServicesShowcase({ services }: { services: Service[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Mapping icon berdasarkan slug
  const getIconBySlug = (slug: string) => {
    const iconMap: Record<string, any> = {
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
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Layanan Kami</h2>
          <p className="mt-4 text-lg text-slate-600">
            Solusi lengkap untuk kebutuhan digital dan akademik Anda dengan standar kualitas tertinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            // Parse features dari JSON string menjadi array
            const features = JSON.parse(service.features) as string[];
            const ServiceIcon = getIconBySlug(service.slug);
            
            return (
              <motion.div
                key={service.id}
                onHoverStart={() => setHoveredId(service.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full flex flex-col overflow-hidden border-slate-200 transition-all duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <ServiceIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-slate-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {features.slice(0, 5).map((feature, index) => (
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
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/services/${service.slug}`}>
                        Selengkapnya
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/services">
              Lihat Semua Layanan
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}