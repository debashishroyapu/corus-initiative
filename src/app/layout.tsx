import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "../app/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corus-Initiative ",
  description: "Transform your business with data-driven engineering, innovative design, and cutting-edge software solutions",
  keywords: "software development, web development, data analytics, digital marketing, UI/UX design",
  authors: [{ name: "Corus Initiative" }],
  openGraph: {
    title: "Corus-Initiative",
    description: "Engineering decisions with data, design and software",
    type: "website",
  },
};

// Client component for route detection
function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}