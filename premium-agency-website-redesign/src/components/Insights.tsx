import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const insights = [
  {
    id: 1,
    category: 'Interior Design',
    title: 'The Art of Biophilic Design in Luxury Interiors',
    excerpt: 'How integrating natural elements transforms premium spaces — increasing wellbeing, reducing stress, and elevating perceived value in residential and commercial environments.',
    date: 'November 2024',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/7546323/pexels-photo-7546323.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800',
  },
  {
    id: 2,
    category: 'Exhibition Design',
    title: 'Designing for Attention: The Psychology of Exhibition Booths',
    excerpt: 'Understanding the 7-second rule in trade show environments and how strategic spatial design can dramatically increase footfall and lead conversion rates.',
    date: 'October 2024',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/35138560/pexels-photo-35138560.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800',
  },
  {
    id: 3,
    category: '3D Visualization',
    title: 'How Photorealistic Renders Are Transforming Real Estate Sales',
    excerpt: 'The data shows that photorealistic 3D visualization reduces sales cycles by up to 30% — here\'s why and how to make it work for your development.',
    date: 'September 2024',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/38438327/pexels-photo-38438327.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800',
  },
];

export default function Insights() {
  const { ref, visible } = useReveal();

  return (
    <section id="insights" className="py-24 lg:py-36 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <span className={`section-label block mb-4 animate-fade-up ${visible ? 'is-visible' : ''}`}>
              Latest Insights
            </span>
            <h2 className={`font-display text-[clamp(48px,7vw,100px)] leading-none text-white animate-fade-up delay-100 ${visible ? 'is-visible' : ''}`}>
              IDEAS &<br />
              <span className="text-[#D7A646]">THINKING</span>
            </h2>
          </div>

          <div className={`animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
            <button className="btn-outline inline-flex items-center gap-3">
              <span>All Articles</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {insights.map((article, i) => (
            <article
              key={article.id}
              className={`group cursor-pointer animate-fade-up ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image */}
              <div className="img-zoom aspect-[16/10] mb-6 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#D7A646] text-[10px] tracking-[0.2em] uppercase">{article.category}</span>
                <span className="text-white/20 text-[10px]">·</span>
                <span className="text-white/30 text-[10px] tracking-wider">{article.date}</span>
                <span className="text-white/20 text-[10px]">·</span>
                <span className="text-white/30 text-[10px] tracking-wider">{article.readTime}</span>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-xl leading-tight mb-4 group-hover:text-[#D7A646] transition-colors duration-300">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Read more */}
              <div className="flex items-center gap-2 text-white/50 text-sm group-hover:text-[#D7A646] transition-colors duration-300">
                <span className="tracking-wider text-xs uppercase">Read Article</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
