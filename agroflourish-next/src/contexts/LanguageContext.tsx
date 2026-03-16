"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { type Language, type SiteTranslation, translations } from "@/data/translations";
import { siteContent } from "@/data/content";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: SiteTranslation;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

const baseWhyHydroponicsIcons = siteContent.whyHydroponics.map((b) => b.icon);
const baseHowItWorksIcons = siteContent.howItWorks.map((s) => s.icon);
const baseHowItWorksSteps = siteContent.howItWorks.map((s) => s.step);
const baseProductsAvailable = siteContent.products.map((p) => p.available);
const baseProductsEmoji = siteContent.products.map((p) => p.emoji);

export function useContent() {
  const { t } = useLanguage();
  return {
    ...t,
    whyHydroponics: {
      ...t.whyHydroponics,
      items: t.whyHydroponics.items.map((item, i) => ({
        ...item,
        icon: baseWhyHydroponicsIcons[i],
      })),
    },
    howItWorks: {
      ...t.howItWorks,
      items: t.howItWorks.items.map((item, i) => ({
        ...item,
        icon: baseHowItWorksIcons[i],
        step: baseHowItWorksSteps[i],
      })),
    },
    products: {
      ...t.products,
      items: t.products.items.map((item, i) => ({
        ...item,
        available: baseProductsAvailable[i],
        emoji: baseProductsEmoji[i],
      })),
    },
    contact: {
      ...t.contact,
      phone: siteContent.contact.phone,
      whatsapp: siteContent.contact.whatsapp,
      email: siteContent.contact.email,
      address: siteContent.contact.address,
      mapsUrl: siteContent.contact.mapsUrl,
    },
    global: {
      ...t.global,
      businessName: siteContent.global.businessName,
    },
  };
}
