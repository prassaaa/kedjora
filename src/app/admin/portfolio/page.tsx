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
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Portfolio</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white">
          <Link href="/admin/portfolio/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Portfolio
          </Link>
        </Button>
      </div>

      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Judul</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Kategori</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Klien</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Featured</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {portfolios.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
                  Tidak ada portfolio yang tersedia. Tambahkan portfolio baru.
                </td>
              </tr>
            ) : (
              portfolios.map((portfolio: Portfolio) => (
                <tr key={portfolio.id} className="bg-white dark:bg-slate-900">
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{portfolio.title}</td>
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{portfolio.serviceType}</td>
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{portfolio.clientName || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      portfolio.featured 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
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
                        className="border-slate-200 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <Link href={`/admin/portfolio/${portfolio.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900/30 dark:hover:bg-red-900/20"
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