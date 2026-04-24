export function MainContentSections() {
  return (
    <>
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
            src="/media/shops/fresh-market-logo.jpg"
          />
          <img
            alt="Food"
            className="w-16 h-16 rounded-full border-4 border-surface shadow-md object-cover"
            data-alt="a plate of artisanal gourmet burgers and crispy fries served in a trendy modern restaurant"
            src="/media/shops/fresh-market-cover.jpg"
          />
          <img
            alt="Dessert"
            className="w-16 h-16 rounded-full border-4 border-surface shadow-md object-cover"
            data-alt="assorted elegant pastries and desserts displayed in a luxury bakery window case"
            src="/media/shops/kids-planet-cover.jpg"
          />
          <div className="w-16 h-16 rounded-full border-4 border-surface shadow-md bg-primary-container flex items-center justify-center text-white font-bold">
            +12
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

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
            src="/media/shops/premium-fashion-cover.jpg"
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
            src="/media/shops/glow-aesthetics-cover.jpg"
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
            src="/media/shops/tech-point-cover.jpg"
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
            src="/media/shops/chronos-luxury-cover.jpg"
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
            src="/media/home/sale-campaign.jpg"
          />
        </div>
      </div>

      {/*Abstract floating circle decor*/}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
    </div>
  </div>
</section>

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
            src="/media/home/event-bowling.jpg"
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
            src="/media/home/event-desserts.jpg"
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
            src="/media/home/event-fashion.jpg"
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
        src="/media/home/location-map.jpg"
      />
      <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
    </div>
  </div>
</section>
    </>
  );
}
