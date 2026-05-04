import { MallMap } from "@/components/map/MallMap";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { TopNavigation } from "@/components/shared/TopNavigation";
import { getSiteContent } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export default async function MapPage() {
  const content = await getSiteContent();

  return (
    <>
      <TopNavigation content={content.navigation} />
      <main className="bg-surface min-h-screen pt-28 pb-16">
        <MallMap
          shops={content.shops}
          rentalSpaces={content.rentals}
          technicalSpaces={content.technicalSpaces}
        />
      </main>
      <SiteFooter />
    </>
  );
}

