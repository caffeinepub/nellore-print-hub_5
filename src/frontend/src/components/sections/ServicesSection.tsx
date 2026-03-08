import { IdCard, Package, Palette, Shirt, Signpost, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLang } from "../../lib/i18n";

const SERVICE_ICONS = [IdCard, Signpost, Tag, Shirt, Package, Palette];

const SERVICE_STYLES = [
  // Business Cards — red
  {
    gradient: "from-red-50 to-red-100/60",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    border: "border-red-200",
    glow: "rgba(255,50,0,0.12)",
    hoverBorder: "group-hover:border-red-400",
  },
  // Flex Banners — orange
  {
    gradient: "from-orange-50 to-orange-100/60",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    border: "border-orange-200",
    glow: "rgba(255,120,0,0.12)",
    hoverBorder: "group-hover:border-orange-400",
  },
  // Sticker Printing — amber/yellow
  {
    gradient: "from-yellow-50 to-yellow-100/60",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    border: "border-yellow-200",
    glow: "rgba(255,180,0,0.12)",
    hoverBorder: "group-hover:border-yellow-400",
  },
  // T-Shirt Printing — green
  {
    gradient: "from-green-50 to-green-100/60",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    border: "border-green-200",
    glow: "rgba(0,180,80,0.12)",
    hoverBorder: "group-hover:border-green-400",
  },
  // Packaging Boxes — blue
  {
    gradient: "from-blue-50 to-blue-100/60",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "border-blue-200",
    glow: "rgba(0,100,255,0.12)",
    hoverBorder: "group-hover:border-blue-400",
  },
  // Graphic Design — violet
  {
    gradient: "from-violet-50 to-violet-100/60",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    border: "border-violet-200",
    glow: "rgba(120,0,255,0.12)",
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
    <section id="services" className="py-16 px-6 relative">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-08"
        style={{
          background:
            "radial-gradient(circle, rgba(119,0,255,0.08), transparent 70%)",
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
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase brand-gradient text-black mb-4">
            {t.services.badge}
          </span>
          <div className="section-divider mb-6" />
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 mb-4">
            {t.services.heading}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
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
                className={`card-hover bg-white rounded-2xl p-4 group cursor-default relative overflow-hidden border ${style.border} ${style.hoverBorder} transition-all duration-300 shadow-xs`}
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
                  <h3 className="font-display font-bold text-base text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
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
