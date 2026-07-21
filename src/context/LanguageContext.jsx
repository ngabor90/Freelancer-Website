import { useEffect, useState } from "react";
import en from "@/content/en.json";
import hu from "@/content/hu.json";
import { LanguageContext } from "./language-context";

const dictionaries = { en, hu };
const STORAGE_KEY = "portfolio-lang";

const getInitialLang = () => {
  if (typeof window === "undefined") return "hu";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "hu") return stored;
  return navigator.language?.startsWith("hu") ? "hu" : "en";
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
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