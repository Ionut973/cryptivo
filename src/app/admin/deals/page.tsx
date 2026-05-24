import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminProductList from "@/components/AdminProductList";

export default async function AdminDealsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const user = verifyToken(token) as { role?: string } | null;

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Deals</h1>
        <p className="mt-2 text-zinc-400">
          Manage welcome deals for new customers.
        </p>

        <AdminProductList products={products} />
      </section>
    </main>
  );
}