export default function Home() {
  return (
    <>
      {/*Top Navigation Bar*/}
      <nav className="fixed top-0 w-full z-50 bg-white/70 nodark:bg-zinc-950/70 backdrop-blur-xl shadow-[0px_10px_30px_rgba(183,19,26,0.06)]">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
          <div className="text-2xl font-black tracking-tighter text-red-600 nodark:text-red-500">
            GLOBO
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a
              className="text-zinc-800 nodark:text-zinc-200 font-medium hover:text-red-500 transition-colors duration-300"
              href="#"
            >
              Shops
            </a>
            <a
              className="text-zinc-800 nodark:text-zinc-200 font-medium hover:text-red-500 transition-colors duration-300"
              href="#"
            >
              Map
            </a>
            <a
              className="text-zinc-800 nodark:text-zinc-200 font-medium hover:text-red-500 transition-colors duration-300"
              href="#"
            >
              News
            </a>
            <a
              className="text-zinc-800 nodark:text-zinc-200 font-medium hover:text-red-500 transition-colors duration-300"
              href="#"
            >
              Contacts
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <input
                className="bg-surface-container-low border-none rounded-full px-6 py-2 w-64 focus:ring-2 focus:ring-primary/20 text-sm"
                placeholder="Search..."
                type="text"
              />
            </div>
            <button
              className="material-symbols-outlined text-on-surface hover:text-primary transition-colors duration-300"
              data-icon="language"
            >
              language
            </button>
          </div>
        </div>
      </nav>

      {/*Hero Section*/}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Main Lobby"
            className="w-full h-full object-cover"
            data-alt="Modern architectural interior of a luxury shopping mall with glass ceilings, sunlight streaming through, and high-end storefronts in the background"
            src="/globo/image-1.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-bold tracking-widest uppercase mb-6">
              Minsk, Belarus
            </span>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 text-on-surface">
              Globo — Твой центр <span className="text-primary italic">шопинга</span> и
              стиля
            </h1>
            <div className="flex flex-wrap gap-4">
              <a
                className="gradient-action text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg editorial-shadow"
                href="#"
              >
                Магазины
              </a>
              <a
                className="bg-surface-container-lowest text-on-surface px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-sm border border-outline-variant/10"
                href="#"
              >
                Карта ТЦ
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 right-8 hidden lg:flex items-center gap-4 text-primary font-bold">
          <span className="w-24 h-[2px] bg-primary"></span>
          <p className="text-sm tracking-widest uppercase">Explore the pulse</p>
        </div>
      </header>

      {/*Advantages Bento Grid*/}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/*Metro Card*/}
            <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl flex items-end justify-between overflow-hidden relative group">
              <div>
                <span
                  className="material-symbols-outlined text-5xl text-primary mb-4"
                  data-icon="directions_subway"
                >
                  directions_subway
                </span>
                <h3 className="text-2xl font-bold mb-2">Рядом с метро</h3>
                <p className="text-on-surface-variant">
                  Всего 2 минуты пешком от станции метро Михалово.
                </p>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-9xl" data-icon="map">
                  map
                </span>
              </div>
            </div>

            {/*Shops Card*/}
            <div className="bg-surface-container-high p-8 rounded-xl">
              <span
                className="material-symbols-outlined text-4xl text-primary mb-4"
                data-icon="shopping_bag"
              >
                shopping_bag
              </span>
              <h3 className="text-2xl font-bold mb-2">100+ Shops</h3>
              <p className="text-on-surface-variant text-sm">
                Мировые и локальные бренды в одном месте.
              </p>
            </div>

            {/*Parking Card*/}
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10">
              <span
                className="material-symbols-outlined text-4xl text-primary mb-4"
                data-icon="local_parking"
              >
                local_parking
              </span>
              <h3 className="text-2xl font-bold mb-2">Free Parking</h3>
              <p className="text-on-surface-variant text-sm">
                Просторный паркинг для вашего комфорта.
              </p>
            </div>

            {/*Food Card*/}
            <div className="md:col-span-4 bg-surface-container p-8 rounded-xl flex items-center justify-between">
              <div className="max-w-md">
                <h3 className="text-3xl font-bold mb-2">Cozy Cafes</h3>
                <p className="text-on-surface-variant">
                  Идеальное место для встреч с друзьями или перерыва во время шопинга.
                  Более 15 гастрономических точек.
                </p>
              </div>
              <div className="flex -space-x-4">
                <img
                  alt="Coffee"
                  className="w-16 h-16 rounded-full border-4 border-surface shadow-md object-cover"
                  data-alt="close-up of a steaming latte art in a white ceramic cup on a wooden table"
                  src="/globo/image-2.jpg"
                />
                <img
                  alt="Food"
                  className="w-16 h-16 rounded-full border-4 border-surface shadow-md object-cover"
                  data-alt="a plate of artisanal gourmet burgers and crispy fries served in a trendy modern restaurant"
                  src="/globo/image-3.jpg"
                />
                <img
                  alt="Dessert"
                  className="w-16 h-16 rounded-full border-4 border-surface shadow-md object-cover"
                  data-alt="assorted elegant pastries and desserts displayed in a luxury bakery window case"
                  src="/globo/image-4.jpg"
                />
                <div className="w-16 h-16 rounded-full border-4 border-surface shadow-md bg-primary-container flex items-center justify-center text-white font-bold">
                  +12
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Popular Shops Section*/}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                Популярные бренды
              </h2>
              <div className="w-20 h-1.5 bg-primary rounded-full"></div>
            </div>
            <a className="text-primary font-bold hover:underline mb-2" href="#">
              Все магазины →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/*Shop Card 1*/}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-surface-container-low">
                <img
                  alt="Fashion Brand"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  data-alt="High fashion clothing store display featuring minimalist mannequins in stylish autumn outfits with professional spotlighting"
                  src="/globo/image-5.jpg"
                />
              </div>
              <p className="text-xs tracking-widest uppercase text-on-surface-variant font-bold mb-1">
                Одежда &amp; Стиль
              </p>
              <h4 className="text-xl font-bold">Premium Fashion</h4>
            </div>

            {/*Shop Card 2*/}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-surface-container-low">
                <img
                  alt="Beauty Store"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  data-alt="Aesthetic beauty counter with high-end skincare bottles arranged elegantly on a glass shelf with soft ambient lighting"
                  src="/globo/image-6.jpg"
                />
              </div>
              <p className="text-xs tracking-widest uppercase text-on-surface-variant font-bold mb-1">
                Красота
              </p>
              <h4 className="text-xl font-bold">Glow Aesthetics</h4>
            </div>

            {/*Shop Card 3*/}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-surface-container-low">
                <img
                  alt="Shoes Shop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  data-alt="Modern sneaker wall featuring vibrant red and white athletic shoes on clean white floating shelves in a minimal store"
                  src="/globo/image-7.jpg"
                />
              </div>
              <p className="text-xs tracking-widest uppercase text-on-surface-variant font-bold mb-1">
                Обувь
              </p>
              <h4 className="text-xl font-bold">Stride Active</h4>
            </div>

            {/*Shop Card 4*/}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-surface-container-low">
                <img
                  alt="Watch Store"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  data-alt="Luxury watches displayed in a glass mahogany case under warm dramatic lighting, highlighting metallic and leather details"
                  src="/globo/image-8.jpg"
                />
              </div>
              <p className="text-xs tracking-widest uppercase text-on-surface-variant font-bold mb-1">
                Аксессуары
              </p>
              <h4 className="text-xl font-bold">Chronos Luxury</h4>
            </div>
          </div>
        </div>
      </section>

      {/*Sales & Offers Block*/}
      <section className="py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="gradient-action rounded-[2rem] p-12 md:p-20 relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-12">
            <div className="z-10 relative flex-1 text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none">
                Сезонные скидки до -70%
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-lg">
                Не упустите возможность обновить свой гардероб по самым выгодным
                ценам. Только в этом месяце в Globo!
              </p>
              <button className="bg-white text-primary px-12 py-5 rounded-full font-bold text-lg hover:bg-surface-container-low transition-colors shadow-xl">
                Смотреть предложения
              </button>
            </div>
            <div className="z-10 relative flex-1 hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 transform rotate-6 scale-110">
                <img
                  alt="Woman with shopping bags"
                  className="rounded-2xl"
                  data-alt="A stylish woman laughing and carrying several colorful luxury shopping bags in a sun-drenched upscale city district"
                  src="/globo/image-9.jpg"
                />
              </div>
            </div>

            {/*Abstract floating circle decor*/}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/*News Preview*/}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-black">События и новости</h2>
            <div className="flex-grow h-[1px] bg-outline-variant/30"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <article className="group">
              <div className="rounded-xl overflow-hidden mb-6 aspect-video">
                <img
                  alt="Bowling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  data-alt="vibrant neon interior of a bowling alley with illuminated lanes and glowing bowling balls"
                  src="/globo/image-10.jpg"
                />
              </div>
              <time className="text-sm font-bold text-primary mb-2 block">
                12 Октября, 2024
              </time>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                Открытие новой зоны развлечений
              </h3>
              <p className="text-on-surface-variant line-clamp-2">
                Теперь в Globo еще больше драйва! Открылся современный
                боулинг-центр с неоновым освещением...
              </p>
            </article>
            <article className="group">
              <div className="rounded-xl overflow-hidden mb-6 aspect-video">
                <img
                  alt="Bakery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  data-alt="close-up of colorful macarons in a fancy pink box on a white marble surface"
                  src="/globo/image-11.jpg"
                />
              </div>
              <time className="text-sm font-bold text-primary mb-2 block">
                8 Октября, 2024
              </time>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                Фестиваль десертов в эти выходные
              </h3>
              <p className="text-on-surface-variant line-clamp-2">
                Попробуйте лучшие десерты от шеф-кондитеров города. Мастер-классы и
                дегустации весь день!
              </p>
            </article>
            <article className="group">
              <div className="rounded-xl overflow-hidden mb-6 aspect-video">
                <img
                  alt="Style"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  data-alt="elegant evening dresses on gold racks in a brightly lit fashion showroom"
                  src="/globo/image-12.jpg"
                />
              </div>
              <time className="text-sm font-bold text-primary mb-2 block">
                3 Октября, 2024
              </time>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                Fashion Week: Итоги показов
              </h3>
              <p className="text-on-surface-variant line-clamp-2">
                Рассказываем о главных трендах сезона, которые уже можно найти в
                магазинах нашего центра.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/*Visit CTA & Map*/}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              Ждем вас <br /> в Globo
            </h2>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <span
                  className="material-symbols-outlined text-primary p-3 bg-white rounded-xl editorial-shadow"
                  data-icon="location_on"
                >
                  location_on
                </span>
                <div>
                  <p className="font-bold text-lg">Адрес</p>
                  <p className="text-on-surface-variant">
                    ул. Уманская, 54, Минск, Беларусь
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span
                  className="material-symbols-outlined text-primary p-3 bg-white rounded-xl editorial-shadow"
                  data-icon="schedule"
                >
                  schedule
                </span>
                <div>
                  <p className="font-bold text-lg">Режим работы</p>
                  <p className="text-on-surface-variant">Ежедневно: 10:00 — 22:00</p>
                </div>
              </div>
            </div>
            <button className="gradient-action text-white px-12 py-5 rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-xl">
              <span className="material-symbols-outlined" data-icon="near_me">
                near_me
              </span>
              Построить маршрут
            </button>
          </div>
          <div className="rounded-3xl overflow-hidden h-[500px] shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-700 border-8 border-white">
            <img
              alt="Map"
              className="w-full h-full object-cover"
              data-alt="Stylized top-down street map view with clean minimalist design and a red marker pin on a specific building"
              data-location="Minsk"
              src="/globo/image-13.jpg"
            />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/*Footer*/}
      <footer className="bg-zinc-50 nodark:bg-zinc-900 w-full py-12 px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="col-span-1 md:col-span-1">
            <div className="text-xl font-black text-red-600 mb-6">GLOBO</div>
            <p className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium mb-6">
              Ваш главный ориентир в мире шопинга и развлечений в центре Минска.
            </p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-zinc-400 hover:text-red-600 cursor-pointer" data-icon="share">
                share
              </span>
              <span className="material-symbols-outlined text-zinc-400 hover:text-red-600 cursor-pointer" data-icon="mail">
                mail
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Посетителям</h4>
            <ul className="space-y-4">
              <li>
                <a
                  className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium hover:underline hover:text-red-500"
                  href="#"
                >
                  Hours of Operation
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium hover:underline hover:text-red-500"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium hover:underline hover:text-red-500"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Магазины</h4>
            <ul className="space-y-4">
              <li>
                <a
                  className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium hover:underline hover:text-red-500"
                  href="#"
                >
                  Fashion &amp; Style
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium hover:underline hover:text-red-500"
                  href="#"
                >
                  Food &amp; Drinks
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium hover:underline hover:text-red-500"
                  href="#"
                >
                  Electronics
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Инфо</h4>
            <ul className="space-y-4">
              <li>
                <a
                  className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium hover:underline hover:text-red-500"
                  href="#"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium hover:underline hover:text-red-500"
                  href="#"
                >
                  Arenda
                </a>
              </li>
              <li>
                <a
                  className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium hover:underline hover:text-red-500"
                  href="#"
                >
                  Career
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-zinc-200 nodark:border-zinc-800 text-center">
          <p className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium">
            © 2024 Globo Shopping Center. All rights reserved.
          </p>
        </div>
      </footer>

      {/*FAB*/}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="gradient-action text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform editorial-shadow">
          <span
            className="material-symbols-outlined text-3xl"
            data-icon="chat_bubble"
            data-weight="fill"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            chat_bubble
          </span>
        </button>
      </div>
    </>
  );
}
