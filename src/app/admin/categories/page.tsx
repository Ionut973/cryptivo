import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminCategoryForm from "@/components/AdminCategoryForm";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const user = verifyToken(token) as { role?: string } | null;

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  const categories = await prisma.category.findMany({
    include: {
      children: true,
      parent: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const mainCategories = categories.filter((cat: any) => !cat.parentId);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-black">Categories</h1>
        <p className="mt-2 text-zinc-400">
          Create main categories and subcategories.
        </p>

        <AdminCategoryForm categories={categories} />

        <div className="mt-10 space-y-5">
          {mainCategories.map((category) => (
            
            <div
              key={category.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">{category.name}</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    /{category.slug} · {category._count.products} products
                  </p>
                </div>
                <DeleteCategoryButton id={category.id} />
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {category.children.length === 0 ? (
                  <p className="text-sm text-zinc-500">No subcategories</p>
                ) : (
                  category.children.map((child) => (
                    <div
                      key={child.id}
                      className="rounded-2xl border border-zinc-800 bg-black p-4"
                    >
                      <p className="font-bold">{child.name}</p>
                      <p className="mt-1 text-sm text-zinc-500">
                        /{child.slug}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}