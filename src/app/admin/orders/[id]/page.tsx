import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/db";
import OrderStatusForm from "@/components/admin/orders/order-status-form";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      service: true
    }
  });
  
  if (!order) {
    notFound();
  }
  
  // Format date function
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-2 border-slate-200 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Detail Pesanan</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Informasi Pesanan</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Dibuat pada {formatDate(order.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Nama</h3>
                  <p className="text-slate-900 dark:text-slate-200">{order.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</h3>
                  <p className="text-slate-900 dark:text-slate-200">{order.email}</p>
                </div>
                {order.phone && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Nomor Telepon</h3>
                    <p className="text-slate-900 dark:text-slate-200">{order.phone}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Layanan</h3>
                  <p className="text-slate-900 dark:text-slate-200">{order.service.title}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Pesan</h3>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{order.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Status Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderStatusForm order={order} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}