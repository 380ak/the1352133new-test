import { useEffect, useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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

const faqs = [
  {
    question: 'What types of projects does The Studio 91 take on?',
    answer: 'We work on a wide range of projects — residential villas, luxury apartments, corporate offices, restaurants and cafés, hotel interiors, exhibition booths, retail spaces, and more. We also provide standalone branding, photography, and 3D visualization services.',
  },
  {
    question: 'How long does a typical interior design project take?',
    answer: 'Project timelines vary based on scope and scale. A residential apartment typically takes 8–14 weeks from concept to completion. A full villa may take 16–24 weeks. Exhibition booths are typically delivered in 4–8 weeks. We provide detailed timelines during the briefing phase.',
  },
  {
    question: 'Do you work on projects outside the UAE?',
    answer: 'Absolutely. While we are based in the UAE, we have delivered projects across the GCC — Saudi Arabia, Qatar, Bahrain, and Oman. For larger projects, we are open to international collaboration as well.',
  },
  {
    question: 'What is your pricing structure?',
    answer: 'Our pricing is tailored to each project based on scope, complexity, timeline and services required. We provide detailed, transparent proposals after the initial discovery call. We believe in honest pricing with no hidden costs.',
  },
  {
    question: 'Can you manage the entire project, including contractors?',
    answer: 'Yes. We offer full project management as part of our interior design service — handling contractor coordination, supplier sourcing, site supervision, and quality control throughout the build. You have one point of contact for everything.',
  },
  {
    question: 'How do we get started?',
    answer: 'Simply reach out via our contact form, WhatsApp, or email. We\'ll schedule a complimentary discovery call to understand your project. From there, we prepare a tailored proposal. Most projects can be initiated within 1–2 weeks of agreement.',
  },
];

export default function FAQ() {
  const { ref, visible } = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-36 bg-[#0F0F0F]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div ref={ref}>
            <span className={`section-label block mb-4 animate-fade-up ${visible ? 'is-visible' : ''}`}>
              FAQ
            </span>
            <h2 className={`font-display text-[clamp(48px,6vw,80px)] leading-none text-white mb-8 animate-fade-up delay-100 ${visible ? 'is-visible' : ''}`}>
              COMMON<br />
              <span className="text-[#D7A646]">QUESTIONS</span>
            </h2>
            <p className={`text-white/50 leading-relaxed mb-10 animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
              Have more questions? We're happy to talk through your specific project and answer anything not covered here.
            </p>
            <div className={`animate-fade-up delay-300 ${visible ? 'is-visible' : ''}`}>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                <span>Ask Us Anything</span>
              </button>
            </div>

            {/* Studio image */}
            <div className={`mt-12 img-zoom hidden lg:block animate-scale delay-400 ${visible ? 'is-visible' : ''}`}>
              <img
                src="https://images.pexels.com/photos/6265942/pexels-photo-6265942.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                alt="The Studio 91 workspace"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right — FAQs */}
          <div className={`animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className={`font-semibold text-base pr-8 transition-colors duration-300 ${
                    openIndex === i ? 'text-[#D7A646]' : 'text-white group-hover:text-white/80'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === i
                      ? 'border-[#D7A646] bg-[#D7A646] text-[#0A0A0A]'
                      : 'border-white/20 text-white/40 group-hover:border-white/40'
                  }`}>
                    {openIndex === i ? (
                      <Minus className="w-3 h-3" />
                    ) : (
                      <Plus className="w-3 h-3" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openIndex === i ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-white/50 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
