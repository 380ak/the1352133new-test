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

export default function BeforeAfter() {
  const { ref, visible } = useReveal();
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-24 lg:py-36 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div ref={ref} className="mb-16">
          <span className={`section-label block mb-4 animate-fade-up ${visible ? 'is-visible' : ''}`}>
            Transformation
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <h2 className={`font-display text-[clamp(48px,7vw,100px)] leading-none text-white flex-1 animate-fade-up delay-100 ${visible ? 'is-visible' : ''}`}>
              BEFORE &<br />
              <span className="text-[#D7A646]">AFTER</span>
            </h2>
            <p className={`text-white/50 max-w-sm leading-relaxed animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
              Drag the slider to see the dramatic transformation we achieved — turning an ordinary space into a luxury interior.
            </p>
          </div>
        </div>

        {/* Comparison slider */}
        <div
          className={`relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden cursor-ew-resize select-none animate-scale delay-200 ${visible ? 'is-visible' : ''}`}
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onTouchMove={handleTouchMove}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
        >
          {/* After image (bottom) */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/8141956/pexels-photo-8141956.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1920"
              alt="After — Luxury interior design"
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
            <div className="absolute bottom-4 right-4 bg-[#D7A646] px-4 py-2">
              <span className="font-semibold text-[#0A0A0A] text-xs tracking-[0.15em] uppercase">After</span>
            </div>
          </div>

          {/* Before image (clip) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src="https://images.pexels.com/photos/7174386/pexels-photo-7174386.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1920"
              alt="Before — Original space"
              className="w-full h-full object-cover"
              style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: 'none' }}
              loading="lazy"
              draggable={false}
            />
            <div className="absolute bottom-4 left-4 bg-[#1B1B1B] border border-white/20 px-4 py-2">
              <span className="text-white/70 text-xs tracking-[0.15em] uppercase">Before</span>
            </div>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 flex items-center justify-center z-10"
            style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-[2px] h-full bg-white/80" />
            <div className="absolute w-12 h-12 bg-white border-4 border-[#D7A646] rounded-full flex items-center justify-center shadow-xl">
              <svg className="w-5 h-5 text-[#0A0A0A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
                <polyline points="9 18 3 12 9 6" transform="translate(6 0)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className={`mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-up delay-300 ${visible ? 'is-visible' : ''}`}>
          <div>
            <h3 className="text-white font-semibold text-lg">Lumière Residence — Living Room Transformation</h3>
            <p className="text-white/40 text-sm mt-1">Dubai Villa · 2024 · Interior Design</p>
          </div>
          <button
            onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[#D7A646] text-xs tracking-[0.2em] uppercase border-b border-[#D7A646]/30 pb-1 hover:border-[#D7A646] transition-colors"
          >
            View Full Project →
          </button>
        </div>
      </div>
    </section>
  );
}
