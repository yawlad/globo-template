"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  rentalOwnerLabels,
  rentalTypeLabels,
  type RentalSpace,
  type RentalSpaceType,
} from "@/components/rentals/rentals-data";
import type { FloorFilter } from "@/components/shops/shop-types";

const floorFilterOptions: FloorFilter[] = ["0", "1", "2", "parking"];

const floorFilterLabels: Record<FloorFilter, string> = {
  "0": "0 этаж",
  "1": "1 этаж",
  "2": "2 этаж",
  parking: "Паркинг",
};

const typeFilterLabels: Record<"all" | RentalSpaceType, string> = {
  all: "Любой тип помещения",
  office: rentalTypeLabels.office,
  retail: rentalTypeLabels.retail,
  service: rentalTypeLabels.service,
  showroom: rentalTypeLabels.showroom,
  storage: rentalTypeLabels.storage,
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price);
}

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type RangeValue = {
  max: number;
  min: number;
};

type RangeInputsProps = {
  inputSuffix: string;
  label: string;
  max: number;
  min: number;
  onChange: (next: RangeValue) => void;
  step?: number;
  value: RangeValue;
};

type RentalsCatalogProps = {
  rentalSpaces: RentalSpace[];
};

function RangeInputs({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  inputSuffix,
}: RangeInputsProps) {
  function updateMin(nextMin: number) {
    onChange({
      min: clampValue(nextMin, min, value.max - step),
      max: value.max,
    });
  }

  function updateMax(nextMax: number) {
    onChange({
      min: value.min,
      max: clampValue(nextMax, value.min + step, max),
    });
  }

  return (
    <div className="rounded-[1.4rem] border border-outline-variant/15 bg-white p-4 shadow-[0_12px_30px_rgba(91,64,61,0.06)]">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
        {label}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-on-surface-variant">
            От
          </span>
          <div className="flex items-center rounded-xl border border-outline-variant/15 bg-surface px-3">
            <input
              type="number"
              min={min}
              max={value.max - step}
              step={step}
              value={value.min}
              onChange={(event) => updateMin(Number(event.target.value))}
              className="h-11 w-full bg-transparent text-sm font-semibold text-on-surface outline-none"
            />
            <span className="pl-2 text-sm text-on-surface-variant">{inputSuffix}</span>
          </div>
        </label>

        <label className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-on-surface-variant">
            До
          </span>
          <div className="flex items-center rounded-xl border border-outline-variant/15 bg-surface px-3">
            <input
              type="number"
              min={value.min + step}
              max={max}
              step={step}
              value={value.max}
              onChange={(event) => updateMax(Number(event.target.value))}
              className="h-11 w-full bg-transparent text-sm font-semibold text-on-surface outline-none"
            />
            <span className="pl-2 text-sm text-on-surface-variant">{inputSuffix}</span>
          </div>
        </label>
      </div>
    </div>
  );
}

export function RentalsCatalog({ rentalSpaces }: RentalsCatalogProps) {
  const minMonthlyPrice = useMemo(
    () => Math.min(...rentalSpaces.map((rental) => rental.monthlyPrice)),
    [rentalSpaces],
  );
  const maxMonthlyPrice = useMemo(
    () => Math.max(...rentalSpaces.map((rental) => rental.monthlyPrice)),
    [rentalSpaces],
  );
  const minAreaSqm = useMemo(
    () => Math.min(...rentalSpaces.map((rental) => rental.areaSqm)),
    [rentalSpaces],
  );
  const maxAreaSqm = useMemo(
    () => Math.max(...rentalSpaces.map((rental) => rental.areaSqm)),
    [rentalSpaces],
  );

  const [priceRange, setPriceRange] = useState<RangeValue>({
    min: minMonthlyPrice,
    max: maxMonthlyPrice,
  });
  const [areaRange, setAreaRange] = useState<RangeValue>({
    min: minAreaSqm,
    max: maxAreaSqm,
  });
  const [floorFilter, setFloorFilter] = useState<FloorFilter[]>([]);
  const [typeFilter, setTypeFilter] = useState<"all" | RentalSpaceType>("all");

  const filteredRentals = useMemo(() => {
    return rentalSpaces.filter((rental) => {
      const matchesPrice =
        rental.monthlyPrice >= priceRange.min &&
        rental.monthlyPrice <= priceRange.max;
      const matchesArea =
        rental.areaSqm >= areaRange.min && rental.areaSqm <= areaRange.max;
      const matchesFloor =
        floorFilter.length === 0 || floorFilter.includes(rental.floor);
      const matchesType =
        typeFilter === "all" || rental.types.includes(typeFilter);

      return matchesPrice && matchesArea && matchesFloor && matchesType;
    });
  }, [areaRange, floorFilter, priceRange, rentalSpaces, typeFilter]);

  const hasActiveFilters =
    priceRange.min !== minMonthlyPrice ||
    priceRange.max !== maxMonthlyPrice ||
    areaRange.min !== minAreaSqm ||
    areaRange.max !== maxAreaSqm ||
    floorFilter.length > 0 ||
    typeFilter !== "all";

  return (
    <>
      <div className="mb-8 overflow-hidden rounded-[2rem] border border-outline-variant/15 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,1),rgba(249,244,242,0.98)_50%,rgba(245,239,236,0.98)_100%)] shadow-[0_18px_48px_rgba(91,64,61,0.1)]">
        <div className="border-b border-outline-variant/10 px-5 py-5 md:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Умный подбор
              </p>
              <h3 className="mt-2 text-2xl font-black text-on-surface md:text-3xl">
                Фильтры помещений
              </h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                Укажите нужный бюджет, площадь, этажи и тип помещения. Значения
                можно ввести вручную, без ползунков.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setPriceRange({ min: minMonthlyPrice, max: maxMonthlyPrice });
                setAreaRange({ min: minAreaSqm, max: maxAreaSqm });
                setFloorFilter([]);
                setTypeFilter("all");
              }}
              disabled={!hasActiveFilters}
              className="inline-flex h-11 items-center justify-center rounded-full border border-outline-variant/15 bg-white px-5 text-sm font-bold text-on-surface transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Сбросить фильтры
            </button>
          </div>
        </div>

        <div className="grid items-start gap-4 px-5 py-5 md:px-6 xl:grid-cols-[1fr_1fr]">
          <RangeInputs
            label="Стоимость в месяц"
            min={minMonthlyPrice}
            max={maxMonthlyPrice}
            step={1}
            value={priceRange}
            onChange={setPriceRange}
            inputSuffix="BYN"
          />

          <RangeInputs
            label="Площадь"
            min={minAreaSqm}
            max={maxAreaSqm}
            step={1}
            value={areaRange}
            onChange={setAreaRange}
            inputSuffix="м²"
          />

          <div className="rounded-[1.4rem] border border-outline-variant/15 bg-white p-4 shadow-[0_12px_30px_rgba(91,64,61,0.06)] xl:col-span-2">
            <div className="grid gap-5 lg:grid-cols-[1.35fr_0.85fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  Этаж
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {floorFilterOptions.map((floor) => {
                    const isActive = floorFilter.includes(floor);

                    return (
                      <button
                        key={floor}
                        type="button"
                        onClick={() =>
                          setFloorFilter((prev) =>
                            prev.includes(floor)
                              ? prev.filter((item) => item !== floor)
                              : [...prev, floor]
                          )
                        }
                        className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                          isActive
                            ? "bg-primary text-white shadow-md"
                            : "bg-surface text-on-surface-variant hover:bg-primary-fixed hover:text-primary"
                        }`}
                      >
                        {floorFilterLabels[floor]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  Тип помещения
                </span>
                <select
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(event.target.value as "all" | RentalSpaceType)
                  }
                  className="h-12 w-full rounded-xl border border-outline-variant/15 bg-surface px-4 text-sm text-on-surface outline-none transition-colors focus:border-primary"
                >
                  {Object.entries(typeFilterLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-on-surface-variant">
          Найдено помещений:{" "}
          <span className="font-bold text-on-surface">{filteredRentals.length}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {typeFilter !== "all" ? (
            <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wide text-on-secondary-fixed-variant">
              {typeFilterLabels[typeFilter]}
            </span>
          ) : null}
          {floorFilter.map((floor) => (
            <span
              key={floor}
              className="rounded-full bg-surface-container px-3 py-1 text-xs font-bold uppercase tracking-wide text-on-surface"
            >
              {floorFilterLabels[floor]}
            </span>
          ))}
        </div>
      </div>

      {filteredRentals.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRentals.map((rental) => (
            <Link
              key={rental.id}
              href={`/rentals/${rental.slug}`}
              className="group overflow-hidden rounded-[1.8rem] border border-outline-variant/15 bg-surface-container-lowest shadow-[0_14px_40px_rgba(91,64,61,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(91,64,61,0.15)]"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={rental.heroImage}
                  alt={rental.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                    {rental.floor === "parking" ? "Паркинг" : `${rental.floor} этаж`}
                  </span>
                  <span className="rounded-full bg-black/65 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    {rentalOwnerLabels[rental.owner]}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">
                    Арендное предложение
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-white">
                    {rental.title}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm leading-6 text-on-surface-variant">
                  {rental.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-surface px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                      Стоимость
                    </p>
                    <p className="mt-1 text-lg font-black text-on-surface">
                      {formatPrice(rental.monthlyPrice)} BYN
                    </p>
                  </div>
                  <div className="rounded-2xl bg-surface px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                      Площадь
                    </p>
                    <p className="mt-1 text-lg font-black text-on-surface">
                      {rental.areaSqm} м²
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {rental.types.map((type) => (
                    <span
                      key={type}
                      className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wide text-on-secondary-fixed-variant"
                    >
                      {rentalTypeLabels[type]}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-outline-variant/40 bg-surface-container p-10 text-center">
          <p className="text-on-surface-variant">
            По выбранным фильтрам пока нет подходящих помещений.
          </p>
        </div>
      )}
    </>
  );
}
