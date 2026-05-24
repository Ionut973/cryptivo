"use client";

"use client";

export default function BuyNowButton({ productId }: { productId: string }) {
  return (
    <a
      href={`/checkout?productId=${productId}`}
      className="rounded-xl bg-green-500 px-4 py-2 text-black"
    >
      Buy Now
    </a>
  );
}