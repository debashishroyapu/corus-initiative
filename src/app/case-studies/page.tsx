'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchCaseStudies, CaseStudy } from '../lib/api';
import { caseStudyImage } from '../lib/case-study-images';
import { 
  Clock, 
  ArrowRight, 
  Search, 
  Filter,
  Building,
  Users,
  DollarSign
} from 'lucide-react';

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadCaseStudies();
  }, []);

  useEffect(() => {
    filterCaseStudies();
  }, [caseStudies, searchTerm, industryFilter, statusFilter]);

  const loadCaseStudies = async () => {
    try {
      const data = await fetchCaseStudies();
      setCaseStudies(data);
    } catch (error) {
      console.error('Failed to load case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCaseStudies = () => {
    let filtered = caseStudies;

    if (searchTerm) {
      filtered = filtered.filter(study =>
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.industry?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (industryFilter !== 'all') {
      filtered = filtered.filter(study => study.industry === industryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(study => study.status === statusFilter);
    }

    setFilteredStudies(filtered);
  };

  const industries = Array.from(new Set(caseStudies.map(study => study.industry).filter(Boolean)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-gray-300 animate-pulse text-center">
          <div className="text-2xl font-semibold">Loading case studies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Case Studies</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Discover how we've helped businesses achieve remarkable results through innovative digital solutions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-white/10 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="px-4 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8 text-gray-400">
            Showing {filteredStudies.length} of {caseStudies.length} case studies
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredStudies.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Filter className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">No case studies found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredStudies.map((study) => (
                <article
                  key={study._id}
                  className="group bg-gray-800/70 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-700 hover:border-blue-500/50"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={caseStudyImage(study.slug)}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        study.status === 'published' 
                          ? 'bg-green-400/20 text-green-300' 
                          : 'bg-yellow-400/20 text-yellow-200'
                      }`}>
                        {study.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {study.industry && (
                      <div className="text-xs bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full inline-block mb-3">
                        {study.industry}
                      </div>
                    )}

                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                      {study.title}
                    </h2>

                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {study.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      {study.projectDuration && (
                        <div>
                          <Clock className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-400">{study.projectDuration}</p>
                        </div>
                      )}
                      {study.teamSize && (
                        <div>
                          <Users className="h-4 w-4 text-green-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-400">{study.teamSize} people</p>
                        </div>
                      )}
                      {study.budget && (
                        <div>
                          <DollarSign className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-400">${study.budget.toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    {study.client && (
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span>{study.client}</span>
                      </div>
                    )}

                    {study.technologies && study.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {study.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {study.technologies.length > 3 && (
                          <span className="text-gray-500 text-xs">
                            +{study.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="group/btn w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      View Case Study
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Let’s discuss how we can help you achieve similar success with your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consultation"
              className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
