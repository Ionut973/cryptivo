import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CartQuantityButtons from "@/components/CartQuantityButtons";
import CheckoutButton from "@/components/CheckoutButton";
import CryptoFloating from "@/components/CryptoFloating";
import { getServerLang, getProductText, getTranslations } from "@/lib/i18n";

export default async function CartPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const user = verifyToken(token) as { id: string } | null;
  if (!user) redirect("/login");

  const lang = await getServerLang();
  const text = getTranslations(lang);

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: user.id },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-10 text-white">
      <section className="relative mx-auto max-w-7xl">
        <CryptoFloating />

        <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-7 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-green-400">
            CRYPTIVO CART
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">{text.basket}</h1>
              <p className="mt-2 text-sm text-zinc-400">
                {text.cartSubtitle}
              </p>
            </div>

            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-green-400">
                TOTAL
              </p>
              <p className="text-2xl font-black">${total.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-zinc-800 bg-black/70 p-4">
              <p className="text-2xl">₿</p>
              <p className="mt-1 text-sm font-bold">BTC</p>
              <p className="text-xs text-zinc-500">Crypto ready</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/70 p-4">
              <p className="text-2xl">Ξ</p>
              <p className="mt-1 text-sm font-bold">ETH</p>
              <p className="text-xs text-zinc-500">Secure checkout</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/70 p-4">
              <p className="text-2xl">₮</p>
              <p className="mt-1 text-sm font-bold">USDT</p>
              <p className="text-xs text-zinc-500">TRC20 payment</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/70 p-4">
              <p className="text-2xl">◎</p>
              <p className="mt-1 text-sm font-bold">SOL</p>
              <p className="text-xs text-zinc-500">Fast order</p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="relative z-10 mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-10 text-center shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-500/10 text-5xl">
              🛒
            </div>

            <h2 className="mt-5 text-3xl font-black">
              {text.emptyCartTitle}
            </h2><p className="mt-3 text-sm text-zinc-400">
              {text.emptyCartText}
            </p>

            <a
              href="/categories"
              className="mt-6 inline-block rounded-xl bg-white px-5 py-3 text-sm font-black text-black hover:bg-green-400"
            >
              {text.openCategory}
            </a>
          </div>
        ) : (
          <div className="relative z-10 mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
            <div className="space-y-3">
              {cartItems.map((item) => {
                const productName = getProductText(item.product, "name", lang);
                const shortDesc = getProductText(
                  item.product,
                  "descriptionShort",
                  lang
                );

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-xl transition hover:border-green-500/60"
                  >
                    <div className="flex gap-3">
                      <a href={`/product/${item.product.id}`}>
                        <img
                          src={item.product.imageUrl}
                          alt={productName}
                          className="h-24 w-24 rounded-xl object-cover"
                        />
                      </a>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-green-400">
                          {item.product.category?.name || text.noCategory}
                        </p>

                        <a href={`/product/${item.product.id}`}>
                          <h2 className="mt-1 line-clamp-1 text-lg font-black hover:text-green-400">
                            {productName}
                          </h2>
                        </a>

                        <p className="mt-1 line-clamp-2 text-xs text-zinc-400">
                          {shortDesc}
                        </p>

                        <p className="mt-2 text-xs text-green-400">
                          ₿ BTC • Ξ ETH • ₮ USDT • ◎ SOL
                        </p>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <CartQuantityButtons id={item.id} />

                            <span className="rounded-lg border border-zinc-700 bg-black px-3 py-1 text-sm font-black text-green-400">
                              {item.quantity}
                            </span>
                          </div>

                          <div className="text-right">
                            <p className="text-xs text-zinc-500">
                              {text.price}
                            </p>
                            <p className="text-xl font-black text-green-400">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-fit rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-green-400">
                ORDER SUMMARY
              </p>

              <h2 className="mt-3 text-2xl font-black">{text.checkout}</h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between border-b border-zinc-800 pb-3">
                  <span className="text-zinc-400">{text.products}</span>
                  <span className="font-bold">{totalQuantity}</span>
                </div>

                <div className="flex justify-between border-b border-zinc-800 pb-3">
                  <span className="text-zinc-400">Crypto</span><span className="font-bold text-green-400">
                    USDT / USDC
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Total</span>
                  <span className="text-2xl font-black text-green-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <CheckoutButton />
              </div>

              <p className="mt-4 text-center text-xs text-zinc-500">
                {text.cartSecureText}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}