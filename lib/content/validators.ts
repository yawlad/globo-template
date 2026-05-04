import type { RentalOwner, RentalSpace, RentalSpaceType } from "@/components/rentals/rentals-data";
import type { FloorFilter } from "@/components/shops/shop-types";
import type { Shop } from "@/components/shops/shops-data";
import type { TechnicalSpace, TechnicalSpaceType } from "@/components/technical/technical-spaces-data";

import type {
  HomeBrand,
  HomeContent,
  HomeNewsItem,
  NavigationContent,
  NavigationLink,
} from "@/lib/content/types";

const floorValues: FloorFilter[] = ["0", "1", "2", "parking"];
const rentalOwnerValues: RentalOwner[] = ["beltiazhmash", "private"];
const rentalTypeValues: RentalSpaceType[] = ["office", "storage", "retail", "showroom", "service"];
const technicalTypeValues: TechnicalSpaceType[] = ["toilet", "staircase", "vestibule", "staff"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown) {
  return typeof value === "string";
}

function isNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isFloorFilter(value: unknown): value is FloorFilter {
  return isString(value) && floorValues.includes(value as FloorFilter);
}

function isNavigationLink(value: unknown): value is NavigationLink {
  return isRecord(value) && isString(value.href) && isString(value.label);
}

function isHomeBrand(value: unknown): value is HomeBrand {
  return (
    isRecord(value) &&
    isString(value.category) &&
    isString(value.image) &&
    isString(value.imageAlt) &&
    isString(value.name)
  );
}

function isHomeNewsItem(value: unknown): value is HomeNewsItem {
  return (
    isRecord(value) &&
    isString(value.date) &&
    isString(value.description) &&
    isString(value.image) &&
    isString(value.imageAlt) &&
    isString(value.title)
  );
}

export function isNavigationContent(value: unknown): value is NavigationContent {
  return (
    isRecord(value) &&
    Array.isArray(value.links) &&
    value.links.every(isNavigationLink) &&
    isStringArray(value.scheduleItems) &&
    isString(value.scheduleSummary)
  );
}

export function isHomeContent(value: unknown): value is HomeContent {
  if (!isRecord(value)) return false;

  const hero = value.hero;
  const highlights = value.highlights;
  const brands = value.brands;
  const news = value.news;
  const promo = value.promo;
  const visit = value.visit;

  return (
    isRecord(hero) &&
    isString(hero.badge) &&
    isString(hero.exploreLabel) &&
    isString(hero.highlight) &&
    isString(hero.imageAlt) &&
    isString(hero.imageSrc) &&
    isString(hero.primaryCtaHref) &&
    isString(hero.primaryCtaLabel) &&
    isString(hero.secondaryCtaHref) &&
    isString(hero.secondaryCtaLabel) &&
    isString(hero.title) &&
    isRecord(highlights) &&
    isRecord(highlights.metro) &&
    isString(highlights.metro.title) &&
    isString(highlights.metro.description) &&
    isRecord(highlights.shops) &&
    isString(highlights.shops.title) &&
    isString(highlights.shops.description) &&
    isRecord(highlights.parking) &&
    isString(highlights.parking.title) &&
    isString(highlights.parking.description) &&
    isRecord(highlights.food) &&
    isString(highlights.food.title) &&
    isString(highlights.food.description) &&
    isString(highlights.food.extraCountLabel) &&
    isStringArray(highlights.food.avatars) &&
    isRecord(brands) &&
    isString(brands.title) &&
    isString(brands.linkHref) &&
    isString(brands.linkLabel) &&
    Array.isArray(brands.items) &&
    brands.items.every(isHomeBrand) &&
    isRecord(news) &&
    isString(news.title) &&
    Array.isArray(news.items) &&
    news.items.every(isHomeNewsItem) &&
    isRecord(promo) &&
    isString(promo.buttonLabel) &&
    isString(promo.description) &&
    isString(promo.imageAlt) &&
    isString(promo.imageSrc) &&
    isString(promo.title) &&
    isRecord(visit) &&
    isString(visit.addressLabel) &&
    isString(visit.addressText) &&
    isString(visit.buttonLabel) &&
    isString(visit.hoursLabel) &&
    isString(visit.hoursText) &&
    isString(visit.mapAlt) &&
    isString(visit.mapImage) &&
    isString(visit.title)
  );
}

export function isShopArray(value: unknown): value is Shop[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isRecord(item) &&
        isNumber(item.id) &&
        isString(item.slug) &&
        isFloorFilter(item.floor) &&
        (item.roomId === undefined || isString(item.roomId)) &&
        isString(item.name) &&
        isString(item.category) &&
        isString(item.image) &&
        isString(item.logoImage) &&
        isString(item.phone) &&
        isString(item.workHours) &&
        isString(item.description),
    )
  );
}

export function isRentalArray(value: unknown): value is RentalSpace[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isRecord(item) &&
        isNumber(item.areaSqm) &&
        isString(item.description) &&
        isFloorFilter(item.floor) &&
        isStringArray(item.galleryImages) &&
        isString(item.heroImage) &&
        isString(item.id) &&
        isNumber(item.monthlyPrice) &&
        isString(item.owner) &&
        rentalOwnerValues.includes(item.owner as RentalOwner) &&
        isString(item.roomId) &&
        isString(item.slug) &&
        isString(item.title) &&
        Array.isArray(item.types) &&
        item.types.every(
          (type) => isString(type) && rentalTypeValues.includes(type as RentalSpaceType),
        ),
    )
  );
}

export function isTechnicalSpaceArray(value: unknown): value is TechnicalSpace[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isRecord(item) &&
        isString(item.description) &&
        isFloorFilter(item.floor) &&
        isString(item.id) &&
        isString(item.roomId) &&
        isString(item.title) &&
        isString(item.type) &&
        technicalTypeValues.includes(item.type as TechnicalSpaceType),
    )
  );
}
