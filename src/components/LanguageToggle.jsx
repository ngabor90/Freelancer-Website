import { useLanguage } from "@/context/useLanguage";

export const LanguageToggle = ({ className = "" }) => {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      aria-label="Switch language"
      className={`px-3 py-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all text-sm font-semibold ${className}`}
    >
      {lang === "en" ? "HU" : "EN"}
    </button>
  );
};
