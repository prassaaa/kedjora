import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Kedjora",
    "Kediri Jorah",
    "Jasa Website",
    "Pembuatan Website",
    "Mobile App Development",
    "Bot WhatsApp",
    "Jasa Skripsi",
    "Jasa Tugas Kuliah",
    "Desain Grafis",
    "Digital Agency",
    "Web Developer Kediri",
    "Jasa IT Kediri",
  ],
  authors: [
    {
      name: "Kedjora Team",
      url: "https://kedjora.com",
    },
  ],
  creator: "kedjora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@kedjora_official",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
