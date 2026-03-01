"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Layers, Rocket, Users } from "lucide-react";

const features = [
  { title: "Innovative Solutions", icon: Rocket, description: "Cutting-edge technology to solve complex business challenges with precision and creativity." },
  { title: "Expert Team", icon: Users, description: "A dedicated team of developers, designers, and strategists committed to your success." },
  { title: "Scalable Products", icon: Layers, description: "Build solutions that grow seamlessly with your business needs and ambitions." },
  { title: "Global Impact", icon: Globe, description: "Delivering measurable results for clients across industries around the world." },
];

export default function AboutPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
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
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-[#030712]">

      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-cyan-500/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/6 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 py-32"
        >
          {/* Left */}
          <div className="flex-1 space-y-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-6">
                🌐 Digital Agency · Est. 2020
              </span>
              <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                Crafting Digital
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Experiences
                </span>
                <br />
                that Empower
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-gray-400 text-lg leading-relaxed max-w-lg"
            >
              We turn visionary ideas into scalable products that drive measurable business growth — from branding to full-stack engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/consultations">
                <motion.span
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg shadow-cyan-500/25 cursor-pointer"
                >
                  Free Consultation <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/schedule-call">
                <motion.span
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gray-700 hover:border-cyan-500/50 font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Schedule a Call
                </motion.span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.3 }}
              className="grid grid-cols-3 gap-3 pt-2"
            >
              {[
                { value: "50+", label: "Global Clients" },
                { value: "3+", label: "Years Experience" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center px-4 py-4 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-cyan-500/30 transition-colors">
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-widest mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Hero image (Unsplash) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[560px]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl scale-105" />
              <div className="relative rounded-3xl overflow-hidden border border-gray-700/60 shadow-2xl aspect-[4/3]" style={{ position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/50 to-transparent" />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 bg-gray-900 border border-gray-700 rounded-2xl px-5 py-3 shadow-xl"
              >
                <div className="text-xs text-gray-400 mb-0.5">Trusted by</div>
                <div className="text-xl font-black text-cyan-400">150+ Clients</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          CORUS INITIATIVE
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-28 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-6">
            Who We Are
          </span>
          <h2 className="text-4xl lg:text-6xl font-black mb-6">
            Corus
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Initiative</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            At Corus Initiative, we transform ideas into scalable digital solutions. Our expertise spans web development,
            UX design, software engineering, and strategy consulting — all focused on delivering measurable impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 hover:border-cyan-500/30 rounded-2xl p-6 flex flex-col items-center text-center transition-colors"
              >
                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/schedule-call">
            <motion.span
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              Schedule a Call <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          MISSION & VISION
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-6">
                Our Purpose
              </span>
              <h2 className="text-4xl lg:text-5xl font-black mb-4">
                Mission &
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Vision</span>
              </h2>
            </div>

            <div className="space-y-8">
              <div className="pl-6 border-l-2 border-cyan-500/50">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">
                  To empower businesses through design-driven, tech-powered digital products that accelerate innovation and growth — making world-class digital solutions accessible to all.
                </p>
              </div>
              <div className="pl-6 border-l-2 border-blue-500/50">
                <h3 className="text-xl font-bold text-blue-400 mb-3">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed">
                  To redefine the future of human-centered technology — creating seamless digital ecosystems where brands and users thrive together in a connected world.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image — public/images/pricing/pricing.jpg */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-3xl blur-2xl scale-105" />
            <div className="relative rounded-3xl overflow-hidden border border-gray-700/60 shadow-2xl aspect-[4/3]" style={{ position: 'relative' }}>
              <Image
                src="/images/pricing/pricing.jpg"
                alt="Our Vision"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT FORM
      ══════════════════════════════════════ */}
      <section className="relative z-10 px-6 lg:px-12 py-24 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl lg:text-4xl font-black mb-3">
            Let's Talk About
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Your Project</span>
          </h3>
          <p className="text-gray-400">We'll get back to you within 24 hours.</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-gray-900/60 border border-gray-800 rounded-2xl"
          >
            <div className="text-5xl mb-4">✅</div>
            <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
            <p className="text-gray-400">We'll be in touch shortly.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-400 text-sm mb-2 font-medium">Full Name</label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Your name" required
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-600 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2 font-medium">Email</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@company.com" required
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-600 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                rows={5} placeholder="Tell us about your project..." required
                className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-600 transition-colors resize-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={sending}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {sending ? "Sending..." : <>Send Message <ArrowRight className="w-4 h-4" /></>}
            </motion.button>
          </motion.form>
        )}
      </section>

    </main>
  );
}