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

const steps = [
  {
    number: '01',
    title: 'Discovery & Brief',
    duration: 'Week 1',
    description: 'We begin every project with a deep discovery session — understanding your vision, goals, constraints, audience and aspirations. This forms the creative brief that guides everything.',
    deliverable: 'Project Brief + Mood Board',
  },
  {
    number: '02',
    title: 'Concept Development',
    duration: 'Week 1–2',
    description: 'Our creative team translates your brief into conceptual directions — spatial layouts, material palettes, color stories and visual languages — presented for your selection.',
    deliverable: 'Concept Presentation',
  },
  {
    number: '03',
    title: 'Design Development',
    duration: 'Week 2–4',
    description: 'The approved concept is refined into detailed design — technical drawings, 3D models, material specifications, lighting plans and complete documentation.',
    deliverable: 'Full Design Package',
  },
  {
    number: '04',
    title: 'Production & Execution',
    duration: 'Week 4–8',
    description: 'We oversee every aspect of production and execution — coordinating contractors, suppliers and craftspeople to ensure the design intent is realized with precision.',
    deliverable: 'Completed Project',
  },
  {
    number: '05',
    title: 'Photography & Handover',
    duration: 'Final Week',
    description: 'Every completed project is professionally photographed and documented. We conduct a final walkthrough and deliver a comprehensive handover package for your records.',
    deliverable: 'Photography + Documentation',
  },
];

export default function Process() {
  const { ref, visible } = useReveal();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 lg:py-36 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="mb-20">
          <span className={`section-label block mb-4 animate-fade-up ${visible ? 'is-visible' : ''}`}>
            How We Work
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <h2 className={`font-display text-[clamp(48px,7vw,100px)] leading-none text-white flex-1 animate-fade-up delay-100 ${visible ? 'is-visible' : ''}`}>
              OUR<br />
              <span className="text-[#D7A646]">PROCESS</span>
            </h2>
            <p className={`text-white/50 max-w-md leading-relaxed animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
              A proven creative process refined over 15 years — ensuring every project is delivered on time, on budget, and beyond expectation.
            </p>
          </div>
        </div>

        {/* Process steps — desktop horizontal timeline */}
        <div className={`hidden lg:block animate-fade-up delay-300 ${visible ? 'is-visible' : ''}`}>
          {/* Step headers */}
          <div className="grid grid-cols-5 gap-4 mb-8 border-t border-white/5 pt-8">
            {steps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(i)}
                className={`text-left transition-all duration-300 group pb-4 border-b-2 ${
                  activeStep === i ? 'border-[#D7A646]' : 'border-transparent hover:border-white/20'
                }`}
              >
                <span className={`font-display text-4xl transition-colors duration-300 ${
                  activeStep === i ? 'text-[#D7A646]' : 'text-white/20 group-hover:text-white/40'
                }`}>
                  {step.number}
                </span>
                <p className={`text-sm font-semibold mt-2 transition-colors duration-300 ${
                  activeStep === i ? 'text-white' : 'text-white/40 group-hover:text-white/60'
                }`}>
                  {step.title}
                </p>
                <p className="text-[#D7A646] text-xs tracking-wider mt-1">{step.duration}</p>
              </button>
            ))}
          </div>

          {/* Active step content */}
          <div className="bg-[#1B1B1B] border border-white/5 p-12 grid grid-cols-2 gap-12 items-center min-h-[250px]">
            <div>
              <h3 className="font-display text-5xl text-white mb-6">{steps[activeStep].title}</h3>
              <p className="text-white/60 leading-relaxed">{steps[activeStep].description}</p>
            </div>
            <div className="border-l border-white/5 pl-12">
              <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-3">Deliverable</p>
              <p className="text-[#D7A646] font-semibold text-lg">{steps[activeStep].deliverable}</p>
              <div className="mt-8 flex gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-[3px] transition-all duration-300 ${
                      i === activeStep ? 'w-8 bg-[#D7A646]' : 'w-3 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile vertical steps */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`process-step pb-10 animate-fade-up ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Step number circle */}
              <div className="absolute left-0 w-16 h-16 border border-[#D7A646]/30 flex items-center justify-center bg-[#0A0A0A]">
                <span className="font-display text-xl text-[#D7A646]">{step.number}</span>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                  <span className="text-[#D7A646] text-xs tracking-wider">{step.duration}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-3">{step.description}</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#D7A646] rounded-full" />
                  <span className="text-[#D7A646] text-xs tracking-wider">{step.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
