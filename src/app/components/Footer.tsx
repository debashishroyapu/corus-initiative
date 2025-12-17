"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants, easeOut } from "framer-motion";

// Social links
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/109614281/admin/dashboard/", Svg: LinkedInSVG },
  { name: "Facebook", href: "https://www.facebook.com/share/17NVnTHJUS/", Svg: FacebookSVG },
  { name: "X", href: "https://x.com/CorusIniti7690", Svg: XSVG },
  { name: "YouTube", href: "https://youtube.com/@teamcorusinitiative?si=Mh11KmB1a-2cU0Xq", Svg: YouTubeSVG },
];

// Framer Motion fade-up
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: easeOut },
  }),
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!email || !validateEmail(email)) return setMessage({ type: "error", text: "Invalid email" });
    if (!consent) return setMessage({ type: "error", text: "Accept privacy policy" });

    setLoading(true);
    try {
      const payload = { email, consent, source: "footer" };
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${API_URL}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Subscription failed");
      setMessage({ type: "success", text: "Check your inbox for confirmation" });
      setEmail(""); setConsent(false);
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Subscription failed" });
    } finally { setLoading(false); }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0C0E15] via-[#0A0C12] to-[#0A0C0F] text-white overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-32 -left-16 w-[300px] h-[300px] bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-cyan-500/20 blur-3xl rounded-full animate-slow-pulse"/>
      <div className="absolute bottom-[-40px] right-0 w-[400px] h-[400px] bg-gradient-to-tr from-pink-400/20 via-purple-400/10 to-red-400/20 blur-3xl rounded-full animate-slow-pulse"/>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {/* Branding */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="space-y-4 text-sm">
          <div className="flex items-center gap-2">
            <LogoMark />
            <div className="text-xs">
              <div className="font-bold text-white">Corus-Initiative</div>
              <div className="text-gray-400">Engineering Digital Growth</div>
            </div>
          </div>
          <nav className="space-y-1">
            <Link href="/about" className="hover:text-blue-400 transition">About Us</Link>
            <Link href="/blog/future-of-web-development" className="hover:text-blue-400 transition">Technologies</Link>
            <Link href="/blog/scaling-with-custom-software" className="hover:text-blue-400 transition">Software Services</Link>
          </nav>
          <div className="text-gray-500 text-xs">© {new Date().getFullYear()} Corus-Initiative</div>
        </motion.div>

        {/* Discover */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}>
          <h4 className="font-semibold mb-2 text-white text-sm">Discover</h4>
          <ul className="space-y-1 text-gray-400 text-xs">
            <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link href="/industries" className="hover:text-blue-400 transition">Technologies</Link></li>
            <li><Link href="/solutions" className="hover:text-blue-400 transition">Services</Link></li>
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
          <h4 className="font-semibold mb-2 text-white text-sm">Resources</h4>
          <ul className="space-y-1 text-gray-400 text-xs">
            <li><Link href="/case-studies" className="hover:text-blue-400 transition">Case Studies</Link></li>
            <li><Link href="/blog" className="hover:text-blue-400 transition">Blog</Link></li>
            <li><Link href="/pricing" className="hover:text-blue-400 transition">Pricing</Link></li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp} className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 text-sm">
          <h4 className="font-semibold mb-2 text-white">Get in Touch</h4>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-1.5 rounded-lg border border-white/30 bg-white/5 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
            />
            <div className="flex items-center gap-2 text-gray-300 text-xs">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-blue-500"/>
              <label>Accept the <Link href="/privacy" className="underline hover:text-blue-400">Privacy Policy</Link></label>
            </div>
            <button type="submit" disabled={loading} className="px-3 py-1.5 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition text-sm">
              {loading ? "Subscribing..." : "Subscribe ✉️"}
            </button>
            {message && (
              <div className={`mt-1 text-xs ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
                {message.text}
              </div>
            )}
          </form>

          <div className="mt-3 border-t border-white/20 pt-2">
            <div className="text-xs font-semibold mb-1 text-white">Follow us</div>
            <div className="flex gap-2">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: easeOut }}
                  className="text-white hover:text-blue-400 transition"
                >
                  <s.Svg className="w-5 h-5"/>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Legal */}
      <motion.div className="bg-gray-900 border-t border-gray-700" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: easeOut }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row justify-between text-xs text-gray-400 gap-1 md:gap-0">
          <div className="flex gap-2 md:gap-4">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/do-not-sell" className="hover:text-white transition">Do Not Sell My Info</Link>
          </div>
          <div className="text-xs">Powered by Corus-Initiative</div>
        </div>
      </motion.div>
    </footer>
  );
}

// Helpers
function validateEmail(email: string) { return /\S+@\S+\.\S+/.test(email); }
function LogoMark() {
  return (
    <svg width="36" height="30" viewBox="0 0 42 36" fill="none" aria-hidden>
      <rect x="2" y="6" width="16" height="24" rx="3" fill="#ff6f3c"/>
      <rect x="24" y="6" width="16" height="24" rx="3" fill="#0f172a"/>
    </svg>
  );
}

// --- Social SVGs ---
function LinkedInSVG({ className = "w-5 h-5" }: { className?: string }) { return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.2 3.4 6.2 7.8V24h-5v-7c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V24h-5V8z"/></svg>; }
function FacebookSVG({ className = "w-5 h-5" }: { className?: string }) { return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99h-2.54v-2.89h2.54v-2.2c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.89h-2.3v6.99C18.34 21.12 22 16.99 22 12z"/></svg>; }
function XSVG({ className = "w-5 h-5" }: { className?: string }) { return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.77 3.42c-.87.38-1.8.64-2.77.76 1-.6 1.76-1.55 2.12-2.68-.94.56-1.98.96-3.09 1.18a5.18 5.18 0 0 0-8.85 4.72A14.73 14.73 0 0 1 1.64 2.16a5.17 5.17 0 0 0 1.6 6.9c-.8-.03-1.55-.25-2.21-.61v.06a5.18 5.18 0 0 0 4.15 5.08c-.7.19-1.43.23-2.17.09a5.18 5.18 0 0 0 4.83 3.6A10.37 10.37 0 0 1 0 19.54 14.63 14.63 0 0 0 7.92 21c9.5 0 14.7-7.87 14.7-14.7 0-.22 0-.44-.02-.66a10.53 10.53 0 0 0 2.58-2.68z"/></svg>; }
function YouTubeSVG({ className = "w-5 h-5" }: { className?: string }) { return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19.6 3.2H4.4A2.4 2.4 0 0 0 2 5.6v12.8a2.4 2.4 0 0 0 2.4 2.4h15.2a2.4 2.4 0 0 0 2.4-2.4V5.6a2.4 2.4 0 0 0-2.4-2.4zm-10 13V7l7 4-7 4z"/></svg>; }
