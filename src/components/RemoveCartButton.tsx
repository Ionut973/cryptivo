"use client";

export default function RemoveCartButton({ id }: { id: string }) {
  async function removeItem() {
    const res = await fetch(`/api/cart/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Ошибка удаления");
    }
  }

  return (
    <button
      onClick={removeItem}
      className="rounded-xl bg-red-500 px-4 py-2 text-sm text-white"
    >
      Remove
    </button>
  );
}