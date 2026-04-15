export function SiteFooter() {
  return (
    <footer className="bg-zinc-50 nodark:bg-zinc-900 w-full py-12 px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-1">
          <div className="text-xl font-black text-red-600 mb-6">GLOBO</div>
          <p className="text-zinc-600 nodark:text-zinc-400 text-sm font-medium mb-6">
            Ваш главный ориентир в мире шопинга и развлечений в центре Минска.
          </p>
          <div className="flex gap-4">
            <span
              className="material-symbols-outlined text-zinc-400 hover:text-red-600 cursor-pointer"
              data-icon="share"
            >
              share
            </span>
            <span
              className="material-symbols-outlined text-zinc-400 hover:text-red-600 cursor-pointer"
              data-icon="mail"
            >
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
  );
}

