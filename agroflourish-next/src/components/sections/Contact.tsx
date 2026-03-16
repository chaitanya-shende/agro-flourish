"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Send, CheckCircle2, ExternalLink } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContent } from "@/contexts/LanguageContext";

type ContactFormValues = { name: string; email: string; message: string };

export function Contact() {
  const c = useContent();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, c.contact.nameError),
        email: z.string().email(c.contact.emailError),
        message: z.string().min(10, c.contact.messageError),
      }),
    [c.contact.nameError, c.contact.emailError, c.contact.messageError]
  );

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setIsSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again.");
    }
  };

  const handleSendAnother = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    reset();
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden border border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 bg-primary p-10 md:p-12 text-primary-foreground relative overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute top-12 -left-12 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{c.contact.title}</h3>
                <p className="text-primary-foreground/80 mb-12">{c.contact.description}</p>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-primary-foreground/60 mb-1">{c.contact.phoneLabel}</p>
                      <p className="font-medium text-white">{c.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-primary-foreground/60 mb-1">{c.contact.emailLabel}</p>
                      <p className="font-medium text-white">{c.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-primary-foreground/60 mb-1">{c.contact.addressLabel}</p>
                      <p className="font-medium text-white leading-relaxed">{c.contact.address}</p>
                      {c.contact.mapsUrl && (
                        <a href={c.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-sm text-accent hover:text-white transition-colors font-medium">
                          <ExternalLink className="w-3.5 h-3.5" /> View on Google Maps
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 p-10 md:p-12 lg:p-16">
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-foreground">{c.contact.successTitle}</h3>
                  <p className="text-muted-foreground max-w-md">{c.contact.successMessage}</p>
                  <Button variant="outline" className="mt-8" onClick={handleSendAnother}>{c.contact.sendAnother}</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-6">{c.contact.formTitle}</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">{c.contact.nameLabel}</label>
                    <input {...register("name")} className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder={c.contact.namePlaceholder} />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">{c.contact.emailInputLabel}</label>
                    <input {...register("email")} type="email" className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder={c.contact.emailPlaceholder} />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">{c.contact.messageLabel}</label>
                    <textarea {...register("message")} rows={4} className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none" placeholder={c.contact.messagePlaceholder} />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                  </div>
                  {submitError && (
                    <p className="text-sm text-destructive font-medium">{submitError}</p>
                  )}
                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? c.contact.sending : <>{c.contact.submitButton} <Send className="ml-2 w-4 h-4 inline" /></>}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
