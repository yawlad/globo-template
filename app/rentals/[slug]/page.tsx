import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { rooms } from "@/components/map/mall-map-data";
import {
  rentalOwnerLabels,
  rentalTypeLabels,
} from "@/components/rentals/rentals-data";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { TopNavigation } from "@/components/shared/TopNavigation";
import { getSiteContent } from "@/lib/content/store";

type RentalPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function RentalDetailsPage({ params }: RentalPageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const rental = content.rentals.find((item) => item.slug === slug);

  if (!rental) {
    notFound();
  }

  const room = rooms.find((item) => item.id === rental.roomId) ?? null;
  const floorLabel =
    rental.floor === "parking" ? "Паркинг" : `${rental.floor} этаж`;

  return (
    <>
      <TopNavigation content={content.navigation} />
      <main className="min-h-screen bg-surface pb-16 pt-28">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mb-8 text-sm text-on-surface-variant">
            <Link href="/" className="transition-colors hover:text-primary">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <Link href="/rentals" className="transition-colors hover:text-primary">
              Арендаторам
            </Link>
            <span className="mx-2">/</span>
            <span className="text-on-surface">{rental.title}</span>
          </div>

          <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary px-4 py-1 text-sm font-bold text-white">
                  {floorLabel}
                </span>
                {room ? (
                  <span className="rounded-full bg-surface-container px-4 py-1 text-sm font-bold text-on-surface">
                    {room.roomNumber}
                  </span>
                ) : null}
                <span className="rounded-full bg-surface-container px-4 py-1 text-sm font-bold text-on-surface">
                  {rentalOwnerLabels[rental.owner]}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-on-surface md:text-6xl">
                {rental.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-on-surface-variant">
                {rental.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.6rem] bg-surface-container-low px-5 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                    Стоимость в месяц
                  </p>
                  <p className="mt-2 text-3xl font-black text-on-surface">
                    {new Intl.NumberFormat("ru-RU").format(rental.monthlyPrice)} BYN
                  </p>
                </div>
                <div className="rounded-[1.6rem] bg-surface-container-low px-5 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                    Площадь
                  </p>
                  <p className="mt-2 text-3xl font-black text-on-surface">
                    {rental.areaSqm} м²
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {rental.types.map((type) => (
                  <span
                    key={type}
                    className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wide text-on-secondary-fixed-variant"
                  >
                    {rentalTypeLabels[type]}
                  </span>
                ))}
              </div>

              <div className="mt-10 rounded-[1.8rem] border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
                <h2 className="text-2xl font-black text-on-surface">
                  Что важно по этому помещению
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-surface px-4 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                      Собственник
                    </p>
                    <p className="mt-2 text-base font-semibold text-on-surface">
                      {rentalOwnerLabels[rental.owner]}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-surface px-4 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                      Расположение
                    </p>
                    <p className="mt-2 text-base font-semibold text-on-surface">
                      {room ? `${room.roomNumber}, ${floorLabel}` : floorLabel}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-on-surface-variant">
                  Для уточнения коммерческих условий, сроков сделки и просмотра
                  помещения можно использовать контакты администрации центра и
                  собственника.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-outline-variant/20 bg-surface-container-low">
                <Image
                  src={rental.heroImage}
                  alt={rental.title}
                  fill
                  priority
                  sizes="(max-width: 1279px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {rental.galleryImages.map((image, index) => (
                  <div
                    key={image}
                    className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border border-outline-variant/20 bg-surface-container-low"
                  >
                    <Image
                      src={image}
                      alt={`${rental.title} gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 1279px) 33vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
