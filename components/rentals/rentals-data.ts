import type { Room } from "@/components/map/mall-map-data";
import type { FloorFilter } from "@/components/shops/shop-types";

export type RentalSpaceType =
  | "office"
  | "storage"
  | "retail"
  | "showroom"
  | "service";

export type RentalOwner = "beltiazhmash" | "private";

export type RentalSpace = {
  areaSqm: number;
  description: string;
  floor: FloorFilter;
  galleryImages: string[];
  heroImage: string;
  id: string;
  monthlyPrice: number;
  owner: RentalOwner;
  roomId: Room["id"];
  slug: string;
  title: string;
  types: RentalSpaceType[];
};

export const rentalTypeLabels: Record<RentalSpaceType, string> = {
  office: "Офис",
  retail: "Торговое",
  service: "Сервисное",
  showroom: "Шоурум",
  storage: "Склад",
};

export const rentalOwnerLabels: Record<RentalOwner, string> = {
  beltiazhmash: "БелТяжМаш",
  private: "Частное лицо",
};

export const rentalSpaces: RentalSpace[] = [
  {
    id: "rental-e-3",
    slug: "pomeshchenie-0-03",
    roomId: "e-3",
    floor: "0",
    title: "Помещение 0-03",
    monthlyPrice: 1450,
    areaSqm: 28,
    owner: "beltiazhmash",
    heroImage: "/media/rentals/room-003-hero.jpg",
    galleryImages: [
      "/media/rentals/room-003-gallery-1.jpg",
      "/media/rentals/room-003-gallery-2.jpg",
      "/media/rentals/room-003-gallery-3.jpg",
    ],
    description:
      "Компактное помещение рядом с основным потоком посетителей. Подойдет для сервисной точки, небольшого шоурума, офиса продаж или пункта выдачи.",
    types: ["retail", "service"],
  },
  {
    id: "rental-e-4",
    slug: "pomeshchenie-0-04",
    roomId: "e-4",
    floor: "0",
    title: "Помещение 0-04",
    monthlyPrice: 2100,
    areaSqm: 41,
    owner: "private",
    heroImage: "/media/rentals/room-004-hero.jpg",
    galleryImages: [
      "/media/rentals/room-004-gallery-1.jpg",
      "/media/rentals/room-004-gallery-2.jpg",
      "/media/rentals/room-004-gallery-3.jpg",
    ],
    description:
      "Угловое помещение со сложной, но выразительной геометрией. Подходит под торговлю, showroom, сервисную стойку или комбинированный формат.",
    types: ["retail", "showroom", "service"],
  },
  {
    id: "rental-e-8",
    slug: "pomeshchenie-0-08",
    roomId: "e-8",
    floor: "0",
    title: "Помещение 0-08",
    monthlyPrice: 3100,
    areaSqm: 84,
    owner: "beltiazhmash",
    heroImage: "/media/rentals/room-008-hero.jpg",
    galleryImages: [
      "/media/rentals/room-008-gallery-1.jpg",
      "/media/rentals/room-008-gallery-2.jpg",
      "/media/rentals/room-008-gallery-3.jpg",
    ],
    description:
      "Помещение правильной формы с удобной витриной вдоль основного прохода. Подойдет под бренд-зону, офис продаж, магазин аксессуаров или флагманский сервис.",
    types: ["retail", "office"],
  },
  {
    id: "rental-e-21",
    slug: "pomeshchenie-0-21",
    roomId: "e-21",
    floor: "0",
    title: "Помещение 0-21",
    monthlyPrice: 980,
    areaSqm: 18,
    owner: "private",
    heroImage: "/media/rentals/room-021-hero.jpg",
    galleryImages: [
      "/media/rentals/room-021-gallery-1.jpg",
      "/media/rentals/room-021-gallery-2.png",
      "/media/rentals/room-021-gallery-3.jpg",
    ],
    description:
      "Небольшое помещение под склад, сервисную поддержку арендаторов, выдачу заказов или компактный офис сопровождения.",
    types: ["storage", "service"],
  },
];

export function getRentalBySlug(slug: string) {
  return rentalSpaces.find((rental) => rental.slug === slug);
}
