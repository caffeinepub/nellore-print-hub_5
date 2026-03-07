import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useGetSiteSettings } from "../../hooks/useQueries";
import { LANGUAGES, useLang } from "../../lib/i18n";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, lang, setLang } = useLang();
  const { data: settings } = useGetSiteSettings();
  const siteName = settings?.siteName ?? "Nellore Print Hub";

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.quote, href: "#quote" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-dark shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center group flex-shrink-0"
          aria-label="Nellore Print Hub - Go to top"
        >
          <img
            src="/assets/uploads/IMG_0675-1.png"
            alt={siteName}
            className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-200 drop-shadow-md"
            style={{ maxWidth: "180px" }}
          />
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1 flex-1 justify-center"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid="nav.link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/8 transition-all duration-200 relative group"
            >
              {link.label}
              <span className="absolute bottom-0.5 left-4 right-4 h-0.5 brand-gradient rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </a>
          ))}
        </nav>

        {/* Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Language switcher */}
          <div className="flex items-center gap-1 rounded-lg bg-white/8 p-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                data-ocid={`lang.${l.code}.toggle`}
                onClick={() => setLang(l.code)}
                className={`w-8 h-7 rounded-md text-xs font-bold transition-all duration-200 ${
                  lang === l.code
                    ? "brand-gradient text-white shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`}
                title={l.label}
                aria-label={`Switch to ${l.label}`}
              >
                {l.native}
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/8 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Indian flag tricolor decorative stripe */}
      <div
        className="w-full h-0.5 opacity-30"
        style={{
          background:
            "linear-gradient(90deg, #FF6B00 33%, #FFFFFF 33% 66%, #138808 66%)",
        }}
      />

      {/* Mobile Nav */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass-dark border-t border-white/8 px-6 py-4 flex flex-col gap-1"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid="nav.link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/8 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
