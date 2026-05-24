import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/EditProductForm";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    
  });
<EditProductForm
  product={product}
  categories={categories}
/>
  if (!product) {
    return <div className="p-10 text-white">Product not found</div>;
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-black">Edit Product</h1>
        <EditProductForm product={product} categories={categories} />
      </section>
    </main>
  );
}