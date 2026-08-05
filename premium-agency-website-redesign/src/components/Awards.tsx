import { useEffect, useRef, useState } from 'react';

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

const awards = [
  {
    year: '2024',
    title: 'Best Interior Design Studio',
    organization: 'Middle East Design Awards',
    category: 'Interior Design',
  },
  {
    year: '2024',
    title: 'Excellence in Exhibition Design',
    organization: 'GITEX Global Recognition',
    category: 'Exhibition Design',
  },
  {
    year: '2023',
    title: 'Premium Creative Studio of the Year',
    organization: 'Gulf Creative Awards',
    category: 'Multidisciplinary',
  },
  {
    year: '2023',
    title: 'Outstanding 3D Visualization',
    organization: 'Real Estate Design Forum UAE',
    category: '3D Visualization',
  },
  {
    year: '2022',
    title: 'Brand Identity Excellence',
    organization: 'MENA Design Summit',
    category: 'Brand Identity',
  },
  {
    year: '2022',
    title: 'Architectural Photography Award',
    organization: 'Arab Photographer Association',
    category: 'Photography',
  },
];

export default function Awards() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-24 lg:py-36 bg-[#1B1B1B]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div ref={ref} className="mb-16">
          <span className={`section-label block mb-4 animate-fade-up ${visible ? 'is-visible' : ''}`}>
            Recognition
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <h2 className={`font-display text-[clamp(48px,7vw,100px)] leading-none text-white flex-1 animate-fade-up delay-100 ${visible ? 'is-visible' : ''}`}>
              AWARDS &<br />
              <span className="text-[#D7A646]">RECOGNITION</span>
            </h2>
            <p className={`text-white/50 max-w-sm leading-relaxed animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
              Our work has been recognized by leading design organizations across the Middle East and internationally.
            </p>
          </div>
        </div>

        {/* Awards list */}
        <div className={`animate-fade-up delay-300 ${visible ? 'is-visible' : ''}`}>
          {awards.map((award, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/5 group hover:border-[#D7A646]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-8">
                <span className="font-display text-3xl text-[#D7A646]/30 group-hover:text-[#D7A646]/60 transition-colors duration-300 w-16 flex-shrink-0">
                  {award.year}
                </span>
                <div>
                  <h3 className="text-white font-semibold text-base group-hover:text-[#D7A646] transition-colors duration-300">
                    {award.title}
                  </h3>
                  <p className="text-white/40 text-sm mt-0.5">{award.organization}</p>
                </div>
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase border border-white/10 group-hover:border-[#D7A646]/30 text-white/30 group-hover:text-[#D7A646] px-4 py-2 mt-4 md:mt-0 inline-block transition-all duration-300 w-fit">
                {award.category}
              </span>
            </div>
          ))}
        </div>

        {/* Trophy icon section */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up delay-400 ${visible ? 'is-visible' : ''}`}>
          {[
            { icon: '🏆', value: '12+', label: 'Industry Awards' },
            { icon: '🌍', value: '8+', label: 'Countries Served' },
            { icon: '⭐', value: '98%', label: 'Client Satisfaction' },
          ].map((item) => (
            <div key={item.label} className="text-center border border-white/5 p-8 hover:border-[#D7A646]/20 transition-all duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="font-display text-5xl text-[#D7A646] mb-2">{item.value}</div>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
