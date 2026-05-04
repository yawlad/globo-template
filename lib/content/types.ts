import type { RentalSpace } from "@/components/rentals/rentals-data";
import type { Shop } from "@/components/shops/shops-data";
import type { TechnicalSpace } from "@/components/technical/technical-spaces-data";

export type NavigationLink = {
  href: string;
  label: string;
};

export type NavigationContent = {
  links: NavigationLink[];
  scheduleItems: string[];
  scheduleSummary: string;
};

export type HomeHeroContent = {
  badge: string;
  exploreLabel: string;
  highlight: string;
  imageAlt: string;
  imageSrc: string;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
  secondaryCtaLabel: string;
  title: string;
};

export type HomeHighlightCard = {
  description: string;
  title: string;
};

export type HomeBrand = {
  category: string;
  image: string;
  imageAlt: string;
  name: string;
};

export type HomePromoContent = {
  buttonLabel: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
};

export type HomeNewsItem = {
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  title: string;
};

export type HomeVisitContent = {
  addressLabel: string;
  addressText: string;
  buttonLabel: string;
  hoursLabel: string;
  hoursText: string;
  mapAlt: string;
  mapImage: string;
  title: string;
};

export type HomeContent = {
  brands: {
    items: HomeBrand[];
    linkHref: string;
    linkLabel: string;
    title: string;
  };
  highlights: {
    food: HomeHighlightCard & {
      avatars: string[];
      extraCountLabel: string;
    };
    metro: HomeHighlightCard;
    parking: HomeHighlightCard;
    shops: HomeHighlightCard;
  };
  hero: HomeHeroContent;
  news: {
    items: HomeNewsItem[];
    title: string;
  };
  promo: HomePromoContent;
  visit: HomeVisitContent;
};

export type SiteContent = {
  home: HomeContent;
  navigation: NavigationContent;
  rentals: RentalSpace[];
  shops: Shop[];
  technicalSpaces: TechnicalSpace[];
};
