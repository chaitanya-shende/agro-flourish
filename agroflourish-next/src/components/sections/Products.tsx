"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/contexts/LanguageContext";

export function Products() {
  const c = useContent();

  return (
    <section id="products" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fresh-harvest.png"
          alt="Fresh harvest of vegetables"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/85" aria-hidden />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary" />{c.products.sectionLabel}
            </h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground">{c.products.title}</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.products.items.map((product, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }} className="bg-card rounded-3xl p-6 shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 relative group">
              <div className="absolute top-6 right-6">
                {product.available ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">{c.products.available}</span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">{c.products.soldOut}</span>
                )}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">{product.emoji}</div>
              <div className="mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary/70">{product.category}</span>
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3 font-display leading-tight">{product.name}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
