import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/useTheme";
import { useLanguage } from "@/context/useLanguage";

export const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? t.theme.toLight : t.theme.toDark}
      className={`p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};
