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
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Testimonial</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white">
          <Link href="/admin/testimonials/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Testimonial
          </Link>
        </Button>
      </div>

      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Nama</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Posisi</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Perusahaan</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Rating</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Featured</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
                  Tidak ada testimonial yang tersedia. Tambahkan testimonial baru.
                </td>
              </tr>
            ) : (
              testimonials.map((testimonial: Testimonial) => (
                <tr key={testimonial.id} className="bg-white dark:bg-slate-900">
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{testimonial.name}</td>
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{testimonial.position || '-'}</td>
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{testimonial.company || '-'}</td>
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
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
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
                        className="border-slate-200 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900/30 dark:hover:bg-red-900/20"
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