import type { Room } from "@/components/map/mall-map-data";
import type { FloorFilter } from "@/components/shops/shop-types";

export type Shop = {
  id: number;
  slug: string;
  floor: FloorFilter;
  roomId?: Room["id"];
  name: string;
  category: string;
  image: string;
  logoImage: string;
  phone: string;
  workHours: string;
  description: string;
};

export const floorFilters: Array<{ key: FloorFilter; label: string }> = [
  { key: "0", label: "0 этаж" },
  { key: "1", label: "1 этаж" },
  { key: "2", label: "2 этаж" },
  { key: "parking", label: "Паркинг" },
];

export const shops: Shop[] = [
  {
    id: 1,
    slug: "fresh-market",
    floor: "0",
    roomId: "e-1",
    name: "Fresh Market",
    category: "Супермаркет",
    image: "/globo/image-3.jpg",
    logoImage: "/globo/image-2.jpg",
    phone: "+375 (29) 101-10-10",
    workHours: "09:00 — 21:00 ежедневно",
    description:
      "Fresh Market расположен на цокольном этаже и предлагает свежие продукты, кулинарию и товары для дома.",
  },
  {
    id: 2,
    slug: "kids-planet",
    floor: "0",
    roomId: "e-2",
    name: "Kids Planet",
    category: "Детские товары",
    image: "/globo/image-4.jpg",
    logoImage: "/globo/image-4.jpg",
    phone: "+375 (29) 202-20-20",
    workHours: "09:00 — 21:00 ежедневно",
    description:
      "Kids Planet — магазин детской одежды, игрушек и школьных аксессуаров для детей всех возрастов.",
  },
  {
    id: 3,
    slug: "tech-point",
    floor: "0",
    roomId: "e-7",
    name: "Tech Point",
    category: "Электроника",
    image: "/globo/image-7.jpg",
    logoImage: "/globo/image-7.jpg",
    phone: "+375 (29) 303-30-30",
    workHours: "10:00 — 21:00 ежедневно",
    description:
      "Tech Point предлагает смартфоны, аксессуары и гаджеты с профессиональной консультацией и сервисом.",
  },
  {
    id: 4,
    slug: "premium-fashion",
    floor: "1",
    name: "Premium Fashion",
    category: "Одежда и стиль",
    image: "/globo/image-5.jpg",
    logoImage: "/globo/image-5.jpg",
    phone: "+375 (29) 404-40-40",
    workHours: "10:00 — 23:00 ежедневно",
    description:
      "Premium Fashion предлагает коллекции повседневной и вечерней одежды от локальных и международных брендов.",
  },
  {
    id: 5,
    slug: "glow-aesthetics",
    floor: "1",
    name: "Glow Aesthetics",
    category: "Красота и уход",
    image: "/globo/image-6.jpg",
    logoImage: "/globo/image-6.jpg",
    phone: "+375 (29) 505-50-50",
    workHours: "10:00 — 23:00 ежедневно",
    description:
      "Glow Aesthetics — косметика, уходовые средства и консультации по подбору beauty-продуктов.",
  },
  {
    id: 6,
    slug: "chronos-luxury",
    floor: "1",
    name: "Chronos Luxury",
    category: "Аксессуары",
    image: "/globo/image-8.jpg",
    logoImage: "/globo/image-8.jpg",
    phone: "+375 (29) 606-60-60",
    workHours: "10:00 — 23:00 ежедневно",
    description:
      "Chronos Luxury специализируется на часах и статусных аксессуарах с расширенной гарантией.",
  },
  {
    id: 7,
    slug: "cinema-zone",
    floor: "2",
    name: "Cinema Zone",
    category: "Развлечения",
    image: "/globo/image-10.jpg",
    logoImage: "/globo/image-10.jpg",
    phone: "+375 (29) 707-70-70",
    workHours: "10:00 — 22:00 ежедневно",
    description:
      "Cinema Zone — современный кинотеатр с комфортными залами, премьерами и семейными сеансами.",
  },
  {
    id: 8,
    slug: "food-hall",
    floor: "2",
    name: "Food Hall",
    category: "Фудкорт",
    image: "/globo/image-11.jpg",
    logoImage: "/globo/image-11.jpg",
    phone: "+375 (29) 808-80-80",
    workHours: "10:00 — 22:00 ежедневно",
    description:
      "Food Hall объединяет кухни разных стран и уютные посадочные зоны для обеда и встреч.",
  },
  {
    id: 9,
    slug: "bowling-club",
    floor: "2",
    name: "Bowling Club",
    category: "Активный отдых",
    image: "/globo/image-12.jpg",
    logoImage: "/globo/image-12.jpg",
    phone: "+375 (29) 909-90-90",
    workHours: "10:00 — 22:00 ежедневно",
    description:
      "Bowling Club — активный отдых для друзей и семьи, турниры и специальные вечерние программы.",
  },
  {
    id: 10,
    slug: "car-wash-express",
    floor: "parking",
    name: "Car Wash Express",
    category: "Автосервис",
    image: "/globo/image-13.jpg",
    logoImage: "/globo/image-13.jpg",
    phone: "+375 (29) 010-10-10",
    workHours: "Круглосуточно",
    description:
      "Car Wash Express на паркинге обеспечивает быструю мойку и базовый уход за автомобилем 24/7.",
  },
  {
    id: 11,
    slug: "auto-details",
    floor: "parking",
    name: "Auto Details",
    category: "Шиномонтаж",
    image: "/globo/image-9.jpg",
    logoImage: "/globo/image-9.jpg",
    phone: "+375 (29) 111-11-11",
    workHours: "Круглосуточно",
    description:
      "Auto Details предоставляет шиномонтаж, проверку давления и сезонное хранение шин.",
  },
  {
    id: 12,
    slug: "drive-coffee",
    floor: "parking",
    name: "Drive Coffee",
    category: "Кофе с собой",
    image: "/globo/image-2.jpg",
    logoImage: "/globo/image-2.jpg",
    phone: "+375 (29) 212-12-12",
    workHours: "Круглосуточно",
    description: "Drive Coffee — точка кофе и быстрых перекусов на выезде с паркинга.",
  },
];

export function getShopBySlug(slug: string) {
  return shops.find((shop) => shop.slug === slug);
}

