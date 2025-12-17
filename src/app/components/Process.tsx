"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";
import { Phone, Users, Rocket, ArrowRight, CheckCircle, Star, Zap, Target } from "lucide-react";

// Define types
interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
}

interface Stat {
  number: string;
  label: string;
  icon: React.ReactNode;
}

interface AnimatedCardProps {
  step: Step;
  index: number;
}

const AnimatedCard = ({ step, index }: AnimatedCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      className="group relative perspective-1000"
    >
      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 h-full overflow-hidden transition-all duration-500 group-hover:border-gray-500/50 transform-style-3d">
        
        {/* Animated Gradient Border */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
        
        {/* Floating Particles */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + index,
            repeat: Infinity,
            delay: index * 0.5,
          }}
          className="absolute top-4 right-4"
        >
          <Zap className="w-4 h-4 text-cyan-400" />
        </motion.div>

        {/* Step Header */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center border border-gray-600/50 shadow-2xl">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  {step.icon}
                </motion.div>
              </div>
              
              {/* Animated Badge */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.3 + 0.5 }}
                className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-gray-900 shadow-lg"
              >
                <span className="text-xs font-bold text-white">{step.number}</span>
              </motion.div>
            </motion.div>
            
            {/* Progress Indicator */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              transition={{ delay: index * 0.3 + 0.8, duration: 1 }}
              className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            />
          </div>
          
          {/* Animated Arrow */}
          <motion.div 
            initial={{ x: -10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            whileHover={{ x: 5 }}
            transition={{ delay: index * 0.3 + 0.6 }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ArrowRight className="w-5 h-5 text-cyan-400" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 + 0.4 }}
            className="text-2xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            {step.title}
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 + 0.5 }}
            className="text-gray-300 leading-relaxed mb-6 text-lg"
          >
            {step.description}
          </motion.p>

          {/* Features with Stagger Animation */}
          <div className="space-y-3">
            {step.features.map((feature: string, featureIndex: number) => (
              <motion.div
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 + 0.6 + featureIndex * 0.1 }}
                className="flex items-center gap-3 group/feature"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                </motion.div>
                <span className="text-gray-400 group-hover/feature:text-gray-300 transition-colors">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Background Elements */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl"
        />
        
        {/* Hover Shine Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
      
      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
    </motion.div>
  );
};

export default function ProcessSection() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Join exploration call",
      description: "Tell us more about your business on a discovery call. We'll discuss team structure and approach, success criteria, timescale, budget, and required skill sets to see how we can help.",
      icon: <Phone className="w-6 h-6" />,
      features: ["Business Analysis", "Goal Alignment", "Technical Assessment", "ROI Projection"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      title: "Discuss solution and team structure",
      description: "In a matter of days, we will finalize your project specifications, agree on an engagement model, select and onboard your team.",
      icon: <Users className="w-6 h-6" />,
      features: ["Team Assembly", "Tech Stack Finalization", "Project Roadmap", "Milestone Planning"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      number: "03", 
      title: "Get started and track performance",
      description: "Once we've agreed on milestones, we'll immediately get to work. We'll track progress, report updates, and continuously adapt to your needs.",
      icon: <Rocket className="w-6 h-6" />,
      features: ["Agile Development", "Progress Tracking", "Performance Analytics", "Quality Assurance"],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const stats: Stat[] = [
    { number: "24-48h", label: "Team Assembly", icon: <Zap className="w-4 h-4" /> },
    { number: "95%", label: "On-Time Delivery", icon: <Target className="w-4 h-4" /> },
    { number: "50+", label: "Projects Completed", icon: <CheckCircle className="w-4 h-4" /> },
    { number: "4.9/5", label: "Client Satisfaction", icon: <Star className="w-4 h-4" /> }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] bg-[size:64px_64px] animate-grid"></div>
        </div>
        
        {/* Floating Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        />
        
        {/* Animated Lines */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            <span className="text-sm text-gray-300 font-medium">Enterprise-Grade Process</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Streamlined
            </span>
            <motion.span
              animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 ml-4"
            >
              Excellence
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            A proven three-phase approach that transforms your vision into scalable, 
            high-performance digital solutions with enterprise-grade precision.
          </motion.p>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-2xl mx-auto"
          >
            {stats.map((stat: Stat, index: number) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Process Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step: Step, index: number) => (
            <AnimatedCard key={index} step={step} index={index} />
          ))}
        </div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Animation */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -skew-x-12"
            />
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your Vision?
              </h3>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Join 50+ enterprises that trust us with their digital transformation journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
                >
                  <span className="flex items-center gap-2 relative z-10">
                    Schedule Discovery Call
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
                >
                  View Case Studies
                </motion.button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-700/50">
                <p className="text-gray-500 text-sm">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-gray-400 hover:text-white underline transition-colors">Cookie Policy</a>{" "}
                  and{" "}
                  <a href="#" className="text-gray-400 hover:text-white underline transition-colors">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes grid {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(64px);
          }
        }
        .animate-grid {
          animation: grid 20s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
        .bg-pos-0 {
          background-position: 0% 0%;
        }
        .bg-pos-100 {
          background-position: 100% 100%;
        }
      `}</style>
    </section>
  );
}





