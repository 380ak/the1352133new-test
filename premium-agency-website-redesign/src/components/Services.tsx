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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const services = [
  {
    number: '01',
    title: 'Interior Design',
    description: 'From residential villas to luxury hospitality spaces — we create environments that tell your story through thoughtful spatial design.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    tags: ['Residential', 'Commercial', 'Hospitality'],
  },
  {
    number: '02',
    title: 'Exhibition Booth Design',
    description: 'Award-winning exhibition environments that command attention, communicate your brand and convert visitors into clients.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="1"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    tags: ['Trade Shows', 'GITEX', 'Corporate Events'],
  },
  {
    number: '03',
    title: '3D Visualization',
    description: 'Photorealistic renders and animations that bring architectural visions to life before a single brick is laid.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
        <line x1="8" y1="2" x2="8" y2="18"/>
        <line x1="16" y1="6" x2="16" y2="22"/>
      </svg>
    ),
    tags: ['Renders', 'Animations', 'Virtual Tours'],
  },
  {
    number: '04',
    title: 'Brand Identity',
    description: 'Comprehensive visual identity systems — from logo architecture to brand guidelines that define your market position.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    tags: ['Logo Design', 'Brand Guidelines', 'Visual Identity'],
  },
  {
    number: '05',
    title: 'Graphic Design',
    description: 'Print and digital design that captures attention and communicates with elegance — from brochures to full campaigns.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
    tags: ['Print Design', 'Digital', 'Marketing'],
  },
  {
    number: '06',
    title: 'Photography',
    description: 'Architectural and interior photography with precision lighting — images that elevate your portfolio and marketing.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    tags: ['Architectural', 'Interior', 'Lifestyle'],
  },
  {
    number: '07',
    title: 'Videography',
    description: 'Cinematic video production — from property tours to corporate films — with premium production value.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    tags: ['Corporate', 'Property Tours', 'Social Content'],
  },
  {
    number: '08',
    title: 'Social Media Content',
    description: 'Strategic content creation that builds premium digital presence — curated for your brand aesthetic and audience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
    tags: ['Instagram', 'LinkedIn', 'Content Strategy'],
  },
  {
    number: '09',
    title: 'Creative Direction',
    description: 'End-to-end creative vision — guiding every touchpoint of your brand, campaign or space with strategic intent.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    tags: ['Strategy', 'Art Direction', 'Consulting'],
  },
  {
    number: '10',
    title: 'Architectural Rendering',
    description: 'High-definition architectural renders for real estate marketing, planning approval and investor presentations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    tags: ['Exteriors', 'Master Plans', 'Real Estate'],
  },
];

export default function Services() {
  const { ref, visible } = useReveal();

  return (
    <section id="services" className="py-24 lg:py-36 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <span className={`section-label block mb-4 animate-fade-up ${visible ? 'is-visible' : ''}`}>
              What We Do
            </span>
            <h2 className={`font-display text-[clamp(48px,7vw,100px)] leading-none text-white animate-fade-up delay-100 ${visible ? 'is-visible' : ''}`}>
              OUR<br />
              <span className="text-[#D7A646]">SERVICES</span>
            </h2>
          </div>
          <div className={`flex items-end animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
            <p className="text-white/50 leading-relaxed">
              We offer a comprehensive suite of creative services — from spatial design to visual storytelling. Each discipline is executed with the same obsession for detail, quality and impact.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-white/5">
          {services.map((service, i) => (
            <div
              key={service.number}
              className={`service-card bg-[#0A0A0A] animate-fade-up ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Number + Icon */}
              <div className="flex items-start justify-between mb-6">
                <span className="text-[#D7A646]/30 font-display text-4xl leading-none">{service.number}</span>
                <div className="text-[#D7A646] opacity-60">
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-base mb-3 leading-tight tracking-wide">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/40 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-[10px] tracking-[0.12em] uppercase text-white/30 border border-white/10 px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* CTA tile */}
          <div className="bg-[#D7A646] p-10 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:bg-[#B88746]">
            <div>
              <span className="text-[#0A0A0A]/50 font-display text-4xl leading-none">→</span>
            </div>
            <div>
              <h3 className="text-[#0A0A0A] font-display text-3xl leading-none mb-4">START<br />YOUR<br />PROJECT</h3>
              <p className="text-[#0A0A0A]/60 text-xs tracking-wider uppercase">Get in touch</p>
            </div>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-10 h-10 border border-[#0A0A0A]/20 flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:border-[#0A0A0A] transition-all duration-300"
            >
              <ArrowUpRight className="w-4 h-4 text-[#0A0A0A] group-hover:text-[#D7A646]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
