import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return new Response("Invalid password", { status: 401 });
  }

const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    role: user.role, // ВАЖНО
  },
  process.env.JWT_SECRET!,
  { expiresIn: "7d" }
);

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({
    id: user.id,
    email: user.email,
    role: user.role,
  });
}