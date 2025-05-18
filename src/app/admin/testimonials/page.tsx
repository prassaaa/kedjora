import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import prisma from "@/lib/db";

// Definisikan interface untuk Testimonial
interface Testimonial {
  id: string;
  name: string;
  position: string | null;
  company: string | null;
  content: string;
  rating: number;
  imageUrl: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default async function TestimonialsPage() {
  // Ambil semua testimonial dari database
  const testimonials = await prisma.testimonial.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Testimonial</h1>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Testimonial
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Nama</th>
              <th className="px-4 py-3 text-left font-medium">Posisi</th>
              <th className="px-4 py-3 text-left font-medium">Perusahaan</th>
              <th className="px-4 py-3 text-left font-medium">Rating</th>
              <th className="px-4 py-3 text-left font-medium">Featured</th>
              <th className="px-4 py-3 text-left font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                  Tidak ada testimonial yang tersedia. Tambahkan testimonial baru.
                </td>
              </tr>
            ) : (
              testimonials.map((testimonial: Testimonial) => (
                <tr key={testimonial.id}>
                  <td className="px-4 py-3">{testimonial.name}</td>
                  <td className="px-4 py-3">{testimonial.position || '-'}</td>
                  <td className="px-4 py-3">{testimonial.company || '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      testimonial.featured 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {testimonial.featured ? 'Ya' : 'Tidak'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                      >
                        <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        asChild
                      >
                        <Link href={`/admin/testimonials/${testimonial.id}/delete`}>
                          Hapus
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}