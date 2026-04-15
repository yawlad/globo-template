import { MallMap } from "@/components/map/MallMap";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { TopNavigation } from "@/components/shared/TopNavigation";

export default function MapPage() {
  return (
    <>
      <TopNavigation />
      <main className="bg-surface min-h-screen pt-28 pb-16">
        <MallMap />
      </main>
      <SiteFooter />
    </>
  );
}

