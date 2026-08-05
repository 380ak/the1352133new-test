const clients = [
  'Emaar Properties',
  'DAMAC',
  'Meraas',
  'Aldar Properties',
  'Dubai Expo Group',
  'Majid Al Futtaim',
  'Jumeirah Group',
  'GITEX Global',
  'Abu Dhabi Mall',
  'Al Habtoor Group',
  'Rotana Hotels',
  'Dubai Tourism',
];

export default function Marquee() {
  return (
    <section className="py-16 border-y border-white/5 bg-[#0A0A0A] overflow-hidden">
      <div className="relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="flex items-center gap-8 px-8"
            >
              <span className="text-white/25 text-sm tracking-[0.2em] uppercase whitespace-nowrap font-light hover:text-[#D7A646] transition-colors duration-300 cursor-default">
                {client}
              </span>
              <div className="w-1.5 h-1.5 bg-[#D7A646]/30 rounded-full flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
