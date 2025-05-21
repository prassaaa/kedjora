"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HomeSettingsForm from '@/components/admin/settings/home-settings-form';
import AboutSettingsForm from '@/components/admin/settings/about-settings-form';
import ContactSettingsForm from '@/components/admin/settings/contact-settings-form';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Definisi tipe yang lebih spesifik
interface BaseSetting {
  id: string;
  section: string;
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  address?: string;
  email?: string;
  phone?: string;
  mapUrl?: string;
  updatedAt: Date;
  [key: string]: unknown; // Gunakan unknown daripada any
}

// Tipe untuk data form
interface HomeSettingsFormData {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
}

interface AboutSettingsFormData {
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
}

interface ContactSettingsFormData {
  address?: string;
  email?: string;
  phone?: string;
  mapUrl?: string;
}

// Union tipe untuk data form
type SettingsFormData = HomeSettingsFormData | AboutSettingsFormData | ContactSettingsFormData;

interface SettingsRecord {
  [key: string]: BaseSetting | undefined;
}

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<SettingsRecord>({});

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/settings');
        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }
        const settingsData: BaseSetting[] = await response.json();
        
        // Convert to record format
        const settingsRecord: SettingsRecord = {};
        settingsData.forEach((item) => {
          if (item && item.section) {
            settingsRecord[item.section] = item;
          }
        });
        
        setSettings(settingsRecord);
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Gagal mengambil pengaturan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const saveSettings = async (section: string, data: SettingsFormData) => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      const updatedSetting: BaseSetting = await response.json();

      // Update local state
      setSettings((prevSettings) => ({
        ...prevSettings,
        [section]: updatedSetting,
      }));

      toast.success('Pengaturan berhasil disimpan');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Gagal menyimpan pengaturan');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Pengaturan Website</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Kelola konten dan pengaturan untuk berbagai halaman di website
        </p>
      </div>
      
      <Tabs defaultValue="home" className="space-y-4">
        <TabsList>
          <TabsTrigger value="home">Halaman Utama</TabsTrigger>
          <TabsTrigger value="about">Tentang Kami</TabsTrigger>
          <TabsTrigger value="contact">Kontak</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Pengaturan Halaman Utama</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Kelola konten untuk halaman utama
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HomeSettingsForm 
                initialData={{
                  title: settings.home_hero?.title ?? "",
                  subtitle: settings.home_hero?.subtitle ?? "",
                  buttonText: settings.home_hero?.buttonText ?? "",
                  buttonLink: settings.home_hero?.buttonLink ?? "",
                  imageUrl: settings.home_hero?.imageUrl ?? "",
                }}
                onSave={(data: HomeSettingsFormData) => saveSettings('home_hero', data)} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Pengaturan Tentang Kami</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Kelola konten untuk halaman Tentang Kami
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AboutSettingsForm 
                initialData={{
                  title: settings.about?.title ?? "",
                  subtitle: settings.about?.subtitle ?? "",
                  content: settings.about?.content ?? "",
                  imageUrl: settings.about?.imageUrl ?? "",
                }}
                onSave={(data: AboutSettingsFormData) => saveSettings('about', data)} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Pengaturan Halaman Kontak</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Kelola informasi kontak dan lokasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactSettingsForm 
                initialData={{
                  address: settings.contact?.address ?? "",
                  email: settings.contact?.email ?? "",
                  phone: settings.contact?.phone ?? "",
                  mapUrl: settings.contact?.mapUrl ?? "",
                }}
                onSave={(data: ContactSettingsFormData) => saveSettings('contact', data)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Pengaturan Umum</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Kelola pengaturan umum seperti logo, favicon, dan SEO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 dark:text-slate-400">
                Fitur pengaturan umum sedang dalam pengembangan.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}