import { prisma } from "@/lib/prisma";
import { getServerLang } from "@/lib/i18n";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lang = await getServerLang();

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      children: {
        include: {
          _count: {
            select: { products: true },
          },
        },
        orderBy: { name: "asc" },
      },
      parent: true,
      products: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
        Category not found
      </main>
    );
  }

  const categoryName =
    lang === "ru"
      ? category.nameRu || category.name
      : lang === "ro"
      ? category.nameRo || category.name
      : category.nameEn || category.name;

  const parentName = category.parent
    ? lang === "ru"
      ? category.parent.nameRu || category.parent.name
      : lang === "ro"
      ? category.parent.nameRo || category.parent.name
      : category.parent.nameEn || category.parent.name
    : "";

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-16 text-white">
      <section className="relative mx-auto max-w-7xl">
        <div className="absolute left-10 top-10 text-7xl text-green-400/10 animate-pulse">
          ₮
        </div>

        <div className="absolute right-20 top-32 text-7xl text-blue-400/10 animate-bounce">
          ₿
        </div>

        <div className="absolute left-1/2 top-56 text-6xl text-purple-400/10 animate-pulse">
          Ξ
        </div>

        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-green-400">
            CRYPTIVO CATEGORY
          </p>

          <h1 className="mt-3 text-4xl font-black">{categoryName}</h1>

          <p className="mt-3 text-sm text-zinc-400">
            {category.parent
              ? lang === "ru"
                ? `Внутри ${parentName}`
                : lang === "ro"
                ? `În ${parentName}`
                : `Inside ${parentName}`
              : lang === "ru"
              ? "Главная категория"
              : lang === "ro"
              ? "Categorie principală"
              : "Main category"}
          </p>
        </div>

        {category.children.length > 0 && (
          <div className="relative mt-8">
            <h2 className="text-2xl font-black">
              {lang === "ru"
                ? "Подкатегории"
                : lang === "ro"
                ? "Subcategorii"
                : "Subcategories"}
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {category.children.map((child) => {
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
                    className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition hover:-translate-y-1 hover:border-green-500/60"
                  >
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-500/10 blur-2xl" />

                    {child.imageUrl ? (
                      <img
                        src={child.imageUrl}
                        alt={childName}
                        className="h-24 w-full rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-24 w-full items-center justify-center rounded-xl bg-black text-4xl text-green-400">
                        ₮
                      </div>
                    )}

                    <h3 className="mt-3 truncate text-lg font-black group-hover:text-green-400">
                      {childName}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-400">
                      {child._count.products}{" "}
                      {lang === "ru"
                        ? "товаров"
                        : lang === "ro"
                        ? "produse"
                        : "products"}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <div className="relative mt-10">
          <h2 className="text-2xl font-black">
            {category.parent
              ? lang === "ru"
                ? `Товары: ${categoryName}`
                : lang === "ro"
                ? `Produse: ${categoryName}`
                : `${categoryName} products`
              : lang === "ru"
              ? "Товары"
              : lang === "ro"
              ? "Produse"
              : "Products"}
          </h2>

          {category.products.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
              {lang === "ru"
                ? "В этой категории пока нет товаров."
                : lang === "ro"
                ? "Încă nu există produse în această categorie."
                : "No products in this category yet."}
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {category.products.map((product) => {
                const productName =
                  lang === "ru"
                    ? product.nameRu || product.nameEn
                    : lang === "ro"
                    ? product.nameRo || product.nameEn
                    : product.nameEn;

                return (
                  <a
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-3 transition hover:-translate-y-1 hover:border-green-500/60"
                  >
                    <img
                      src={product.imageUrl}
                      alt={productName}
                      className="h-36 w-full rounded-xl object-cover"
                    />

                    <h3 className="mt-3 truncate text-lg font-black group-hover:text-green-400">
                      {productName}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-400">
                      {lang === "ru"
                        ? "В наличии"
                        : lang === "ro"
                        ? "Stoc"
                        : "Stock"}
                      : {product.stock}
                    </p>

                    <p className="mt-2 text-xl font-black text-green-400">
                      ${product.price}
                    </p>

                    <div className="mt-3 rounded-xl bg-white px-4 py-2 text-center text-xs font-black text-black transition group-hover:bg-green-400">
                      {lang === "ru"
                        ? "Смотреть товар →"
                        : lang === "ro"
                        ? "Vezi produsul →"
                        : "View product →"}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}