import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerLang, getTranslations } from "@/lib/i18n";
import CryptoFloating from "@/components/CryptoFloating";

export default async function NotificationsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const user = verifyToken(token) as { id: string } | null;
  if (!user) redirect("/login");

  const lang = await getServerLang();
  const text = getTranslations(lang);

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-20 text-white">
      <section className="relative mx-auto max-w-5xl">
        <CryptoFloating />

        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-green-400">
            CRYPTIVO ALERTS
          </p>

          <h1 className="mt-4 text-5xl font-black">
            {text.notificationsTitle}
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            {text.notificationsSubtitle}
          </p>
        </div>

        {notifications.length === 0 ? (
          <div className="relative z-10 mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-10 text-center shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-500/10 text-5xl">
              🔔
            </div>

            <h2 className="mt-5 text-3xl font-black">
              {text.noNotificationsTitle}
            </h2>

            <p className="mt-3 text-zinc-400">
              {text.noNotificationsText}
            </p>
          </div>
        ) : (
          <div className="relative z-10 mt-8 space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-5 shadow-xl"
              >
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-500/10 text-3xl">
                    🔔
                  </div>

                  <div>
                    <h2 className="font-black text-green-400">
                      {notification.title}
                    </h2>

                    <p className="mt-2 text-zinc-300">
                      {notification.message}
                    </p>

                    <p className="mt-3 text-xs text-zinc-500">
                      {notification.createdAt.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}