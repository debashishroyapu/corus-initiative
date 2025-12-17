"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ShieldCheck,
  Users,
  Rocket,
  Brain,
  BarChart3,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
    title: "Reliable & Secure Delivery",
    desc: "Enterprise-grade security and seamless project delivery for maximum business trust.",
  },
  {
    icon: <Brain className="w-10 h-10 text-purple-500" />,
    title: "Strategic Thinking",
    desc: "We build scalable ecosystems that align perfectly with your business goals.",
  },
  {
    icon: <Users className="w-10 h-10 text-green-500" />,
    title: "Client-Centric Partnership",
    desc: "Aligned, transparent, and committed to your success as your in-house digital team.",
  },
  {
    icon: <Rocket className="w-10 h-10 text-pink-500" />,
    title: "Innovation & Acceleration",
    desc: "From ideation to execution, we accelerate growth with cutting-edge technology.",
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-orange-500" />,
    title: "Data-Driven Approach",
    desc: "Analytics and performance metrics drive measurable results for every project.",
  },
  {
    icon: <Clock className="w-10 h-10 text-yellow-500" />,
    title: "Continuous Support",
    desc: "24/7 enterprise support ensures your digital presence is stable and future-proof.",
  },
];

export default function WhyChooseUsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      containScroll: "trimSnaps",
      dragFree: true, // ✅ draggable alternative
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="relative py-28 bg-gradient-to-b from-[#0C0F13] via-[#0E1014] to-[#0A0A0D] text-white overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-8rem] left-[10%] w-[25rem] h-[25rem] bg-blue-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-6rem] right-[5%] w-[28rem] h-[28rem] bg-purple-600/25 blur-[120px] rounded-full"></div>

      {/* Heading */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Why Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            CorusInitiative
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Enterprise-grade solutions powered by strategy, innovation, and
          technology-driven excellence.
        </motion.p>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden max-w-7xl mx-auto px-4" ref={emblaRef}>
        <div className="flex gap-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative flex-[0_0_calc(100%-2rem)] sm:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(33.333%-1rem)] bg-white/5 rounded-3xl p-8 text-center border border-transparent hover:border-blue-500/30 shadow-md hover:shadow-blue-500/10 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500 rounded-3xl"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-5">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg cursor-pointer"
              >
                Explore More →
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-10 gap-3">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "bg-gradient-to-r from-blue-500 to-purple-500 w-6"
                : "bg-gray-500/40 hover:bg-gray-400/60"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
