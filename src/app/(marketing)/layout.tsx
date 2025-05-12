import Header from "@/components/marketing/header";
import Footer from "@/components/marketing/footer";
import { Toaster } from "sonner";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}