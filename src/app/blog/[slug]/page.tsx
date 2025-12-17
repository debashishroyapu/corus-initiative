"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fetchBlogBySlug, Blog } from "../../lib/api";
import { getBlogImages} from "../../lib/blog-images";
import { useEffect, useState } from "react";

type Props = { params: { slug: string } };

export default function BlogSlugPage({ params }: Props) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await fetchBlogBySlug(params.slug);
        setBlog(data ?? null);
      } catch (error) {
        console.error("Failed to load blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [params.slug]);

  if (loading) {
    return (
      <p className="text-white text-center mt-20">
        Loading blog...
      </p>
    );
  }

  if (!blog) {
    return (
      <p className="text-white text-center mt-20">
        Blog not found
      </p>
    );
  }

  /* ================= Safe defaults ================= */
  const image =
  blog.image ??
  getBlogImages(blog.slug) ??
  "/images/blogs/default.jpg";


  const publishedAt = blog.publishedAt
    ? new Date(blog.publishedAt)
    : new Date();

  const formattedDate = publishedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const content = blog.content ?? "";
  const tags = Array.isArray(blog.tags) ? blog.tags : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-28 pb-20 px-6 md:px-12 text-white">
      <div className="max-w-4xl mx-auto">
        {/* ================= Header ================= */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {blog.excerpt}
            </p>
          )}

          <div className="flex flex-wrap justify-center items-center gap-3 mt-6 text-sm text-gray-400">
            {blog.author && <span>✍️ {blog.author}</span>}
            <span>•</span>
            {blog.category && (
              <span className="text-blue-400">
                {blog.category}
              </span>
            )}
            <span>•</span>
            <span>{formattedDate}</span>
            {blog.readTime && (
              <>
                <span>•</span>
                <span>{blog.readTime} min read</span>
              </>
            )}
          </div>
        </div>

        {/* ================= Image ================= */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-10">
          <img
            src={image}
            alt={blog.title}
            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* ================= Content ================= */}
        <article className="prose prose-lg prose-invert prose-headings:text-white prose-p:text-gray-300 max-w-none whitespace-pre-line">
          {content}
        </article>

        {/* ================= Tags ================= */}
        {tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-blue-700/70 text-white hover:bg-blue-600 transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ================= CTA ================= */}
        <div className="text-center bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-indigo-600/20 py-16 px-8 mt-16 rounded-3xl border border-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Have a Story to Share or Need Expert Insights?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're looking to collaborate or learn more
            about the latest in digital innovation, we’re here
            to help your ideas take shape.
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/consultation"
            className="inline-block px-8 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 hover:opacity-90 transition-all text-white shadow-md"
          >
            Let’s Connect →
          </motion.a>
        </div>

        {/* ================= Back ================= */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-green-600 hover:to-blue-600 transition text-white font-semibold"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
