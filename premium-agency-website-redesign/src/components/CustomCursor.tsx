import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.innerWidth < 1024) return;

    setVisible(true);

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleHover = () => setHovering(true);
    const handleUnhover = () => setHovering(false);

    document.addEventListener('mousemove', handleMove, { passive: true });

    const interactables = document.querySelectorAll('a, button, .project-card, .service-card, .testimonial-card');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      document.removeEventListener('mousemove', handleMove);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    let rafId: number;
    const animate = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [pos, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Dot cursor */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ${
            hovering ? 'w-2 h-2' : 'w-1.5 h-1.5'
          }`}
        />
      </div>

      {/* Trail ring */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: trail.x,
          top: trail.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border border-white/30 transition-all duration-300 ${
            hovering ? 'w-12 h-12 border-[#D7A646] border-opacity-80' : 'w-8 h-8'
          }`}
        />
      </div>
    </>
  );
}
