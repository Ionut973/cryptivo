import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return false;

  const user = verifyToken(token) as { role?: string } | null;
  return user?.role === "ADMIN";
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await checkAdmin();

  if (!isAdmin) {
    return new Response("Forbidden", { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  const imageUrls = Array.isArray(body.imageUrls) ? body.imageUrls : [];

  const product = await prisma.product.update({
    where: { id },
    data: {
      nameEn: body.nameEn,
      nameRu: body.nameRu,
      nameRo: body.nameRo,

      descriptionEn: body.descriptionEn,
      descriptionRu: body.descriptionRu,
      descriptionRo: body.descriptionRo,

      descriptionShortEn: body.descriptionShortEn,
      descriptionShortRu: body.descriptionShortRu,
      descriptionShortRo: body.descriptionShortRo,

      descriptionFullEn: body.descriptionFullEn,
      descriptionFullRu: body.descriptionFullRu,
      descriptionFullRo: body.descriptionFullRo,

      price: Number(body.price),
      stock: Number(body.stock),

      imageUrl: body.imageUrl || imageUrls[0] || "",
      imageUrls,

      size: body.size || "",

      colors: body.colors
        ? body.colors
            .split(",")
            .map((c: string) => c.trim())
            .filter(Boolean)
        : [],

      categoryId: body.categoryId || null,
    },
  });

  return Response.json(product);
}