import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import prisma from "@/lib/db";

export const metadata = {
  title: "Blog - Kedjora",
  description: "Artikel dan tips seputar teknologi, pengembangan web, dan akademik",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true
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

  return (
    <>
      {/* Hero section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white">Blog</h1>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            Artikel dan tips seputar teknologi, pengembangan web, dan akademik
          </p>
        </div>
      </div>
      
      {/* Blog posts */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Belum Ada Artikel</h2>
              <p className="text-slate-600 mb-8">
                Kami sedang menyiapkan artikel-artikel menarik untuk Anda. Silakan kunjungi kembali nanti.
              </p>
              <Button asChild>
                <Link href="/">Kembali ke Beranda</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-slate-200">
                  {post.imageUrl && (
                    <div className="aspect-w-16 aspect-h-9 bg-slate-200">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-slate-500 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <time dateTime={post.createdAt.toISOString()}>
                        {formatDate(post.createdAt)}
                      </time>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-slate-600 mb-4">
                      {post.excerpt || post.content.substring(0, 150)}...
                    </p>
                    <Button variant="outline" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        Baca Selengkapnya
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Newsletter signup */}
      <div className="bg-slate-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Dapatkan Update Terbaru</h2>
          <p className="text-slate-600 mb-6">
            Berlangganan newsletter kami untuk mendapatkan artikel dan tips terbaru langsung ke inbox Anda.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email Anda"
              className="px-4 py-2 rounded-md border border-slate-300 flex-grow"
              required
            />
            <Button type="submit">Berlangganan</Button>
          </form>
        </div>
      </div>
    </>
  );
}