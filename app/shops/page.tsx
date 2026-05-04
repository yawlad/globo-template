import { SiteFooter } from "@/components/shared/SiteFooter";
import { TopNavigation } from "@/components/shared/TopNavigation";
import { ShopsCatalog } from "@/components/shops/ShopsCatalog";
import { getSiteContent } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export default async function ShopsPage() {
  const content = await getSiteContent();

  return (
    <>
      <TopNavigation content={content.navigation} />
      <main className="bg-surface min-h-screen pt-28 pb-16">
        <ShopsCatalog shops={content.shops} />
      </main>
      <SiteFooter />
    </>
  );
}
