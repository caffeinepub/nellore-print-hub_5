import { Clock, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  {
    icon: Clock,
    label: "12+ Years Experience",
    color: "text-orange-400",
    bg: "bg-orange-900/30",
    border: "border-orange-700/50",
  },
  {
    icon: Users,
    label: "10,000+ Happy Clients",
    color: "text-amber-300",
    bg: "bg-amber-900/30",
    border: "border-amber-700/50",
  },
  {
    icon: Zap,
    label: "Same-Day Delivery Available",
    color: "text-red-300",
    bg: "bg-red-900/30",
    border: "border-red-700/50",
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
  return (
    <section
      id="about"
      className="py-16 px-6 relative overflow-hidden"
      aria-label="About Magic Advertising"
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(200,30,0,0.06) 0%, rgba(255,255,255,0) 100%)",
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
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6"
          >
            Nellore's Most <span className="brand-gradient-text">Trusted</span>{" "}
            Printing Studio
          </motion.h2>

          {/* Description paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-orange-100/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            At <strong className="text-white">Magic Advertising</strong>, we
            don't just print — we craft your brand's first impression. From
            crisp business cards to eye-catching flex banners, every job is
            handled with care, precision, and passion. Trusted by businesses
            across Nellore for over a decade.
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
                  <span className="text-sm font-semibold text-white/90 whitespace-nowrap">
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
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-600" />
            <div className="w-2 h-2 rounded-full brand-gradient" />
            <div
              className="h-px w-24 brand-gradient opacity-60 rounded-full"
              style={{ height: "2px" }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--gold)", opacity: 0.8 }}
            />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
