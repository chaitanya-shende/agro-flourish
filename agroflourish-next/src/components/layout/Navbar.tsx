"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/data/translations";

const langOptions: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिं" },
  { code: "mr", label: "मरा" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.howItWorks, href: "#how-it-works" },
    { name: t.nav.products, href: "#products" },
    { name: t.nav.testimonials, href: "#testimonials" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  };

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <span className={cn("font-display font-bold text-2xl tracking-tight transition-colors", isScrolled ? "text-primary" : "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]")}>AgroFlourish</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => handleScrollTo(e, link.href)} className={cn("text-sm font-semibold transition-colors", isScrolled ? "text-foreground/80 hover:text-primary" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] hover:text-green-300")}>{link.name}</a>
                </li>
              ))}
            </ul>
            <div className={cn("flex items-center rounded-full border overflow-hidden transition-colors", isScrolled ? "border-border" : "border-white/30")}>
              {langOptions.map((opt) => (
                <button key={opt.code} onClick={() => setLanguage(opt.code)} className={cn("px-3 py-1 text-xs font-bold transition-colors", language === opt.code ? "bg-primary text-white" : isScrolled ? "text-foreground/70 hover:text-primary" : "text-white/80 hover:text-white")}>{opt.label}</button>
              ))}
            </div>
            <Button onClick={(e) => handleScrollTo(e as React.MouseEvent<HTMLButtonElement>, "#contact")}>{t.nav.contact}</Button>
          </div>
          <button className={cn("md:hidden p-2 transition-colors", isScrolled ? "text-foreground" : "text-white")} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <div className={cn("md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-border/50 transition-all duration-300 overflow-hidden", mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0")}>
        <ul className="px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => handleScrollTo(e, link.href)} className="block text-base font-medium text-foreground hover:text-primary transition-colors py-2">{link.name}</a>
            </li>
          ))}
          <li className="pt-2">
            <Button className="w-full" onClick={(e) => handleScrollTo(e as React.MouseEvent<HTMLButtonElement>, "#contact")}>{t.nav.contact}</Button>
          </li>
          <li className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Language</p>
            <div className="flex gap-2">
              {langOptions.map((opt) => (
                <button key={opt.code} onClick={() => setLanguage(opt.code)} className={cn("flex-1 py-2 rounded-lg text-sm font-bold transition-colors", language === opt.code ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-primary/10")}>{opt.label}</button>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
