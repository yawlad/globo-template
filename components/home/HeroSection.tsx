import Link from "next/link";

export function HeroSection() {
  return (
    <header className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          alt="Main Lobby"
          className="h-full w-full object-cover"
          data-alt="Modern architectural interior of a luxury shopping mall with glass ceilings, sunlight streaming through, and high-end storefronts in the background"
          src="/media/home/hero-main.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-8">
        <div className="max-w-2xl">
          <span className="mb-6 inline-block rounded-full bg-secondary-fixed px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-secondary-fixed-variant">
            Minsk, Belarus
          </span>
          <h1 className="mb-8 text-6xl font-extrabold tracking-tighter text-on-surface md:text-8xl">
            Globo — твой центр <span className="italic text-primary">шопинга</span> и
            стиля
          </h1>
          <div className="flex flex-wrap gap-4">
            <Link
              className="gradient-action editorial-shadow rounded-full px-10 py-5 text-lg font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105"
              href="/shops"
            >
              Магазины
            </Link>
            <Link
              className="rounded-full border border-outline-variant/10 bg-surface-container-lowest px-10 py-5 text-lg font-bold text-on-surface shadow-sm transition-transform duration-200 hover:scale-105"
              href="/rentals"
            >
              Арендаторам
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 right-8 hidden items-center gap-4 font-bold text-primary lg:flex">
        <span className="h-[2px] w-24 bg-primary" />
        <p className="text-sm uppercase tracking-widest">Explore the pulse</p>
      </div>
    </header>
  );
}
