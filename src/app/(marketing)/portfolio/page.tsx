import prisma from "@/lib/db";
import PortfolioPageClient from "./portofolio-client";

export const metadata = {
  title: "Portfolio - Kedjora",
  description: "Proyek-proyek terbaik yang telah kami kerjakan - Kedjora",
};

export default async function PortfolioPage() {
  // Fetch portfolios from the database with ordering
  const portfolios = await prisma.portfolio.findMany({
    orderBy: [
      {
        featured: 'desc'
      },
      {
        createdAt: 'desc'
      }
    ]
  });

  return <PortfolioPageClient portfolios={portfolios} />;
}