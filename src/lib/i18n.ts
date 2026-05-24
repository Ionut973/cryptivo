import { cookies } from "next/headers";
import { translations } from "@/lib/translations";

export type Lang = "en" | "ru" | "ro";

export function getLang(value?: string): Lang {
  if (value === "ru") return "ru";
  if (value === "ro") return "ro";
  return "en";
}

type ProductFields =
  | "name"
  | "description"
  | "descriptionShort"
  | "descriptionFull";

type ProductWithLang = {
  nameEn: string;
  nameRu: string;
  nameRo: string;

  descriptionEn: string;
  descriptionRu: string;
  descriptionRo: string;

  descriptionShortEn: string;
  descriptionShortRu: string;
  descriptionShortRo: string;

  descriptionFullEn: string;
  descriptionFullRu: string;
  descriptionFullRo: string;
};

export async function getServerLang(): Promise<Lang> {
  const cookieStore = await cookies();

  return getLang(cookieStore.get("lang")?.value);
}

export function getTranslations(lang: Lang) {
  return translations[lang];
}

export function getProductText(
  product: ProductWithLang,
  field: ProductFields,
  lang: Lang
): string {
  const suffix =
    lang === "ru"
      ? "Ru"
      : lang === "ro"
      ? "Ro"
      : "En";

  const key =
    `${field}${suffix}` as keyof ProductWithLang;

  const fallbackKey =
    `${field}En` as keyof ProductWithLang;

  return (
    product[key] ||
    product[fallbackKey] ||
    ""
  );
}