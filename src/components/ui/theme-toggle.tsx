import * as React from "react";
import { useThemeToggle } from "@/providers/theme-provider";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeToggle();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 flex items-center justify-center"
      aria-label={isDarkMode ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          animate={{ 
            opacity: isDarkMode ? 0 : 1, 
            scale: isDarkMode ? 0.6 : 1,
            rotate: isDarkMode ? -30 : 0
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Sun className="w-5 h-5 text-amber-500" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: 30 }}
          animate={{ 
            opacity: isDarkMode ? 1 : 0, 
            scale: isDarkMode ? 1 : 0.6,
            rotate: isDarkMode ? 0 : 30
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Moon className="w-5 h-5 text-blue-300" />
        </motion.div>
      </div>
    </Button>
  );
}