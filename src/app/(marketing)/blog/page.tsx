import prisma from "@/lib/db";
import BlogPageClient from "./blog-client";

export const metadata = {
  title: "Blog - Kedjora",
  description: "Artikel dan tips seputar teknologi, pengembangan web, dan akademik",
};

export default async function BlogPage() {
  // Fetch blog posts from the database
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  // Pass the data to the client component
  return <BlogPageClient posts={posts} />;
}