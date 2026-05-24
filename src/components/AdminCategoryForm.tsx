"use client";

import { useState } from "react";

type Category = {
  id: string;
  name: string;
  nameEn?: string | null;
  nameRu?: string | null;
  nameRo?: string | null;
  parentId: string | null;
};

export default function AdminCategoryForm({
  categories = [],
}: {
  categories?: Category[];
}) {
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameRo, setNameRo] = useState("");
  const [parentId, setParentId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function uploadImage() {
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  }

  async function createCategory() {
    if (!nameEn.trim()) {
      alert("Name EN required");
      return;
    }

    let imageUrl = "";

    if (file) {
      imageUrl = await uploadImage();
    }

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameEn,
        nameRu,
        nameRo,
        parentId,
        imageUrl,
      }),
    });

    if (res.ok) {
      alert("Category created");
      setNameEn("");
      setNameRu("");
      setNameRo("");
      setFile(null);
      setParentId("");
      window.location.reload();
    } else {
      alert(await res.text());
    }
  }

  return (
    <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-black">Create Category / Subcategory</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <input
          className="rounded-xl border border-zinc-700 bg-black p-4"
          placeholder="Name EN"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
        />

        <input
          className="rounded-xl border border-zinc-700 bg-black p-4"
          placeholder="Name RU"
          value={nameRu}
          onChange={(e) => setNameRu(e.target.value)}
        />

        <input
          className="rounded-xl border border-zinc-700 bg-black p-4"
          placeholder="Name RO"
          value={nameRo}
          onChange={(e) => setNameRo(e.target.value)}
        />

        <input
          type="file"
          className="rounded-xl border border-zinc-700 bg-black p-4"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-black p-4 md:col-span-2"
        >
          <option value="">Main category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              Subcategory of:{" "}
              {category.nameEn || category.nameRo || category.nameRu || category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={createCategory}
        className="mt-5 rounded-xl bg-white px-6 py-3 font-bold text-black hover:bg-green-400"
      >
        Create
      </button>
    </div>
  );
}