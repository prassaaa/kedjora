"use client";

import * as React from "react";
import { useThemeToggle } from "@/providers/theme-provider";
import { useSystemTheme } from "@/hooks/use-system-theme";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useThemeToggle();
  const systemTheme = useSystemTheme();

  // Helper function untuk menentukan tema aktif
  const isActive = (value: string) => theme === value;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
          <div className="relative w-5 h-5">
            {/* Menampilkan ikon sesuai tema aktif */}
            {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
            {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
            {theme === "system" && (
              systemTheme === "dark" ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )
            )}
            <span className="sr-only">Ubah tema</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={isActive("light") ? "bg-slate-100 dark:bg-slate-800" : ""}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {isActive("light") && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={isActive("dark") ? "bg-slate-100 dark:bg-slate-800" : ""}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {isActive("dark") && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={isActive("system") ? "bg-slate-100 dark:bg-slate-800" : ""}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System {theme === "system" && `(${systemTheme})`}</span>
          {isActive("system") && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}