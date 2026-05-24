"use client";

import { useState } from "react";

export default function EditProductForm({
  product,
  categories = [],
}: any) {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(product.imageUrls || []);

  async function uploadImages(files: FileList) {
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Image upload error");
        return;
      }

      const data = await res.json();
      uploaded.push(data.url);
    }

    setImageUrls((prev) => [...prev, ...uploaded]);
  }

  function removeImage(url: string) {
    setImageUrls((prev) => prev.filter((item) => item !== url));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch(`/api/admin/products/${product.id}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nameEn: data.get("nameEn"),
        nameRu: data.get("nameRu"),
        nameRo: data.get("nameRo"),

        descriptionEn: data.get("descriptionShortEn"),
        descriptionRu: data.get("descriptionShortRu"),
        descriptionRo: data.get("descriptionShortRo"),

        descriptionShortEn: data.get("descriptionShortEn"),
        descriptionShortRu: data.get("descriptionShortRu"),
        descriptionShortRo: data.get("descriptionShortRo"),

        descriptionFullEn: data.get("descriptionFullEn"),
        descriptionFullRu: data.get("descriptionFullRu"),
        descriptionFullRo: data.get("descriptionFullRo"),

        price: data.get("price"),
        stock: data.get("stock"),
        categoryId: data.get("categoryId"),

        colors: data.get("colors")?.toString() || "",
        size: data.get("size")?.toString() || "",

        imageUrl: imageUrls[0] || "",
        imageUrls,
      }),
    });

    if (res.ok) {
      alert("Товар обновлён");
      window.location.reload();
    } else {
      alert(await res.text());
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <input name="nameEn" defaultValue={product.nameEn} placeholder="Name EN" className="rounded-xl border border-zinc-700 bg-black p-3" />
        <input name="nameRu" defaultValue={product.nameRu} placeholder="Name RU" className="rounded-xl border border-zinc-700 bg-black p-3" />
        <input name="nameRo" defaultValue={product.nameRo} placeholder="Name RO" className="rounded-xl border border-zinc-700 bg-black p-3" />
      </div>

      <input
        name="size"
        defaultValue={product.size || ""}
        placeholder="Sizes (S,M,L or 41,42,43)"
        className="mt-4 w-full rounded-xl border border-zinc-700 bg-black p-4"
      />

      <input
        name="colors"
        defaultValue={Array.isArray(product.colors) ? product.colors.join(", ") : ""}
        placeholder="Colors (Black, White, Red)"
        className="mt-4 w-full rounded-xl border border-zinc-700 bg-black p-4"
      />

      <div className="mt-6">
        <h3 className="mb-3 font-semibold">Short description</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <textarea name="descriptionShortEn" defaultValue={product.descriptionShortEn} rows={4} className="rounded-xl border border-zinc-700 bg-black p-3" />
          <textarea name="descriptionShortRu" defaultValue={product.descriptionShortRu} rows={4} className="rounded-xl border border-zinc-700 bg-black p-3" />
          <textarea name="descriptionShortRo" defaultValue={product.descriptionShortRo} rows={4} className="rounded-xl border border-zinc-700 bg-black p-3" />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-semibold">Full product details</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <textarea name="descriptionFullEn" defaultValue={product.descriptionFullEn} rows={8} className="rounded-xl border border-zinc-700 bg-black p-3" />
          <textarea name="descriptionFullRu" defaultValue={product.descriptionFullRu} rows={8} className="rounded-xl border border-zinc-700 bg-black p-3" />
          <textarea name="descriptionFullRo" defaultValue={product.descriptionFullRo} rows={8} className="rounded-xl border border-zinc-700 bg-black p-3" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <input name="price" defaultValue={product.price} placeholder="Price" className="rounded-xl border border-zinc-700 bg-black p-3" />

        <select name="categoryId" defaultValue={product.categoryId || ""} className="rounded-xl border border-zinc-700 bg-black p-3">
          <option value="">No category</option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.nameRo || category.nameEn || category.nameRu || category.name}
            </option>
          ))}
        </select>

        <input name="stock" defaultValue={product.stock} placeholder="Stock" className="rounded-xl border border-zinc-700 bg-black p-3" />
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-black p-5">
        <h3 className="font-semibold">Product images</h3>

        <input
          type="file"
          accept="image/*"
          multiple
          className="mt-4"
          onChange={(e) => {
            const files = e.target.files;
            if (files) uploadImages(files);
          }}
        />

        {imageUrls.length > 0 && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {imageUrls.map((url) => (
              <div key={url} className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                <img src={url} alt="Preview" className="h-32 w-full rounded-lg object-cover" />

                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="mt-3 w-full rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        disabled={loading}
        className="mt-6 w-full rounded-2xl bg-white py-4 font-semibold text-black disabled:opacity-50"
      >
        {loading ? "Сохраняем..." : "Сохранить"}
      </button>
    </form>
  );
}