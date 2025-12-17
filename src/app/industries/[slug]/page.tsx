"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  fetchIndustryBySlug,
  Industry as BaseIndustry,
} from "../../lib/api";
import { getIndustryImage } from "../../lib/industry-image";
import { FiTarget, FiUsers, FiMonitor, FiPackage } from "react-icons/fi";
import { ArrowRight } from "lucide-react";

interface Benefit {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface Challenge {
  title: string;
  description: string;
}

interface Industry extends Omit<BaseIndustry, "solutions"> {
  heroImage?: string;
  benefits?: Benefit[];
  challenges?: Challenge[];
  solutions?: {
    title: string;
    description: string;
    slug: string;
  }[];
  overview?: string;
}

// Default Benefits
const defaultBenefits: Benefit[] = [
  { title: "Scalable Solutions", description: "Easily adapt to business growth with modular design.", icon: FiTarget },
  { title: "Expert Team", description: "Work with dedicated industry professionals.", icon: FiUsers },
  { title: "Data-Driven", description: "Use real-time analytics to make smarter decisions.", icon: FiMonitor },
  { title: "End-to-End Support", description: "From strategy to deployment, we cover it all.", icon: FiPackage },
];

// Default Challenge
const defaultChallenge: Challenge = {
  title: "Sustainable Growth",
  description: "Driving long-term success with scalable technology, continuous improvement, and measurable performance.",
};

const IndustryPage: React.FC = () => {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const loadIndustry = async () => {
      try {
        const data = await fetchIndustryBySlug(slug);

        const backendChallenges = data.challenges?.slice(0, 3) ?? [];
        const combinedChallenges = [...backendChallenges, defaultChallenge];

        const solutions = data.solutions?.map((sol: any) => ({
          title: sol.title,
          description: sol.description ?? "",
          slug: sol.slug ?? sol.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""),
        })) ?? [];

        const heroImage = getIndustryImage(slug);

        setIndustry({
          ...data,
          heroImage,
          solutions,
          benefits: defaultBenefits,
          challenges: combinedChallenges,
        });
      } catch (error) {
        console.error("❌ Failed to fetch industry:", error);
      } finally {
        setLoading(false);
      }
    };

    loadIndustry();
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Loading...
      </div>
    );

  if (!industry)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
        Industry not found (404)
      </div>
    );

  return (
    <div className="bg-[#0B0E15] text-white overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center pt-[100px]">
        <Image
          src={industry.heroImage!}
          alt={industry.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center max-w-3xl px-6">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {industry.title}
          </motion.h1>

          {/* ✅ Overview from backend */}
          {industry.overview && (
            <motion.p
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {industry.overview}
            </motion.p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-28">
        {/* KEY CHALLENGES */}
        {industry.challenges && industry.challenges.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-12">Key Challenges</h2>
            <div className="grid gap-10 md:grid-cols-2">
              {industry.challenges.map((ch, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="p-6 md:p-10 rounded-3xl bg-gradient-to-tr from-[#11141D] to-[#1F2230] border border-white/10 shadow-xl flex flex-col justify-center h-full hover:shadow-cyan-500/30 transition-all"
                >
                  <h3 className="text-2xl font-bold text-cyan-400 mb-3">{ch.title}</h3>
                  <p className="text-gray-300 text-lg">{ch.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SOLUTIONS */}
        {industry.solutions && industry.solutions.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-12">Our Solutions</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industry.solutions.map((sol, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 rounded-2xl bg-gradient-to-tr from-purple-900 via-purple-800 to-purple-950 border border-white/10 shadow-md transition-all h-[230px]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <ArrowRight size={20} className="text-pink-400" />
                    <h3 className="text-lg font-semibold">{sol.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm">{sol.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* BENEFITS */}
        {industry.benefits && industry.benefits.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Benefits & Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {industry.benefits.map((b, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-6 rounded-2xl bg-gradient-to-tr from-[#0F111A] to-[#1A1C2B] border border-white/10 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex items-center justify-center mb-3">
                    <b.icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <p className="text-gray-300 text-sm mt-2">{b.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-indigo-600/20 py-16 px-8 rounded-3xl border border-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Transform the {industry.title} Industry?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            From strategy to deployment, we deliver innovation that drives measurable business growth.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/contact"
            className="inline-block px-8 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 hover:opacity-90 transition-all text-white shadow-md"
          >
            Let’s Get Started →
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default IndustryPage;
