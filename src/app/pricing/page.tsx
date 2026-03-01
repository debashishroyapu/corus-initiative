"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, Zap, Crown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const plans = [
  {
    name: "Basic Plan",
    price: 700,
    tagline: "Let's Build Your Digital Identity",
    audience: "For startups taking their first digital step.",
    icon: Zap,
    accent: "from-sky-400 to-cyan-500",
    border: "border-sky-500/30",
    glow: "shadow-sky-500/20",
    features: [
      "Logo & brand kit (1 concept + color palette)",
      "5 branded social media post designs",
      "1–7 page responsive website",
      "Google Analytics & SEO setup (basic)",
      "Performance insights via GA4 dashboard",
      "7 days full support",
      "Pre-made Theme Design",
      "Contact Form",
    ],
  },
  {
    name: "Standard Plan",
    price: 1200,
    tagline: "Let's Grow Your Brand",
    audience: "For growing brands ready to expand online.",
    icon: Sparkles,
    accent: "from-cyan-400 to-blue-500",
    border: "border-cyan-400/50",
    glow: "shadow-cyan-400/30",
    featured: true,
    features: [
      "Full brand identity (logo, fonts, guidelines)",
      "10–15 social media post designs",
      "Dynamic website (up to 7–15 pages)",
      "Blog & contact form integration",
      "Basic SEO + 2 social platforms marketing",
      "Basic Data Analysis (Descriptive + Diagnostic)",
      "1 Dashboard (Power BI) & Report",
      "1 Predictive Modeling",
    ],
  },
  {
    name: "Premium Plan",
    price: 2000,
    tagline: "Let's Scale to the Next Level",
    audience: "For established brands ready for automation and scaling.",
    icon: Crown,
    accent: "from-blue-400 to-indigo-500",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/20",
    features: [
      "Complete brand identity & unlimited design support",
      "20+ premium social media creatives/month",
      "eCommerce or enterprise website",
      "Payment, chat & automation integrations",
      "Full SEO + Google & Meta Ads",
      "Advanced Data Analysis",
      "Multiple Dashboard (Power BI) & Report",
      "Multiple Predictive Modeling",
    ],
  },
];

export default function PricingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="relative min-h-screen text-white overflow-hidden bg-[#030712]">

      {/* ── Background mesh ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* ── Hero ── */}
      <div ref={heroRef} className="relative z-10 min-h-screen flex items-center">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 py-24"
        >
          {/* Left */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm font-medium tracking-wide mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Transparent Pricing. Real Results.
              </span>
              <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                Power Up Your
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Digital Growth
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-gray-400 text-lg leading-relaxed max-w-lg"
            >
              From branding to automation — choose a plan that evolves with your business
              and builds your online legacy. We help startups, growing brands, and
              enterprises scale with creative, technical, and analytical solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="#plans">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg shadow-cyan-500/25 cursor-pointer"
                >
                  Explore Plans <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/consultations">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gray-700 hover:border-cyan-500/50 font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Free Consultation
                </motion.span>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              {[
                { value: "50+", label: "Happy Clients", icon: "🤝" },
                { value: "3", label: "Flexible Plans", icon: "📦" },
                { value: "24/7", label: "Support", icon: "⚡" },
                { value: "$700", label: "Starting From", icon: "🚀" },
              ].map(({ value, label, icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center px-4 py-4 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="text-xl mb-1">{icon}</span>
                  <span className="text-2xl font-black text-white leading-none">{value}</span>
                  <span className="text-[11px] text-gray-500 uppercase tracking-widest mt-1">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[560px]">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl scale-105" />
              <div className="relative rounded-3xl overflow-hidden border border-gray-700/60 shadow-2xl aspect-[4/3]" style={{ position: 'relative' }}>
                <Image
                  src="/images/pricing/pricing.jpg"
                  alt="Corus Digital Solutions"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 bg-gray-900 border border-gray-700 rounded-2xl px-5 py-3 shadow-xl"
              >
                <div className="text-xs text-gray-400 mb-0.5">Starting from</div>
                <div className="text-2xl font-black text-cyan-400">$700</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Plans Section ── */}
      <div id="plans" className="relative z-10 px-6 lg:px-12 py-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-6">
            <Crown className="w-3.5 h-3.5" />
            Agency Package Plans
          </span>
          <h2 className="text-4xl lg:text-6xl font-black mb-4">
            Choose Your
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Plan</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            From startups to enterprises — every plan includes dedicated support and measurable results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative rounded-2xl border ${plan.border} bg-gray-900/60 backdrop-blur-sm p-8 shadow-2xl ${plan.glow} ${plan.featured ? 'lg:-mt-6 lg:mb-6' : ''}`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold tracking-widest uppercase shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.accent} mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-xl font-black bg-gradient-to-r ${plan.accent} bg-clip-text text-transparent mb-1`}>
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm italic">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-gray-800">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-white">${plan.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm mb-2">/project</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">{plan.audience}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 + index * 0.1 }}
                      className="flex items-start gap-3 text-gray-300 text-sm"
                    >
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 bg-gradient-to-br ${plan.accent} bg-clip-text text-cyan-400`} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA — schedule-call এ link */}
                <Link href="/schedule-call">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r ${plan.accent} shadow-lg cursor-pointer transition-all`}
                  >
                    Choose {plan.name} <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Compare note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 text-sm mt-12"
        >
          All prices are in USD. Need something custom?{" "}
          <Link href="/consultations" className="text-cyan-400 hover:underline">
            Let's talk →
          </Link>
        </motion.p>
      </div>

      {/* ── Contact Form ── */}
      <div className="relative z-10 px-6 py-24 max-w-3xl mx-auto">
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
          <p className="text-gray-400">Tell us what you need and we'll get back to you within 24 hours.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-600 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2 font-medium">Message</label>
            <textarea
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-600 transition-colors resize-none"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            Send Message <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

    </section>
  );
}