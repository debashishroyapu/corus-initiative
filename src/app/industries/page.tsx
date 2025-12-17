import Link from "next/link";
import { fetchIndustries } from "../lib/api";

export default async function IndustriesPage() {
  const industries = await fetchIndustries();

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-10 text-white">Industries We Serve</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {industries.map((ind) => (
          <Link
            key={ind.slug}
            href={`/industries/${ind.slug}`}
            className="p-6 border rounded-xl hover:bg-neutral-900 transition"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">{ind.title}</h2>
            <p className="text-gray-400">{ind.overview}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}



