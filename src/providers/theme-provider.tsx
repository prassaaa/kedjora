"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemesProviderProps } from "next-themes";
import { useTheme } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: NextThemesProviderProps['attribute'];
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
};

// Re-export next-themes components
export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  storageKey = "theme",
}: ThemeProviderProps) {
  // Handle hydration issue
  const [mounted, setMounted] = React.useState(false);

  // After mounting, we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Returns a placeholder with the same structure
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey={storageKey}
    >
      {children}
    </NextThemesProvider>
  );
}

// Custom hook for accessing and toggling the theme
export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const isDarkMode = React.useMemo(() => {
    return resolvedTheme === "dark";
  }, [resolvedTheme]);

  return {
    theme,
    isDarkMode,
    toggleTheme,
  };
}