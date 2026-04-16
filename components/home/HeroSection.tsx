export function HeroSection() {
  return (
<header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
  <div className="absolute inset-0 z-0">
    <img
      alt="Main Lobby"
      className="w-full h-full object-cover"
      data-alt="Modern architectural interior of a luxury shopping mall with glass ceilings, sunlight streaming through, and high-end storefronts in the background"
      // src="/globo/image-1.jpg"
      // src="/globo/glob.jpg"
      src="/globo/glob2.png"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent"></div>
  </div>
  <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
    <div className="max-w-2xl">
      <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-bold tracking-widest uppercase mb-6">
        Minsk, Belarus
      </span>
      <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 text-on-surface">
        Globo — Твой центр <span className="text-primary italic">шопинга</span> и
        стиля
      </h1>
      <div className="flex flex-wrap gap-4">
        <a
          className="gradient-action text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg editorial-shadow"
          href="#"
        >
          Магазины
        </a>
        <a
          className="bg-surface-container-lowest text-on-surface px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-sm border border-outline-variant/10"
          href="#"
        >
          Карта ТЦ
        </a>
      </div>
    </div>
  </div>
  <div className="absolute bottom-12 right-8 hidden lg:flex items-center gap-4 text-primary font-bold">
    <span className="w-24 h-[2px] bg-primary"></span>
    <p className="text-sm tracking-widest uppercase">Explore the pulse</p>
  </div>
</header>
  );
}
