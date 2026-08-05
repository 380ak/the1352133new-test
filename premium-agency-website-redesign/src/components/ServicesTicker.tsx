const items = [
  'Interior Design',
  '3D Visualization',
  'Exhibition Booth Design',
  'Brand Identity',
  'Photography',
  'Videography',
  'Architectural Rendering',
  'Creative Direction',
  'Graphic Design',
  'Social Media Content',
];

export default function ServicesTicker() {
  return (
    <div className="py-5 bg-[#D7A646] overflow-hidden">
      <div className="flex items-center" style={{ width: 'max-content', animation: 'marquee 30s linear infinite' }}>
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6 flex-shrink-0">
            <span className="text-[#0A0A0A] font-semibold text-sm tracking-[0.15em] uppercase whitespace-nowrap">
              {item}
            </span>
            <span className="text-[#0A0A0A]/40 text-lg">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
