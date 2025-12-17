"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import HeroImage from "/images/service.jpg";

const plans = [
  {
    name: "Basic Plan",
    price: 700,
    tagline: "Let’s Build Your Digital Identity",
    audience: "For startups taking their first digital step.",
    features: [
      "Logo & brand kit (1 concept + color palette)",
      "5 branded social media post designs",
      "1–5 page responsive website",
      "Google Analytics & SEO setup (basic)",
      "App consultation only — no development",
      "Performance insights via GA4 dashboard",
    ],
  },
  {
    name: "Standard Plan",
    price: 1200,
    tagline: "Let’s Grow Your Brand",
    audience: "For growing brands ready to expand online.",
    features: [
      "Full brand identity (logo, fonts, guidelines)",
      "10–15 social media post designs",
      "Dynamic website (up to 6–10 pages)",
      "Blog & contact form integration",
      "Basic SEO + 2 social platforms marketing",
      "Mobile app prototype (UI/UX only)",
      "Basic Data Analysis (Descriptive + Diagnostic)",
      "1 Dashboard (Power BI) & Report",
      "1 Predictive Modeling",
    ],
  },
  {
    name: "Premium Plan",
    price: 2000,
    tagline: "Let’s Scale to the Next Level",
    audience: "For established brands ready for automation and scaling.",
    features: [
      "Complete brand identity & unlimited design support",
      "20+ premium social media creatives/month",
      "eCommerce or enterprise website",
      "Payment, chat & automation integrations",
      "Full SEO + Google & Meta Ads",
      "Full mobile app (Android/iOS) development",
      "Advanced Data Analysis",
      "Multiple Dashboard (Power BI) & Report",
      "Multiple Predictive Modeling",
    ],
  },
];

const addOns = [
  "Email marketing campaign setup",
  "Influencer & ad campaign management",
  "Additional dashboard or data model integration",
  "Multilingual website setup",
];

export default function PricingPage() {
  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      {/*  Animated Background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0ea5e9,_#0f172a,_#000000)] animate-gradient"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between py-24 px-8 max-w-7xl mx-auto gap-12">
        {/* Left Text */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Power Up Your Digital Growth 🚀
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-gray-300 max-w-xl mb-8"
          >
            From branding to automation — choose a plan that evolves with your
            business and builds your online legacy.
          </motion.p>

          <motion.a
            href="#plans"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white shadow-lg hover:shadow-cyan-400/50 transition-all"
          >
            Explore Plans
          </motion.a>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <Image
            src={HeroImage}
            alt="Agency Hero"
            className="rounded-2xl shadow-2xl border border-gray-700 object-cover"
          />
        </motion.div>
      </div>

      {/* 💳 Pricing Plans */}
      <div id="plans" className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400"
          >
            💼 Agency Package Plans
          </motion.h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Choose a plan that fits your business — from startups to enterprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.07,
                rotateY: 6,
                boxShadow: "0 0 40px rgba(6,182,212,0.3)",
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl transition-all duration-500"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-cyan-400">{plan.name}</h3>
                <p className="text-gray-400 italic text-sm">{plan.tagline}</p>
              </div>

              <p className="text-gray-300 text-sm mb-6">{plan.audience}</p>

              <div className="text-5xl font-extrabold mb-6 text-center">
                ${plan.price}
                <span className="text-lg text-gray-400 font-medium">/project</span>
              </div>

              <ul className="space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-gray-200"
                  >
                    <CheckCircle2 className="text-cyan-400 w-5 h-5 mt-1" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  background:
                    "linear-gradient(90deg, rgba(6,182,212,1) 0%, rgba(59,130,246,1) 100%)",
                }}
                className="mt-8 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
              >
                Choose {plan.name}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 💬 Contact Form Section */}
      <div className="relative z-10 px-6 py-20 max-w-4xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-cyan-400"
        >
          📩 Let’s Talk About Your Project
        </motion.h3>
        <form className="bg-gray-900/70 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-xl space-y-5 text-left">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea
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
      </div>
    </section>
  );
}









