"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useContent } from "@/contexts/LanguageContext";

export function About() {
  const c = useContent();

  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group bg-secondary/30">
              <Image
                src="/images/about-farm.png"
                alt="Indoor hydroponic farm with leafy greens"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl pointer-events-none" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-foreground">100%</p>
                  <p className="text-sm font-medium text-muted-foreground">{c.about.sustainableLabel}</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary" />{c.about.sectionLabel}
            </h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              {c.about.titleLine1} <span className="text-primary">{c.about.titleHighlight}</span>.
            </h3>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p className="font-medium text-foreground/80 text-xl leading-relaxed">&quot;{c.about.mission}&quot;</p>
              <p className="leading-relaxed">{c.about.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
