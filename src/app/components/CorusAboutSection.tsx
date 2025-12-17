"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CorusAboutSection() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-black via-[#050B14] to-black overflow-hidden">
      
      {/* Soft background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] rounded-full
          bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >

          <h2
            className="text-[clamp(2rem,4vw,3.2rem)]
            font-semibold tracking-[-0.02em] leading-tight
            text-white"
          >
            From Design to Data, 
            Ranking to Growth,
            <br />
            <span className="text-transparent bg-clip-text
              bg-gradient-to-r from-cyan-400 to-blue-500">
              Your Digital Launchoad.
            </span>
          </h2>

          <p className="mt-6 text-gray-300 leading-relaxed max-w-xl">
             Your digital presence deserves more than 
             just visibility --it deserves impact.We craft
             websites, fuel them with smart marketing,
             optimize them for search, and back it all
             with data science to ensure lasting growth.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/schedule-call"> <button
              className="px-10 py-3 rounded-xl
              border border-blue/20 text-gray-400
              hover:bg-blue/5 transition-all"
            >
              Schedule Call
            </button>
            </Link>

          </div>
        </motion.div>

        {/* Right Poster / Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-black/60 backdrop-blur-xl
            border border-white/20 rounded-2xl p-8
            shadow-[0_0_60px_rgba(59,130,246,0.15)]">

            <h3 className="text-lg font-medium text-white mb-6">
              What We Focus On
            </h3>

            <div className="space-y-5">
              {[
                {
                  title: "Digital Transformation",
                  desc: "Scalable platforms and modern architectures.",
                },
                {
                  title: "Innovation & Research",
                  desc: "Future-driven ideas powered by technology.",
                },
                {
                  title: "Community Impact",
                  desc: "Solutions that matter beyond business.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-400" />
                  <div>
                    <h4 className="text-white font-medium">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
