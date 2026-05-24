import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import BuyNowButton from "@/components/BuyNowButton";
export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold">Shop</h1>
        <p className="mt-2 text-zinc-400">Browse Cryptivo products.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.length === 0 ? (
            <p className="text-zinc-400">No products yet.</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
              >
                <a href={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.nameEn}
                    className="h-64 w-full object-cover"
                  />
                </a>

                <div className="p-4">
                  <a href={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold hover:underline">
                      {product.nameEn}
                    </h3>
                  </a>

                  <p className="mt-2 text-zinc-400">${product.price}</p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <AddToCartButton productId={product.id} />
                    <BuyNowButton productId={product.id} />
                    <FavoriteButton productId={product.id} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}