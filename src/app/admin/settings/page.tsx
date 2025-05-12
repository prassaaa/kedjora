"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HomeSettingsForm from '@/components/admin/settings/home-settings-form';
import AboutSettingsForm from '@/components/admin/settings/about-settings-form';
import ContactSettingsForm from '@/components/admin/settings/contact-settings-form';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/settings');
        
        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }
        
        const settingsData = await response.json();
        
        // Convert array to object with section as key
        const settingsObj: Record<string, any> = {};
        settingsData.forEach((item: any) => {
          settingsObj[item.section] = item;
        });
        
        setSettings(settingsObj);
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Gagal memuat pengaturan');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const saveSettings = async (section: string, data: any) => {
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
      
      const updatedSetting = await response.json();
      
      // Update local state
      setSettings({
        ...settings,
        [section]: updatedSetting,
      });
      
      toast.success('Pengaturan berhasil disimpan');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Gagal menyimpan pengaturan');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan Website</h1>
        <p className="text-slate-500 mt-1">
          Kelola konten dan pengaturan untuk berbagai halaman di website
        </p>
      </div>
      
      <Tabs defaultValue="home" className="space-y-4">
        <TabsList>
          <TabsTrigger value="home">Halaman Utama</TabsTrigger>
          <TabsTrigger value="about">Tentang Kami</TabsTrigger>
          <TabsTrigger value="contact">Kontak</TabsTrigger>
          <TabsTrigger value="general">Umum</TabsTrigger>
        </TabsList>
        
        <TabsContent value="home" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Halaman Utama</CardTitle>
              <CardDescription>
                Kelola konten untuk hero section dan bagian lainnya di halaman utama
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HomeSettingsForm 
                initialData={settings.home_hero || {}} 
                onSave={(data) => saveSettings('home_hero', data)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Halaman Tentang Kami</CardTitle>
              <CardDescription>
                Kelola konten untuk halaman tentang perusahaan dan tim
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AboutSettingsForm 
                initialData={settings.about || {}} 
                onSave={(data) => saveSettings('about', data)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Halaman Kontak</CardTitle>
              <CardDescription>
                Kelola informasi kontak dan lokasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactSettingsForm 
                initialData={settings.contact || {}} 
                onSave={(data) => saveSettings('contact', data)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum</CardTitle>
              <CardDescription>
                Kelola pengaturan umum seperti logo, favicon, dan SEO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">
                Fitur pengaturan umum sedang dalam pengembangan.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}