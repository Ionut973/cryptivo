import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = verifyToken(token) as { role?: string } | null;

  if (!user || user.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const body = await req.json();

  const imageUrls = Array.isArray(body.imageUrls) ? body.imageUrls : [];

  const product = await prisma.product.create({
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
      stock: Number(body.stock),
    },
  });

  return Response.json(product);
}