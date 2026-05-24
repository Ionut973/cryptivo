"use client";

export default function DeleteCategoryButton({
  id,
}: {
  id: string;
}) {
  async function remove() {
    const confirmed = confirm(
      "Delete this category?"
    );

    if (!confirmed) return;

    const res = await fetch(
      `/api/admin/categories/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      location.reload();
    } else {
      alert(await res.text());
    }
  }

  return (
    <button
      onClick={remove}
      className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
    >
      Delete
    </button>
  );
}