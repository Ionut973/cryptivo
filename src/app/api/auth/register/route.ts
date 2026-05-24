import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body.email?.toLowerCase().trim();
    const password = body.password;
    const code = body.code?.trim();

    if (!email || !password || !code) {
      return new Response("Missing fields", {
        status: 400,
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new Response("Email already registered", {
        status: 400,
      });
    }

    const verification = await prisma.emailVerification.findFirst({
      where: {
        email,
        code,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verification) {
      return new Response("Invalid verification code", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      
    });

    await prisma.emailVerification.deleteMany({
      where: {
        email,
      },
    });
    const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    role: user.role,
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: "30d",
  }
);

const cookieStore = await cookies();

cookieStore.set("token", token, {
  httpOnly: true,
  secure: false,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
});

    return Response.json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error(error);

    return new Response("Server error", {
      status: 500,
    });
  }
}