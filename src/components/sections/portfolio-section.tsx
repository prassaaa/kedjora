"use client";

import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const categories = ["All", "Website Development", "Mobile App", "Bot Automation", "Academic Services"];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { portfolioSection } = siteConfig;

  const filteredItems = activeCategory === "All" 
    ? portfolioSection.items 
    : portfolioSection.items.filter(item => item.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="flex flex-col items-center justify-center gap-10 pb-10 w-full relative"
    >
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
          {portfolioSection.title}
        </h2>
        <p className="text-muted-foreground text-center text-balance font-medium">
          {portfolioSection.description}
        </p>
      </SectionHeader>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              activeCategory === category
                ? "bg-secondary text-white"
                : "bg-muted text-muted-foreground hover:bg-secondary/20"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto px-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-secondary">
                  📈 {item.results}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <p className="text-muted-foreground mb-4">
          Tertarik dengan hasil karya kami? Mari diskusikan project Anda!
        </p>
        <a
          href="https://wa.me/6281234567890"
          className="bg-secondary text-white px-6 py-3 rounded-full font-medium hover:bg-secondary/90 transition-colors inline-flex items-center gap-2"
        >
          💬 Konsultasi Project Anda
        </a>
      </div>
    </section>
  );
}
