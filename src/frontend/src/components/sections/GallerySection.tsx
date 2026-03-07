import { ZoomIn } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLang } from "../../lib/i18n";

const GALLERY_SRCS = [
  {
    src: "/assets/generated/gallery-business-cards.dim_600x400.jpg",
    alt: "Premium business card printing with gold foil accents",
  },
  {
    src: "/assets/generated/gallery-flex-banner.dim_600x400.jpg",
    alt: "Large outdoor flex banner installation",
  },
  {
    src: "/assets/generated/gallery-stickers.dim_600x400.jpg",
    alt: "Die-cut vinyl stickers in vibrant colors",
  },
  {
    src: "/assets/generated/gallery-tshirts.dim_600x400.jpg",
    alt: "Custom DTF printed t-shirts",
  },
];

export default function GallerySection() {
  const { t } = useLang();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Gallery item labels come from services items (first 4)
  const labels = t.services.items.slice(0, 4).map((s) => s.title);

  return (
    <section id="gallery" className="py-24 px-6 relative">
      <div
        className="absolute top-1/2 right-0 w-64 h-64 rounded-full blur-3xl opacity-5"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase brand-gradient text-black mb-4">
            {t.gallery.badge}
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
            {t.gallery.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {GALLERY_SRCS.map((item, idx) => (
            <motion.div
              key={item.src}
              data-ocid={`gallery.item.${idx + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group rounded-2xl overflow-hidden cursor-zoom-in aspect-[3/2]"
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  activeIdx === idx ? "scale-110" : "scale-100"
                }`}
              />
              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
                  activeIdx === idx
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
              {/* Label */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-5 transform transition-all duration-300 ${
                  activeIdx === idx
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-white text-lg">
                    {labels[idx]}
                  </span>
                  <div className="w-9 h-9 rounded-full glass flex items-center justify-center border border-white/20">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              {/* Accent border on hover */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 ${
                  activeIdx === idx ? "border-white/30" : ""
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
