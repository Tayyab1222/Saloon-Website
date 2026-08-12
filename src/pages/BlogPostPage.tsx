import React from 'react';
import { BLOG_POSTS } from '../data/blog';
import { ArrowLeft, Clock, User, Calendar, Share2 } from 'lucide-react';

interface BlogPostPageProps {
  slug: string;
  onBack: () => void;
  onOpenBooking: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onBack, onOpenBooking }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  return (
    <div className="pt-28 pb-24 bg-[#080808] text-[#F5F1E8]">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-[#D4AF37] hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>BACK TO JOURNAL</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-xs font-mono text-[#D4AF37] uppercase tracking-[0.25em]">
            <span>{post.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F1E8] font-light leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-[#A9A39A] font-light italic leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body Content */}
        <div className="space-y-6 pt-6 border-t border-[#111111] text-sm sm:text-base text-[#F5F1E8]/90 font-light leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-8 bg-[#111111] border border-[#D4AF37]/20 text-center space-y-4">
          <h3 className="font-serif text-2xl text-[#F5F1E8]">Ready for Your Private Session?</h3>
          <p className="text-xs text-[#A9A39A] font-light max-w-md mx-auto">
            Book a consultation with our London hair & beauty specialists today.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors"
          >
            BOOK CONSULTATION
          </button>
        </div>
      </div>
    </div>
  );
};
