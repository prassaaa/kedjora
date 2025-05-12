"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Definisikan interface untuk Service
interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string; // JSON string
  imageUrl: string | null;
  price: string | null;
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function DeleteServicePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [service, setService] = useState<Service | null>(null);
  
  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/services/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch service');
        }
        
        const serviceData = await response.json();
        setService(serviceData);
      } catch (error) {
        console.error('Error fetching service:', error);
        toast.error('Gagal memuat data layanan');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchService();
  }, [id]);
  
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
      
      toast.success('Layanan berhasil dihapus');
      router.push('/admin/services');
      router.refresh();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Gagal menghapus layanan');
    } finally {
      setIsDeleting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (!service) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-slate-900">Layanan tidak ditemukan</h2>
        <p className="mt-2 text-slate-600">Layanan yang Anda cari tidak ditemukan atau telah dihapus.</p>
        <Button 
          className="mt-4"
          onClick={() => router.push('/admin/services')}
        >
          Kembali ke Daftar Layanan
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Hapus Layanan</h1>
      </div>
      
      <div className="border rounded-lg p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Apakah Anda yakin ingin menghapus layanan ini?
          </h2>
          <p className="text-slate-600">
            Anda akan menghapus layanan: <span className="font-medium">{service.title}</span>
          </p>
          <p className="text-red-600 text-sm">
            Tindakan ini tidak dapat dibatalkan. Semua data terkait layanan ini akan dihapus secara permanen.
          </p>
          
          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/services')}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                "Hapus Layanan"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}