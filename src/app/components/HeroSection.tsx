"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.playbackRate = 0.5;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/corus-background.mp4" type="video/mp4" />
      </video>

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle at top left, #0ea5e9, #0f172a, #000000)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 md:px-12">
        <div className="max-w-3xl text-center">
          {/* Heading */}
          <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="
    text-[clamp(1.8rem,5vw,3.5rem)]
    sm:text-[clamp(2rem,5vw,4rem)]
    md:text-[clamp(2.5rem,5vw,4.5rem)]
    font-extrabold
    leading-[1.1]
    tracking-[-0.02em]
    text-transparent bg-clip-text
    bg-gradient-to-r from-white via-blue-200 to-blue-400
  "
>
  Building Next-Gen
  <br />
  Digital Experiences
</motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="
              mt-6 sm:mt-7 max-w-2xl mx-auto
              text-[14px] sm:text-[15px] md:text-[17px]
              font-normal
              tracking-wide
              text-gray-300/90
              leading-relaxed
            "
          >
            We design and develop scalable, secure, and future-ready
            digital solutions for modern businesses.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-8 sm:mt-11 flex flex-col sm:flex-row justify-center gap-4"
          >
           {/* CTA */}
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.65 }}
  className="mt-11 flex justify-center"
>
           <a
          href="/schedule-call"
         className="
          px-10 py-4
      text-lg md:text-xl
      font-semibold tracking-wide
      rounded-2xl
      bg-blue-600 text-white
      hover:bg-blue-500
      transition-all
      shadow-lg shadow-blue-600/30
    "
  >
    Get Started
  </a>
</motion.div>
       </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 sm:w-7 sm:h-12 rounded-full border border-white/30 flex items-start justify-center p-1"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="w-1 h-2 sm:w-1.5 sm:h-3 bg-white/70 rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
