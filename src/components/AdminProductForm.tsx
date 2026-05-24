"use client";

import { useState } from "react";

type Category = {
  id: string;
  name: string;
};

export default function AdminProductForm({
  categories = [],
}: {
  categories?: Category[];
}) {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [sizes, setSizes] = useState("");

  async function uploadImages(files: FileList) {
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      
      console.log(imageUrls);

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
    

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

       colors: data.get("colors"),
       size: sizes,
        imageUrl: imageUrls[0],
        imageUrls,
        categoryId: data.get("categoryId"),
        stock: data.get("stock"),

      }),
    });

    if (res.ok) {
      alert("Товар добавлен 🚀");
      form.reset();
      setImageUrls([]);
      window.location.reload();
    } else {
      alert(await res.text());
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-6xl rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
    >
      <h2 className="text-2xl font-bold">Add Product</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <input name="nameEn" placeholder="Name EN" required className="rounded-xl border border-zinc-700 bg-black p-3" />
        <input name="nameRu" placeholder="Name RU" required className="rounded-xl border border-zinc-700 bg-black p-3" />
        <input name="nameRo" placeholder="Name RO" required className="rounded-xl border border-zinc-700 bg-black p-3" />
      </div>
      <input
  placeholder="Sizes (S,M,L or 41,42,43)"
  className="rounded-xl border border-zinc-700 bg-black p-4"
  value={sizes}
  onChange={(e) => setSizes(e.target.value)}
/>
      

      <div className="mt-6">
        <h3 className="mb-3 font-semibold">Short description</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <textarea name="descriptionShortEn" placeholder="Short Desc EN" rows={4} className="rounded-xl border border-zinc-700 bg-black p-3" />
          <textarea name="descriptionShortRu" placeholder="Short Desc RU" rows={4} className="rounded-xl border border-zinc-700 bg-black p-3" />
          <textarea name="descriptionShortRo" placeholder="Short Desc RO" rows={4} className="rounded-xl border border-zinc-700 bg-black p-3" />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-semibold">Full product details</h3>
        <p className="mb-3 text-sm text-zinc-400">
          Example: Brand: ASUS / CPU: Intel / RAM: 32GB — each detail on a new line.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <textarea name="descriptionFullEn" placeholder="Full Desc EN" rows={8} className="rounded-xl border border-zinc-700 bg-black p-3" />
          <textarea name="descriptionFullRu" placeholder="Full Desc RU" rows={8} className="rounded-xl border border-zinc-700 bg-black p-3" />
          <textarea name="descriptionFullRo" placeholder="Full Desc RO" rows={8} className="rounded-xl border border-zinc-700 bg-black p-3" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <input name="price" placeholder="Price" required className="rounded-xl border border-zinc-700 bg-black p-3" />

        <select name="categoryId" className="rounded-xl border border-zinc-700 bg-black p-3">
          <option value="">No category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input name="stock" placeholder="Stock" required className="rounded-xl border border-zinc-700 bg-black p-3" />
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
                <img
                  src={url}
                  alt="Preview"
                  className="h-32 w-full rounded-lg object-cover"
                />

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
      <input
  name="colors"
  placeholder="Colors (Black, White, Red)"
  className="w-full rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-green-500"
/>

      <button
        disabled={loading || imageUrls.length === 0}
        className="mt-6 w-full rounded-2xl bg-white py-4 font-semibold text-black disabled:opacity-50"
      >
        {loading ? "Добавляется..." : "Добавить товар"}
      </button>
    </form>
  );
}