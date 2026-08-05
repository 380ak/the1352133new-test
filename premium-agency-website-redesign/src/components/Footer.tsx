export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-['Manrope'] text-[10px] tracking-[0.35em] text-[#D7A646] uppercase block">The</span>
              <div className="flex items-end gap-0">
                <span className="font-display text-[32px] text-white tracking-wider">STUDIO</span>
                <span className="font-display text-[32px] text-[#D7A646] tracking-wider ml-1">91</span>
              </div>
              <span className="font-['Manrope'] text-[9px] tracking-[0.3em] text-white/30 uppercase">You Imagine. We Create.</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              A premium multidisciplinary creative studio transforming ideas into immersive visual experiences.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-[#D7A646] hover:text-[#D7A646] text-white/30 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-[#D7A646] hover:text-[#D7A646] text-white/30 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-[#D7A646] hover:text-[#D7A646] text-white/30 transition-all duration-300"
                aria-label="Behance"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h6.5a3.5 3.5 0 010 7H2z"/><path d="M2 13h7a3.5 3.5 0 010 7H2z"/><path d="M14.5 7h7"/><path d="M21 12.5c0-3-2-5.5-6.5-5.5S8 9.5 8 12.5s2 5.5 6.5 5.5c3.5 0 5.5-1.5 6-3.5"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Featured Work', href: '#work' },
                { label: 'Our Services', href: '#services' },
                { label: 'About Us', href: '#about' },
                { label: 'Our Process', href: '#process' },
                { label: 'Insights', href: '#insights' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-white/40 text-sm hover:text-[#D7A646] transition-colors duration-300 text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                'Interior Design',
                'Exhibition Booth Design',
                '3D Visualization',
                'Architectural Rendering',
                'Brand Identity',
                'Photography',
                'Videography',
                'Social Media Content',
              ].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="text-white/40 text-sm hover:text-[#D7A646] transition-colors duration-300 text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-6">Get In Touch</h4>
            <div className="space-y-3 mb-8">
              <a href="mailto:hello@the-studio91.com" className="text-white/40 text-sm hover:text-[#D7A646] transition-colors block">
                hello@the-studio91.com
              </a>
              <a href="tel:+971000000000" className="text-white/40 text-sm hover:text-[#D7A646] transition-colors block">
                +971 00 000 0000
              </a>
              <p className="text-white/30 text-sm">Dubai, UAE</p>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-4">Newsletter</h4>
              <p className="text-white/30 text-xs leading-relaxed mb-4">
                Design insights, project reveals and studio news.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent border border-white/10 border-r-0 px-4 py-3 text-white text-xs placeholder-white/20 focus:outline-none focus:border-[#D7A646] transition-colors min-w-0"
                />
                <button className="bg-[#D7A646] px-4 py-3 flex items-center justify-center hover:bg-[#B88746] transition-colors flex-shrink-0">
                  <svg className="w-4 h-4 text-[#0A0A0A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-wider">
            © 2025 The Studio 91. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-white/20 text-xs hover:text-white/50 transition-colors tracking-wider">Privacy Policy</button>
            <button className="text-white/20 text-xs hover:text-white/50 transition-colors tracking-wider">Terms of Service</button>
          </div>
          <p className="text-white/15 text-xs tracking-wider">
            Designed with precision — Made with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
