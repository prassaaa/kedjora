import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import prisma from "@/lib/db";

// Definisikan interface untuk Portfolio
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

export default async function PortfolioPage() {
  // Ambil semua portfolio dari database
  const portfolios = await prisma.portfolio.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
        <Button asChild>
          <Link href="/admin/portfolio/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Portfolio
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Judul</th>
              <th className="px-4 py-3 text-left font-medium">Kategori</th>
              <th className="px-4 py-3 text-left font-medium">Klien</th>
              <th className="px-4 py-3 text-left font-medium">Featured</th>
              <th className="px-4 py-3 text-left font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {portfolios.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  Tidak ada portfolio yang tersedia. Tambahkan portfolio baru.
                </td>
              </tr>
            ) : (
              portfolios.map((portfolio: Portfolio) => (
                <tr key={portfolio.id}>
                  <td className="px-4 py-3">{portfolio.title}</td>
                  <td className="px-4 py-3">{portfolio.serviceType}</td>
                  <td className="px-4 py-3">{portfolio.clientName || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      portfolio.featured 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {portfolio.featured ? 'Ya' : 'Tidak'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                      >
                        <Link href={`/admin/portfolio/${portfolio.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        asChild
                      >
                        <Link href={`/admin/portfolio/${portfolio.id}/delete`}>
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