import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { defaultSiteContent } from "@/lib/content/default-content";
import {
  isHomeContent,
  isNavigationContent,
  isRentalArray,
  isShopArray,
  isTechnicalSpaceArray,
} from "@/lib/content/validators";
import type { HomeContent, NavigationContent, SiteContent } from "@/lib/content/types";
import type { RentalSpace } from "@/components/rentals/rentals-data";
import type { Shop } from "@/components/shops/shops-data";
import type { TechnicalSpace } from "@/components/technical/technical-spaces-data";

const contentDirectory = path.join(process.cwd(), "data");
const contentFilePath = path.join(contentDirectory, "site-content.json");

type SiteContentSectionMap = {
  home: HomeContent;
  navigation: NavigationContent;
  rentals: RentalSpace[];
  shops: Shop[];
  technicalSpaces: TechnicalSpace[];
};

function normalizeSiteContent(value: unknown): SiteContent {
  const fallback = defaultSiteContent;

  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return fallback;
  }

  const record = value as Record<string, unknown>;

  return {
    navigation: isNavigationContent(record.navigation)
      ? record.navigation
      : fallback.navigation,
    home: isHomeContent(record.home) ? record.home : fallback.home,
    shops: isShopArray(record.shops) ? record.shops : fallback.shops,
    rentals: isRentalArray(record.rentals) ? record.rentals : fallback.rentals,
    technicalSpaces: isTechnicalSpaceArray(record.technicalSpaces)
      ? record.technicalSpaces
      : fallback.technicalSpaces,
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const fileContent = await readFile(contentFilePath, "utf-8");
    return normalizeSiteContent(JSON.parse(fileContent));
  } catch {
    return defaultSiteContent;
  }
}

export async function saveSiteContent(nextContent: SiteContent) {
  await mkdir(contentDirectory, { recursive: true });
  await writeFile(contentFilePath, JSON.stringify(nextContent, null, 2), "utf-8");
}

export async function updateSiteContentSection<Key extends keyof SiteContentSectionMap>(
  key: Key,
  value: SiteContentSectionMap[Key],
) {
  const currentContent = await getSiteContent();
  await saveSiteContent({
    ...currentContent,
    [key]: value,
  });
}
