import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const heroImages = [
  'https://images.pexels.com/photos/8141956/pexels-photo-8141956.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920',
  'https://images.pexels.com/photos/7722168/pexels-photo-7722168.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920',
  'https://images.pexels.com/photos/31737859/pexels-photo-31737859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920',
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[640px] overflow-hidden">
      {/* Background Images */}
      {heroImages.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: i === currentImage ? 1 : 0 }}
        >
          <img
            src={img}
            alt="Premium interior design"
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 hero-overlay z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/80 z-10" />

      {/* Gold accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#D7A646] to-transparent z-20 opacity-60" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          {/* Label */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="w-8 h-[1px] bg-[#D7A646]" />
            <span className="section-label">Premium Creative Studio — Middle East</span>
          </div>

          {/* Headline */}
          <div className="overflow-hidden mb-4">
            <h1
              className={`font-display text-[clamp(60px,10vw,160px)] leading-none text-white transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
              style={{ transitionDelay: '400ms' }}
            >
              YOU
            </h1>
          </div>
          <div className="overflow-hidden mb-2">
            <h1
              className={`font-display text-[clamp(60px,10vw,160px)] leading-none text-[#D7A646] transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
              style={{ transitionDelay: '550ms' }}
            >
              IMAGINE.
            </h1>
          </div>
          <div className="overflow-hidden mb-10">
            <h1
              className={`font-display text-[clamp(60px,10vw,160px)] leading-none text-white transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
              style={{ transitionDelay: '700ms' }}
            >
              WE CREATE.
            </h1>
          </div>

          {/* Description */}
          <p
            className={`text-white/60 text-lg max-w-xl leading-relaxed mb-10 font-light transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '900ms' }}
          >
            A multidisciplinary creative studio crafting immersive visual experiences through Interior Design, Exhibition Design, 3D Visualization & Brand Identity.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap items-center gap-4 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            <button onClick={scrollToWork} className="btn-primary">
              <span>Explore Work</span>
              <ArrowDown className="w-4 h-4 relative z-10" />
            </button>
            <button onClick={scrollToContact} className="btn-outline">
              <span>Start a Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-6 lg:right-12 z-20 flex flex-col gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`block transition-all duration-300 ${
              i === currentImage
                ? 'w-6 h-[3px] bg-[#D7A646]'
                : 'w-3 h-[2px] bg-white/30'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-6 lg:left-12 z-20 flex items-center gap-3">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#D7A646] relative overflow-hidden">
          <div className="w-full h-full bg-[#D7A646] animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase rotate-0 writing-vertical">Scroll</span>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-[#0A0A0A]/70 backdrop-blur-sm hidden lg:block">
        <div className="max-w-[1400px] mx-auto px-12 grid grid-cols-4 divide-x divide-white/5">
          {[
            { value: '15+', label: 'Years of Experience' },
            { value: '250+', label: 'Projects Completed' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '12+', label: 'Industry Awards' },
          ].map((stat) => (
            <div key={stat.label} className="px-8 py-5 flex items-center gap-4">
              <span className="font-display text-3xl text-[#D7A646]">{stat.value}</span>
              <span className="text-white/40 text-xs tracking-wider leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
