import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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

const testimonials = [
  {
    id: 1,
    quote: "The Studio 91 completely transformed our headquarters into a space that reflects our brand values. The attention to detail, from material selection to lighting design, was extraordinary. Our team productivity increased and client perception of our brand elevated dramatically.",
    name: 'Khalid Al-Mansouri',
    title: 'CEO, Al-Mansouri Group',
    company: 'Real Estate Development',
    rating: 5,
  },
  {
    id: 2,
    quote: "Our exhibition booth at GITEX was the talk of the show floor. Studio 91 delivered a space that was not just visually stunning, but strategically designed to facilitate conversations and close deals. We doubled our lead generation compared to last year.",
    name: 'Sarah Mitchell',
    title: 'Marketing Director',
    company: 'TechVentures MENA',
    rating: 5,
  },
  {
    id: 3,
    quote: "Working with The Studio 91 on our restaurant concept was a collaborative dream. They truly understood the experience we wanted to create — from the moment guests walk in, to the final ambiance that kept them staying longer. Revenue is up 40%.",
    name: 'Omar Al-Rashidi',
    title: 'Founder',
    company: 'Cascade Restaurant Group',
    rating: 5,
  },
  {
    id: 4,
    quote: "The 3D visualizations Studio 91 created for our residential development were so realistic that clients were making purchase decisions purely from the renders. Phenomenal quality, delivered on time, and the team was a genuine pleasure to work with.",
    name: 'Fatima Al-Zahrawi',
    title: 'Development Director',
    company: 'Horizon Properties',
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, visible } = useReveal();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 lg:py-36 bg-[#0F0F0F]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <span className={`section-label block mb-4 animate-fade-up ${visible ? 'is-visible' : ''}`}>
              Client Stories
            </span>
            <h2 className={`font-display text-[clamp(48px,7vw,100px)] leading-none text-white animate-fade-up delay-100 ${visible ? 'is-visible' : ''}`}>
              WHAT THEY<br />
              <span className="text-[#D7A646]">SAY</span>
            </h2>
          </div>

          <div className={`flex gap-3 animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
            <button
              onClick={prev}
              className="w-12 h-12 border border-white/15 flex items-center justify-center hover:border-[#D7A646] hover:text-[#D7A646] text-white transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 border border-white/15 flex items-center justify-center hover:border-[#D7A646] hover:text-[#D7A646] text-white transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured testimonial */}
        <div className={`mb-12 animate-scale delay-200 ${visible ? 'is-visible' : ''}`}>
          <div className="testimonial-card relative">
            <Quote className="w-12 h-12 text-[#D7A646]/20 mb-6" />

            <div className="transition-all duration-500">
              <p className="text-white/80 text-xl lg:text-2xl leading-relaxed font-light mb-8 max-w-4xl">
                "{testimonials[current].quote}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#D7A646] flex items-center justify-center">
                    <span className="font-display text-xl text-[#0A0A0A]">
                      {testimonials[current].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonials[current].name}</p>
                    <p className="text-white/40 text-sm">{testimonials[current].title} — {testimonials[current].company}</p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#D7A646]" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots + mini testimonials */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-up delay-300 ${visible ? 'is-visible' : ''}`}>
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setCurrent(i)}
              className={`p-4 border text-left transition-all duration-300 ${
                i === current
                  ? 'border-[#D7A646]/40 bg-[#D7A646]/05'
                  : 'border-white/5 hover:border-white/20'
              }`}
            >
              <p className="text-white/50 text-xs leading-relaxed line-clamp-3 mb-3">"{t.quote}"</p>
              <p className={`text-xs font-semibold transition-colors ${i === current ? 'text-[#D7A646]' : 'text-white/40'}`}>
                {t.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
