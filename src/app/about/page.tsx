"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function AboutPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-gray-900/60 backdrop-blur-lg">

      {/* 🌈 Background Gradients */}
      <div className="absolute -top-40 left-0 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[140px]"></div>
      <div className="absolute -bottom-32 right-0 w-[700px] h-[700px] bg-pink-500/20 rounded-full blur-[140px]"></div>
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0ea5e9,_#0f172a,_#000000)] animate-gradient"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* HERO SECTION */}
      <section className="relative py-32 md:py-44 z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 text-center lg:text-left space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Crafting Digital Experiences that Empower Businesses 🚀
          </h1>
          <p className="text-gray-300 max-w-xl mb-8">
            We turn visionary ideas into scalable products that drive measurable business growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-6">
            <a
              href="/consultation"
              className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white shadow-lg hover:shadow-cyan-400/50 transition-all"
            >
              Get Free Consultation
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
              alt="Team collaboration"
              className="w-full object-cover hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute bottom-6 left-6 bg-gray-900/70 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-md font-medium border border-gray-700/30">
              💼 Trusted by 150+ Global Clients
            </div>
          </div>
        </motion.div>
      </section>

     {/* ================= Corus Initiative Section ================= */}
<section className="relative z-10 py-28 max-w-7xl mx-auto px-6 text-center">
  {/* Heading */}
  <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
    Corus Initiative
  </h2>
  <p className="text-gray-300 max-w-3xl mx-auto mb-16 text-lg md:text-xl">
    At Corus Initiative, we transform ideas into scalable digital solutions. 
    Our expertise spans web development, UX design, software engineering, 
    and strategy consulting — all focused on delivering measurable impact.
  </p>

  {/* Feature Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      { title: "Innovative Solutions", icon: "💡", description: "Cutting-edge technology to solve complex business challenges." },
      { title: "Expert Team", icon: "👨‍💻", description: "A dedicated team of developers, designers, and strategists." },
      { title: "Scalable Products", icon: "🚀", description: "Build solutions that grow with your business needs." },
      { title: "Global Impact", icon: "🌎", description: "Delivering results for clients around the world." },
    ].map((card, idx) => (
      <div
        key={idx}
        className="relative bg-gray-900/60 backdrop-blur-lg border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:scale-105 transition-transform duration-500"
      >
        <div className="text-5xl mb-4">{card.icon}</div>
        <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
        <p className="text-gray-300">{card.description}</p>
      </div>
    ))}
  </div>

  {/* Schedule Call Button */}
  <div className="mt-16">
    <a
      href="/schedule-call"
      className="inline-block px-10 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-xl transition-all transform hover:scale-105"
    >
      Schedule a Call
    </a>
  </div>
</section>


      {/* OUR MISSION & VISION */}
      <section className="relative z-10 py-28 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-12 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
        >
          <div>
            <h2 className="text-4xl font-bold text-cyan-400 mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              To empower businesses through design-driven, tech-powered digital products that accelerate innovation and growth.
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-cyan-400 mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              To redefine the future of human-centered technology — creating seamless digital ecosystems where brands and users thrive together.
            </p>
          </div>
        </motion.div>

        <motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-700 h-[400px] md:h-[500px]"
>
  {/* Simple img tag with proper attributes */}
  <img 
    src="/images/service.jpg"
    alt="Innovation"
    loading="lazy"
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
    // Inline fallback style
    style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 100%)'
    }}
  />
</motion.div>
      </section>

      {/* CONTACT FORM */}
      <section className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-cyan-400 text-center">📩 Let’s Talk About Your Project</h3>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/70 backdrop-blur-lg border border-gray-700 p-8 rounded-2xl shadow-xl space-y-5"
        >
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg"
          >
            Send Message
          </motion.button>
        </form>
      </section>
    </main>
  );
}
