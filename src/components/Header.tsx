import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import UserIconButton from "@/components/UserIconButton";
import { getLang, getTranslations } from "@/lib/i18n";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const lang = getLang(cookieStore.get("lang")?.value);
const text = getTranslations(lang);

  let user: { id?: string; email?: string; role?: string } | null = null;

  if (token) {
    user = verifyToken(token) as {
      id?: string;
      email?: string;
      role?: string;
    } | null;
  }

  return (
    <header className="relative z-[9999] w-full border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-black text-white">
          CRYPTIVO
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-300 md:flex">
          <a href="/categories" className="hover:text-white">
            {text.categories}
          </a>

          <a href="/cart" className="hover:text-white">
            {text.basket}
          </a>

          <a href="/favorites" className="hover:text-white">
            {text.favorites}
          </a>

          <a href="/welcome-deals" className="hover:text-white">
            {text.discounts}
          </a>

          <a href="/profile" className="hover:text-white">
            {text.myOrders}
          </a>

          <a href="/notifications" className="hover:text-white">
            {text.notifications}
          </a>

          <a href="/support" className="hover:text-white">
            {text.support}
          </a>

          {user?.role === "ADMIN" && (
            <a href="/admin" className="font-semibold text-green-400">
              {text.adminPanel}
            </a>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <UserIconButton loggedIn={!!user} />
        </div>
      </div>
    </header>
  );
}