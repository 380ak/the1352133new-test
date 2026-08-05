import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Lumière Residence',
    category: 'Interior Design',
    location: 'Dubai, UAE',
    year: '2024',
    description: 'A 4,200 sqft luxury villa transformed into an architectural masterpiece, merging warm materiality with modern spatial design.',
    image: 'https://images.pexels.com/photos/8141956/pexels-photo-8141956.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    size: 'large',
  },
  {
    id: 2,
    title: 'Nova Exhibition Hub',
    category: 'Exhibition Design',
    location: 'Abu Dhabi, UAE',
    year: '2024',
    description: 'A 600sqm immersive exhibition booth designed for GITEX 2024, featuring smart glass and architectural lighting.',
    image: 'https://images.pexels.com/photos/35138560/pexels-photo-35138560.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    size: 'small',
  },
  {
    id: 3,
    title: 'Meridian Office Tower',
    category: '3D Visualization',
    location: 'Riyadh, KSA',
    year: '2023',
    description: 'Photorealistic 3D visualization suite for a 40-story mixed-use development in central Riyadh.',
    image: 'https://images.pexels.com/photos/38438327/pexels-photo-38438327.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    size: 'small',
  },
  {
    id: 4,
    title: 'Atelier Blanc',
    category: 'Interior Design',
    location: 'Doha, Qatar',
    year: '2023',
    description: 'A minimalist penthouse suite blending Scandinavian calm with Middle Eastern warmth for a luxury real estate client.',
    image: 'https://images.pexels.com/photos/7546323/pexels-photo-7546323.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    size: 'medium',
  },
  {
    id: 5,
    title: 'Cascade Restaurant',
    category: 'Interior Design',
    location: 'Dubai, UAE',
    year: '2023',
    description: 'An award-winning restaurant concept inspired by flowing water, featuring custom walnut joinery and ambient lighting.',
    image: 'https://images.pexels.com/photos/7174386/pexels-photo-7174386.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    size: 'medium',
  },
  {
    id: 6,
    title: 'Vista Corporate HQ',
    category: 'Brand Identity',
    location: 'Sharjah, UAE',
    year: '2022',
    description: 'Full visual identity system for a leading real estate group — from logo architecture to comprehensive brand guidelines.',
    image: 'https://images.pexels.com/photos/931887/pexels-photo-931887.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    size: 'large',
  },
];

const categories = ['All', 'Interior Design', 'Exhibition Design', '3D Visualization', 'Brand Identity'];

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  size: string;
}

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

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#1B1B1B] border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#D7A646] transition-colors bg-[#0A0A0A]"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="aspect-video overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-8 lg:p-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="section-label block mb-3">{project.category}</span>
              <h3 className="font-display text-5xl text-white">{project.title}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8 py-6 border-y border-white/8">
            <div>
              <span className="text-white/30 text-xs tracking-wider uppercase block mb-1">Location</span>
              <span className="text-white text-sm">{project.location}</span>
            </div>
            <div>
              <span className="text-white/30 text-xs tracking-wider uppercase block mb-1">Year</span>
              <span className="text-white text-sm">{project.year}</span>
            </div>
            <div>
              <span className="text-white/30 text-xs tracking-wider uppercase block mb-1">Category</span>
              <span className="text-white text-sm">{project.category}</span>
            </div>
          </div>

          <p className="text-white/60 leading-relaxed text-base">{project.description}</p>

          <div className="mt-8">
            <a
              href="#contact"
              onClick={onClose}
              className="btn-primary inline-flex"
            >
              <span>Discuss Similar Project</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref, visible } = useReveal();

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="py-24 lg:py-36 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <span className={`section-label block mb-4 animate-fade-up ${visible ? 'is-visible' : ''}`}>
              Selected Work
            </span>
            <h2 className={`font-display text-[clamp(48px,7vw,100px)] leading-none text-white animate-fade-up delay-100 ${visible ? 'is-visible' : ''}`}>
              OUR<br />
              <span className="text-[#D7A646]">PROJECTS</span>
            </h2>
          </div>

          <p className={`text-white/50 max-w-sm leading-relaxed animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
            Each project is approached with creativity, precision and passion — transforming client visions into timeless spaces.
          </p>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap gap-3 mb-12 animate-fade-up delay-300 ${visible ? 'is-visible' : ''}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-xs tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-[#D7A646] text-[#0A0A0A] border-[#D7A646]'
                  : 'border-white/15 text-white/50 hover:border-white/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {filtered.map((project, index) => {
            const colSpan =
              project.size === 'large' ? 'lg:col-span-7' :
              project.size === 'medium' ? 'lg:col-span-6' : 'lg:col-span-5';
            const height =
              project.size === 'large' ? 'h-[500px] lg:h-[600px]' :
              project.size === 'medium' ? 'h-[420px] lg:h-[500px]' : 'h-[380px] lg:h-[440px]';

            return (
              <div
                key={project.id}
                className={`${colSpan} project-card ${height} cursor-pointer animate-scale ${visible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="card-overlay" />
                <div className="card-content">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#D7A646] text-[10px] tracking-[0.2em] uppercase">{project.category}</span>
                    <span className="text-white/30 text-[10px]">·</span>
                    <span className="text-white/40 text-[10px] tracking-wider">{project.location}</span>
                  </div>
                  <h3 className="font-display text-3xl lg:text-4xl text-white mb-2">{project.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-xs tracking-wider">{project.year}</span>
                    <div className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-[#D7A646] hover:bg-[#D7A646] transition-all duration-300 group">
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#0A0A0A]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setActiveFilter('All')}
            className="btn-outline inline-flex items-center gap-3"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
