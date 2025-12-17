"use client";
import { motion } from "framer-motion";

export default function NextSection() {
  return (
    <section
      id="next-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden text-white"
    >
      {/* === BACKGROUND === */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0D] via-[#0E1014] to-[#0C0F13]" />

      {/* Smooth transition blend from HeroSection */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />

      {/* Subtle accent lights */}
      <div className="absolute -top-10 left-[10%] w-64 h-64 bg-cyan-500/15 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-blue-700/20 blur-[100px] rounded-full" />

      {/* === CONTENT === */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 px-6 text-center max-w-4xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          Next Generation Digital Solutions
        </h2>

        <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Empowering brands and enterprises to redefine their digital presence. We design, develop, and deliver scalable solutions that align innovation with impact — bringing ideas to life with precision and purpose.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold rounded-full hover:from-blue-400 hover:to-cyan-300 transition-all shadow-lg hover:shadow-cyan-400/30">
            Explore Our Services
          </button>
          <button className="px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition">
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

