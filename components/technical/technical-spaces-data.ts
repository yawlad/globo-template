import type { Room } from "@/components/map/mall-map-data";
import type { FloorFilter } from "@/components/shops/shop-types";

export type TechnicalSpaceType =
  | "toilet"
  | "staircase"
  | "vestibule"
  | "staff"

export type TechnicalSpaceMeta = {
  color: string;
  icon: string | null;
  label: string;
};

export type TechnicalSpace = {
  description: string;
  floor: FloorFilter;
  id: string;
  roomId: Room["id"];
  title: string;
  type: TechnicalSpaceType;
};

export const technicalSpaceTypeMeta: Record<
  TechnicalSpaceType,
  TechnicalSpaceMeta
> = {
  staircase: {
    color: "#8b5cf6",
    icon: "stairs_2",
    label: "Лестница",
  },
  staff: {
    color: "#ef4444",
    icon: "badge",
    label: "Зона персонала",
  },
  toilet: {
    color: "#14b8a6",
    icon: "wc",
    label: "Туалет",
  },
  vestibule: {
    color: "#64748b",
    icon: null,
    label: "Тамбур",
  }
};

export const technicalSpaces: TechnicalSpace[] = [
  // {
  //   id: "tech-e-23",
  //   roomId: "e-23",
  //   floor: "0",
  //   title: "Женский туалет",
  //   type: "toilet",
  //   description:
  //     "Женский туалет для посетителей торгового центра с современным дизайном и удобствами.",
  // },
  // {
  //   id: "tech-e-24",
  //   roomId: "e-24",
  //   floor: "0",
  //   title: "Мужской туалет",
  //   type: "toilet",
  //   description:
  //     "Мужской туалет для посетителей торгового центра с современным дизайном и удобствами.",
  // },
  // {
  //   id: "tech-e-25",
  //   roomId: "e-25",
  //   floor: "0",
  //   title: "Моповая 0-25",
  //   type: "staff",
  //   description:
  //     "Техническое помещение для уборочного инвентаря и средств, обеспечивающее чистоту и порядок в торговом центре.",
  // },
  // {
  //   id: "tech-e-6",
  //   roomId: "e-6",
  //   floor: "0",
  //   title: "Тамбур 0-06 фывыыфв",
  //   type: "vestibule",
  //   description:
  //     "Промежуточная буферная зона между внешним и внутренним контуром торгового центра.",
  // },
  // {
  //   id: "tech-e-9",
  //   roomId: "e-9",
  //   floor: "0",
  //   title: "Лестничный узел 0-09",
  //   type: "staircase",
  //   description:
  //     "Вертикальная коммуникация между этажами и служебными маршрутами здания.",
  // },
  // {
  //   id: "tech-e-10",
  //   roomId: "e-10",
  //   floor: "0",
  //   title: "Зона персонала 0-10",
  //   type: "staff",
  //   description:
  //     "Помещение для сотрудников и технического обслуживания торгового центра.",
  // },
];
