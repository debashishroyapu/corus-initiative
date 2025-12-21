import Link from "next/link";
import { fetchIndustries } from "../lib/api";

export default async function IndustriesPage() {
  const industries = await fetchIndustries();

  return (
    <section className="w-full bg-[#0B0E15]">
      <div className="max-w-7xl mx-auto p-6 text-white overflow-hidden">
       <h1 className="text-4xl mt-24 font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
        Industries We Serve
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.35)]"
            >
              <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {ind.title}
              </h2>

              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {ind.overview}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


