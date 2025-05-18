import prisma from "@/lib/db";
import AboutPageClient from "./about-client";

export const metadata = {
  title: "Tentang Kami - Kedjora",
  description: "Mengenal lebih dekat Kedjora - penyedia jasa web, aplikasi, dan layanan akademik terpercaya",
};

export default async function AboutPage() {
  // Fetch data about from settings
  const aboutContent = await prisma.pageContent.findUnique({
    where: { section: 'about' }
  });
  
  // Pass data to the client component as is
  // The client component now expects null values
  return <AboutPageClient aboutContent={aboutContent || undefined} />;
}