"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const teamRoles = [
  { title: "Web Developer & SEO Consultant", img: "/Images/Team/Debashish.png" },
  { title: "Data Analyst", img: "/Images/Team/Anmoy.png" },
  { title: "Digital Marketer", img: "/Images/Team/Joykanto.png" },
  { title: "Graphics Designer", img: "/Images/Team/Antor.png" },
];

export default function AssembleTeam() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-[#0A0A0D] via-[#0C0F13] to-[#0E1014] text-white overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-[-6rem] left-[10%] w-[28rem] h-[28rem] bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-6rem] right-[5%] w-[30rem] h-[30rem] bg-purple-500/25 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-16 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Meet the <span className="text-white">CorusInitiative</span> Team
        </motion.h2>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-12 justify-items-center">
          {teamRoles.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              className="group relative bg-[#11121A]/80 border border-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 w-full max-w-[300px]"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-xl"></div>

              {/* Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>

              {/* Info */}
              <div className="py-6 px-5 relative z-10">
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {member.title}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  Expert member of CorusInitiative
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      {/* CTA */}
            <motion.div initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} transition={{delay:0.3}} className="mt-24 text-center">
              <p className="text-gray-300 mb-6 text-lg">Let’s transform your digital presence into enterprise excellence.</p>
              <a href="/consultation" className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-blue-500/40 transition duration-300 hover:scale-105">
                Get a Free Consultation 🚀
              </a>
            </motion.div>
      </div>
    </section>
  );
}
