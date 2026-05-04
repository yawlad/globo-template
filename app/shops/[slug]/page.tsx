import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/shared/SiteFooter";
import { TopNavigation } from "@/components/shared/TopNavigation";
import { getSiteContent } from "@/lib/content/store";

type ShopPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function ShopDetailsPage({ params }: ShopPageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const shop = content.shops.find((item) => item.slug === slug);

  if (!shop) {
    notFound();
  }

  const floorLabel = shop.floor === "parking" ? "Паркинг" : `${shop.floor} этаж`;

  return (
    <>
      <TopNavigation content={content.navigation} />
      <main className="bg-surface min-h-screen pt-28 pb-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-sm text-on-surface-variant mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shops" className="hover:text-primary transition-colors">
              Магазины
            </Link>
            <span className="mx-2">/</span>
            <span className="text-on-surface">{shop.name}</span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-8 xl:gap-12">
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-on-surface">{shop.name}</h1>

              <div className="flex items-center gap-3 mt-5">
                <span className="px-4 py-1 rounded-full text-sm font-bold bg-primary text-white">{floorLabel}</span>
                <span className="text-on-surface-variant text-sm">На карте ↗</span>
              </div>

              <div className="h-px bg-outline-variant/40 my-8" />

              <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-6 items-start">
                <dl className="space-y-4 text-sm md:text-base">
                  <div className="grid grid-cols-[140px_1fr] gap-4">
                    <dt className="text-on-surface-variant uppercase">Категория:</dt>
                    <dd className="font-medium text-on-surface">{shop.category}</dd>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] gap-4">
                    <dt className="text-on-surface-variant uppercase">Режим работы:</dt>
                    <dd className="font-medium text-on-surface">{shop.workHours}</dd>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] gap-4">
                    <dt className="text-on-surface-variant uppercase">Телефон:</dt>
                    <dd className="font-medium text-on-surface">{shop.phone}</dd>
                  </div>
                </dl>

                <div className="relative w-full md:w-[180px] h-[180px] rounded-xl overflow-hidden border border-outline-variant/20">
                  <Image src={shop.logoImage} alt={`${shop.name} logo`} fill className="object-cover" />
                </div>
              </div>

              <div className="h-px bg-outline-variant/40 my-8" />

              <p className="text-on-surface leading-7 max-w-2xl">{shop.description}</p>
            </div>

            <div className="relative w-full min-h-[260px] sm:min-h-[360px] md:min-h-[460px] rounded-2xl overflow-hidden border border-outline-variant/20">
              <Image
                src={shop.image}
                alt={shop.name}
                fill
                sizes="(max-width: 1279px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

