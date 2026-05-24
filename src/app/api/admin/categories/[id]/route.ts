import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return false;

  const user = verifyToken(token) as { role?: string } | null;
  return user?.role === "ADMIN";
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) return new Response("Forbidden", { status: 403 });

  const { id } = await params;
  const { name, imageUrl, parentId } = await req.json();

  if (!name) {
    return new Response("Name required", { status: 400 });
  }

  const category = await prisma.category.update({
    where: { id },
    data: {
      name,
      slug: slugify(name),
      imageUrl: imageUrl || "",
      parentId: parentId || null,
    },
  });

  return Response.json(category);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) return new Response("Forbidden", { status: 403 });

  const { id } = await params;

  const children = await prisma.category.count({
    where: { parentId: id },
  });

  if (children > 0) {
    return new Response("Delete subcategories first", { status: 400 });
  }

  const products = await prisma.product.count({
    where: { categoryId: id },
  });

  if (products > 0) {
    return new Response("Category has products", { status: 400 });
  }

  await prisma.category.delete({
    where: { id },
  });

  return new Response("Deleted");
}