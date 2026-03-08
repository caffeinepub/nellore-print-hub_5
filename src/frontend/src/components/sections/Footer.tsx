import { PrinterCheck } from "lucide-react";
import { useLang } from "../../lib/i18n";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/18JBSHpEKX/?mibextid=wwXIfr",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/nelloreprinthub?igsh=aGNvZWlzdno0emVm&utm_source=qr",
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
  },
  {
    name: "Threads",
    href: "https://www.threads.com/@nelloreprinthub?igshid=NTc4MTIwNjQ2YQ==",
    icon: "https://cdn-icons-png.flaticon.com/512/825/825564.png",
  },
  {
    name: "Pinterest",
    href: "https://pin.it/6ZaHsuLxq",
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111499.png",
  },
  {
    name: "Flickr",
    href: "https://flickr.com/photos/204271528@N02/sets/72177720332245331",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733609.png",
  },
];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Brand gradient stripe */}
      <div
        className="w-full h-1"
        style={{
          background: "linear-gradient(90deg, #1E3A8A, #F97316)",
          opacity: 0.8,
        }}
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg brand-gradient flex items-center justify-center">
              <PrinterCheck className="w-5 h-5 text-black" />
            </div>
            <span className="font-display font-bold text-lg text-gray-900">
              Nellore <span className="brand-gradient-text">Print Hub</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-gray-500 text-sm text-center max-w-xs">
            {t.footer.tagline}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="opacity-60 hover:opacity-100 transition-opacity duration-200 hover:scale-110 transform"
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  style={{ height: "30px", width: "30px" }}
                  className="rounded-sm"
                />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-200" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 text-xs text-gray-400">
            <p>
              © {year} {t.footer.copyright}
            </p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
