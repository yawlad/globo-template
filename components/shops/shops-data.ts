import type { Room } from "@/components/map/mall-map-data";
import type { FloorFilter } from "@/components/shops/shop-types";

export type Shop = {
  category: string;
  description: string;
  floor: FloorFilter;
  id: number;
  image: string;
  logoImage: string;
  name: string;
  phone: string;
  roomId?: Room["id"];
  slug: string;
  workHours: string;
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
    image: "/media/shops/fresh-market-cover.jpg",
    logoImage: "/media/shops/fresh-market-logo.jpg",
    phone: "+375 (29) 101-10-10",
    workHours: "09:00 - 21:00 ежедневно",
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
    image: "/media/shops/kids-planet-cover.jpg",
    logoImage: "/media/shops/kids-planet-cover.jpg",
    phone: "+375 (29) 202-20-20",
    workHours: "09:00 - 21:00 ежедневно",
    description:
      "Kids Planet - магазин детской одежды, игрушек и школьных аксессуаров для детей всех возрастов.",
  },
  {
    id: 3,
    slug: "tech-point",
    floor: "0",
    roomId: "e-7",
    name: "Tech Point",
    category: "Электроника",
    image: "/media/shops/tech-point-cover.jpg",
    logoImage: "/media/shops/tech-point-cover.jpg",
    phone: "+375 (29) 303-30-30",
    workHours: "10:00 - 21:00 ежедневно",
    description:
      "Tech Point предлагает смартфоны, аксессуары и гаджеты с профессиональной консультацией и сервисом.",
  },
  {
    id: 4,
    slug: "premium-fashion",
    floor: "1",
    name: "Premium Fashion",
    category: "Одежда и стиль",
    image: "/media/shops/premium-fashion-cover.jpg",
    logoImage: "/media/shops/premium-fashion-cover.jpg",
    phone: "+375 (29) 404-40-40",
    workHours: "10:00 - 23:00 ежедневно",
    description:
      "Premium Fashion предлагает коллекции повседневной и вечерней одежды от локальных и международных брендов.",
  },
  {
    id: 5,
    slug: "glow-aesthetics",
    floor: "1",
    name: "Glow Aesthetics",
    category: "Красота и уход",
    image: "/media/shops/glow-aesthetics-cover.jpg",
    logoImage: "/media/shops/glow-aesthetics-cover.jpg",
    phone: "+375 (29) 505-50-50",
    workHours: "10:00 - 23:00 ежедневно",
    description:
      "Glow Aesthetics - косметика, уходовые средства и консультации по подбору beauty-продуктов.",
  },
  {
    id: 6,
    slug: "chronos-luxury",
    floor: "1",
    name: "Chronos Luxury",
    category: "Аксессуары",
    image: "/media/shops/chronos-luxury-cover.jpg",
    logoImage: "/media/shops/chronos-luxury-cover.jpg",
    phone: "+375 (29) 606-60-60",
    workHours: "10:00 - 23:00 ежедневно",
    description:
      "Chronos Luxury специализируется на часах и статусных аксессуарах с расширенной гарантией.",
  },
  {
    id: 7,
    slug: "cinema-zone",
    floor: "2",
    name: "Cinema Zone",
    category: "Развлечения",
    image: "/media/home/event-bowling.jpg",
    logoImage: "/media/home/event-bowling.jpg",
    phone: "+375 (29) 707-70-70",
    workHours: "10:00 - 22:00 ежедневно",
    description:
      "Cinema Zone - современный кинотеатр с комфортными залами, премьерами и семейными сеансами.",
  },
  {
    id: 8,
    slug: "food-hall",
    floor: "2",
    name: "Food Hall",
    category: "Фудкорт",
    image: "/media/home/event-desserts.jpg",
    logoImage: "/media/home/event-desserts.jpg",
    phone: "+375 (29) 808-80-80",
    workHours: "10:00 - 22:00 ежедневно",
    description:
      "Food Hall объединяет кухни разных стран и уютные посадочные зоны для обеда и встреч.",
  },
  {
    id: 9,
    slug: "bowling-club",
    floor: "2",
    name: "Bowling Club",
    category: "Активный отдых",
    image: "/media/home/event-fashion.jpg",
    logoImage: "/media/home/event-fashion.jpg",
    phone: "+375 (29) 909-90-90",
    workHours: "10:00 - 22:00 ежедневно",
    description:
      "Bowling Club - активный отдых для друзей и семьи, турниры и специальные вечерние программы.",
  },
  {
    id: 10,
    slug: "car-wash-express",
    floor: "parking",
    name: "Car Wash Express",
    category: "Автосервис",
    image: "/media/home/location-map.jpg",
    logoImage: "/media/home/location-map.jpg",
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
    image: "/media/home/sale-campaign.jpg",
    logoImage: "/media/home/sale-campaign.jpg",
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
    image: "/media/shops/fresh-market-logo.jpg",
    logoImage: "/media/shops/fresh-market-logo.jpg",
    phone: "+375 (29) 212-12-12",
    workHours: "Круглосуточно",
    description:
      "Drive Coffee - точка кофе и быстрых перекусов на выезде с паркинга.",
  },
  {
    id: 13,
    slug: "yum-yum",
    floor: "0",
    roomId: "e-18",
    name: "Yum Yum",
    category: "Магазин вкусняшек",
    image: "/media/shops/yum-yum-logo.png",
    logoImage: "/media/shops/yum-yum-logo.png",
    phone: "+375 (29) 129-86-65",
    workHours: "10:00 - 20:00 ежедневно",
    description: "Yum Yum - магазин вкусняшек на цокольном этаже.",
  },
];

export function getShopBySlug(slug: string) {
  return shops.find((shop) => shop.slug === slug);
}
