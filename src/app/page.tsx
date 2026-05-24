import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";
import BuyNowButton from "@/components/BuyNowButton";
import FavoriteButton from "@/components/FavoriteButton";
import CopyReferralButton from "@/components/CopyReferralButton";
import { getServerLang, getTranslations } from "@/lib/i18n";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  const lang = await getServerLang();
  const text = getTranslations(lang);

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
      <section className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center px-6 py-24">
        <div className="absolute left-20 top-24 text-5xl opacity-20 animate-pulse">₿</div>
        <div className="absolute right-28 top-28 text-4xl opacity-30 animate-bounce">₮</div>
        <div className="absolute bottom-28 left-1/2 text-5xl opacity-20 animate-pulse">◎</div>

        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute right-10 top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 grid w-full items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 text-xl font-black text-black">
                C
              </div>
              <span className="text-sm uppercase tracking-[0.3em] text-zinc-300">
                CRYPTIVO
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-tight sm:text-6xl md:text-7xl">
              Premium anonymous online store
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Buy products securely with fast delivery, private orders, account
              tracking, favorites, and exclusive discounts.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/categories"
                className="rounded-2xl bg-white px-7 py-4 text-center font-semibold text-black transition hover:scale-105"
              >
                Browse Categories
              </a>

              <a
                href="/welcome-deals"
                className="rounded-2xl border border-zinc-700 px-7 py-4 text-center font-semibold transition hover:bg-zinc-900"
              >
                View Discounts
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                <p className="text-2xl">🕶</p>
                <h3 className="mt-3 font-bold">Anonymous Orders</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Private checkout and discreet delivery options.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                <p className="text-2xl">⚡️</p>
                <h3 className="mt-3 font-bold">Fast Delivery</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Quick order processing and tracking.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                <p className="text-2xl">🔐</p>
                <h3 className="mt-3 font-bold">Secure Shopping</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Account system, support, and protected orders.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 text-5xl opacity-40 animate-bounce">🪙</div>
            <div className="absolute -right-4 top-16 text-4xl opacity-50 animate-pulse">₮</div>
            <div className="absolute bottom-6 right-10 text-5xl opacity-30 animate-bounce">₿</div>

            <div className="rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-6 shadow-2xl">
              <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950 p-8">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">
                    Live store
                  </span>
                  <span className="text-zinc-500">CRYPTIVO AI</span>
                </div>

                <div className="mt-10 flex min-h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500/20 via-blue-500/10 to-zinc-900 p-8">
                  <div className="text-center">
                    <div className="mx-auto flex h-32 w-32 animate-pulse items-center justify-center rounded-[2rem] bg-gradient-to-br from-green-400 to-blue-500 text-6xl font-black text-black shadow-2xl">
                      ₮
                    </div>

                    <p className="mt-6 text-2xl font-black">
                      USDT ready shopping
                    </p>

                    <p className="mt-2 text-zinc-400">
                      Buy USDT once — shop faster on Cryptivo
                    </p>

                    <a
                      href="https://www.binance.com/register?ref=JFGA05SG"
                      target="_blank"
                      className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-bold text-black transition hover:scale-105 hover:bg-green-400"
                    >
                      Get USDT on Binance →
                    </a>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="rounded-2xl bg-zinc-900 p-4">
                    <p className="font-bold text-green-400">USDT</p>
                    <p className="text-zinc-400">Payment</p>
                  </div>
                  <div className="rounded-2xl bg-zinc-900 p-4">
                    <p className="font-bold text-green-400">Fast</p>
                    <p className="text-zinc-400">Delivery</p>
                  </div>
                  <div className="rounded-2xl bg-zinc-900 p-4">
                    <p className="font-bold text-green-400">Safe</p>
                    <p className="text-zinc-400">Orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REFERRAL PROGRAM */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="relative overflow-hidden rounded-[32px] border border-green-500/20 bg-gradient-to-br from-zinc-900 to-black p-8 shadow-2xl">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-green-400">
                {text.referralProgram}
              </p>

              <h2 className="mt-5 text-5xl font-black leading-tight text-white">
                {text.bringPeople}
                <br />
                {text.andEarn}{" "}
                <span className="text-green-400">1000 USDT</span>
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">
                {text.referralText}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <CopyReferralButton />

                <a
                  href="/register?ref=CRYPTIVO777"
                  className="rounded-2xl border border-zinc-700 px-8 py-4 text-sm font-black text-white transition hover:border-green-400 hover:bg-green-500/10 hover:text-green-400"
                >
                  {text.startEarning}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-zinc-800 bg-black/60 p-6">
                <p className="text-4xl">💸</p>
                <h3 className="mt-4 text-2xl font-black">1000 USDT</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {text.referralReward}
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-black/60 p-6">
                <p className="text-4xl">👥</p>
                <h3 className="mt-4 text-2xl font-black">
                  6 {text.users}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {text.invitedCustomers}
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-black/60 p-6">
                <p className="text-4xl">⚡</p>
                <h3 className="mt-4 text-2xl font-black">
                  {text.instantPayout}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {text.rewardsSent}
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-black/60 p-6">
                <p className="text-4xl">₿</p>
                <h3 className="mt-4 text-2xl font-black">
                  {text.cryptoRewards}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  BTC • ETH • USDT • SOL
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-green-400">
              New arrivals
            </p>
            <h2 className="mt-2 text-4xl font-black">Latest Drops</h2>
            <p className="mt-2 text-zinc-400">
              Fresh products recently added to Cryptivo.
            </p>
          </div>

          <a
            href="/categories"
            className="rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            View all
          </a>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
            No products yet.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => {
              const hasDiscount =
                product.isWelcomeDeal && product.welcomeDiscount > 0;

              const discountedPrice = hasDiscount
                ? product.price -
                  (product.price * product.welcomeDiscount) / 100
                : product.price;

              return (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 transition hover:-translate-y-1 hover:border-green-500/50 hover:shadow-2xl"
                >
                  <a href={`/product/${product.id}`}>
                    <img
                      src={product.imageUrl || "/placeholder.png"}
                      alt={product.nameEn}
                      className="h-40 w-full object-cover transition group-hover:scale-105"
                    />
                  </a>

                  <div className="p-4">
                    <a href={`/product/${product.id}`}>
                      <h3 className="line-clamp-2 text-base font-bold hover:text-green-400">
                        {product.nameEn}
                      </h3>
                    </a>

                    <div className="mt-3">
                      {hasDiscount ? (
                        <>
                          <p className="text-xs text-zinc-500 line-through">
                            ${product.price}
                          </p>
                          <p className="text-lg font-black text-green-400">
                            ${discountedPrice.toFixed(2)}
                          </p>
                          <p className="text-xs text-green-500">
                            -{product.welcomeDiscount}%
                          </p>
                        </>
                      ) : (
                        <p className="text-lg font-black">${product.price}</p>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <AddToCartButton productId={product.id} />
                      <BuyNowButton productId={product.id} />
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