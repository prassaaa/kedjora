import { CheckCircle2, Briefcase, Users } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Mengapa Memilih Kami</h2>
          <p className="mt-4 text-lg text-slate-600">
            Keunggulan layanan kami yang membedakan dari yang lain
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Kualitas Terjamin</h3>
            <p className="text-slate-600">
              Setiap proyek dikerjakan dengan standar kualitas tinggi dan melalui quality control yang ketat.
            </p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Tim Profesional</h3>
            <p className="text-slate-600">
              Dikerjakan oleh tim berpengalaman di bidangnya dengan portfolio proyek yang beragam.
            </p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Berorientasi Klien</h3>
            <p className="text-slate-600">
              Kami mengutamakan kepuasan klien dengan komunikasi yang baik dan revisi sesuai kebutuhan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}