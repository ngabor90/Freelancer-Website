import { useEffect, useState } from "react";
import en from "@/content/en.json";
import hu from "@/content/hu.json";
import { LanguageContext } from "./language-context";

const dictionaries = { en, hu };
const STORAGE_KEY = "portfolio-lang";

const getInitialLang = () => {
  if (typeof window === "undefined") return "hu";

  // 1. URL search param ellenőrzése (?lang=en vagy ?lang=hu)
  try {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "en" || urlLang === "hu") return urlLang;
  } catch {
    // ignore
  }

  // 2. Mentett felhasználói preferencia
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "hu") return stored;

  // 3. Alapértelmezett nyelv a .hu domainen mindig 'hu'
  // Ezzel elkerüljük, hogy a Googlebot (ami en böngészővel érkezik) angolra váltson,
  // ami súlyos nyelvi inkonzisztenciát és rangsorolási büntetést okozna.
  return "hu";
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    window.localStorage.setItem(STORAGE_KEY, lang);

    // Keresőbarát és felhasználóbarát cím frissítése nyelvtől függően
    if (lang === "en") {
      document.title = "Freelance Developer Budapest | Laravel & React – Gábor Németh";
    } else {
      document.title = "Freelance Fejlesztő Budapest | Laravel, React & HTML/CSS/JS – Németh Gábor";
    }

    // URL szinkronizálása az aktuális nyelvvel (SEO és közvetlen linkelhetőség)
    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        if (lang === "en") {
          url.searchParams.set("lang", "en");
        } else {
          url.searchParams.delete("lang");
        }
        window.history.replaceState({}, "", url.toString());
      } catch {
        // ignore
      }
    }
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "hu" : "en"));

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggleLang, t: dictionaries[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};