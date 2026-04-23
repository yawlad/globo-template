"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { floorFilters, shops } from "@/components/shops/shops-data";
import type { FloorFilter } from "@/components/shops/shop-types";

export function ShopsCatalog() {
  const [query, setQuery] = useState("");
  const [activeFloor, setActiveFloor] = useState<FloorFilter | null>(null);

  const filteredShops = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return shops.filter((shop) => {
      const floorMatch = !activeFloor || shop.floor === activeFloor;
      const searchMatch =
        !normalized ||
        shop.name.toLowerCase().includes(normalized) ||
        shop.category.toLowerCase().includes(normalized);

      return floorMatch && searchMatch;
    });
  }, [query, activeFloor]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="mb-10">
        <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-secondary-fixed-variant text-xs font-bold tracking-widest uppercase">
          Globo Directory
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-on-surface mt-5">
          Магазины и сервисы
        </h1>
        <p className="text-on-surface-variant mt-4 max-w-2xl">
          Найдите нужный магазин по названию, категории или этажу.
        </p>
      </div>

      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-4 md:p-5 shadow-sm mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
          <label className="flex items-center gap-3 rounded-xl border border-outline-variant/25 px-4 h-12 bg-surface-container-low">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск магазина или категории..."
              className="w-full bg-transparent outline-none text-sm text-on-surface placeholder:text-on-surface-variant/80"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {floorFilters.map((filter) => {
              const isActive = activeFloor === filter.key;

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFloor((prev) => (prev === filter.key ? null : filter.key))}
                  className={`px-4 h-12 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "bg-surface text-on-surface border border-outline-variant/30 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-on-surface-variant">
          Найдено: <span className="font-bold text-on-surface">{filteredShops.length}</span>
        </p>
      </div>

      {filteredShops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <Link
              key={shop.id}
              href={`/shops/${shop.slug}`}
              className="group rounded-2xl overflow-hidden border border-outline-variant/20 bg-surface-container-lowest hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-primary">
                  {shop.floor === "parking" ? "Паркинг" : `${shop.floor} этаж`}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-on-surface">{shop.name}</h3>
                <p className="text-on-surface-variant mt-2">{shop.category}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container p-10 text-center">
          <p className="text-on-surface-variant">По вашему запросу ничего не найдено.</p>
        </div>
      )}
    </section>
  );
}

