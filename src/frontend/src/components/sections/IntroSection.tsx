import { Clock, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const DEFAULT_HEADLINE = "Nellore's Most Trusted Printing Studio";
const DEFAULT_DESC =
  "At Magic Advertising, we don't just print — we craft your brand's first impression. From crisp business cards to eye-catching flex banners, every job is handled with care, precision, and passion. Trusted by businesses across Nellore for over a decade.";

const stats = [
  {
    icon: Clock,
    label: "12+ Years Experience",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  {
    icon: Users,
    label: "10,000+ Happy Clients",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    icon: Zap,
    label: "Same-Day Delivery Available",
    color: "text-violet-500",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function IntroSection() {
  const [headline, setHeadline] = useState(
    () => localStorage.getItem("nph_intro_headline") || DEFAULT_HEADLINE,
  );
  const [desc, setDesc] = useState(
    () => localStorage.getItem("nph_intro_desc") || DEFAULT_DESC,
  );

  // Listen for storage changes (admin panel updates)
  useEffect(() => {
    const handleStorage = () => {
      setHeadline(
        localStorage.getItem("nph_intro_headline") || DEFAULT_HEADLINE,
      );
      setDesc(localStorage.getItem("nph_intro_desc") || DEFAULT_DESC);
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("intro-updated", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("intro-updated", handleStorage);
    };
  }, []);

  return (
    <section
      id="about"
      className="py-16 px-6 relative overflow-hidden"
      aria-label="About Magic Advertising"
    >
      {/* Subtle navy-saffron background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(30,58,138,0.03) 0%, rgba(249,115,22,0.02) 50%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center"
        >
          {/* Main headline */}
          <motion.h2
            variants={itemVariants}
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight mb-6"
          >
            {headline.includes("Trusted") ? (
              <>
                {headline.split("Trusted")[0]}
                <span className="brand-gradient-text">Trusted</span>
                {headline.split("Trusted")[1]}
              </>
            ) : (
              <span className="brand-gradient-text">{headline}</span>
            )}
          </motion.h2>

          {/* Description paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            At <strong className="text-gray-900">Magic Advertising</strong>,{" "}
            {desc.replace(/^At Magic Advertising,?\s*/i, "")}
          </motion.p>

          {/* Stat badge chips */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border ${stat.bg} ${stat.border} shadow-sm`}
                >
                  <Icon className={`w-4 h-4 ${stat.color} flex-shrink-0`} />
                  <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Ornamental divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-900" />
            <div className="w-2 h-2 rounded-full brand-gradient" />
            <div
              className="rounded-full"
              style={{
                height: "2px",
                width: "96px",
                background: "linear-gradient(90deg, #1E3A8A, #F97316)",
                opacity: 0.6,
              }}
            />
            <div className="w-2 h-2 rounded-full brand-gradient" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
