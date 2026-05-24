import CryptoFloating from "@/components/CryptoFloating";
import CheckoutDeliveryForm from "@/components/CheckoutDeliveryForm";
import { getServerLang, getTranslations } from "@/lib/i18n";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ productId?: string }>;
}) {
  const { productId } = await searchParams
  const lang = await getServerLang();
  const text = getTranslations(lang);

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-10 text-white">
      <section className="relative mx-auto max-w-6xl">
        <CryptoFloating />

        <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-48 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="pointer-events-none absolute left-8 top-24 text-5xl text-green-400/10 animate-pulse">₮</div>
        <div className="pointer-events-none absolute right-12 top-40 text-5xl text-yellow-400/10 animate-bounce">₿</div>
        <div className="pointer-events-none absolute bottom-20 left-20 text-5xl text-blue-400/10 animate-pulse">Ξ</div>
        <div className="pointer-events-none absolute bottom-28 right-24 text-5xl text-purple-400/10 animate-bounce">◎</div>

        <div className="relative z-10 rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-7 shadow-2xl">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-green-400">
                CRYPTIVO CHECKOUT
              </p>

              <h1 className="mt-3 text-4xl font-black">
                {text.checkoutDeliveryTitle}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                {text.checkoutDeliverySubtitle}
              </p>
            </div>

            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.25em] text-green-400">
                Crypto
              </p>
              <p className="mt-1 text-xl font-black">USDT / USDC</p>
            </div>
          </div>

          <div className="mb-7 grid gap-3 sm:grid-cols-4">
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

          <CheckoutDeliveryForm text={text} productId={productId} />
        </div>
      </section>
    </main>
  );
}