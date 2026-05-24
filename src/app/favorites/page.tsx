import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import BuyNowButton from "@/components/BuyNowButton";
import CryptoFloating from "@/components/CryptoFloating";
import { getServerLang, getProductText, getTranslations } from "@/lib/i18n";

export default async function FavoritesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const user = verifyToken(token) as { id: string } | null;

  if (!user) redirect("/login");

  const lang = await getServerLang();
  const text = getTranslations(lang);

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
    
  });

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-10 text-white">
      <section className="relative mx-auto max-w-7xl">
        <CryptoFloating />

        <div className="pointer-events-none absolute left-8 top-28 text-5xl text-pink-400/10 animate-bounce">
          ♥️
        </div>
        <div className="pointer-events-none absolute right-20 top-56 text-6xl text-red-400/10 animate-pulse">
          ♥️
        </div>
        <div className="pointer-events-none absolute bottom-24 left-1/2 text-5xl text-pink-300/10 animate-bounce">
          ♥️
        </div>

        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative z-10 rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-7 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-pink-400">
            CRYPTIVO FAVORITES
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">{text.favorites}</h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                {text.favoritesSubtitle}
              </p>
            </div>

            <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 px-5 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-pink-400">
                Saved
              </p>
              <p className="text-2xl font-black">{favorites.length}</p>
            </div>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="relative z-10 mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-10 text-center shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-500/10 text-5xl">
              ♥️
            </div>

            <h2 className="mt-5 text-3xl font-black">
              {text.noFavoritesTitle}
            </h2>

            <p className="mt-3 text-sm text-zinc-400">
              {text.noFavoritesText}
            </p>

            <a
              href="/categories"
              className="mt-6 inline-block rounded-xl bg-white px-5 py-3 text-sm font-black text-black hover:bg-green-400"
            >
              {text.openCategory}
            </a>
          </div>
        ) : (
          <div className="relative z-10 mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {favorites.map((favorite) => {
              const product = favorite.product;
              const productName = getProductText(product, "name", lang);
              const shortDesc = getProductText(
                product,
                "descriptionShort",
                lang
              );

              return (
                <div
                  key={favorite.id}className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-xl transition hover:-translate-y-1 hover:border-pink-500/60"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-500/10 blur-2xl transition group-hover:bg-pink-500/20" />

                  <div className="absolute left-3 top-3 z-10 rounded-full border border-pink-500/30 bg-black/80 px-3 py-1 text-xs font-black text-pink-400">
                    ♥️ Favorite
                  </div>

                  <a href={`/product/${product.id}`}>
                    <img
                      src={product.imageUrl}
                      alt={productName}
                      className="h-36 w-full rounded-xl object-cover transition group-hover:scale-[1.03]"
                    />
                  </a>

                  <div className="mt-3">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-green-400">
                      {product.category?.name || text.noCategory}
                    </p>

                    <a href={`/product/${product.id}`}>
                      <h2 className="mt-1 line-clamp-1 text-lg font-black group-hover:text-pink-400">
                        {productName}
                      </h2>
                    </a>

                    <p className="mt-1 line-clamp-2 min-h-[36px] text-xs text-zinc-400">
                      {shortDesc}
                    </p>

                    <p className="mt-3 text-xl font-black text-green-400">
                      ${product.price}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {text.stock}: {product.stock}
                    </p>

                    <p className="mt-2 text-xs text-green-400">
                      ₿ BTC • Ξ ETH • ₮ USDT • ◎ SOL
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <AddToCartButton productId={product.id} />
                      <BuyNowButton productId={product.id} />
                    </div>

                    <div className="mt-2">
                      <FavoriteButton productId={product.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}