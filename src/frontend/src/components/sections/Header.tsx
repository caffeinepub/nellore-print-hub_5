import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, Menu, User, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useGetSiteSettings } from "../../hooks/useQueries";
import { LANGUAGES, useLang } from "../../lib/i18n";
import LoginModal from "../LoginModal";

const FALLBACK_LOGO = "/assets/uploads/IMG_0675-1.png";

function getLogoUrl(): string {
  return localStorage.getItem("nph_logo_url") || FALLBACK_LOGO;
}

interface StoredCustomer {
  id: string;
  name: string;
  mobile: string;
  visitCount: string;
  firstVisit: string;
  lastVisit: string;
}

function getStoredCustomer(): StoredCustomer | null {
  try {
    const raw = localStorage.getItem("nph_customer");
    if (!raw) return null;
    return JSON.parse(raw) as StoredCustomer;
  } catch {
    return null;
  }
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>(getLogoUrl);
  const [loginOpen, setLoginOpen] = useState(false);
  const [customer, setCustomer] = useState<StoredCustomer | null>(
    getStoredCustomer,
  );
  const { t, lang, setLang } = useLang();
  const { data: settings } = useGetSiteSettings();
  const siteName = settings?.siteName ?? "Nellore Print Hub";

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
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

  // Listen for logo updates from admin panel
  useEffect(() => {
    const handleLogoUpdate = () => {
      setLogoSrc(getLogoUrl());
    };
    window.addEventListener("logo-updated", handleLogoUpdate);
    window.addEventListener("storage", handleLogoUpdate);
    return () => {
      window.removeEventListener("logo-updated", handleLogoUpdate);
      window.removeEventListener("storage", handleLogoUpdate);
    };
  }, []);

  // Listen for customer login/logout events
  useEffect(() => {
    const handleCustomerUpdate = () => {
      setCustomer(getStoredCustomer());
    };
    window.addEventListener("customer-updated", handleCustomerUpdate);
    return () =>
      window.removeEventListener("customer-updated", handleCustomerUpdate);
  }, []);

  // Auto-open login modal for first-time visitors
  useEffect(() => {
    const handleOpenLogin = () => {
      setLoginOpen(true);
    };
    window.addEventListener("open-login-modal", handleOpenLogin);
    return () =>
      window.removeEventListener("open-login-modal", handleOpenLogin);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("nph_customer");
    setCustomer(null);
    window.dispatchEvent(new Event("customer-updated"));
  };

  // Get first name + initials for display
  const firstName = customer?.name?.split(" ")[0] ?? "";
  const initials = customer?.name
    ? customer.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-dark shadow-card" : "bg-white/70 backdrop-blur-sm"
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
              src={logoSrc}
              alt={siteName}
              className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-200 drop-shadow-sm"
              style={{ maxWidth: "180px" }}
              onError={() => setLogoSrc(FALLBACK_LOGO)}
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
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0.5 left-4 right-4 h-0.5 brand-gradient rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </nav>

          {/* Right side: Language + Login + Mobile Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center gap-1 rounded-lg bg-gray-100 border border-gray-200 p-1">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  data-ocid={`lang.${l.code}.toggle`}
                  onClick={() => setLang(l.code)}
                  className={`w-8 h-7 rounded-md text-xs font-bold transition-all duration-200 ${
                    lang === l.code
                      ? "brand-gradient text-black shadow-sm"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-200"
                  }`}
                  title={l.label}
                  aria-label={`Switch to ${l.label}`}
                >
                  {l.native}
                </button>
              ))}
            </div>

            {/* Login / User pill */}
            {customer ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  data-ocid="header.user.dropdown_menu"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 hover:border-gray-300 hover:bg-gray-150 transition-all duration-200 group outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #1E3A8A, #F97316)",
                    }}
                  >
                    {initials}
                  </div>
                  <span className="text-sm font-semibold text-gray-800 max-w-[90px] truncate hidden sm:block">
                    Hi, {firstName}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-44 rounded-xl bg-white border border-gray-200 shadow-xl p-1"
                >
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {customer.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {customer.mobile}
                    </p>
                  </div>
                  <DropdownMenuItem
                    data-ocid="header.logout.button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                type="button"
                data-ocid="header.login.button"
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #1E3A8A, #F97316)",
                }}
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
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

        {/* Brand stripe */}
        <div
          className="w-full h-0.5"
          style={{
            background: "linear-gradient(90deg, #1E3A8A, #F97316, #1E3A8A)",
            opacity: 0.5,
          }}
        />

        {/* Mobile Nav */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-dark border-t border-gray-200 px-6 py-4 flex flex-col gap-1"
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
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile language switcher */}
            <div className="flex items-center gap-1 rounded-lg bg-gray-100 border border-gray-200 p-1 mt-2 self-start">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  data-ocid={`lang.${l.code}.toggle`}
                  onClick={() => setLang(l.code)}
                  className={`w-8 h-7 rounded-md text-xs font-bold transition-all duration-200 ${
                    lang === l.code
                      ? "brand-gradient text-black shadow-sm"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-200"
                  }`}
                  title={l.label}
                >
                  {l.native}
                </button>
              ))}
            </div>

            {/* Mobile login / user */}
            {customer ? (
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl mt-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, #1E3A8A, #F97316)",
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {customer.name}
                    </p>
                    <p className="text-xs text-gray-400">{customer.mobile}</p>
                  </div>
                </div>
                <button
                  type="button"
                  data-ocid="header.logout.button"
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                data-ocid="header.login.button"
                onClick={() => {
                  setLoginOpen(true);
                  setMobileOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold text-white mt-1 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #1E3A8A, #F97316)",
                }}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </motion.div>
        )}
      </motion.header>

      {/* Login Modal */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
