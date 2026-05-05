import {
  loginAdmin,
  logoutAdmin,
  saveHomeContent,
  saveNavigationContent,
  saveRentalsContent,
  saveShopsContent,
  saveTechnicalSpacesContent,
} from "@/lib/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getSiteContent } from "@/lib/content/store";
import type { HomeContent, NavigationContent } from "@/lib/content/types";

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

type SectionKey = "navigation" | "home" | "shops" | "rentals" | "technicalSpaces";

function asSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function StatusBanner({
  tone,
  children,
}: {
  children: React.ReactNode;
  tone: "error" | "success";
}) {
  const toneClassName =
    tone === "success"
      ? "border-primary/15 bg-primary-fixed text-on-secondary-fixed-variant"
      : "border-error/20 bg-error-container text-on-error-container";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${toneClassName}`}>
      {children}
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  hint: string;
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-outline-variant/15 bg-white p-5 shadow-[0_16px_40px_rgba(91,64,61,0.05)]">
      <p className="text-sm text-on-surface-variant">{label}</p>
      <p className="mt-2 text-3xl font-black text-on-surface">{value}</p>
      <p className="mt-2 text-xs leading-5 text-on-surface-variant">{hint}</p>
    </div>
  );
}

function SectionNavItem({
  description,
  href,
  isActive,
  title,
}: {
  description: string;
  href: string;
  isActive: boolean;
  title: string;
}) {
  return (
    <a
      href={href}
      className={`block rounded-2xl border px-4 py-4 transition-all ${
        isActive
          ? "border-primary/25 bg-primary-fixed text-on-secondary-fixed-variant shadow-sm"
          : "border-outline-variant/15 bg-white text-on-surface hover:border-primary/20 hover:-translate-y-0.5"
      }`}
    >
      <p className="text-sm font-black">{title}</p>
      <p className="mt-1 text-xs leading-5 text-on-surface-variant">{description}</p>
    </a>
  );
}

function PreviewBlock({
  eyebrow,
  title,
  children,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-outline-variant/15 bg-surface-container-lowest p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h3 className="mt-2 text-lg font-black text-on-surface">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function EditorSection({
  action,
  children,
  defaultJson,
  description,
  id,
  isActive,
  title,
}: {
  action: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
  defaultJson: string;
  description: string;
  id: string;
  isActive: boolean;
  title: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-8 rounded-[2rem] border bg-white p-6 shadow-[0_20px_50px_rgba(91,64,61,0.06)] ${
        isActive ? "border-primary/30 ring-4 ring-primary/5" : "border-outline-variant/15"
      }`}
    >
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Content Section</p>
          <h2 className="mt-2 text-3xl font-black text-on-surface">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-on-surface-variant">{description}</p>
        </div>
        <div className="rounded-full border border-outline-variant/15 bg-surface px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
          JSON editor + preview
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div>{children}</div>

        <form action={action} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-on-surface">Структура данных</span>
            <textarea
              name="json"
              defaultValue={defaultJson}
              className="min-h-[520px] w-full rounded-[1.5rem] border border-outline-variant/20 bg-[#fffdfa] px-4 py-4 font-mono text-[13px] leading-6 text-on-surface outline-none transition-colors focus:border-primary"
              spellCheck={false}
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-on-surface-variant">
              Редактор оставлен в JSON-формате для гибкости, но слева показано, как именно этот блок выглядит и что в
              нем важно.
            </p>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Сохранить секцию
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function NavigationPreview({ content }: { content: NavigationContent }) {
  return (
    <div className="space-y-4">
      <PreviewBlock eyebrow="Menu" title="Ссылки верхней навигации">
        <div className="flex flex-wrap gap-2">
          {content.links.map((link) => (
            <div
              key={`${link.href}-${link.label}`}
              className="rounded-full border border-outline-variant/15 bg-white px-3 py-2 text-sm font-semibold text-on-surface"
            >
              {link.label}
            </div>
          ))}
        </div>
      </PreviewBlock>

      <PreviewBlock eyebrow="Schedule" title="Краткое время работы">
        <div className="rounded-2xl bg-white px-4 py-4">
          <p className="text-sm font-bold text-on-surface">{content.scheduleSummary}</p>
          <div className="mt-3 space-y-2">
            {content.scheduleItems.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-outline-variant/12 bg-surface px-3 py-2 text-sm text-on-surface-variant"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </PreviewBlock>
    </div>
  );
}

function HomePreview({ content }: { content: HomeContent }) {
  return (
    <div className="space-y-4">
      <PreviewBlock eyebrow="Hero" title={content.hero.title.replace("{highlight}", content.hero.highlight)}>
        <div className="space-y-3 rounded-2xl bg-white px-4 py-4">
          <div className="inline-flex rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wide text-on-secondary-fixed-variant">
            {content.hero.badge}
          </div>
          <p className="text-sm text-on-surface-variant">
            CTA: {content.hero.primaryCtaLabel} / {content.hero.secondaryCtaLabel}
          </p>
          <p className="text-xs text-on-surface-variant">Фоновое изображение: {content.hero.imageSrc}</p>
        </div>
      </PreviewBlock>

      <PreviewBlock eyebrow="Highlights" title="Карточки преимуществ">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            content.highlights.metro,
            content.highlights.shops,
            content.highlights.parking,
            content.highlights.food,
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-white px-4 py-4">
              <p className="font-bold text-on-surface">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.description}</p>
            </div>
          ))}
        </div>
      </PreviewBlock>

      <PreviewBlock eyebrow="Brands & News" title="Наполнение главной">
        <div className="space-y-3">
          <div className="rounded-2xl bg-white px-4 py-4">
            <p className="text-sm font-bold text-on-surface">
              Популярные бренды: {content.brands.items.length}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {content.brands.items.slice(0, 4).map((item) => (
                <span
                  key={item.name}
                  className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-on-surface-variant"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white px-4 py-4">
            <p className="text-sm font-bold text-on-surface">Новостей: {content.news.items.length}</p>
            <div className="mt-3 space-y-2">
              {content.news.items.slice(0, 3).map((item) => (
                <div key={item.title} className="rounded-xl border border-outline-variant/12 bg-surface px-3 py-3">
                  <p className="text-sm font-semibold text-on-surface">{item.title}</p>
                  <p className="mt-1 text-xs text-on-surface-variant">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PreviewBlock>
    </div>
  );
}

function ShopsPreview({
  shops,
}: {
  shops: Awaited<ReturnType<typeof getSiteContent>>["shops"];
}) {
  return (
    <div className="space-y-4">
      <PreviewBlock eyebrow="Catalog" title="Список магазинов">
        <div className="space-y-3">
          {shops.slice(0, 6).map((shop) => (
            <div
              key={shop.id}
              className="flex items-start justify-between gap-4 rounded-2xl bg-white px-4 py-4"
            >
              <div>
                <p className="font-bold text-on-surface">{shop.name}</p>
                <p className="mt-1 text-sm text-on-surface-variant">{shop.category}</p>
                <p className="mt-2 text-xs text-on-surface-variant">
                  {shop.floor === "parking" ? "Паркинг" : `${shop.floor} этаж`} • {shop.slug}
                </p>
              </div>
              <div className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-on-surface-variant">
                ID {shop.id}
              </div>
            </div>
          ))}
        </div>
      </PreviewBlock>
    </div>
  );
}

function RentalsPreview({
  rentals,
}: {
  rentals: Awaited<ReturnType<typeof getSiteContent>>["rentals"];
}) {
  return (
    <div className="space-y-4">
      <PreviewBlock eyebrow="Rentals" title="Арендные предложения">
        <div className="space-y-3">
          {rentals.slice(0, 6).map((rental) => (
            <div key={rental.id} className="rounded-2xl bg-white px-4 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-on-surface">{rental.title}</p>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    {rental.monthlyPrice} BYN • {rental.areaSqm} м²
                  </p>
                </div>
                <div className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-on-surface-variant">
                  {rental.owner}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {rental.types.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-outline-variant/15 bg-surface px-3 py-1 text-xs font-semibold text-on-surface-variant"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PreviewBlock>
    </div>
  );
}

function TechnicalSpacesPreview({
  technicalSpaces,
}: {
  technicalSpaces: Awaited<ReturnType<typeof getSiteContent>>["technicalSpaces"];
}) {
  return (
    <div className="space-y-4">
      <PreviewBlock eyebrow="Map" title="Технические помещения">
        <div className="space-y-3">
          {technicalSpaces.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white px-4 py-4">
              <p className="font-bold text-on-surface">{item.title}</p>
              <p className="mt-1 text-sm text-on-surface-variant">
                Тип: {item.type} • Комната: {item.roomId}
              </p>
            </div>
          ))}
        </div>
      </PreviewBlock>
    </div>
  );
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const resolvedSearchParams = await searchParams;
  const error = asSingleValue(resolvedSearchParams.error);
  const saved = asSingleValue(resolvedSearchParams.saved);
  const activeSection = asSingleValue(resolvedSearchParams.section) as SectionKey | undefined;
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#fcf9f8_0%,#f6f1ef_100%)] px-4 py-12 sm:px-6 md:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_420px]">
          <section className="rounded-[2.5rem] border border-outline-variant/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,1),rgba(255,245,243,0.96)_45%,rgba(248,239,236,0.96)_100%)] p-8 shadow-[0_30px_80px_rgba(91,64,61,0.08)] lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Globo Admin</p>
            <h1 className="mt-4 max-w-xl text-5xl font-black leading-tight text-on-surface">
              Понятная панель для наполнения сайта
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-on-surface-variant">
              Здесь редактируются главная страница, навигация, магазины, аренда и карта. Данные сохраняются локально и
              сразу используются на публичных страницах.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard label="Контент" value="5" hint="Отдельных смысловых разделов сайта" />
              <StatCard label="Доступ" value="1" hint="Одна админ-зона на маршруте `/admin`" />
              <StatCard label="Хранилище" value="JSON" hint="Один централизованный файл данных" />
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-outline-variant/10 bg-white p-8 shadow-[0_24px_60px_rgba(91,64,61,0.08)]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Авторизация</p>
            <h2 className="mt-4 text-4xl font-black text-on-surface">Вход в админку</h2>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              Пока используется простая проверка логина и пароля. Для быстрого входа можно использовать:
              <span className="font-semibold text-on-surface"> admin / admin</span>.
            </p>

            {error === "invalid_credentials" ? (
              <div className="mt-5">
                <StatusBanner tone="error">Неверный логин или пароль.</StatusBanner>
              </div>
            ) : null}

            <form action={loginAdmin} className="mt-6 space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-bold text-on-surface">Логин</span>
                <input
                  name="username"
                  type="text"
                  defaultValue="admin"
                  className="h-12 w-full rounded-2xl border border-outline-variant/20 bg-surface px-4 text-on-surface outline-none transition-colors focus:border-primary"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-bold text-on-surface">Пароль</span>
                <input
                  name="password"
                  type="password"
                  defaultValue="admin"
                  className="h-12 w-full rounded-2xl border border-outline-variant/20 bg-surface px-4 text-on-surface outline-none transition-colors focus:border-primary"
                />
              </label>

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                Войти в панель
              </button>
            </form>
          </section>
        </div>
      </main>
    );
  }

  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fcf9f8_0%,#f7f2f0_100%)] px-4 py-8 sm:px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 overflow-hidden rounded-[2.5rem] border border-outline-variant/12 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,1),rgba(255,246,244,0.98)_50%,rgba(248,239,236,0.98)_100%)] p-6 shadow-[0_30px_80px_rgba(91,64,61,0.06)] lg:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Globo Admin</p>
              <h1 className="mt-3 text-4xl font-black text-on-surface md:text-5xl">
                Управление контентом сайта
              </h1>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                Панель стала визуально понятнее: у каждого блока есть краткое описание, живая сводка и превью данных.
                Сами изменения по-прежнему сохраняются в `data/site-content.json`, но теперь легче понять, что именно
                вы редактируете.
              </p>
            </div>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex h-11 items-center rounded-full border border-outline-variant/20 bg-white px-5 text-sm font-bold text-on-surface transition-all hover:border-primary hover:text-primary"
              >
                Выйти
              </button>
            </form>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Магазины" value={content.shops.length} hint="Карточки, каталог, детальные страницы и карта" />
            <StatCard label="Аренда" value={content.rentals.length} hint="Лоты, цены, площадь, типы и изображения" />
            <StatCard
              label="Тех. помещения"
              value={content.technicalSpaces.length}
              hint="Элементы, отображаемые на схеме центра"
            />
            <StatCard
              label="Навигация"
              value={content.navigation.links.length}
              hint="Ссылки меню и информация о режиме работы"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {saved ? (
              <StatusBanner tone="success">
                Секция <span className="font-bold">{saved}</span> успешно сохранена.
              </StatusBanner>
            ) : null}

            {error && error !== "auth" && error !== "invalid_credentials" ? (
              <StatusBanner tone="error">
                Ошибка в секции <span className="font-bold">{activeSection ?? "unknown"}</span>:{" "}
                {decodeURIComponent(error)}
              </StatusBanner>
            ) : null}
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[290px_1fr]">
          <aside className="xl:sticky xl:top-8 xl:self-start">
            <div className="rounded-[2rem] border border-outline-variant/15 bg-white p-5 shadow-[0_18px_50px_rgba(91,64,61,0.05)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Навигация по панели</p>
              <div className="mt-4 space-y-3">
                <SectionNavItem
                  href="#navigation"
                  title="Navigation"
                  description="Ссылки меню и расписание"
                  isActive={activeSection === "navigation"}
                />
                <SectionNavItem
                  href="#home"
                  title="Home"
                  description="Главная страница, hero, бренды и новости"
                  isActive={activeSection === "home"}
                />
                <SectionNavItem
                  href="#shops"
                  title="Shops"
                  description="Каталог магазинов и их карточки"
                  isActive={activeSection === "shops"}
                />
                <SectionNavItem
                  href="#rentals"
                  title="Rentals"
                  description="Лоты под аренду и коммерческие данные"
                  isActive={activeSection === "rentals"}
                />
                <SectionNavItem
                  href="#technicalSpaces"
                  title="Technical Spaces"
                  description="Служебные помещения на карте"
                  isActive={activeSection === "technicalSpaces"}
                />
              </div>

              <div className="mt-5 rounded-2xl bg-surface px-4 py-4">
                <p className="text-sm font-bold text-on-surface">Как работать быстрее</p>
                <p className="mt-2 text-xs leading-6 text-on-surface-variant">
                  Сначала смотрите превью слева, затем меняйте JSON справа. Так проще понять, какое поле отвечает за
                  конкретный блок сайта.
                </p>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <EditorSection
              id="navigation"
              title="Navigation"
              description="Редактирование верхнего меню и блока с режимом работы. Этот раздел влияет на шапку сайта и мобильное меню."
              defaultJson={JSON.stringify(content.navigation, null, 2)}
              action={saveNavigationContent}
              isActive={activeSection === "navigation"}
            >
              <NavigationPreview content={content.navigation} />
            </EditorSection>

            <EditorSection
              id="home"
              title="Home"
              description="Главная страница: hero, преимущества, подборка брендов, промо-блок, новости и блок с адресом."
              defaultJson={JSON.stringify(content.home, null, 2)}
              action={saveHomeContent}
              isActive={activeSection === "home"}
            >
              <HomePreview content={content.home} />
            </EditorSection>

            <EditorSection
              id="shops"
              title="Shops"
              description="Все магазины и сервисы. Эти данные используются в каталоге, на карточках карты и на страницах деталей."
              defaultJson={JSON.stringify(content.shops, null, 2)}
              action={saveShopsContent}
              isActive={activeSection === "shops"}
            >
              <ShopsPreview shops={content.shops} />
            </EditorSection>

            <EditorSection
              id="rentals"
              title="Rentals"
              description="Арендные предложения: стоимость, площадь, типы помещений, владелец и набор изображений."
              defaultJson={JSON.stringify(content.rentals, null, 2)}
              action={saveRentalsContent}
              isActive={activeSection === "rentals"}
            >
              <RentalsPreview rentals={content.rentals} />
            </EditorSection>

            <EditorSection
              id="technicalSpaces"
              title="Technical Spaces"
              description="Технические помещения, которые показываются на схеме ТЦ как служебные точки."
              defaultJson={JSON.stringify(content.technicalSpaces, null, 2)}
              action={saveTechnicalSpacesContent}
              isActive={activeSection === "technicalSpaces"}
            >
              <TechnicalSpacesPreview technicalSpaces={content.technicalSpaces} />
            </EditorSection>
          </div>
        </div>
      </div>
    </main>
  );
}
