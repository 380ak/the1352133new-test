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

const reasons = [
  {
    number: '01',
    title: 'Multidisciplinary Mastery',
    description: 'One studio, unlimited capability. From spatial design to brand identity to photography — all delivered under one creative roof with unified vision.',
  },
  {
    number: '02',
    title: 'Premium without Compromise',
    description: 'We operate with the same standards as international design studios — meticulous attention to detail, premium materials, and world-class finish.',
  },
  {
    number: '03',
    title: 'Middle East Expertise',
    description: 'Deep knowledge of regional aesthetics, cultural sensibilities and market dynamics — combined with global design thinking.',
  },
  {
    number: '04',
    title: 'Human-Centered Approach',
    description: 'Every decision is driven by the people who will inhabit your space or interact with your brand — creating experiences that resonate deeply.',
  },
  {
    number: '05',
    title: 'Deadline-Driven Excellence',
    description: 'We deliver on time without sacrificing quality. Our proven processes and experienced team ensure your project lands exactly when needed.',
  },
  {
    number: '06',
    title: 'Transparent Partnership',
    description: 'Clear communication, honest timelines, and full transparency throughout every project phase. No surprises, only results.',
  },
];

export default function WhyUs() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-24 lg:py-36 bg-[#0F0F0F] relative overflow-hidden">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[20vw] text-white/[0.02] leading-none whitespace-nowrap">STUDIO 91</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <span className={`section-label block mb-4 animate-fade-up ${visible ? 'is-visible' : ''}`}>
              Why Choose Us
            </span>
            <h2 className={`font-display text-[clamp(48px,7vw,100px)] leading-none text-white animate-fade-up delay-100 ${visible ? 'is-visible' : ''}`}>
              THE<br />
              <span className="text-[#D7A646]">DIFFERENCE</span>
            </h2>
          </div>
          <p className={`text-white/50 leading-relaxed animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
            We don't just complete projects — we build lasting partnerships. Here's why leading brands and developers across the Middle East choose The Studio 91.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {reasons.map((reason, i) => (
            <div
              key={reason.number}
              className={`bg-[#0F0F0F] p-8 lg:p-10 border border-white/5 hover:border-[#D7A646]/20 hover:bg-[#D7A646]/02 transition-all duration-400 group animate-fade-up ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-5xl text-[#D7A646]/20 group-hover:text-[#D7A646]/40 transition-colors duration-300 leading-none">
                  {reason.number}
                </span>
                <div className="w-8 h-[1px] bg-[#D7A646]/30 group-hover:w-12 transition-all duration-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-4 leading-tight group-hover:text-[#D7A646] transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className={`mt-16 p-8 lg:p-12 border border-[#D7A646]/20 bg-[#D7A646]/03 flex flex-col lg:flex-row items-center justify-between gap-6 animate-fade-up delay-400 ${visible ? 'is-visible' : ''}`}>
          <div>
            <p className="font-display text-3xl lg:text-4xl text-white mb-2">Ready to create something extraordinary?</p>
            <p className="text-white/40 text-sm tracking-wider">Let's start with a conversation.</p>
          </div>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary flex-shrink-0"
          >
            <span>Get In Touch</span>
          </button>
        </div>
      </div>
    </section>
  );
}
