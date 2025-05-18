"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Briefcase, Users, Clock, CreditCard, HeartHandshake } from "lucide-react";

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: CheckCircle2,
      color: "blue",
      title: "Kualitas Terjamin",
      description: "Setiap proyek dikerjakan dengan standar kualitas tinggi dan melalui quality control yang ketat."
    },
    {
      icon: Briefcase,
      color: "purple",
      title: "Tim Profesional",
      description: "Dikerjakan oleh tim berpengalaman di bidangnya dengan portfolio proyek yang beragam."
    },
    {
      icon: Users,
      color: "green",
      title: "Berorientasi Klien",
      description: "Kami mengutamakan kepuasan klien dengan komunikasi yang baik dan revisi sesuai kebutuhan."
    },
    {
      icon: Clock,
      color: "amber",
      title: "Tepat Waktu",
      description: "Komitmen kami untuk menyelesaikan setiap proyek sesuai dengan timeline yang disepakati."
    },
    {
      icon: CreditCard,
      color: "rose",
      title: "Harga Transparan",
      description: "Biaya yang jelas tanpa biaya tersembunyi, dengan penawaran yang sesuai nilai proyek."
    },
    {
      icon: HeartHandshake,
      color: "teal",
      title: "Dukungan Berkelanjutan",
      description: "Layanan dukungan pasca proyek untuk memastikan hasil kerja berfungsi optimal."
    }
  ];

  // Dynamic color handler function
  const getColorClasses = (color: string, isHovered: boolean) => {
    const baseClasses = {
      blue: {
        bg: "bg-blue-100",
        bgDark: "dark:bg-blue-900/30",
        bgHover: "bg-blue-600",
        bgHoverDark: "dark:bg-blue-700",
        text: "text-blue-600",
        textDark: "dark:text-blue-400",
        textHover: "text-white",
        border: "border-blue-200",
        borderDark: "dark:border-blue-900",
        borderHover: "border-blue-600",
        borderHoverDark: "dark:border-blue-700",
        shadow: "shadow-blue-200/50",
        shadowDark: "dark:shadow-blue-900/20"
      },
      purple: {
        bg: "bg-purple-100",
        bgDark: "dark:bg-purple-900/30",
        bgHover: "bg-purple-600",
        bgHoverDark: "dark:bg-purple-700",
        text: "text-purple-600",
        textDark: "dark:text-purple-400",
        textHover: "text-white",
        border: "border-purple-200",
        borderDark: "dark:border-purple-900",
        borderHover: "border-purple-600",
        borderHoverDark: "dark:border-purple-700",
        shadow: "shadow-purple-200/50",
        shadowDark: "dark:shadow-purple-900/20"
      },
      green: {
        bg: "bg-green-100",
        bgDark: "dark:bg-green-900/30",
        bgHover: "bg-green-600",
        bgHoverDark: "dark:bg-green-700",
        text: "text-green-600",
        textDark: "dark:text-green-400",
        textHover: "text-white",
        border: "border-green-200",
        borderDark: "dark:border-green-900",
        borderHover: "border-green-600",
        borderHoverDark: "dark:border-green-700",
        shadow: "shadow-green-200/50",
        shadowDark: "dark:shadow-green-900/20"
      },
      amber: {
        bg: "bg-amber-100",
        bgDark: "dark:bg-amber-900/30",
        bgHover: "bg-amber-600",
        bgHoverDark: "dark:bg-amber-700",
        text: "text-amber-600",
        textDark: "dark:text-amber-400",
        textHover: "text-white",
        border: "border-amber-200",
        borderDark: "dark:border-amber-900",
        borderHover: "border-amber-600",
        borderHoverDark: "dark:border-amber-700",
        shadow: "shadow-amber-200/50",
        shadowDark: "dark:shadow-amber-900/20"
      },
      rose: {
        bg: "bg-rose-100",
        bgDark: "dark:bg-rose-900/30",
        bgHover: "bg-rose-600",
        bgHoverDark: "dark:bg-rose-700",
        text: "text-rose-600",
        textDark: "dark:text-rose-400",
        textHover: "text-white",
        border: "border-rose-200",
        borderDark: "dark:border-rose-900",
        borderHover: "border-rose-600",
        borderHoverDark: "dark:border-rose-700",
        shadow: "shadow-rose-200/50",
        shadowDark: "dark:shadow-rose-900/20"
      },
      teal: {
        bg: "bg-teal-100",
        bgDark: "dark:bg-teal-900/30",
        bgHover: "bg-teal-600",
        bgHoverDark: "dark:bg-teal-700",
        text: "text-teal-600",
        textDark: "dark:text-teal-400",
        textHover: "text-white",
        border: "border-teal-200",
        borderDark: "dark:border-teal-900",
        borderHover: "border-teal-600",
        borderHoverDark: "dark:border-teal-700",
        shadow: "shadow-teal-200/50",
        shadowDark: "dark:shadow-teal-900/20"
      }
    };

    const colors = baseClasses[color as keyof typeof baseClasses];

    return {
      iconBg: isHovered 
        ? `${colors.bgHover} ${colors.bgHoverDark}` 
        : `${colors.bg} ${colors.bgDark}`,
      iconText: isHovered 
        ? colors.textHover 
        : `${colors.text} ${colors.textDark}`,
      cardBorder: isHovered 
        ? `${colors.borderHover} ${colors.borderHoverDark}` 
        : `${colors.border} ${colors.borderDark}`,
      shadow: `${colors.shadow} ${colors.shadowDark}`
    };
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Mengapa Memilih Kami</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Keunggulan layanan kami yang membedakan dari yang lain
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const isHovered = hoveredIndex === index;
            const colors = getColorClasses(feature.color, isHovered);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className={`bg-white dark:bg-slate-900 p-8 rounded-2xl border ${colors.cardBorder} shadow-xl ${colors.shadow} transition-all duration-300 transform hover:scale-105`}
              >
                <div className={`w-16 h-16 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-6 transition-colors duration-300`}>
                  <feature.icon className={`h-8 w-8 ${colors.iconText} transition-colors duration-300`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}