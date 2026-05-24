import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";
import BuyNowButton from "@/components/BuyNowButton";
import FavoriteButton from "@/components/FavoriteButton";
import CryptoFloating from "@/components/CryptoFloating";
import { getServerLang, getProductText, getTranslations } from "@/lib/i18n";

export default async function WelcomeDealsPage() {
  const lang = await getServerLang();
  const text = getTranslations(lang);

  const products = await prisma.product.findMany({
    where: {
      isWelcomeDeal: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-10 text-white">
      <section className="relative mx-auto max-w-7xl">
        <CryptoFloating />

        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-32 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative z-10 rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-7 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-green-400">
                CRYPTIVO DEALS
              </p>

              <h1 className="mt-3 text-4xl font-black">
                {text.discountDealsTitle}
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-zinc-400">
                {text.discountDealsSubtitle}
              </p>
            </div>

            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-green-400">
                USDT / USDC
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                -{text.discount}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-zinc-800 bg-black/70 p-4">
              <p className="text-2xl">₿</p>
              <p className="mt-1 text-sm font-bold">BTC</p>
              <p className="text-xs text-zinc-500">Crypto checkout</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/70 p-4">
              <p className="text-2xl">Ξ</p>
              <p className="mt-1 text-sm font-bold">ETH</p>
              <p className="text-xs text-zinc-500">Secure payments</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/70 p-4">
              <p className="text-2xl">₮</p>
              <p className="mt-1 text-sm font-bold">USDT</p>
              <p className="text-xs text-zinc-500">TRC20 network</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/70 p-4">
              <p className="text-2xl">◎</p>
              <p className="mt-1 text-sm font-bold">SOL</p>
              <p className="text-xs text-zinc-500">Fast orders</p>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="relative z-10 mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-10 text-center">
            <p className="text-5xl">🏷️</p>
            <h2 className="mt-4 text-2xl font-black">
              {text.noDiscountsTitle}
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              {text.noDiscountsText}
            </p>
          </div>
        ) : (
          <div className="relative z-10 mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const productName = getProductText(product, "name", lang);
              const shortDesc = getProductText(
                product,
                "descriptionShort",lang
              );

              const oldPrice = product.price;
              const discount = product.welcomeDiscount || 0;
              const newPrice =
                discount > 0
                  ? oldPrice - (oldPrice * discount) / 100
                  : oldPrice;

              return (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-xl transition hover:-translate-y-1 hover:border-green-500/60"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-green-500/10 blur-2xl transition group-hover:bg-green-500/20" />

                  <div className="absolute left-3 top-3 z-10 rounded-full border border-green-500/30 bg-black/80 px-3 py-1 text-xs font-black text-green-400">
                    -{discount}%
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
                      <h2 className="mt-1 line-clamp-1 text-lg font-black group-hover:text-green-400">
                        {productName}
                      </h2>
                    </a>

                    <p className="mt-1 line-clamp-2 min-h-[36px] text-xs text-zinc-400">
                      {shortDesc}
                    </p>

                    <div className="mt-3 flex items-end gap-2">
                      <p className="text-xl font-black text-green-400">
                        ${newPrice.toFixed(2)}
                      </p>

                      {discount > 0 && (
                        <p className="text-sm text-zinc-500 line-through">
                          ${oldPrice}
                        </p>
                      )}
                    </div>

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