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

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="py-24 lg:py-36 bg-[#0F0F0F]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Image */}
          <div className={`relative animate-scale ${visible ? 'is-visible' : ''}`}>
            <div className="img-zoom aspect-[4/5]">
              <img
                src="https://images.pexels.com/photos/7722168/pexels-photo-7722168.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720"
                alt="The Studio 91 — Interior Design"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-[#D7A646] p-6 lg:p-8 max-w-[220px]">
              <p className="font-display text-5xl text-[#0A0A0A] leading-none mb-2">15+</p>
              <p className="text-[#0A0A0A]/70 text-xs tracking-wider uppercase">Years of Excellence</p>
            </div>

            {/* Gold border accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#D7A646] opacity-30" />
          </div>

          {/* Right — Content */}
          <div>
            <span className={`section-label block mb-6 animate-fade-up ${visible ? 'is-visible' : ''}`}>
              About The Studio
            </span>
            <h2 className={`font-display text-[clamp(40px,5vw,72px)] leading-none text-white mb-8 animate-fade-up delay-100 ${visible ? 'is-visible' : ''}`}>
              WHERE VISION<br />
              MEETS <span className="text-[#D7A646]">CRAFT</span>
            </h2>

            <p className={`text-white/60 leading-relaxed mb-6 animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
              The Studio 91 is a premium multidisciplinary creative studio based in the Middle East. We transform ideas into immersive visual experiences that combine creativity, functionality and timeless aesthetics.
            </p>
            <p className={`text-white/60 leading-relaxed mb-10 animate-fade-up delay-300 ${visible ? 'is-visible' : ''}`}>
              Our team of architects, designers, photographers and digital creators work with a singular obsession: delivering work that is not just beautiful, but strategically powerful. Every space we design, every brand we build, every image we capture — carries our signature of uncompromising quality.
            </p>

            {/* Values */}
            <div className={`grid grid-cols-2 gap-4 mb-10 animate-fade-up delay-400 ${visible ? 'is-visible' : ''}`}>
              {['Creativity', 'Precision', 'Innovation', 'Trust'].map((val) => (
                <div key={val} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#D7A646] rounded-full flex-shrink-0" />
                  <span className="text-white/70 text-sm tracking-wider">{val}</span>
                </div>
              ))}
            </div>

            <div className={`animate-fade-up delay-500 ${visible ? 'is-visible' : ''}`}>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-primary inline-flex"
              >
                <span>Work With Us</span>
                <ArrowUpRight className="w-4 h-4 relative z-10" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-px mt-24 border border-white/5 animate-fade-up delay-300 ${visible ? 'is-visible' : ''}`}>
          {[
            { value: 15, suffix: '+', label: 'Years of Experience' },
            { value: 250, suffix: '+', label: 'Projects Delivered' },
            { value: 98, suffix: '%', label: 'Client Satisfaction' },
            { value: 12, suffix: '+', label: 'Awards Received' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1B1B1B] p-8 lg:p-10 text-center border border-white/5">
              <div className="counter-value text-[clamp(40px,5vw,64px)] mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
