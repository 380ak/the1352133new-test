import { useEffect, useRef, useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

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
  'Interior Design',
  'Exhibition Booth Design',
  '3D Visualization',
  'Brand Identity',
  'Photography',
  'Videography',
  'Graphic Design',
  'Creative Direction',
];

export default function Contact() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = `w-full bg-transparent border-b border-white/15 py-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#D7A646] transition-colors duration-300`;
  const selectClass = `w-full bg-[#1B1B1B] border-b border-white/15 py-4 text-white/70 text-sm focus:outline-none focus:border-[#D7A646] transition-colors duration-300 appearance-none cursor-pointer`;

  return (
    <section id="contact" className="py-24 lg:py-36 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="text-center mb-20">
          <span className={`section-label block mb-4 animate-fade-up ${visible ? 'is-visible' : ''}`}>
            Let's Collaborate
          </span>
          <h2 className={`font-display text-[clamp(56px,9vw,140px)] leading-none text-white animate-fade-up delay-100 ${visible ? 'is-visible' : ''}`}>
            LET'S<br />
            <span className="text-[#D7A646]">TALK</span>
          </h2>
          <p className={`text-white/50 max-w-lg mx-auto mt-6 leading-relaxed animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
            Every great project starts with a conversation. Tell us about your vision and let's build something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Form */}
          <div className={`lg:col-span-3 animate-fade-up delay-200 ${visible ? 'is-visible' : ''}`}>
            {submitted ? (
              <div className="h-full flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D7A646] flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#0A0A0A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-4xl text-white mb-4">MESSAGE SENT</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                    Thank you for reaching out. We'll review your project and get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-white/30 text-[10px] tracking-[0.2em] uppercase block mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-white/30 text-[10px] tracking-[0.2em] uppercase block mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/30 text-[10px] tracking-[0.2em] uppercase block mb-2">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-white/30 text-[10px] tracking-[0.2em] uppercase block mb-2">Service Required *</label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className={selectClass}
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-white/30 text-[10px] tracking-[0.2em] uppercase block mb-2">Approximate Budget</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className={selectClass}
                    >
                      <option value="">Select budget range</option>
                      <option value="under-20k">Under AED 20,000</option>
                      <option value="20-50k">AED 20,000 – 50,000</option>
                      <option value="50-150k">AED 50,000 – 150,000</option>
                      <option value="150-500k">AED 150,000 – 500,000</option>
                      <option value="500k+">AED 500,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-white/30 text-[10px] tracking-[0.2em] uppercase block mb-2">Tell Us About Your Project *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project vision, timeline, and any specific requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button type="submit" className="btn-primary flex items-center gap-3">
                  <span>Send Your Message</span>
                  <Send className="w-4 h-4 relative z-10" />
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className={`lg:col-span-2 animate-fade-up delay-300 ${visible ? 'is-visible' : ''}`}>
            {/* Gold accent box */}
            <div className="bg-[#D7A646] p-8 mb-8">
              <p className="font-display text-4xl text-[#0A0A0A] leading-none mb-4">YOU IMAGINE.<br />WE CREATE.</p>
              <p className="text-[#0A0A0A]/60 text-sm leading-relaxed">
                Every project is approached with creativity, precision and passion. Let's transform your vision into reality.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#D7A646]" />
                </div>
                <div>
                  <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1">Location</p>
                  <p className="text-white text-sm">Dubai, United Arab Emirates</p>
                  <p className="text-white/40 text-xs mt-0.5">Serving UAE, KSA, Qatar & GCC</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#D7A646]" />
                </div>
                <div>
                  <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1">WhatsApp / Phone</p>
                  <a href="tel:+971000000000" className="text-white text-sm hover:text-[#D7A646] transition-colors">+971 00 000 0000</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#D7A646]" />
                </div>
                <div>
                  <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1">Email</p>
                  <a href="mailto:hello@the-studio91.com" className="text-white text-sm hover:text-[#D7A646] transition-colors">hello@the-studio91.com</a>
                </div>
              </div>

              {/* Social */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-4">Follow Our Work</p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#D7A646] hover:text-[#D7A646] text-white/40 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#D7A646] hover:text-[#D7A646] text-white/40 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>

              {/* Working hours */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-3">Working Hours</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/50 text-xs">Mon – Fri</span>
                    <span className="text-white text-xs">9:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50 text-xs">Saturday</span>
                    <span className="text-white text-xs">10:00 – 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50 text-xs">Sunday</span>
                    <span className="text-white/30 text-xs">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
