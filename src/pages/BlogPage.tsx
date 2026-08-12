import React from 'react';
import { BLOG_POSTS } from '../data/blog';
import { ArrowRight, Clock, User } from 'lucide-react';

interface BlogPageProps {
  onSelectPost: (slug: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onSelectPost }) => {
  return (
    <div className="pt-28 pb-24 bg-[#080808] text-[#F5F1E8]">
      {/* Header */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono">
          THE BEAUTY JOURNAL
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-wider font-light uppercase">
          EDITORIAL <span className="italic text-[#D4AF37]">INSIGHTS</span>
        </h1>
        <p className="text-sm text-[#A9A39A] font-light max-w-xl mx-auto">
          Expert hair care guides, bridal skin preparation secrets, and colour trend analysis from Shiny's masters.
        </p>
      </section>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            onClick={() => onSelectPost(post.slug)}
            className="bg-[#111111] border border-[#D4AF37]/20 group cursor-pointer p-6 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden border border-[#D4AF37]/20">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>

              <h2 className="font-serif text-2xl text-[#F5F1E8] font-light group-hover:text-[#D4AF37] transition-colors">
                {post.title}
              </h2>

              <p className="text-xs text-[#A9A39A] font-light leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#080808] flex items-center justify-between text-xs text-[#A9A39A]">
              <span className="flex items-center gap-1 font-mono text-[10px]">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                {post.readTime}
              </span>

              <span className="text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>READ ARTICLE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
