import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import AdminProductForm from "@/components/AdminProductForm";
import { prisma } from "@/lib/prisma";
import AdminProductList from "@/components/AdminProductList";
import AdminCampaignForm from "@/components/AdminCampaignForm";
import CancelOrderButton from "@/components/CancelOrderButton";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const products = await prisma.product.findMany({
  include: {
    category: true,
  },
  orderBy: { createdAt: "desc" },
});
    const categories = await prisma.category.findMany({
  orderBy: { name: "asc" },
});
    const user = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (user.role !== "ADMIN") {
      redirect("/");
    }
    

    return (
      <main className="min-h-screen bg-zinc-950 p-10 text-white">
        <h1 className="mb-4 text-3xl font-bold">Admin Panel</h1>
        <p>Ты админ 😎</p>
        <a
        href="/admin/orders"
         className="mt-4 inline-block rounded-xl border border-zinc-700 px-4 py-2"
      >
        View Orders
         </a>
         <a
         href="/admin/deals"
          className="mt-4 ml-3 inline-block rounded-xl border border-zinc-700 px-4 py-2"
         >
            Manage Deals
        </a>
         <a
         href="/admin/users"
          className="mt-4 ml-3 inline-block rounded-xl border border-zinc-700 px-4 py-2"
        >
          
           Manage Users
        </a>
        <a
          href="/admin/categories"
          className="mt-4 ml-3 inline-block rounded-xl border border-zinc-700 px-4 py-2"
        >
          Manage Categories
        </a>

        <AdminProductForm categories={categories} />
        <AdminProductList products={products} />
        <AdminCampaignForm />
      </main>
    );
  } catch {
    redirect("/login");
  }
}