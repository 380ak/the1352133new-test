import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-4 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5'
            : 'py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="flex flex-col leading-none group"
          >
            <span className="font-display text-[11px] tracking-[0.35em] text-[#D7A646] uppercase">The</span>
            <div className="flex items-end gap-0">
              <span className="font-display text-[28px] text-white tracking-wider">STUDIO</span>
              <span className="font-display text-[28px] text-[#D7A646] tracking-wider ml-1">91</span>
            </div>
            <span className="font-['Manrope'] text-[8px] tracking-[0.3em] text-white/40 uppercase mt-0.5">You Imagine. We Create.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA + Menu */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden lg:block btn-primary"
            >
              <span>Start a Project</span>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#D7A646] transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col ${menuOpen ? 'open' : ''}`}>
        <div className="flex-1 flex flex-col justify-center px-8">
          <div className="space-y-1">
            {navItems.map((item, i) => (
              <div key={item.label} className="overflow-hidden">
                <button
                  onClick={() => scrollTo(item.href)}
                  className="block font-display text-5xl text-white hover:text-[#D7A646] transition-colors duration-300 py-3 w-full text-left"
                  style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-primary w-full justify-center"
            >
              <span>Start a Project</span>
            </button>
          </div>
        </div>

        <div className="px-8 pb-8 flex items-center justify-between">
          <p className="text-white/30 text-xs tracking-widest uppercase">© 2025 The Studio 91</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-[#D7A646] text-xs tracking-wider transition-colors">Instagram</a>
            <a href="#" className="text-white/40 hover:text-[#D7A646] text-xs tracking-wider transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </>
  );
}
