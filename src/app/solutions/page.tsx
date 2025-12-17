import { fetchSolutions, Solution } from "../lib/api";
import Link from "next/link";

export default async function SolutionsPage() {
  const solutions: Solution[] = await fetchSolutions();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Our Solutions
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((solution) => (
          <Link
            key={solution.slug}
            href={`/solutions/${solution.slug}`}
            className="border rounded-xl p-6 bg-white dark:bg-neutral-900 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">{solution.title}</h2>
            {solution.subtitle && (
              <p className="text-blue-500 mb-2">{solution.subtitle}</p>
            )}
            <p className="text-gray-500 mb-3 line-clamp-3">
              {solution.description}
            </p>
            <span className="text-sm text-blue-600 font-medium">
              Learn More →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
