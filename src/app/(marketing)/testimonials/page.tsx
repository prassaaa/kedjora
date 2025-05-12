import Link from "next/link";
import Image from "next/image"; // Import komponen Image dari next/image
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

export const metadata = {
  title: "Testimonial - Kedjora",
  description: "Apa kata klien tentang layanan Kedjora",
};

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
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
          <h1 className="text-4xl font-bold text-white">Testimonial</h1>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            Apa kata klien tentang layanan kami
          </p>
        </div>
      </div>
      
      {/* Testimonials grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              Belum ada testimonial. Silakan kunjungi kembali nanti.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className={`bg-white rounded-lg p-6 shadow-md border ${
                    testimonial.featured ? 'border-blue-200' : 'border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex">
                      {testimonial.imageUrl ? (
                        // Mengganti tag img dengan komponen Image
                        <Image 
                          src={testimonial.imageUrl} 
                          alt={testimonial.name} 
                          width={48}
                          height={48}
                          className="rounded-full object-cover mr-4"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                          <span className="text-blue-600 font-medium">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900">{testimonial.name}</h3>
                        {(testimonial.position || testimonial.company) && (
                          <p className="text-sm text-slate-600">
                            {testimonial.position}
                            {testimonial.position && testimonial.company && ', '}
                            {testimonial.company}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                  {/* Di-escape tanda kutip dengan &ldquo; dan &rdquo; */}
                  <blockquote className="text-slate-700 italic">&ldquo;{testimonial.content}&rdquo;</blockquote>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Siap Untuk Bergabung?</h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            Jadilah bagian dari klien kami yang puas dengan layanan berkualitas tinggi
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