"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { NavigationContent } from "@/lib/content/types";

type TopNavigationProps = {
  content: NavigationContent;
};

export function TopNavigation({ content }: TopNavigationProps) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const scrollY = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white/70 shadow-[0px_10px_30px_rgba(183,19,26,0.06)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/" className="text-2xl font-black tracking-tighter text-red-600">
            GLOBO
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {content.links.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                className="font-medium text-zinc-800 transition-colors duration-300 hover:text-red-500"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <div className="relative p-2">
              <button
                type="button"
                onClick={() => setIsScheduleOpen((prev) => !prev)}
                className="flex min-h-11 items-center gap-1 rounded-lg px-2 font-medium"
                aria-expanded={isScheduleOpen}
                aria-controls="schedule-menu"
              >
                <span className="material-symbols-outlined">schedule</span>
                {content.scheduleSummary}
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
                className={`absolute right-0 mt-3 w-72 origin-top rounded-xl border border-outline-variant/20 bg-white p-4 shadow-xl transition-all duration-300 ${
                  isScheduleOpen
                    ? "pointer-events-auto max-h-64 translate-y-0 opacity-100"
                    : "pointer-events-none max-h-0 -translate-y-2 overflow-hidden border-transparent p-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 text-sm">
                  {content.scheduleItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/30 bg-white text-on-surface shadow-sm md:hidden"
            aria-label="Открыть меню"
          >
            <span className="material-symbols-outlined text-[28px]">menu</span>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Закрыть меню"
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-full flex-col overflow-y-auto bg-surface-container-lowest px-4 pb-5 pt-4 shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter text-red-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              GLOBO
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-on-surface-variant"
              aria-label="Закрыть меню"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-2.5">
            {content.links.map((link) => (
              <Link
                key={`${link.href}-${link.label}-mobile`}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl border border-outline-variant/20 bg-white px-4 py-3 text-base font-bold text-on-surface shadow-sm transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-surface px-4 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                  Режим работы
                </p>
                <p className="mt-0.5 text-sm font-semibold text-on-surface">
                  {content.scheduleSummary}
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-on-surface">
              {content.scheduleItems.map((item) => (
                <li
                  key={`${item}-mobile`}
                  className="rounded-xl border border-outline-variant/15 bg-white px-3.5 py-2.5"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
