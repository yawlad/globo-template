import Link from "next/link";

import type { HomeContent } from "@/lib/content/types";

type MainContentSectionsProps = {
  content: HomeContent;
};

export function MainContentSections({ content }: MainContentSectionsProps) {
  const visitTitleLines = content.visit.title.split("\n");

  return (
    <>
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="relative flex items-end justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-8 md:col-span-2">
              <div>
                <span className="material-symbols-outlined mb-4 text-5xl text-primary" data-icon="directions_subway">
                  directions_subway
                </span>
                <h3 className="mb-2 text-2xl font-bold">{content.highlights.metro.title}</h3>
                <p className="text-on-surface-variant">{content.highlights.metro.description}</p>
              </div>
              <div className="absolute right-0 top-0 p-8 opacity-10 transition-transform duration-500 group-hover:scale-110">
                <span className="material-symbols-outlined text-9xl" data-icon="map">
                  map
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-surface-container-high p-8">
              <span className="material-symbols-outlined mb-4 text-4xl text-primary" data-icon="shopping_bag">
                shopping_bag
              </span>
              <h3 className="mb-2 text-2xl font-bold">{content.highlights.shops.title}</h3>
              <p className="text-sm text-on-surface-variant">{content.highlights.shops.description}</p>
            </div>

            <div className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8">
              <span className="material-symbols-outlined mb-4 text-4xl text-primary" data-icon="local_parking">
                local_parking
              </span>
              <h3 className="mb-2 text-2xl font-bold">{content.highlights.parking.title}</h3>
              <p className="text-sm text-on-surface-variant">{content.highlights.parking.description}</p>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-surface-container p-8 md:col-span-4">
              <div className="max-w-md">
                <h3 className="mb-2 text-3xl font-bold">{content.highlights.food.title}</h3>
                <p className="text-on-surface-variant">{content.highlights.food.description}</p>
              </div>
              <div className="flex -space-x-4">
                {content.highlights.food.avatars.slice(0, 3).map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    alt={`Food avatar ${index + 1}`}
                    className="h-16 w-16 rounded-full border-4 border-surface object-cover shadow-md"
                    data-alt={`Food avatar ${index + 1}`}
                    src={image}
                  />
                ))}
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-surface bg-primary-container font-bold text-white shadow-md">
                  {content.highlights.food.extraCountLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">{content.brands.title}</h2>
              <div className="h-1.5 w-20 rounded-full bg-primary" />
            </div>
            <Link className="mb-2 font-bold text-primary hover:underline" href={content.brands.linkHref}>
              {content.brands.linkLabel}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {content.brands.items.map((brand) => (
              <div key={brand.name} className="group cursor-pointer">
                <div className="mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-surface-container-low">
                  <img
                    alt={brand.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    data-alt={brand.imageAlt}
                    src={brand.image}
                  />
                </div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  {brand.category}
                </p>
                <h4 className="text-xl font-bold">{brand.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-8">
          <div className="gradient-action relative flex flex-col items-center gap-12 overflow-hidden rounded-[2rem] p-12 text-white md:flex-row md:p-20">
            <div className="relative z-10 flex-1 text-center md:text-left">
              <h2 className="mb-6 text-5xl font-black leading-none md:text-7xl">{content.promo.title}</h2>
              <p className="mb-8 max-w-lg text-lg opacity-90">{content.promo.description}</p>
              <button className="rounded-full bg-white px-12 py-5 text-lg font-bold text-primary shadow-xl transition-colors hover:bg-surface-container-low">
                {content.promo.buttonLabel}
              </button>
            </div>
            <div className="relative z-10 hidden flex-1 lg:block">
              <div className="scale-110 rotate-6 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <img
                  alt="Woman with shopping bags"
                  className="rounded-2xl"
                  data-alt={content.promo.imageAlt}
                  src={content.promo.imageSrc}
                />
              </div>
            </div>

            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-12 flex items-center gap-4">
            <h2 className="text-3xl font-black">{content.news.title}</h2>
            <div className="h-[1px] flex-grow bg-outline-variant/30" />
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {content.news.items.map((item) => (
              <article key={`${item.title}-${item.date}`} className="group">
                <div className="mb-6 aspect-video overflow-hidden rounded-xl">
                  <img
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    data-alt={item.imageAlt}
                    src={item.image}
                  />
                </div>
                <time className="mb-2 block text-sm font-bold text-primary">{item.date}</time>
                <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">{item.title}</h3>
                <p className="line-clamp-2 text-on-surface-variant">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-surface-container-low py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-8 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-2xl" />
            <h2 className="mb-8 text-5xl font-black leading-tight md:text-6xl">
              {visitTitleLines.map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < visitTitleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <div className="mb-10 space-y-6">
              <div className="flex items-start gap-4">
                <span
                  className="material-symbols-outlined editorial-shadow rounded-xl bg-white p-3 text-primary"
                  data-icon="location_on"
                >
                  location_on
                </span>
                <div>
                  <p className="text-lg font-bold">{content.visit.addressLabel}</p>
                  <p className="text-on-surface-variant">{content.visit.addressText}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span
                  className="material-symbols-outlined editorial-shadow rounded-xl bg-white p-3 text-primary"
                  data-icon="schedule"
                >
                  schedule
                </span>
                <div>
                  <p className="text-lg font-bold">{content.visit.hoursLabel}</p>
                  <p className="text-on-surface-variant">{content.visit.hoursText}</p>
                </div>
              </div>
            </div>
            <button className="gradient-action flex items-center gap-3 rounded-full px-12 py-5 text-lg font-bold text-white shadow-xl transition-transform hover:scale-105">
              <span className="material-symbols-outlined" data-icon="near_me">
                near_me
              </span>
              {content.visit.buttonLabel}
            </button>
          </div>
          <div className="relative h-[500px] overflow-hidden rounded-3xl border-8 border-white shadow-2xl grayscale transition-all duration-700 hover:grayscale-0">
            <img
              alt="Map"
              className="h-full w-full object-cover"
              data-alt={content.visit.mapAlt}
              data-location="Minsk"
              src={content.visit.mapImage}
            />
            <div className="pointer-events-none absolute inset-0 bg-primary/10" />
          </div>
        </div>
      </section>
    </>
  );
}
