import { rentalSpaces } from "@/components/rentals/rentals-data";
import { shops } from "@/components/shops/shops-data";
import { technicalSpaces } from "@/components/technical/technical-spaces-data";

import type { SiteContent } from "@/lib/content/types";

export const defaultSiteContent: SiteContent = {
  navigation: {
    scheduleSummary: "Ежедневно: 10:00 - 22:00",
    scheduleItems: [
      "Цокольный этаж 9:00 - 21:00",
      "1 этаж 9:00 - 23:00",
      "2 этаж 9:00 - 21:00",
      "Паркинг круглосуточно",
    ],
    links: [
      { href: "/shops", label: "Магазины" },
      { href: "/rentals", label: "Арендаторам" },
      { href: "/map", label: "Схема центра" },
      { href: "#", label: "Новости" },
      { href: "#", label: "Контакты" },
    ],
  },
  home: {
    hero: {
      badge: "Minsk, Belarus",
      exploreLabel: "Explore the pulse",
      highlight: "шопинга",
      imageAlt:
        "Modern architectural interior of a luxury shopping mall with glass ceilings, sunlight streaming through, and high-end storefronts in the background",
      imageSrc: "/media/home/hero-main.png",
      primaryCtaHref: "/shops",
      primaryCtaLabel: "Магазины",
      secondaryCtaHref: "/rentals",
      secondaryCtaLabel: "Арендаторам",
      title: "Globo — твой центр {highlight} и стиля",
    },
    highlights: {
      metro: {
        title: "Рядом с метро",
        description: "Всего 2 минуты пешком от станции метро Михалово.",
      },
      shops: {
        title: "100+ Shops",
        description: "Мировые и локальные бренды в одном месте.",
      },
      parking: {
        title: "Free Parking",
        description: "Просторный паркинг для вашего комфорта.",
      },
      food: {
        title: "Cozy Cafes",
        description:
          "Идеальное место для встреч с друзьями или перерыва во время шопинга. Более 15 гастрономических точек.",
        extraCountLabel: "+12",
        avatars: [
          "/media/shops/fresh-market-logo.jpg",
          "/media/shops/fresh-market-cover.jpg",
          "/media/shops/kids-planet-cover.jpg",
        ],
      },
    },
    brands: {
      title: "Популярные бренды",
      linkHref: "/shops",
      linkLabel: "Все магазины →",
      items: [
        {
          category: "Одежда & Стиль",
          image: "/media/shops/premium-fashion-cover.jpg",
          imageAlt:
            "High fashion clothing store display featuring minimalist mannequins in stylish autumn outfits with professional spotlighting",
          name: "Premium Fashion",
        },
        {
          category: "Красота",
          image: "/media/shops/glow-aesthetics-cover.jpg",
          imageAlt:
            "Aesthetic beauty counter with high-end skincare bottles arranged elegantly on a glass shelf with soft ambient lighting",
          name: "Glow Aesthetics",
        },
        {
          category: "Обувь",
          image: "/media/shops/tech-point-cover.jpg",
          imageAlt:
            "Modern sneaker wall featuring vibrant red and white athletic shoes on clean white floating shelves in a minimal store",
          name: "Stride Active",
        },
        {
          category: "Аксессуары",
          image: "/media/shops/chronos-luxury-cover.jpg",
          imageAlt:
            "Luxury watches displayed in a glass mahogany case under warm dramatic lighting, highlighting metallic and leather details",
          name: "Chronos Luxury",
        },
      ],
    },
    promo: {
      title: "Сезонные скидки до -70%",
      description:
        "Не упустите возможность обновить свой гардероб по самым выгодным ценам. Только в этом месяце в Globo!",
      buttonLabel: "Смотреть предложения",
      imageSrc: "/media/home/sale-campaign.jpg",
      imageAlt:
        "A stylish woman laughing and carrying several colorful luxury shopping bags in a sun-drenched upscale city district",
    },
    news: {
      title: "События и новости",
      items: [
        {
          date: "12 Октября, 2024",
          title: "Открытие новой зоны развлечений",
          description:
            "Теперь в Globo еще больше драйва! Открылся современный боулинг-центр с неоновым освещением...",
          image: "/media/home/event-bowling.jpg",
          imageAlt:
            "vibrant neon interior of a bowling alley with illuminated lanes and glowing bowling balls",
        },
        {
          date: "8 Октября, 2024",
          title: "Фестиваль десертов в эти выходные",
          description:
            "Попробуйте лучшие десерты от шеф-кондитеров города. Мастер-классы и дегустации весь день!",
          image: "/media/home/event-desserts.jpg",
          imageAlt:
            "close-up of colorful macarons in a fancy pink box on a white marble surface",
        },
        {
          date: "3 Октября, 2024",
          title: "Fashion Week: Итоги показов",
          description:
            "Рассказываем о главных трендах сезона, которые уже можно найти в магазинах нашего центра.",
          image: "/media/home/event-fashion.jpg",
          imageAlt:
            "elegant evening dresses on gold racks in a brightly lit fashion showroom",
        },
      ],
    },
    visit: {
      title: "Ждем вас \nв Globo",
      addressLabel: "Адрес",
      addressText: "ул. Уманская, 54, Минск, Беларусь",
      buttonLabel: "Построить маршрут",
      hoursLabel: "Режим работы",
      hoursText: "Ежедневно: 10:00 — 22:00",
      mapAlt:
        "Stylized top-down street map view with clean minimalist design and a red marker pin on a specific building",
      mapImage: "/media/home/location-map.jpg",
    },
  },
  shops,
  rentals: rentalSpaces,
  technicalSpaces,
};
