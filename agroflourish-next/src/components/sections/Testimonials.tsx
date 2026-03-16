"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useContent } from "@/contexts/LanguageContext";

export function Testimonials() {
  const c = useContent();

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{c.testimonials.sectionLabel}</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground">{c.testimonials.title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {c.testimonials.items.map((testimonial, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="bg-card p-8 rounded-3xl shadow-lg shadow-black/5 border border-border relative pt-12">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                <Quote className="h-5 w-5 text-white fill-white" />
              </div>
              <p className="text-foreground/80 text-lg leading-relaxed mb-8 italic">&quot;{testimonial.quote}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl font-display">{testimonial.name.charAt(0)}</div>
                <div>
                  <h4 className="font-bold text-foreground font-display">{testimonial.name}</h4>
                  <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
