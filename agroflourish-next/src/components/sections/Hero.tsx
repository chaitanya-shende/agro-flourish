"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useContent } from "@/contexts/LanguageContext";

export function Hero() {
  const c = useContent();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/90 to-green-700/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {c.hero.soillessBadge}
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight mb-6">{c.hero.title}</h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 max-w-xl">{c.hero.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Button size="lg" onClick={() => handleScrollTo("products")}>{c.hero.ctaPrimary}</Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:border-white/50" onClick={() => handleScrollTo("how-it-works")}>{c.hero.ctaSecondary}</Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
              {c.hero.badges.map((badge, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span className="text-white/90 text-sm font-medium">{badge}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
