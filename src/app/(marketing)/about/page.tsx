import Link from "next/link";
import Image from "next/image"; // Tambahkan import Image
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import prisma from "@/lib/db";

export const metadata = {
  title: "Tentang Kami - Kedjora",
  description: "Mengenal lebih dekat Kedjora - penyedia jasa web, aplikasi, dan layanan akademik terpercaya",
};

export default async function AboutPage() {
  // Ambil data about dari settings
  const aboutContent = await prisma.pageContent.findUnique({
    where: { section: 'about' }
  });

  // Ambil data team (jika nanti ingin ditambahkan)
  // Untuk sekarang, kita gunakan data statis
  const teamMembers = [
    {
      name: "Ahmad Rizal",
      position: "CEO & Founder",
      bio: "Berpengalaman lebih dari 8 tahun dalam pengembangan web dan aplikasi.",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Siti Nurlaela",
      position: "UI/UX Designer",
      bio: "Memiliki passion dalam menciptakan pengalaman pengguna yang intuitif dan menarik.",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Budi Santoso",
      position: "Full Stack Developer",
      bio: "Ahli dalam berbagai teknologi web dan mobile, dari frontend hingga backend.",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      name: "Dewi Anggraini",
      position: "Konsultan Akademik",
      bio: "Berpengalaman dalam penelitian dan penulisan akademik di berbagai bidang.",
      imageUrl: "https://randomuser.me/api/portraits/women/4.jpg"
    }
  ];

  // Beberapa keunggulan layanan
  const features = [
    "Tim profesional dan berpengalaman",
    "Kualitas hasil yang terjamin",
    "Harga kompetitif dan transparan",
    "Revisi hingga klien puas",
    "Support berkelanjutan",
    "Berorientasi pada solusi"
  ];

  // Data core values
  const coreValues = [
    {
      title: "Kualitas",
      description: "Kami berkomitmen untuk memberikan hasil dengan kualitas terbaik dalam setiap proyek."
    },
    {
      title: "Integritas",
      description: "Kami menjunjung tinggi kejujuran dan profesionalisme dalam setiap aspek pekerjaan."
    },
    {
      title: "Inovasi",
      description: "Kami selalu mengikuti perkembangan teknologi dan tren terbaru untuk memberikan solusi terbaik."
    },
    {
      title: "Kepuasan Klien",
      description: "Kepuasan klien adalah prioritas utama kami dalam setiap layanan yang kami berikan."
    }
  ];

  return (
    <>
      {/* Hero section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            {aboutContent?.title || "Tentang Kedjora"}
          </h1>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            {aboutContent?.subtitle || "Solusi digital terbaik untuk bisnis dan kebutuhan akademik Anda"}
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Kisah Kami</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600">
                  {aboutContent?.content || 
                    "Kedjora adalah penyedia layanan digital profesional yang berkomitmen memberikan solusi berkualitas tinggi untuk kebutuhan digital dan akademik. Didirikan dengan visi untuk membantu bisnis dan individu dalam transformasi digital, kami telah melayani berbagai klien dari berbagai sektor industri."}
                </p>
                <p className="text-slate-600 mt-4">
                  Kami memahami bahwa setiap klien memiliki kebutuhan unik, oleh karena itu kami menawarkan layanan yang dapat disesuaikan untuk memenuhi kebutuhan spesifik Anda. Dengan tim yang terdiri dari profesional berpengalaman di bidangnya, kami siap membantu Anda mewujudkan ide dan proyek Anda.
                </p>
                <p className="text-slate-600 mt-4">
                  Dari pengembangan website dan aplikasi hingga bantuan tugas akademik, kami menawarkan solusi komprehensif dengan standar kualitas tertinggi. Kami percaya bahwa kesuksesan klien adalah kesuksesan kami.
                </p>
              </div>
            </div>
            <div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                {/* Perubahan 1: Ganti tag img dengan komponen Image */}
                <Image 
                  src={aboutContent?.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"} 
                  alt="Tim Kedjora" 
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Core Values */}
          <div className="mt-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Nilai-Nilai Kami</h2>
              <p className="mt-4 text-lg text-slate-600">
                Prinsip yang menjadi landasan kami dalam memberikan layanan terbaik
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Why Choose Us */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-blue-600 rounded-lg p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full opacity-20 -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-full opacity-20 translate-y-1/2 -translate-x-1/4"></div>
                <h2 className="text-3xl font-bold mb-4 relative z-10">Mengapa Memilih Kami?</h2>
                <p className="text-blue-100 mb-6 relative z-10">
                  Kami membedakan diri dengan pendekatan yang berfokus pada kualitas dan kepuasan klien. Inilah alasan mengapa klien memilih Kedjora:
                </p>
                <ul className="space-y-3 relative z-10">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-200 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Fokus Pada Solusi</h2>
              <p className="text-slate-600 mb-4">
                Kami tidak hanya menyediakan layanan, tapi juga memberikan solusi untuk kebutuhan Anda. Kami memahami bahwa setiap klien adalah unik, dengan tantangan dan tujuan yang berbeda.
              </p>
              <p className="text-slate-600 mb-4">
                Tim profesional kami akan bekerja sama dengan Anda untuk memahami kebutuhan spesifik Anda dan memberikan solusi yang tepat. Dari konsultasi awal hingga implementasi akhir, kami berkomitmen untuk membantu Anda mencapai tujuan Anda.
              </p>
              <p className="text-slate-600 mb-6">
                Transparansi dan komunikasi yang baik adalah kunci dalam setiap proyek. Kami akan memastikan Anda selalu mendapatkan update tentang kemajuan proyek dan terlibat dalam setiap pengambilan keputusan penting.
              </p>
              <Button asChild>
                <Link href="/services">Lihat Layanan Kami</Link>
              </Button>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mt-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Tim Kami</h2>
              <p className="mt-4 text-lg text-slate-600">
                Mengenal para profesional di balik Kedjora
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-slate-200 text-center">
                  <div className="aspect-w-1 aspect-h-1 bg-slate-200">
                    {/* Perubahan 2: Ganti tag img dengan komponen Image */}
                    <Image 
                      src={member.imageUrl} 
                      alt={member.name} 
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                    <p className="text-blue-600 mb-2">{member.position}</p>
                    <p className="text-slate-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Siap Untuk Bekerja Sama?</h2>
          <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto">
            Diskusikan kebutuhan Anda dan temukan solusi terbaik untuk bisnis atau proyek Anda.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
              <Link href="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}