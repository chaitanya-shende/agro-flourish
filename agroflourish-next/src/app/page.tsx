import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyHydroponics } from "@/components/sections/WhyHydroponics";
import { Products } from "@/components/sections/Products";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WhyHydroponics />
      <Products />
      <HowItWorks />
      <Testimonials />
      <Contact />
    </>
  );
}
