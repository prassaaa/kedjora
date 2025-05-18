"use client";

import { useState, useEffect } from "react";

export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    // Fungsi untuk memeriksa preferensi dark mode
    const checkDarkMode = () => {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setSystemTheme(isDarkMode ? "dark" : "light");
    };

    // Periksa pertama kali
    checkDarkMode();

    // Dengarkan perubahan preferensi sistem
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Fungsi handler untuk perubahan preferensi
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    // Tambahkan event listener - support browser modern
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Support browser lama
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return systemTheme;
}