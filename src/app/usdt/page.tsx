export default function UsdtPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-20 text-white">
      <section className="relative mx-auto max-w-6xl">
        <div className="absolute left-10 top-10 text-7xl opacity-10 animate-pulse">
          ₿
        </div>
        <div className="absolute right-10 top-20 text-7xl opacity-20 animate-bounce">
          ₮
        </div>
        <div className="absolute -left-24 top-40 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-0 top-60 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-green-400">
            CRYPTIVO PAY
          </p>

          <h1 className="mt-4 text-5xl font-black">
            Get crypto for shopping
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Buy USDT or USDC and use it for fast private orders on Cryptivo.
          </p>
        </div>

        <div className="relative mt-8 grid gap-5 md:grid-cols-3">
          <a
            href="https://www.binance.com/register?ref=JFGA05SG"
            target="_blank"
            className="group rounded-3xl border border-zinc-800 bg-black p-6 transition hover:-translate-y-1 hover:border-yellow-400"
          >
            <div className="text-6xl transition group-hover:scale-110">₮</div>
            <h2 className="mt-5 text-2xl font-black">Buy USDT</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Register on Binance and buy USDT for Cryptivo payments.
            </p>
            <button className="mt-6 rounded-2xl bg-yellow-400 px-5 py-3 font-black text-black">
              Start on Binance
            </button>
          </a>

          <a
            href="https://www.binance.com/register?ref=JFGA05SG"
            target="_blank"
            className="group rounded-3xl border border-zinc-800 bg-black p-6 transition hover:-translate-y-1 hover:border-green-400"
          >
            <div className="text-6xl transition group-hover:scale-110">💵</div>
            <h2 className="mt-5 text-2xl font-black">Buy USDC</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              USDC is also supported for TRC20 crypto payments.
            </p>
            <button className="mt-6 rounded-2xl bg-green-500 px-5 py-3 font-black text-black">
              Get USDC
            </button>
          </a>

          <div className="rounded-3xl border border-zinc-800 bg-black p-6">
            <div className="text-6xl">₿</div>
            <h2 className="mt-5 text-2xl font-black">BTC / ETH</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Coming later. For now Cryptivo payments are focused on USDT / USDC
              TRC20.
            </p>
            <a
              href="/categories"
              className="mt-6 inline-block rounded-2xl border border-zinc-700 px-5 py-3 font-black hover:bg-zinc-900"
            >
              Back to shop
            </a>
          </div>
        </div>

        <div className="relative mt-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-6 text-yellow-300">
          ⚠️ For payment on Cryptivo, send only <b>USDT or USDC on TRC20</b>.
          Other networks can cause lost funds.
        </div>
      </section>
    </main>
  );
}