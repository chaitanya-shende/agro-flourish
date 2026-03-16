"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/contexts/LanguageContext";

export function WhyHydroponics() {
  const c = useContent();

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/texture-leaf.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/20" aria-hidden />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{c.whyHydroponics.sectionLabel}</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground">{c.whyHydroponics.title}</h3>
        </div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {c.whyHydroponics.items.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div key={idx} variants={item} className="bg-card/95 backdrop-blur-xs p-8 rounded-3xl shadow-xl shadow-black/10 border border-border/60 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                  <Icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3 font-display">{benefit.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
