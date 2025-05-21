import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

export default async function OrdersPage() {
  // Ambil semua order dari database
  const orders = await prisma.order.findMany({
    include: {
      service: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format date function
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  // Get status badge className
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Pesanan</h1>
      </div>

      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Tanggal</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Nama</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Layanan</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Status</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900 dark:text-slate-200">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
                  Belum ada pesanan yang masuk.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="bg-white dark:bg-slate-900">
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{order.name}</td>
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{order.service.title}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      getStatusBadgeClass(order.status)
                    }`}>
                      {order.status === 'PENDING' && 'Pending'}
                      {order.status === 'IN_PROGRESS' && 'In Progress'}
                      {order.status === 'COMPLETED' && 'Completed'}
                      {order.status === 'CANCELLED' && 'Cancelled'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      className="border-slate-200 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Link href={`/admin/orders/${order.id}`}>
                        Detail
                      </Link>
                    </Button>
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