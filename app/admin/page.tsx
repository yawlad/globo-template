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

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function asSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function AdminJsonSection({
  action,
  description,
  json,
  title,
}: {
  action: (formData: FormData) => Promise<void>;
  description: string;
  json: string;
  title: string;
}) {
  return (
    <section className="rounded-3xl border border-outline-variant/20 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-2xl font-black text-on-surface">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-on-surface-variant">{description}</p>
      </div>

      <form action={action} className="space-y-4">
        <textarea
          name="json"
          defaultValue={json}
          className="min-h-[320px] w-full rounded-2xl border border-outline-variant/25 bg-surface px-4 py-4 font-mono text-sm text-on-surface outline-none focus:border-primary"
          spellCheck={false}
        />
        <button
          type="submit"
          className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Сохранить блок
        </button>
      </form>
    </section>
  );
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const resolvedSearchParams = await searchParams;
  const error = asSingleValue(resolvedSearchParams.error);
  const saved = asSingleValue(resolvedSearchParams.saved);
  const activeSection = asSingleValue(resolvedSearchParams.section);
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-surface px-4 py-12 sm:px-6 md:px-8">
        <div className="mx-auto max-w-md rounded-[2rem] border border-outline-variant/20 bg-white p-8 shadow-[0_24px_60px_rgba(91,64,61,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">GLOBO ADMIN</p>
          <h1 className="mt-4 text-4xl font-black text-on-surface">Вход в админ-панель</h1>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">
            Пока используется простая авторизация с жесткой проверкой логина и пароля:
            <span className="font-semibold text-on-surface"> admin / admin</span>.
          </p>

          {error === "invalid_credentials" ? (
            <div className="mt-5 rounded-2xl border border-error/20 bg-error-container px-4 py-3 text-sm text-on-error-container">
              Неверный логин или пароль.
            </div>
          ) : null}

          <form action={loginAdmin} className="mt-6 space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-bold text-on-surface">Логин</span>
              <input
                name="username"
                type="text"
                defaultValue="admin"
                className="h-12 w-full rounded-2xl border border-outline-variant/25 bg-surface px-4 text-on-surface outline-none focus:border-primary"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-on-surface">Пароль</span>
              <input
                name="password"
                type="password"
                defaultValue="admin"
                className="h-12 w-full rounded-2xl border border-outline-variant/25 bg-surface px-4 text-on-surface outline-none focus:border-primary"
              />
            </label>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Войти
            </button>
          </form>
        </div>
      </main>
    );
  }

  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-surface px-4 py-8 sm:px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-[2rem] border border-outline-variant/20 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">GLOBO ADMIN</p>
              <h1 className="mt-3 text-4xl font-black text-on-surface">Управление контентом сайта</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-on-surface-variant">
                Все изменения сохраняются в локальный файл `data/site-content.json`. Публичные страницы читают
                этот источник, поэтому после сохранения контент сайта обновляется из админки.
              </p>
            </div>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex h-11 items-center rounded-full border border-outline-variant/25 bg-surface px-5 text-sm font-bold text-on-surface transition-colors hover:border-primary hover:text-primary"
              >
                Выйти
              </button>
            </form>
          </div>

          {saved ? (
            <div className="mt-5 rounded-2xl border border-primary/15 bg-primary-fixed px-4 py-3 text-sm text-on-secondary-fixed-variant">
              Блок <span className="font-bold">{saved}</span> сохранен.
            </div>
          ) : null}

          {error && error !== "auth" && error !== "invalid_credentials" ? (
            <div className="mt-5 rounded-2xl border border-error/20 bg-error-container px-4 py-3 text-sm text-on-error-container">
              Ошибка в секции <span className="font-bold">{activeSection ?? "unknown"}</span>:{" "}
              {decodeURIComponent(error)}
            </div>
          ) : null}
        </header>

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-outline-variant/20 bg-white p-5 shadow-sm">
            <p className="text-sm text-on-surface-variant">Магазины</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{content.shops.length}</p>
          </div>
          <div className="rounded-3xl border border-outline-variant/20 bg-white p-5 shadow-sm">
            <p className="text-sm text-on-surface-variant">Арендные лоты</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{content.rentals.length}</p>
          </div>
          <div className="rounded-3xl border border-outline-variant/20 bg-white p-5 shadow-sm">
            <p className="text-sm text-on-surface-variant">Тех. помещения</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{content.technicalSpaces.length}</p>
          </div>
          <div className="rounded-3xl border border-outline-variant/20 bg-white p-5 shadow-sm">
            <p className="text-sm text-on-surface-variant">Навигационных ссылок</p>
            <p className="mt-2 text-3xl font-black text-on-surface">{content.navigation.links.length}</p>
          </div>
        </div>

        <div className="grid gap-6">
          <AdminJsonSection
            title="Navigation"
            description="Верхнее меню, summary по графику работы и список расписаний."
            json={JSON.stringify(content.navigation, null, 2)}
            action={saveNavigationContent}
          />
          <AdminJsonSection
            title="Home"
            description="Контент главной страницы: hero, карточки, бренды, промо, новости и блок с адресом."
            json={JSON.stringify(content.home, null, 2)}
            action={saveHomeContent}
          />
          <AdminJsonSection
            title="Shops"
            description="Каталог магазинов и данные карточек на карте и в деталках."
            json={JSON.stringify(content.shops, null, 2)}
            action={saveShopsContent}
          />
          <AdminJsonSection
            title="Rentals"
            description="Список помещений под аренду, типы, цены, описания и изображения."
            json={JSON.stringify(content.rentals, null, 2)}
            action={saveRentalsContent}
          />
          <AdminJsonSection
            title="Technical Spaces"
            description="Технические помещения, которые отображаются на карте."
            json={JSON.stringify(content.technicalSpaces, null, 2)}
            action={saveTechnicalSpacesContent}
          />
        </div>
      </div>
    </main>
  );
}
