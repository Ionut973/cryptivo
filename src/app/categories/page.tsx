import { prisma } from "@/lib/prisma";
import { getServerLang, getTranslations } from "@/lib/i18n";

export default async function CategoriesPage() {
  const lang = await getServerLang();
  const text = getTranslations(lang);

  const allCategories = await prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
  });

  function getTotalProducts(categoryId: string): number {
    const category = allCategories.find((c) => c.id === categoryId);
    const directProducts = category?._count.products || 0;

    const children = allCategories.filter((c) => c.parentId === categoryId);

    return (
      directProducts +
      children.reduce((sum, child) => sum + getTotalProducts(child.id), 0)
    );
  }

  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: {
        include: {
          _count: { select: { products: true } },
        },
        orderBy: { name: "asc" },
      },
      _count: { select: { products: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-16 text-white">
      <section className="relative mx-auto max-w-7xl">
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-green-400">
            CRYPTIVO CATEGORIES
          </p>

          <h1 className="mt-3 text-4xl font-black">
            {lang === "ru" ? "Категории" : lang === "ro" ? "Categorii" : "Browse Categories"}
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-zinc-400">
            {lang === "ru"
              ? "Изучайте товары с крипто оплатой и безопасной доставкой."
              : lang === "ro"
              ? "Explorează produse cu plată crypto și livrare securizată."
              : "Explore products with private checkout, crypto payment, and secure delivery."}
          </p>
        </div>

        <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const categoryName =
              lang === "ru"
                ? category.nameRu || category.name
                : lang === "ro"
                ? category.nameRo || category.name
                : category.nameEn || category.name;

            const totalProducts = getTotalProducts(category.id);

            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 transition hover:-translate-y-1 hover:border-green-500/60"
              >
                {category.imageUrl ? (
                  <img
                    src={category.imageUrl}
                    alt={categoryName}
                    className="h-28 w-full rounded-xl object-cover object-center"
                  />
                ) : (
                  <div className="flex h-28 w-full items-center justify-center rounded-xl bg-black/70 text-4xl text-green-400/80">
                    ₿
                  </div>
                )}

                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-green-400">
                    Category #{index + 1}
                  </p>

                  <h2 className="mt-1 truncate text-xl font-black group-hover:text-green-400">
                    {categoryName}
                  </h2>

                  <p className="mt-1 text-xs text-zinc-400">
                    {totalProducts}{" "}
                    {lang === "ru" ? "товаров" : lang === "ro" ? "produse" : "products"}
                  </p>
                </div>

                {category.children.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.children.slice(0, 4).map((child) => {
                      const childName =
                        lang === "ru"
                          ? child.nameRu || child.name
                          : lang === "ro"
                          ? child.nameRo || child.name
                          : child.nameEn || child.name;

                      return (
                        <a
                          key={child.id}
                          href={`/categories/${child.slug}`}
                          className="rounded-full border border-zinc-700 bg-black/70 px-2 py-1 text-xs text-zinc-300 transition hover:border-green-500 hover:text-green-400"
                        >
                          {childName}
                        </a>
                      );
                    })}
                  </div>
                )}

                <a
                  href={`/categories/${category.slug}`}
                  className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-xs font-black text-black transition hover:bg-green-400"
                >
                  {lang === "ru" ? "Открыть →" : lang === "ro" ? "Deschide →" : "Open →"}
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}