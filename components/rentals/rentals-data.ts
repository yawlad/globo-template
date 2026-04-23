import type { Room } from "@/components/map/mall-map-data";
import type { FloorFilter } from "@/components/shops/shop-types";

export type RentalSpaceType =
  | "office"
  | "storage"
  | "retail"
  | "showroom"
  | "service";

export type RentalSpace = {
  id: string;
  roomId: Room["id"];
  floor: FloorFilter;
  title: string;
  monthlyPrice: number;
  areaSqm: number;
  description: string;
  types: RentalSpaceType[];
};

export const rentalTypeLabels: Record<RentalSpaceType, string> = {
  office: "Офис",
  retail: "Торговое",
  service: "Сервисное",
  showroom: "Шоурум",
  storage: "Склад",
};

export const rentalSpaces: RentalSpace[] = [
  {
    id: "rental-e-3",
    roomId: "e-3",
    floor: "0",
    title: "Помещение 0-03",
    monthlyPrice: 1450,
    areaSqm: 28,
    description:
      "Компактное помещение рядом с основным потоком посетителей. Подойдет для островка, сервисной точки или небольшого офиса продаж.",
    types: ["retail", "service"],
  },
  {
    id: "rental-e-4",
    roomId: "e-4",
    floor: "0",
    title: "Помещение 0-04",
    monthlyPrice: 2100,
    areaSqm: 41,
    description:
      "Угловое помещение со сложной, но заметной геометрией. Хорошо подойдет для торговли, шоурума или комбинированной сервисной зоны.",
    types: ["retail", "showroom", "service"],
  },
  {
    id: "rental-e-8",
    roomId: "e-8",
    floor: "0",
    title: "Помещение 0-08",
    monthlyPrice: 3100,
    areaSqm: 84,
    description:
      "Помещение правильной формы с удобной витриной вдоль прохода. Подойдет под магазин аксессуаров, офис продаж или бренд-зону.",
    types: ["retail", "office"],
  },
  {
    id: "rental-e-21",
    roomId: "e-21",
    floor: "0",
    title: "Помещение 0-21",
    monthlyPrice: 980,
    areaSqm: 18,
    description:
      "Небольшое помещение для хранения, выдачи заказов или технической поддержки арендаторов торгового центра.",
    types: ["storage", "service"],
  },
];
