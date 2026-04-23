"use client";

import Link from "next/link";
import { useState } from "react";

export function TopNavigation() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 nodark:bg-zinc-950/70 backdrop-blur-xl shadow-[0px_10px_30px_rgba(183,19,26,0.06)]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 lg:px-8 h-20">
        <Link href="/" className="text-2xl font-black tracking-tighter text-red-600 nodark:text-red-500">
          GLOBO
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link
            className="text-zinc-800 nodark:text-zinc-200 font-medium hover:text-red-500 transition-colors duration-300"
            href="/shops"
          >
            Магазины
          </Link>
          <Link
            className="text-zinc-800 nodark:text-zinc-200 font-medium hover:text-red-500 transition-colors duration-300"
            href="/map"
          >
            Схема центра
          </Link>
          <a
            className="text-zinc-800 nodark:text-zinc-200 font-medium hover:text-red-500 transition-colors duration-300"
            href="#"
          >
            Новости
          </a>
          <a
            className="text-zinc-800 nodark:text-zinc-200 font-medium hover:text-red-500 transition-colors duration-300"
            href="#"
          >
            Контакты
          </a>
        </div>

        <div className="relative p-2">
          <button
            type="button"
            onClick={() => setIsScheduleOpen((prev) => !prev)}
            className="flex items-center gap-1 font-medium cursor-pointer min-h-11 px-2 rounded-lg touch-manipulation select-none"
            aria-expanded={isScheduleOpen}
            aria-controls="schedule-menu"
          >
            <span className="material-symbols-outlined">schedule</span>
            Ежедневно: 10:00 - 22:00
            <span
              className={`material-symbols-outlined transition-transform duration-300 ${
                isScheduleOpen ? "-rotate-90" : "rotate-90"
              }`}
            >
              chevron_right
            </span>
          </button>

          <div
            id="schedule-menu"
            className={`absolute right-0 mt-3 w-72 rounded-xl border border-outline-variant/20 bg-white p-4 shadow-xl transition-all duration-300 origin-top ${
              isScheduleOpen
                ? "max-h-64 opacity-100 translate-y-0 pointer-events-auto"
                : "max-h-0 opacity-0 -translate-y-2 pointer-events-none overflow-hidden p-0 border-transparent"
            }`}
          >
            <ul className="space-y-2 text-sm">
              <li>цокольный этаж 9:00 - 21:00</li>
              <li>1 этаж 9:00 - 23:00</li>
              <li>2 этаж 9:00 - 21:00</li>
              <li>Паркинг круглосуточно</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
