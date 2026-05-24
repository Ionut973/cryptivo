"use client";

import { useState } from "react";

type Category = {
  id: string;
  name: string;
  imageUrl: string;
  parentId: string | null;
};

export default function AdminCategoryActions({
  category,
  categories,
}: {
  category: Category;
  categories: Category[];
}) {
  const [name, setName] = useState(category.name);
  const [imageUrl, setImageUrl] = useState(category.imageUrl || "");
  const [parentId, setParentId] = useState(category.parentId || "");

  async function save() {
    const res = await fetch(`/api/admin/categories/${category.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        imageUrl,
        parentId,
      }),
    });

    if (res.ok) {
      alert("Category updated");
      window.location.reload();
    } else {
      alert(await res.text());
    }
  }

  async function remove() {
    if (!confirm("Delete this category?")) return;

    const res = await fetch(`/api/admin/categories/${category.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Category deleted");
      window.location.reload();
    } else {
      alert(await res.text());
    }
  }

  return (
    <div className="mt-4 rounded-2xl border border-zinc-800 bg-black p-4">
      <div className="grid gap-3 md:grid-cols-3">
        <input
          className="rounded-xl border border-zinc-700 bg-zinc-950 p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <input
          className="rounded-xl border border-zinc-700 bg-zinc-950 p-3"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
        />

        <select
          className="rounded-xl border border-zinc-700 bg-zinc-950 p-3"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        >
          <option value="">Main category</option>

          {categories
            .filter((cat) => cat.id !== category.id && !cat.parentId)
            .map((cat) => (
              <option key={cat.id} value={cat.id}>
                Subcategory of: {cat.name}
              </option>
            ))}
        </select>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={save}
          className="rounded-xl bg-green-500 px-5 py-3 font-bold text-black"
        >
          Save
        </button>

        <button
          onClick={remove}
          className="rounded-xl bg-red-500 px-5 py-3 font-bold text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}