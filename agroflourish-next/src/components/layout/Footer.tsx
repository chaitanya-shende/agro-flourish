"use client";

import { Sprout, Mail, Phone, MapPin } from "lucide-react";
import { useContent } from "@/contexts/LanguageContext";

const footerLinkHrefs = ["#about", "#how-it-works", "#products", "#contact"];

export function Footer() {
  const c = useContent();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-xl">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">{c.global.businessName}</span>
            </div>
            <p className="text-primary-foreground/80 max-w-xs leading-relaxed">{c.global.shortDescription}</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-white">{c.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {c.footer.links.map((label, i) => (
                <li key={i}>
                  <a href={footerLinkHrefs[i]} onClick={(e) => handleScrollTo(e, footerLinkHrefs[i])} className="text-primary-foreground/80 hover:text-white hover:underline transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-white">{c.footer.contactUs}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <Phone className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{c.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <Mail className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{c.contact.email}</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{c.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">© {new Date().getFullYear()} {c.global.businessName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors text-sm">{c.footer.privacy}</a>
            <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors text-sm">{c.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
