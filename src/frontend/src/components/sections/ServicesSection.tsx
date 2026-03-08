import { IdCard, Package, Palette, Shirt, Signpost, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLang } from "../../lib/i18n";

const SERVICE_ICONS = [IdCard, Signpost, Tag, Shirt, Package, Palette];

const SERVICE_STYLES = [
  // Business Cards — red
  {
    gradient: "from-red-900/40 to-red-900/20",
    iconBg: "bg-red-900/40",
    iconColor: "text-red-300",
    border: "border-red-800/50",
    glow: "rgba(255,50,0,0.25)",
    hoverBorder: "group-hover:border-red-500",
  },
  // Flex Banners — orange
  {
    gradient: "from-orange-900/40 to-orange-900/20",
    iconBg: "bg-orange-900/40",
    iconColor: "text-orange-300",
    border: "border-orange-800/50",
    glow: "rgba(255,120,0,0.25)",
    hoverBorder: "group-hover:border-orange-500",
  },
  // Sticker Printing — amber
  {
    gradient: "from-amber-900/40 to-amber-900/20",
    iconBg: "bg-amber-900/40",
    iconColor: "text-amber-300",
    border: "border-amber-800/50",
    glow: "rgba(255,180,0,0.25)",
    hoverBorder: "group-hover:border-amber-500",
  },
  // T-Shirt Printing — rose
  {
    gradient: "from-rose-900/40 to-rose-900/20",
    iconBg: "bg-rose-900/40",
    iconColor: "text-rose-300",
    border: "border-rose-800/50",
    glow: "rgba(255,80,100,0.25)",
    hoverBorder: "group-hover:border-rose-500",
  },
  // Packaging Boxes — deep red
  {
    gradient: "from-red-800/40 to-red-900/20",
    iconBg: "bg-red-800/40",
    iconColor: "text-red-200",
    border: "border-red-700/50",
    glow: "rgba(200,20,0,0.25)",
    hoverBorder: "group-hover:border-red-400",
  },
  // Graphic Design — orange-amber
  {
    gradient: "from-orange-800/40 to-orange-900/20",
    iconBg: "bg-orange-800/40",
    iconColor: "text-orange-200",
    border: "border-orange-700/50",
    glow: "rgba(255,140,0,0.25)",
    hoverBorder: "group-hover:border-orange-400",
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
    <section id="services" className="py-16 px-6 relative">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(255,80,0,0.5), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase brand-gradient text-white mb-4">
            {t.services.badge}
          </span>
          <div className="section-divider mb-6" />
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-4">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
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
                className={`card-hover bg-card rounded-2xl p-4 group cursor-default relative overflow-hidden border ${style.border} ${style.hoverBorder} transition-all duration-300`}
                style={{
                  boxShadow: isHovered ? `0 8px 40px ${style.glow}` : undefined,
                }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                />
                {/* Icon */}
                <div className="relative z-10 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${style.iconBg} flex items-center justify-center transition-colors duration-300`}
                  >
                    <Icon className={`w-5 h-5 ${style.iconColor}`} />
                  </div>
                </div>
                {/* Text */}
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-base text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
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
