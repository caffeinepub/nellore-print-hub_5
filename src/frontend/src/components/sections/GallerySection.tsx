import { Skeleton } from "@/components/ui/skeleton";
import { ZoomIn } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetPhotos } from "../../hooks/useQueries";
import { useLang } from "../../lib/i18n";

const STATIC_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
    alt: "Premium business cards & stationery printing",
  },
  {
    src: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&h=400&fit=crop",
    alt: "Professional print shop & press machine",
  },
  {
    src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
    alt: "Graphic design & branding materials",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    alt: "Custom die-cut sticker printing",
  },
  {
    src: "https://images.unsplash.com/photo-1527443224154-c4a573d5f5ec?w=600&h=400&fit=crop",
    alt: "T-shirt and apparel printing",
  },
  {
    src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
    alt: "Custom packaging boxes & product printing",
  },
];

export default function GallerySection() {
  const { t } = useLang();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { data: photos, isLoading } = useGetPhotos();

  // Sort by order ascending, then by id ascending
  const sortedPhotos = [...(photos ?? [])].sort((a, b) => {
    const orderDiff = Number(a.order - b.order);
    if (orderDiff !== 0) return orderDiff;
    return Number(a.id - b.id);
  });

  // Use dynamic photos if available, fall back to static
  const galleryItems =
    sortedPhotos.length > 0
      ? sortedPhotos.map((p) => ({
          src: p.blob.getDirectURL(),
          alt: p.title,
        }))
      : STATIC_GALLERY;

  return (
    <section id="gallery" className="py-24 px-6 relative">
      {/* Subtle brand glow */}
      <div
        className="absolute top-1/2 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(30,58,138,0.35), transparent 70%)",
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
          <h2 className="font-display font-black text-4xl sm:text-5xl text-gray-900 mb-4">
            {t.gallery.heading}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {isLoading && (
          <div
            data-ocid="gallery.loading_state"
            className="grid grid-cols-2 sm:grid-cols-3 gap-5"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton
                key={i}
                className="w-full aspect-[3/2] rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        )}

        {/* Gallery grid */}
        {!isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={item.src}
                data-ocid={`gallery.item.${idx + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group rounded-2xl overflow-hidden cursor-zoom-in aspect-[3/2] shadow-card border border-gray-100"
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
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
                    activeIdx === idx
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                {/* Label */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-300 ${
                    activeIdx === idx
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-white text-sm">
                      {item.alt}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <ZoomIn className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
                {/* Rainbow accent border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300"
                  style={{
                    borderColor:
                      activeIdx === idx
                        ? "rgba(255,255,255,0.3)"
                        : "transparent",
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
