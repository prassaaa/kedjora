import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white">Siap Memulai Proyek Anda?</h2>
        <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
          Konsultasikan kebutuhan Anda dengan tim kami dan dapatkan solusi terbaik untuk proyek Anda.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Button size="lg" variant="default" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
            <Link href="/contact">Hubungi Kami</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700" asChild>
            <Link href="/services">Lihat Layanan</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}