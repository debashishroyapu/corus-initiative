"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchBlogs, Blog } from "../lib/api";
import { getBlogImages } from "../lib/blog-images";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [displayedBlogs, setDisplayedBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [hasMore, setHasMore] = useState(true);
  const loadCount = 6;

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await fetchBlogs();

      const blogsWithImages = data.map((b) => ({
        ...b,
        image: getBlogImages(b.slug),
      }));

      setBlogs(blogsWithImages);
      setDisplayedBlogs(blogsWithImages.slice(0, loadCount));
      setHasMore(blogsWithImages.length > loadCount);
    };

    loadBlogs();
  }, []);

  const categories = Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)));

  useEffect(() => {
    const filtered = blogs
      .filter((b) => (category === "all" ? true : b.category === category))
      .filter((b) => (search.trim() ? b.title.toLowerCase().includes(search.toLowerCase()) : true));

    setDisplayedBlogs(filtered.slice(0, loadCount));
    setHasMore(filtered.length > loadCount);
  }, [search, category, blogs]);

  const loadMore = () => {
    const currentCount = displayedBlogs.length;
    const filtered = blogs
      .filter((b) => (category === "all" ? true : b.category === category))
      .filter((b) => (search.trim() ? b.title.toLowerCase().includes(search.toLowerCase()) : true));

    const nextBlogs = filtered.slice(currentCount, currentCount + loadCount);
    setDisplayedBlogs([...displayedBlogs, ...nextBlogs]);
    if (displayedBlogs.length + nextBlogs.length >= filtered.length) setHasMore(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white">Our Blog</h1>
          <p className="mt-4 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Explore insights, trends, and stories from our agency.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full md:w-1/2 px-4 py-2 rounded-full border border-gray-600 bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-full md:w-1/4 px-4 py-2 rounded-full border bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedBlogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group block overflow-hidden rounded-3xl shadow-xl bg-gray-800 hover:shadow-2xl transition-shadow"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-500 transition">
                  {blog.title}
                </h2>
                <p className="text-gray-300 line-clamp-3">{blog.excerpt}</p>

                {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-blue-700 text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <span className="mt-4 inline-block text-blue-400 font-medium group-hover:underline">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition"
            >
              Load More
            </button>
          </div>
        )}

        {/* ✅ CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-indigo-600/20 py-16 px-8 mt-20 rounded-3xl border border-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
            Have a Story to Share or Need Expert Insights?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're looking to collaborate or learn more about the latest in digital innovation,
            we’re here to help your ideas take shape.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/contact"
            className="inline-block px-8 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 hover:opacity-90 transition-all text-white shadow-md"
          >
            Let’s Connect →
          </motion.a>
        </div>
      </div>
    </div>
  );
}
