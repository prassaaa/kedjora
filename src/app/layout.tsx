import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kedjora - Jasa Web, Aplikasi, & Tugas Kuliah",
  description: "Layanan pembuatan website, aplikasi, joki tugas kuliah, sempro dan skripsi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Script untuk mendeteksi preferensi tema sebelum render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Periksa tema tersimpan di localStorage
                  const storedTheme = localStorage.getItem('theme');
                  
                  // Periksa preferensi sistem jika tidak ada tema tersimpan
                  // atau jika tema yang tersimpan adalah 'system'
                  if (!storedTheme || storedTheme === 'system') {
                    // Deteksi preferensi sistem
                    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    
                    // Tambahkan atau hapus kelas 'dark' pada root HTML
                    if (systemPrefersDark) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  } 
                  // Gunakan preferensi tema yang tersimpan
                  else {
                    if (storedTheme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  }
                } catch (e) {
                  console.error('Terjadi kesalahan saat inisialisasi tema:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}