"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { getBlogBySlug, Blog } from "../../lib/api";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function BlogSlugPage({ params }: Props) {
  const [slug, setSlug] = useState<string | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const extractSlug = async () => {
      try {
        const resolvedParams = await params;
        setSlug(resolvedParams.slug);
      } catch (error) {
        console.error("Failed to resolve params:", error);
        setLoading(false);
      }
    };
    extractSlug();
  }, [params]);

  useEffect(() => {
    const loadBlog = async () => {
      if (!slug) return;
      try {
        const data = await getBlogBySlug(slug);
        setBlog(data ?? null);
      } catch (error) {
        console.error("Failed to load blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) loadBlog();
  }, [slug]);

  // Animate content elements after blog loads
  useEffect(() => {
    if (!contentRef.current || !blog) return;
    const elements = contentRef.current.querySelectorAll(
      "p, h1, h2, h3, h4, blockquote, pre, ul, ol, table, img"
    );
    elements.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(14px)";
      htmlEl.style.transition = `opacity 0.45s ease ${i * 0.035}s, transform 0.45s ease ${i * 0.035}s`;
      setTimeout(() => {
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";
      }, 60);
    });

    // Remove all underlines
    const links = contentRef.current.querySelectorAll("a");
    links.forEach((link) => (link.style.textDecoration = "none"));
    const underlines = contentRef.current.querySelectorAll("u, ins");
    underlines.forEach((el) => {
      (el as HTMLElement).style.textDecoration = "none";
      (el as HTMLElement).style.borderBottom = "none";
    });
  }, [blog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-28 pb-20 px-6 md:px-12 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-xl">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-28 pb-20 px-6 md:px-12 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-green-600 hover:to-blue-600 transition text-white font-semibold">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const publishedAt = blog.publishedAt ? new Date(blog.publishedAt) : new Date();
  const formattedDate = publishedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const image = blog.image || "/images/blogs/default.jpg";
  const contentHtml = blog.contentHtml ?? "";
  const tags = Array.isArray(blog.tags) ? blog.tags : [];

  return (
    <>
      <style>{`
        .blog-body {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 1.125rem;
          line-height: 1.9;
          color: #cbd5e1;
        }
        .blog-body h1,
        .blog-body h2,
        .blog-body h3,
        .blog-body h4,
        .blog-body h5,
        .blog-body h6 {
          font-family: 'Georgia', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #f1f5f9;
          margin-top: 2.6em;
          margin-bottom: 0.55em;
          line-height: 1.25;
        }
        .blog-body h1 { font-size: 2.1rem; }
        .blog-body h2 {
          font-size: 1.6rem;
          padding-bottom: 0.4em;
          border-bottom: 1px solid rgba(99,102,241,0.22);
        }
        .blog-body h3 { font-size: 1.28rem; color: #a5b4fc; }
        .blog-body h4 {
          font-size: 0.82rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .blog-body p {
          margin-bottom: 1.6em;
          color: #cbd5e1;
        }
        .blog-body > div > p:first-of-type {
          font-size: 1.18rem;
          color: #e2e8f0;
          line-height: 1.85;
        }
        .blog-body a {
          color: #818cf8 !important;
          text-decoration: none !important;
          border-bottom: 1px solid rgba(129,140,248,0.3);
          padding-bottom: 1px;
          transition: color 0.2s, border-color 0.2s;
        }
        .blog-body a:hover {
          color: #a5b4fc !important;
          border-bottom-color: rgba(165,180,252,0.55);
        }
        .blog-body strong { color: #f1f5f9; font-weight: 700; }
        .blog-body em { color: #a5b4fc; font-style: italic; }
        .blog-body u, .blog-body ins {
          text-decoration: none !important;
          border-bottom: none !important;
        }
        .blog-body blockquote {
          margin: 2.2em 0;
          padding: 1.3em 1.7em;
          border-left: 3px solid #6366f1;
          background: rgba(99,102,241,0.06);
          border-radius: 0 10px 10px 0;
          color: #a5b4fc;
          font-style: italic;
          font-size: 1.08rem;
          line-height: 1.75;
          position: relative;
        }
        .blog-body blockquote::before {
          content: '"';
          position: absolute;
          top: -0.05em;
          left: 0.45em;
          font-size: 3.8rem;
          color: rgba(99,102,241,0.18);
          font-family: Georgia, serif;
          line-height: 1;
        }
        .blog-body blockquote p { margin: 0; color: inherit; }
        .blog-body code {
          font-family: 'Fira Code', 'Cascadia Code', monospace;
          font-size: 0.875em;
          color: #f472b6;
          background: rgba(244,114,182,0.08);
          border: 1px solid rgba(244,114,182,0.15);
          padding: 0.15em 0.4em;
          border-radius: 5px;
        }
        .blog-body pre {
          margin: 2em 0;
          padding: 1.5em;
          background: #0f1729;
          border: 1px solid rgba(99,102,241,0.18);
          border-radius: 12px;
          overflow-x: auto;
          position: relative;
        }
        .blog-body pre::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
          border-radius: 12px 12px 0 0;
        }
        .blog-body pre code {
          background: none;
          border: none;
          padding: 0;
          color: #e2e8f0;
          font-size: 0.9rem;
          line-height: 1.7;
        }
        .blog-body ul { list-style: none; padding-left: 0; margin: 1.4em 0; }
        .blog-body ul li {
          padding-left: 1.5em;
          position: relative;
          margin-bottom: 0.5em;
          color: #cbd5e1;
        }
        .blog-body ul li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #6366f1;
          font-size: 0.78em;
          top: 0.22em;
        }
        .blog-body ol {
          list-style: none;
          counter-reset: ol-counter;
          padding-left: 0;
          margin: 1.4em 0;
        }
        .blog-body ol li {
          counter-increment: ol-counter;
          padding-left: 2.2em;
          position: relative;
          margin-bottom: 0.5em;
          color: #cbd5e1;
        }
        .blog-body ol li::before {
          content: counter(ol-counter);
          position: absolute;
          left: 0;
          width: 1.45em;
          height: 1.45em;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.28);
          color: #818cf8;
          border-radius: 50%;
          font-size: 0.72rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0.2em;
        }
        .blog-body hr {
          margin: 3em 0;
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent);
        }
        .blog-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 2em 0;
          font-size: 0.94rem;
        }
        .blog-body thead tr {
          background: rgba(99,102,241,0.1);
          border-bottom: 2px solid rgba(99,102,241,0.28);
        }
        .blog-body th {
          padding: 0.8em 1em;
          text-align: left;
          font-weight: 700;
          color: #a5b4fc;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .blog-body td {
          padding: 0.75em 1em;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: #cbd5e1;
        }
        .blog-body tbody tr:hover td { background: rgba(99,102,241,0.04); }
        .blog-body img {
          max-width: 100%;
          border-radius: 10px;
          margin: 1.8em 0;
          border: 1px solid rgba(255,255,255,0.06);
          display: block;
        }
        .blog-body mark {
          background: rgba(251,191,36,0.14);
          color: #fbbf24;
          padding: 0.1em 0.3em;
          border-radius: 3px;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-28 pb-20 px-6 md:px-12 text-white">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            {blog.excerpt && (
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">{blog.excerpt}</p>
            )}
            <div className="flex flex-wrap justify-center items-center gap-3 mt-6 text-sm text-gray-400">
              {blog.author && <span>✍️ {blog.author}</span>}
              {blog.author && <span>•</span>}
              {blog.category && <span className="text-blue-400">{blog.category}</span>}
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

          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-12">
            <img
              src={image}
              alt={blog.title}
              className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <article className="blog-body">
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : (
                <p style={{ color: "#64748b", fontStyle: "italic" }}>No content available</p>
              )}
            </article>
          </div>

          {/* Tags */}
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

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-indigo-600/20 py-16 px-8 mt-16 rounded-3xl border border-white/10 shadow-lg backdrop-blur-md">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Have a Story to Share or Need Expert Insights?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're looking to collaborate or learn more about the latest in digital innovation,
              we're here to help your ideas take shape.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/consultation"
              className="inline-block px-8 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 hover:opacity-90 transition-all text-white shadow-md"
            >
              Let's Connect →
            </motion.a>
          </div>

          {/* Back Link */}
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
    </>
  );
}