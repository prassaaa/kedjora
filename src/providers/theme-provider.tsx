"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps as NextThemeProviderProps } from "next-themes";

export interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: NextThemeProviderProps["attribute"];
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
  forcedTheme?: string;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  storageKey = "theme",
  forcedTheme,
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // Setelah komponen di-mount, kita bisa menampilkan UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Render anak-anak saja saat pertama kali server-side render
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey={storageKey}
      forcedTheme={forcedTheme}
    >
      {children}
    </NextThemesProvider>
  );
}

export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  
  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const isDarkMode = React.useMemo(() => {
    return resolvedTheme === "dark";
  }, [resolvedTheme]);

  return {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    isDarkMode,
    toggleTheme,
  };
}