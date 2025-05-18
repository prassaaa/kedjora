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
        bgHover: "bg-blue-600",
        text: "text-blue-600",
        textHover: "text-white",
        border: "border-blue-200",
        borderHover: "border-blue-600",
        shadow: "shadow-blue-200/50"
      },
      purple: {
        bg: "bg-purple-100",
        bgHover: "bg-purple-600",
        text: "text-purple-600",
        textHover: "text-white",
        border: "border-purple-200",
        borderHover: "border-purple-600",
        shadow: "shadow-purple-200/50"
      },
      green: {
        bg: "bg-green-100",
        bgHover: "bg-green-600",
        text: "text-green-600",
        textHover: "text-white",
        border: "border-green-200",
        borderHover: "border-green-600",
        shadow: "shadow-green-200/50"
      },
      amber: {
        bg: "bg-amber-100",
        bgHover: "bg-amber-600",
        text: "text-amber-600",
        textHover: "text-white",
        border: "border-amber-200",
        borderHover: "border-amber-600",
        shadow: "shadow-amber-200/50"
      },
      rose: {
        bg: "bg-rose-100",
        bgHover: "bg-rose-600",
        text: "text-rose-600",
        textHover: "text-white",
        border: "border-rose-200",
        borderHover: "border-rose-600",
        shadow: "shadow-rose-200/50"
      },
      teal: {
        bg: "bg-teal-100",
        bgHover: "bg-teal-600",
        text: "text-teal-600",
        textHover: "text-white",
        border: "border-teal-200",
        borderHover: "border-teal-600",
        shadow: "shadow-teal-200/50"
      }
    };

    const colors = baseClasses[color as keyof typeof baseClasses];

    return {
      iconBg: isHovered ? colors.bgHover : colors.bg,
      iconText: isHovered ? colors.textHover : colors.text,
      cardBorder: isHovered ? colors.borderHover : colors.border,
      shadow: colors.shadow
    };
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-3">Mengapa Memilih Kami</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-600">
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
                className={`bg-white p-8 rounded-2xl border ${colors.cardBorder} shadow-xl ${colors.shadow} transition-all duration-300 transform hover:scale-105`}
              >
                <div className={`w-16 h-16 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-6 transition-colors duration-300`}>
                  <feature.icon className={`h-8 w-8 ${colors.iconText} transition-colors duration-300`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
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