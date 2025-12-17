"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

// Components
import Navbar from "../app/components/Navbar";
import HeroSection from "../app/components/HeroSection";
import NextSection from "../app/components/NextSection";
import ExpertiseSection from "../app/components/ExpertiseSection";
import WhyUsSection from "../app/components/WhyChooseUs";
import AssembleTeam from "../app/components/AssembleTeam";
import CookieConsent from "../app/components/CookieConsentSection";
import ProcessSection from "./components/Process";
import CorusAboutSection from "./components/CorusAboutSection";




export default function HomePage() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const yBackground: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yForeground: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const yHeroText: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <main className="relative w-full overflow-x-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-100">
      {/* Navbar */}
     <Navbar />

      {/* Multi-layer Parallax */}
      <motion.div style={{ y: yBackground }} className="absolute top-0 left-0 w-full h-[1600px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-100 -z-30" />
      <motion.div style={{ y: yForeground }} className="absolute top-0 left-0 w-full h-[800px] bg-[url('/Hero/ParallaxLayer.png')] bg-cover bg-center -z-20" />
      <motion.div style={{ y: yHeroText }} className="absolute top-0 left-0 w-full h-[600px] flex items-center justify-center -z-10">
        <h1 className="text-white text-5xl md:text-7xl font-bold text-center drop-shadow-xl">
          Enterprise Digital Solutions </h1>
        
      </motion.div>

      {/* Hero Section */}
      <div ref={parallaxRef}>
        <HeroSection />
      </div>

      {/* Next Section */}
     <CorusAboutSection />

      {/* Expertise Section */}
      <ExpertiseSection />

      {/* Why Choose Us */}
      <WhyUsSection />

      {/* Assemble Team */}
      <AssembleTeam />
      <ProcessSection />
       <CookieConsent />

      {/* Sticky CTA */}
      <motion.a href="/consultation" whileHover={{ scale: 1.05, rotate: -1 }} className="fixed bottom-6 right-6 z-50 px-6 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-cyan-500/50 transition transform">
        Book a Free Consultation 🚀
      </motion.a>
    </main>
  );
}






