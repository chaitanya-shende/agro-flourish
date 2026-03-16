"use client";

import { motion } from "framer-motion";
import { useContent } from "@/contexts/LanguageContext";

export function WhyHydroponics() {
  const c = useContent();

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section className="py-24 bg-secondary/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{c.whyHydroponics.sectionLabel}</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground">{c.whyHydroponics.title}</h3>
        </div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {c.whyHydroponics.items.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div key={idx} variants={item} className="bg-card p-8 rounded-3xl shadow-lg shadow-black/5 border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 group">
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
