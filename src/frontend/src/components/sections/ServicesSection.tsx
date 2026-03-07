import { IdCard, Package, Palette, Shirt, Signpost, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLang } from "../../lib/i18n";

const SERVICE_ICONS = [IdCard, Signpost, Tag, Shirt, Package, Palette];

const SERVICE_STYLES = [
  // Business Cards — saffron/amber
  {
    gradient: "from-amber-600/25 to-amber-900/15",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    border: "border-amber-500/35",
    glow: "rgba(255,193,7,0.3)",
    hoverBorder: "group-hover:border-amber-500/60",
  },
  // Flex Banners — royal blue
  {
    gradient: "from-blue-700/25 to-blue-900/15",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    border: "border-blue-500/30",
    glow: "rgba(59,130,246,0.3)",
    hoverBorder: "group-hover:border-blue-500/60",
  },
  // Sticker Printing — marigold yellow
  {
    gradient: "from-yellow-500/20 to-yellow-800/15",
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
    border: "border-yellow-500/30",
    glow: "rgba(234,179,8,0.3)",
    hoverBorder: "group-hover:border-yellow-500/60",
  },
  // T-Shirt Printing — peacock teal
  {
    gradient: "from-teal-600/25 to-teal-900/15",
    iconBg: "bg-teal-500/20",
    iconColor: "text-teal-400",
    border: "border-teal-500/30",
    glow: "rgba(20,184,166,0.3)",
    hoverBorder: "group-hover:border-teal-500/60",
  },
  // Packaging Boxes — crimson
  {
    gradient: "from-red-700/20 to-red-900/15",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400",
    border: "border-red-600/30",
    glow: "rgba(220,38,38,0.3)",
    hoverBorder: "group-hover:border-red-500/60",
  },
  // Graphic Design — purple-indigo
  {
    gradient: "from-violet-700/20 to-violet-900/15",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    border: "border-violet-600/30",
    glow: "rgba(139,92,246,0.3)",
    hoverBorder: "group-hover:border-violet-500/60",
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
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
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
                className={`card-hover glass rounded-2xl p-7 group cursor-default relative overflow-hidden border ${style.border} ${style.hoverBorder} transition-all duration-300`}
                style={{
                  boxShadow: isHovered ? `0 8px 40px ${style.glow}` : undefined,
                }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
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
                  <h3 className="font-display font-bold text-xl text-white mb-2">
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
