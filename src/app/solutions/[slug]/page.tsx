"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  FiSettings,
  FiCloud,
  FiTarget,
  FiMonitor,
  FiUsers,
  FiLock,
  FiBox,
  FiPackage,
  FiCpu,
  FiDatabase,
  FiCode,
  FiCheckCircle,
} from "react-icons/fi";
import { getSolutionImage } from "../../lib/solution-image";

/* ---------------- Types ---------------- */
type Solution = {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  heroImage?: string;
  workflow?: Array<{ title: string; description?: string }>;
  expertise?: Array<{ title: string; description?: string; points?: string[] }>;
  deliverables?: Array<{ item?: string; title?: string; description?: string }>;
};

/* ---------------- Fallback Solution ---------------- */
function fallbackSolution(slug = "fallback"): Solution {
  return {
    id: slug,
    title: "Transformative Product & Engineering Solutions",
    subtitle: "From discovery to delivery — strategy that scales",
    description:
      "We combine strategy, design, and engineering to build digital products that perform at scale.",
    workflow: [
      { title: "Discover", description: "Research and insights to align objectives." },
      { title: "Design", description: "Prototyping, testing, and visual design." },
      { title: "Build", description: "Agile engineering with CI/CD excellence." },
      { title: "Launch", description: "Deployment, monitoring, and optimization." },
    ],
    expertise: [
      { title: "Product Strategy", description: "Transform insights into actionable outcomes.", points: ["Value Mapping", "OKRs"] },
      { title: "UI/UX Design", description: "Seamless digital experience design.", points: ["Wireframes", "Design Systems"] },
      { title: "Cloud Engineering", description: "Scalable infrastructure and DevOps.", points: ["AWS", "Kubernetes", "Automation"] },
    ],
    deliverables: [
      { item: "Clickable Prototype", description: "Validate user flows quickly." },
      { item: "MVP Application", description: "Launch production-ready MVPs fast." },
      { item: "Performance Report", description: "Insights for scalability." },
      { item: "Technical Docs", description: "Full developer handover setup." },
    ],
  };
}

/* ---------------- Safe Fetch Helper ---------------- */
async function fetchSolutionSafe(slug: string): Promise<Solution> {
  try {
    const mod = await import("../../lib/api");
    if (mod?.fetchSolutionBySlug) return (await mod.fetchSolutionBySlug(slug)) as Solution;
  } catch {}
  return fallbackSolution(slug);
}

/* ---------------- Animated Section ---------------- */
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.section>
  );
}

/* ---------------- Main Component ---------------- */
export default function SolutionPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params as any)?.slug || "fallback";

  const [solution, setSolution] = useState<Solution | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000 })]
  ) as [React.Ref<HTMLDivElement>, any];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchSolutionSafe(slug);

      // ✅ Set hero image
      data.heroImage = getSolutionImage(slug);

      // ✅ Add expertise for ui-ux-design
      if (slug === "ui-ux-design") {
        data.expertise = [
          ...(data.expertise || []),
          { title: "Interaction Design", description: "Intuitive & accessible user interactions.", points: ["Micro-interactions", "Prototyping"] },
          { title: "Visual Design", description: "Brand-aligned aesthetics & UI patterns.", points: ["Design Systems", "High-fidelity Mockups"] },
        ];
      }

      // ✅ Add expertise for app-development & data-analytics
      if (["app-development", "data-analytics"].includes(slug)) {
  data.expertise = [
    ...(data.expertise || []),
    {
      title: "Quality Assurance",
      description: "Automated & manual testing to ensure reliability.",
      points: ["Unit Tests", "Integration Tests"],
    },
    {
      title: "Advanced Technology",
      description: "Implement cutting-edge tools and frameworks to accelerate development.",
      points: ["Cloud Integration", "API Design", "Automation"],
    },
  ];
}

      // ✅ Deliverables: ensure 6 items
      const defaultDeliverables = [
        { item: "Clickable Prototype", description: "Validate user flows quickly." },
        { item: "MVP Application", description: "Launch production-ready MVPs fast." },
        { item: "Performance Report", description: "Insights for scalability." },
        { item: "Technical Docs", description: "Full developer handover setup." },
        { item: "Post-Launch Optimization", description: "Analyze & enhance performance continuously." },
        { item: "User Feedback Analysis", description: "Gather and implement actionable feedback." },
      ];
      if (!data.deliverables || data.deliverables.length < 6) {
        data.deliverables = defaultDeliverables;
      }

      setSolution(data);
    })();
  }, [slug]);

  // Embla carousel
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList() || []);
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  if (!solution) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  const { workflow = [], expertise = [], deliverables = [] } = solution;
  const deliverableIcons = [FiBox, FiPackage, FiCpu, FiDatabase, FiCode, FiCheckCircle];

  return (
    <div className="bg-[#0B0E15] text-white overflow-hidden">
      {/* HERO */}
      <div className="relative w-full h-[75vh] overflow-hidden pt-[80px]">
        <motion.img
          src={solution.heroImage}
          alt={solution.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0B0E15]" />
      </div>

      <section className="relative z-10 -mt-44 px-6 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">{solution.title}</h1>
        {solution.subtitle && <p className="mt-4 text-lg md:text-xl text-gray-300">{solution.subtitle}</p>}
        {solution.description && <p className="mt-3 text-gray-400 text-sm md:text-base">{solution.description}</p>}
      </section>

      {/* WORKFLOW */}
      <AnimatedSection delay={0.2}>
        <section className="py-20 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Workflow</h2>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8 px-2">
              {workflow.map((step, i) => (
                <motion.div key={i} whileHover={{ y: -6 }} className="flex-none w-[85%] md:w-[45%] lg:w-[30%] p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold">{i + 1}</div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-3">
            {scrollSnaps.map((_, i) => (
              <button key={i} onClick={() => emblaApi && emblaApi.scrollTo(i)} className={`w-3 h-3 rounded-full transition-all ${i === selectedIndex ? "bg-cyan-400 scale-110" : "bg-white/20"}`} />
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* EXPERTISE */}
      <AnimatedSection delay={0.3}>
        <section className="py-20 bg-white/5 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-10">Our Expertise</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertise.map((e, i) => {
                const icons = [
                  { Icon: FiTarget, gradient: "from-pink-500 to-red-400" },
                  { Icon: FiMonitor, gradient: "from-blue-500 to-indigo-400" },
                  { Icon: FiCloud, gradient: "from-green-400 to-emerald-500" },
                  { Icon: FiSettings, gradient: "from-purple-500 to-pink-500" },
                  { Icon: FiUsers, gradient: "from-orange-400 to-amber-500" },
                  { Icon: FiLock, gradient: "from-cyan-400 to-blue-500" },
                ];
                const { Icon, gradient } = icons[i % icons.length];
                return (
                  <motion.div key={i} whileHover={{ y: -6, scale: 1.02 }} className="p-6 rounded-2xl bg-white/10 border border-white/10 shadow-lg hover:shadow-cyan-500/10 transition">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} text-white`}><Icon size={22} /></div>
                      <h3 className="font-semibold text-lg">{e.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm">{e.description}</p>
                    {e.points && <ul className="mt-3 text-gray-400 text-xs space-y-1">{e.points.map((pt, j) => (<li key={j}>• {pt}</li>))}</ul>}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* DELIVERABLES */}
      <AnimatedSection delay={0.4}>
        <section className="py-20 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Deliverables</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliverables.map((d, i) => {
              const Icon = deliverableIcons[i % deliverableIcons.length];
              return (
                <motion.div key={i} whileHover={{ scale: 1.03 }} className="group relative p-6 rounded-3xl border border-white/10 bg-gradient-to-b from-[#11141D] to-[#0A0C12] overflow-hidden shadow-lg">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500 rounded-3xl" />
                  <div className="relative z-10 text-center">
                    <div className="flex justify-center mb-3 text-cyan-400"><Icon size={28} /></div>
                    <h3 className="text-xl font-semibold mb-2">{d.item || d.title}</h3>
                    <p className="text-gray-400 text-sm">{d.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={0.5}>
        <div className="text-center bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-indigo-600/20 py-16 px-8 rounded-3xl border border-white/10 shadow-lg backdrop-blur-md mt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Transform Your Product & Engineering Journey?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">From strategy to deployment, we ensure innovative solutions that deliver measurable impact and drive growth.</p>
          <motion.a whileHover={{ scale: 1.05 }} href="/contact" className="inline-block px-8 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 hover:opacity-90 transition-all text-white shadow-md">Let’s Get Started →</motion.a>
        </div>
      </AnimatedSection>
    </div>
  );
}
