"use client";

export default function LanguageSwitcher() {
  function setLang(lang: string) {
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
    window.location.reload();
  }

  return (
    <div className="flex gap-2 text-sm font-bold">
      <button onClick={() => setLang("en")} className="hover:text-green-400">
        EN
      </button>
      <button onClick={() => setLang("ru")} className="hover:text-green-400">
        RU
      </button>
      <button onClick={() => setLang("ro")} className="hover:text-green-400">
        RO
      </button>
    </div>
  );
}