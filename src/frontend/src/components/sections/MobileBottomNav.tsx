import { FileText, Home, Image, Phone, Scissors, Star } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: Home },
  { id: "services", label: "Services", Icon: Scissors },
  { id: "quote", label: "Quote", Icon: FileText },
  { id: "gallery", label: "Gallery", Icon: Image },
  { id: "reviews", label: "Reviews", Icon: Star },
  { id: "contact", label: "Contact", Icon: Phone },
];

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg">
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background: "linear-gradient(90deg, #059669, #16a34a)",
        }}
      />
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              type="button"
              data-ocid={`mobile_nav.${id}.button`}
              onClick={() => scrollTo(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
                  isActive ? "brand-gradient" : ""
                }`}
              >
                <Icon
                  style={{ width: "18px", height: "18px" }}
                  className={isActive ? "text-white" : ""}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${isActive ? "brand-gradient-text" : "text-gray-400"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
