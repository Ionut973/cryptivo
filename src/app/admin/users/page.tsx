import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import UserDiscountButton from "@/components/UserDiscountButton";

export default async function AdminUsersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const user = verifyToken(token) as { role?: string } | null;

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Users</h1>
        <p className="mt-2 text-zinc-400">
          Manage customer loyalty discounts.
        </p>

        <div className="mt-8 space-y-4">
          {users.map((u) => (
            <div
              key={u.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div>
                <p className="font-semibold">{u.email}</p>
                <p className="text-sm text-zinc-400">Role: {u.role}</p>
                <p className="text-sm text-zinc-400">
                  Loyalty discount: {u.loyaltyDiscount}%
                </p>
              </div>

              <UserDiscountButton
                userId={u.id}
                currentDiscount={u.loyaltyDiscount}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}