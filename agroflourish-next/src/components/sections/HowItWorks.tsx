"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/contexts/LanguageContext";

export function HowItWorks() {
  const c = useContent();

  return (
    <section id="how-it-works" className="py-24 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/90" aria-hidden />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-accent font-bold tracking-wider uppercase text-sm mb-3 drop-shadow-sm">{c.howItWorks.sectionLabel}</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">{c.howItWorks.title}</h3>
          <p className="text-white/95 text-lg drop-shadow-sm">{c.howItWorks.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-white/40 z-0" />
          {c.howItWorks.items.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.15 }} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-green-600 border-4 border-white/70 flex items-center justify-center mb-6 shadow-2xl shadow-black/40 relative group-hover:border-accent transition-colors duration-300">
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-primary font-bold flex items-center justify-center text-sm shadow-lg border-2 border-white/50">{step.step}</div>
                  <Icon className="h-10 w-10 text-white drop-shadow-sm" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 font-display drop-shadow-md">{step.title}</h4>
                <p className="text-white/95 text-sm leading-relaxed px-4 drop-shadow-sm">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
