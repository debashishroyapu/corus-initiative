"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import { getMenus, Menu } from "../lib/api";

export default function Navbar() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  // ✅ Fix: timeout ref prevents stale closures on rapid hover
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ✅ Fix: usePathname instead of window.location.pathname (SSR-safe + reactive)
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const menuData = await getMenus();
        setMenus(Array.isArray(menuData) ? menuData : []);
      } catch (error) {
        console.error("Failed to fetch menus:", error);
        setMenus([]);
      } finally {
        setLoading(false);
      }
    };
    loadMenus();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Fix: clear pending timeout before setting a new one
  const handleMouseEnter = (menuTitle: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setOpenDropdown(menuTitle);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  // Solutions first, then Industries, rest alphabetically
  const displayMenus = [...menus].sort((a, b) => {
    const order = (title: string) => {
      const t = title.toLowerCase();
      if (t.includes("solutions")) return 0;
      if (t.includes("industries")) return 1;
      return 2;
    };
    return order(a.title) - order(b.title);
  });

  const logoImage = (
    <Link href="/" className="flex items-center flex-shrink-0">
      <div className="relative h-14 sm:h-16 md:h-20 lg:h-24 w-auto">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={192}
          height={96}
          className="h-full w-auto object-contain"
          style={{ width: "auto" }}
        />
      </div>
    </Link>
  );

  if (loading) {
    return (
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-gradient-to-b from-[#0E111A] to-[#0C0E14] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {logoImage}
            <div className="hidden lg:flex items-center space-x-6">
              {["Solutions", "Industries"].map((title) => (
                <div key={title} className="relative">
                  <button className="px-4 py-2 rounded-xl font-semibold text-sm xl:text-base text-white/70 animate-pulse">
                    {title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={dropdownRef}
      className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "shadow-2xl bg-gradient-to-b from-[#0E111A] to-[#0C0E14]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {logoImage}

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {displayMenus.map((group) => (
              <div
                key={group._id || group.slug}
                className="relative"
                onMouseEnter={() => handleMouseEnter(group.title)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.button
                  className={`px-4 py-2 rounded-xl font-semibold text-sm xl:text-base transition-all duration-300 flex items-center space-x-1 ${
                    openDropdown === group.title
                      ? "text-cyan-400 bg-white/10"
                      : "text-white/90 hover:text-cyan-400 hover:bg-white/5"
                  }`}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span>{group.title}</span>
                  <motion.span
                    animate={{ rotate: openDropdown === group.title ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {openDropdown === group.title && group.items.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-1 w-96 rounded-2xl shadow-2xl border bg-gradient-to-b from-[#0C0E15] to-[#0A0C12] backdrop-blur-xl border-gray-800/50"
                    >
                      <div className="p-4 grid grid-cols-3 gap-3">
                        {group.items.map((item) => (
                          <Link
                            key={item.slug}
                            href={item.href}
                            className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 group border ${
                              isActive(item.href)
                                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                                : "text-white/80 hover:bg-white/5 hover:text-cyan-400 border-transparent"
                            }`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span className="font-semibold">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Static Links */}
            {[
              { href: "/about", label: "About" },
              { href: "/pricing", label: "Pricing" },
              { href: "/blog", label: "Blog" },
              { href: "/case-studies", label: "Case Studies" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl font-semibold text-sm xl:text-base transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-cyan-400 bg-white/10"
                    : "text-white/90 hover:text-cyan-400 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Schedule Call Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/schedule-call"
                className="px-6 py-2.5 rounded-xl font-semibold text-sm xl:text-base transition-all duration-300 shadow-lg flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-xl border border-purple-400/20"
              >
                <Calendar className="mr-2 w-4 h-4" />
                Schedule Call
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg transition-all duration-300 text-white/90 hover:bg-white/10"
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-6 transition-all duration-300 bg-white"
                />
                <motion.span
                  animate={{ opacity: mobileOpen ? 0 : 1 }}
                  className="block h-0.5 w-6 mt-1 transition-all duration-300 bg-white"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-6 mt-1 transition-all duration-300 bg-white"
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden mt-2 mb-4 rounded-2xl shadow-2xl border border-gray-800/50 bg-gradient-to-b from-[#0C0E15] to-[#0A0C12] max-h-[80vh] flex flex-col overflow-hidden"
            >
              <div className="p-4 space-y-4 overflow-y-auto">
                {displayMenus.map((group) => (
                  <div key={group._id || group.slug} className="space-y-2">
                    <button
                      onClick={() =>
                        setMobileDropdown(
                          mobileDropdown === group.title ? null : group.title
                        )
                      }
                      className="w-full flex justify-between items-center px-3 py-2 rounded-xl font-semibold text-white/90 hover:bg-white/5 transition"
                    >
                      {group.title}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileDropdown === group.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileDropdown === group.title && group.items.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="grid grid-cols-2 gap-2 px-2"
                        >
                          {group.items.map((item) => (
                            <Link
                              key={item.slug}
                              href={item.href}
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileDropdown(null);
                              }}
                              className={`p-3 rounded-xl text-sm font-medium transition ${
                                isActive(item.href)
                                  ? "text-cyan-400 bg-cyan-500/10"
                                  : "text-white/80 hover:bg-white/5 hover:text-cyan-400"
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Static Links */}
                <div className="pt-2 border-t border-gray-800 space-y-1">
                  {[
                    { href: "/about", label: "About" },
                    { href: "/pricing", label: "Pricing" },
                    { href: "/blog", label: "Blog" },
                    { href: "/case-studies", label: "Case Studies" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-3 py-2 rounded-xl font-semibold transition ${
                        isActive(item.href)
                          ? "text-cyan-400 bg-white/10"
                          : "text-white/90 hover:bg-white/5 hover:text-cyan-400"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Fixed CTA */}
              <div className="p-4 border-t border-gray-800">
                <Link
                  href="/schedule-call"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
                >
                  <Calendar className="inline mr-2 w-4 h-4" />
                  Schedule Call
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}