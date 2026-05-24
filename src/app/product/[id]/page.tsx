import { prisma } from "@/lib/prisma";
import ProductGallery from "@/components/ProductGallery";
import ProductColorPicker from "@/components/ProductColorPicker";
import { getServerLang, getProductText, getTranslations } from "@/lib/i18n";
import ProductOptionsBuyBox from "@/components/ProductOptionsBuyBox";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const lang = await getServerLang();
  const text = getTranslations(lang);

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
        Product not found
      </main>
    );
  }

  const productName = getProductText(product, "name", lang);
  const shortDesc = getProductText(product, "descriptionShort", lang);
  const fullDesc = getProductText(product, "descriptionFull", lang);

  const images =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls
      : [product.imageUrl];

  const details = (fullDesc || "")
    .split("\n")
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0);

  const coins = [
    "₿ BTC", "Ξ ETH", "₮ USDT", "◎ SOL", "BNB", "XRP",
    "TON", "ADA", "AVAX", "DOT", "MATIC", "ARB", "EGLD", "FIL",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-10 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,255,77,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_35%)]" />

      {coins.map((coin, i) => (
        <div
          key={coin}
          className="pointer-events-none absolute hidden rounded-xl border border-green-400/10 bg-white/5 px-3 py-2 text-xs font-black text-green-300/30 backdrop-blur-xl md:block"
          style={{
            left: `${8 + ((i * 17) % 80)}%`,
            top: `${10 + ((i * 23) % 75)}%`,
            animation: `floatCoin ${3 + (i % 5)}s ease-in-out infinite`,
          }}
        >
          {coin}
        </div>
      ))}

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-6 rounded-[1.5rem] border border-zinc-800 bg-zinc-900/70 p-5 shadow-2xl backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-green-400">
            CRYPTIVO PRODUCT
          </p>
          <h1 className="mt-2 text-2xl font-black sm:text-4xl">
            Crypto checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_0.8fr]">
          <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-900/80 p-4 shadow-2xl backdrop-blur-xl">
            <div className="w-full rounded-[1.25rem] bg-black p-3">
  <ProductGallery images={images} name={productName} />
</div>
          </div>

          <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
            <p className="inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-green-400">
              {product.category?.name || "No category"}
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              {productName}
            </h2>

            <p className="mt-4 text-base leading-7 text-zinc-300">
              {shortDesc}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800 bg-black/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Price
                </p>
                <p className="mt-2 text-2xl font-black text-green-300">
                  ${product.price}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {text.stock}
                </p>
                <p className="mt-2 text-2xl font-black">{product.stock}</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Pay
                </p>
                <p className="mt-2 text-sm font-black text-green-300">
                  BTC · ETH · USDT · SOL
                </p>
              </div>
            </div>

            

            <ProductOptionsBuyBox
  productId={product.id}
  colors={
    Array.isArray(product.colors)
      ? product.colors.join(",")
      : product.colors || ""
  }
  sizes={product.size || ""}
/>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800 bg-black/60 p-4 text-center">
                <p className="text-2xl">🔐</p>
                <p className="mt-2 text-sm font-bold">Private payment</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black/60 p-4 text-center">
                <p className="text-2xl">⚡</p>
                <p className="mt-2 text-sm font-bold">Fast checkout</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black/60 p-4 text-center">
                <p className="text-2xl">📦</p>
                <p className="mt-2 text-sm font-bold">Tracked order</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-green-400">
            FULL SPECIFICATION
          </p>
          

          <h2 className="mt-3 text-3xl font-black">{text.productDetails}</h2>

          <div className="mt-6 grid gap-4">
            {details.length === 0 ? (
              <p className="rounded-2xl border border-zinc-800 bg-black/60 p-5 text-zinc-400">
                {text.noDetails}
              </p>
            ) : (
              details.map((line: string, index: number) => {
                const [key, ...valueParts] = line.split(":");
                const value = valueParts.join(":").trim();

                return (
                  <div
                    key={index}
                    className="grid gap-3 rounded-2xl border border-zinc-800 bg-black/60 p-5 transition hover:border-green-500/30 hover:bg-green-500/5 sm:grid-cols-3"
                  >
                    <p className="font-bold text-green-300">{key}</p>
                    <p className="text-zinc-300 sm:col-span-2">
                      {value || line}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <style>
        {`
          @keyframes floatCoin {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: .35; }
            50% { transform: translateY(-18px) rotate(6deg); opacity: .75; }
          }
        `}
      </style>
    </main>
  );
}