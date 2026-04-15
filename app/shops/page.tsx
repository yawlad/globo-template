import { SiteFooter } from "@/components/shared/SiteFooter";
import { TopNavigation } from "@/components/shared/TopNavigation";
import { ShopsCatalog } from "@/components/shops/ShopsCatalog";

export default function ShopsPage() {
  return (
    <>
      <TopNavigation />
      <main className="bg-surface min-h-screen pt-28 pb-16">
        <ShopsCatalog />
      </main>
      <SiteFooter />
    </>
  );
}
