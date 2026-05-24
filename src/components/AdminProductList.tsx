"use client";
import WelcomeDealButton from "@/components/WelcomeDealButton";

type Product = any;

export default function AdminProductList({
  products,
}: {
  products: Product[];
}) {
  async function deleteProduct(id: string) {
    const confirmDelete = confirm("Удалить товар?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Товар удалён");
      window.location.reload();
    } else {
      alert("Ошибка удаления");
    }
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Products</h2>

      <div className="mt-4 space-y-3">
        {products.length === 0 ? (
          <p className="text-zinc-400">No products yet.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div>
                <h3 className="font-semibold">{product.nameEn}</h3>

                <p className="text-sm text-zinc-400">
                  ${product.price} · Stock: {product.stock} ·{" "}
                  {product.category?.name || "No category"}
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={`/admin/products/${product.id}/edit`}
                  className="rounded-lg border border-zinc-700 px-3 py-2 text-sm"
                >
                  Edit
                </a>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
                >
                  Delete
                </button>

                <WelcomeDealButton
                  id={product.id}
                  isWelcomeDeal={product.isWelcomeDeal}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}