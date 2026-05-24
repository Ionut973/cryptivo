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

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const user = verifyToken(token) as {
      role?: string;
    } | null;

    if (!user || user.role !== "ADMIN") {
      return new Response("Forbidden", {
        status: 403,
      });
    }

    const body = await req.json();

    const nameEn = body.nameEn?.trim();
    const nameRu = body.nameRu?.trim();
    const nameRo = body.nameRo?.trim();

    const parentId = body.parentId || null;
    const imageUrl = body.imageUrl || "";

    if (!nameEn || !nameRu || !nameRo) {
      return new Response(
        "EN / RU / RO names required",
        {
          status: 400,
        }
      );
    }

    const slug = slugify(nameEn);

    const existing = await prisma.category.findUnique({
      where: {
        slug,
      },
    });

    if (existing) {
      return new Response(
        "Category already exists",
        {
          status: 400,
        }
      );
    }

    const category = await prisma.category.create({
      data: {
        name: nameEn,

        nameEn,
        nameRu,
        nameRo,

        slug,
        imageUrl,

        parentId,
      },
    });

    return Response.json(category);
  } catch (error) {
    console.error(error);

    return new Response(
      "Failed to create category",
      {
        status: 500,
      }
    );
  }
}