"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRightCircle } from "react-icons/fi";
import {
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaBullhorn,
  FaSearch,
  FaChartLine,
  FaPaintBrush,
  FaPencilRuler,
} from "react-icons/fa";

const expertise = [
  {
    icon: <FaCode className="text-blue-400 text-5xl" />,
    title: "Software Development",
    desc: "Enterprise-grade software built for performance, scalability, and reliability.",
    slug: "software-development",
  },
  {
    icon: <FaLaptopCode className="text-cyan-400 text-5xl" />,
    title: "Web Development",
    desc: "Next.js, React, and full-stack web applications built with modern technologies.",
    slug: "web-development",
  },
  {
    icon: <FaMobileAlt className="text-pink-400 text-5xl" />,
    title: "App Development",
    desc: "Cross-platform mobile apps with intuitive UX and lightning-fast performance.",
    slug: "app-development",
  },
  {
    icon: <FaBullhorn className="text-orange-400 text-5xl" />,
    title: "Digital Marketing",
    desc: "Creative marketing strategies that boost brand presence and conversions.",
    slug: "digital-marketing",
  },
  {
    icon: <FaSearch className="text-green-400 text-5xl" />,
    title: "SEO Optimization",
    desc: "Comprehensive SEO strategies for better rankings and organic reach.",
    slug: "seo-optimization",
  },
  {
    icon: <FaChartLine className="text-purple-400 text-5xl" />,
    title: "Data Analytics",
    desc: "Transforming raw data into actionable business insights and dashboards.",
    slug: "data-analytics",
  },
  {
    icon: <FaPaintBrush className="text-teal-400 text-5xl" />,
    title: "Graphics Design",
    desc: "Modern brand visuals and creative storytelling through design.",
    slug: "graphics-design",
  },
  {
    icon: <FaPencilRuler className="text-rose-400 text-5xl" />,
    title: "UI/UX Design",
    desc: "Seamless and human-centered designs that elevate user experience.",
    slug: "ui-ux-design",
  },
];

export default function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="relative py-28 bg-gradient-to-b from-[#0C0F13] via-[#0E1014] to-[#0A0A0D] text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-[-8rem] left-[10%] w-[25rem] h-[25rem] bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-6rem] right-[5%] w-[28rem] h-[28rem] bg-blue-700/25 blur-[120px] rounded-full"></div>

      <div className="relative container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-md">
            Our Expertise
          </h2>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            We design scalable, innovative digital experiences that help brands grow.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 place-items-stretch"
        >
          {expertise.map((item, i) => (
            <Link key={i} href={`/solutions/${item.slug}`} className="group relative">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.3), 0 10px 30px rgba(56,189,248,0.3)",
                }}
                className="relative bg-[#101318]/80 border border-white/10 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden backdrop-blur-md cursor-pointer flex flex-col justify-between h-full"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-purple-500/10 blur-lg"></div>

                <div className="relative z-10 flex flex-col justify-between items-center text-center h-full">
                  <div className="mb-6 flex justify-center">{item.icon}</div>

                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 flex-1">
                    {item.desc}
                  </p>

                  {/* Instantly visible Explore More on hover/touch */}
                  <div className="flex items-center justify-center gap-2 text-cyan-400 font-medium opacity-0 group-hover:opacity-100 group-focus:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 ease-out">
                    <span>Explore More</span>
                    <FiArrowRightCircle className="text-lg group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
