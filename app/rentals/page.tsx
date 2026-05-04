import { RentalsCatalog } from "@/components/rentals/RentalsCatalog";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { TopNavigation } from "@/components/shared/TopNavigation";
import { getSiteContent } from "@/lib/content/store";

const benefits = [
  {
    title: "Сильный поток посетителей",
    description:
      "Центр работает как повседневная точка притяжения для покупателей, соседних офисов и жителей района.",
    icon: "groups",
  },
  {
    title: "Разные форматы помещений",
    description:
      "Есть компактные сервисные блоки, торговые площади, шоурумы и помещения под склад или офис сопровождения.",
    icon: "domain",
  },
  {
    title: "Гибкая структура собственников",
    description:
      "В центре доступны площади как от БелТяжМаш, так и от частных собственников, что позволяет подобрать подходящие условия.",
    icon: "handshake",
  },
];

export const dynamic = "force-dynamic";

export default async function RentalsPage() {
  const content = await getSiteContent();

  return (
    <>
      <TopNavigation content={content.navigation} />
      <main className="min-h-screen bg-surface pb-16 pt-28">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-secondary-fixed-variant">
                Для арендаторов
              </p>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-on-surface md:text-6xl">
                Помещения для аренды в GLOBO
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-on-surface-variant">
                Подберите помещение под магазин, сервисную точку, шоурум или
                компактный офис. Мы собрали в одном разделе актуальные
                предложения с понятными фильтрами и полной информацией по каждому
                лоту.
              </p>
            </div>

            <div className="rounded-[2rem] bg-surface-container-low p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Почему арендаторы выбирают нас
              </p>
              <div className="mt-5 space-y-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-outline-variant/15 bg-white px-4 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined rounded-2xl bg-primary-fixed p-3 text-primary">
                        {benefit.icon}
                      </span>
                      <div>
                        <h2 className="text-lg font-black text-on-surface">
                          {benefit.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="mt-14">
            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight text-on-surface md:text-4xl">
                Каталог доступных помещений
              </h2>
              <p className="mt-3 max-w-2xl text-on-surface-variant">
                Отфильтруйте помещения по бюджету, площади, этажу и типу
                собственника.
              </p>
            </div>

            <RentalsCatalog rentalSpaces={content.rentals} />
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
