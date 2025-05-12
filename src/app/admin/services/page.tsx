import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import prisma from "@/lib/db";

// Definisikan interface untuk Service
interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string;
  imageUrl: string | null;
  price: string | null;
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default async function ServicesPage() {
  // Ambil semua layanan dari database
  const services = await prisma.service.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Layanan</h1>
        <Button asChild>
          <Link href="/admin/services/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Layanan
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Judul</th>
              <th className="px-4 py-3 text-left font-medium">Slug</th>
              <th className="px-4 py-3 text-left font-medium">Harga</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {services.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  Tidak ada layanan yang tersedia. Tambahkan layanan baru.
                </td>
              </tr>
            ) : (
              services.map((service: Service) => (
                <tr key={service.id}>
                  <td className="px-4 py-3">{service.title}</td>
                  <td className="px-4 py-3">{service.slug}</td>
                  <td className="px-4 py-3">{service.price || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      service.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {service.isActive ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                      >
                        <Link href={`/admin/services/${service.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        asChild
                      >
                        <Link href={`/admin/services/${service.id}/delete`}>
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