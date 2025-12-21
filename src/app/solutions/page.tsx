import { fetchSolutions, Solution } from "../lib/api";
import Link from "next/link";

export default async function SolutionsPage() {
  const solutions: Solution[] = await fetchSolutions();

  return (
    /* FULL WIDTH DARK BACKGROUND */
    <section className="w-full bg-[#0B0E15]">
      {/* CENTERED CONTENT */}
      <div className="max-w-7xl mx-auto p-6 text-white overflow-hidden">
        <h1 className="text-4xl mt-24 font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
             Our Solutions
         </h1>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.35)]"
            >
              <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                {solution.title}
              </h2>

              {solution.subtitle && (
                <p className="mb-2 text-sm font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {solution.subtitle}
                </p>
              )}

              <p className="text-gray-400 mb-4 line-clamp-3">
                {solution.description}
              </p>

              <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
