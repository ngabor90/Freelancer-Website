import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/context/useLanguage";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/ngabor90", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/g%C3%A1bor-n%C3%A9meth-3341932a7/", label: "LinkedIn" },
];

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#" className="text-xl font-bold tracking-tight">
              Németh<span className="text-primary"> Gábor</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {t.footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
