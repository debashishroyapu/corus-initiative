import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCaseStudyBySlug } from "../../lib/api";
import {
  Building,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const technologies: string[] = study.technologies ?? [];
  const image = study.image || "/images/case-studies/default.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero */}
      <section className="relative pt-28 pb-12 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">{study.title}</h1>
        {study.industry && (
          <span className="text-xs bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full inline-block mb-4">
            {study.industry}
          </span>
        )}
      </section>

      {/* Image */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl relative h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={image}
            alt={study.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </section>

      {/* Client */}
      {study.client && (
        <section className="py-6 text-center">
          <div className="flex justify-center items-center gap-2 text-gray-400">
            <Building className="h-4 w-4" />
            <span>{study.client}</span>
          </div>
        </section>
      )}

      {/* Challenge / Solution / Results */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl grid gap-12">
          {study.challenge && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="text-red-400 h-5 w-5" />
                <h2 className="text-2xl font-bold">Challenge</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
            </div>
          )}

          {study.solution && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="text-yellow-400 h-5 w-5" />
                <h2 className="text-2xl font-bold">Solution</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{study.solution}</p>
            </div>
          )}

          {study.results && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="text-green-400 h-5 w-5" />
                <h2 className="text-2xl font-bold">Results</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{study.results}</p>
            </div>
          )}
        </div>
      </section>

      {/* Technologies */}
      {technologies.length > 0 && (
        <section className="py-6 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {technologies.map((tech, idx) => (
              <span key={idx} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-green-600/20 backdrop-blur-xl shadow-2xl p-10 md:p-14 text-center">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-500/30 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Ready to Build Your Next Success Story?
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
                Let's turn your idea into a scalable, high-impact digital solution.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all shadow-lg"
                >
                  Start a Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold border border-white/20 text-white hover:bg-white/10 transition-all"
                >
                  View More Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
