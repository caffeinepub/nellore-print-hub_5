import { IdCard, Package, Palette, Shirt, Signpost, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLang } from "../../lib/i18n";

const SERVICE_ICONS = [IdCard, Signpost, Tag, Shirt, Package, Palette];

const SERVICE_STYLES = [
  // Business Cards — saffron/amber
  {
    gradient: "from-amber-100/80 to-amber-50/60",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    border: "border-amber-200",
    glow: "rgba(232,93,4,0.18)",
    hoverBorder: "group-hover:border-amber-400",
  },
  // Flex Banners — royal blue
  {
    gradient: "from-blue-100/80 to-blue-50/60",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    border: "border-blue-200",
    glow: "rgba(37,99,235,0.18)",
    hoverBorder: "group-hover:border-blue-400",
  },
  // Sticker Printing — marigold yellow
  {
    gradient: "from-yellow-100/80 to-yellow-50/60",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-700",
    border: "border-yellow-200",
    glow: "rgba(202,138,4,0.18)",
    hoverBorder: "group-hover:border-yellow-400",
  },
  // T-Shirt Printing — peacock teal
  {
    gradient: "from-teal-100/80 to-teal-50/60",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
    border: "border-teal-200",
    glow: "rgba(15,118,110,0.18)",
    hoverBorder: "group-hover:border-teal-400",
  },
  // Packaging Boxes — crimson
  {
    gradient: "from-red-100/80 to-red-50/60",
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
    border: "border-red-200",
    glow: "rgba(185,28,28,0.18)",
    hoverBorder: "group-hover:border-red-400",
  },
  // Graphic Design — purple-indigo
  {
    gradient: "from-violet-100/80 to-violet-50/60",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    border: "border-violet-200",
    glow: "rgba(109,40,217,0.18)",
    hoverBorder: "group-hover:border-violet-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ServicesSection() {
  const { t } = useLang();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 px-6 relative">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-5"
        style={{
          background:
            "radial-gradient(circle, rgba(255,100,0,0.6), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase brand-gradient text-white mb-4">
            {t.services.badge}
          </span>
          <div className="section-divider mb-6" />
          <h2 className="font-display font-black text-4xl sm:text-5xl text-gray-900 mb-4">
            {t.services.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t.services.items.map((service, index) => {
            const Icon = SERVICE_ICONS[index];
            const style = SERVICE_STYLES[index];
            const ocid = `services.card.${index + 1}`;
            const isHovered = hoveredIdx === index;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                data-ocid={ocid}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`card-hover bg-white rounded-2xl p-7 group cursor-default relative overflow-hidden border ${style.border} ${style.hoverBorder} transition-all duration-300 shadow-sm`}
                style={{
                  boxShadow: isHovered ? `0 8px 40px ${style.glow}` : undefined,
                }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-2xl`}
                />
                {/* Icon */}
                <div className="relative z-10 mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl ${style.iconBg} flex items-center justify-center transition-colors duration-300`}
                  >
                    <Icon className={`w-6 h-6 ${style.iconColor}`} />
                  </div>
                </div>
                {/* Text */}
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 brand-gradient opacity-0 group-hover:opacity-10 rounded-bl-3xl transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
