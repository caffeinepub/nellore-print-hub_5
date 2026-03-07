import { ChevronDown, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useLang } from "../../lib/i18n";

export default function HeroSection() {
  const { t } = useLang();

  const scrollToQuote = () => {
    document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = async () => {
    const shareData = {
      title: "Nellore Print Hub",
      text: "Check out Nellore Print Hub – Premium Printing in Nellore! 🖨️",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Thanks for sharing!");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        toast.error("Couldn't share right now. Try copying the URL manually.");
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-print-bg.dim_1920x1080.jpg')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-indigo-950/40 to-black/70" />
      {/* Fire gradient accent at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
      {/* Royal blue mandala-style glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(26,86,219,0.7) 0%, rgba(59,130,246,0.3) 45%, transparent 70%)",
        }}
      />
      {/* Gold complementary glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(255,193,7,0.5) 0%, rgba(255,193,7,0.1) 50%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/15 text-sm font-medium mb-8"
          style={{ color: "#FFC107" }}
        >
          <span className="w-2 h-2 rounded-full brand-gradient animate-pulse" />
          {t.hero.badge}
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6 text-glow"
        >
          {t.hero.title1}{" "}
          <span className="brand-gradient-text">{t.hero.title2}</span>
          <br />
          {t.hero.title3}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={scrollToQuote}
            className="group inline-flex items-center gap-2.5 px-8 py-4 brand-gradient rounded-full text-white font-bold text-base hover:scale-105 hover:shadow-fire transition-all duration-300 fire-glow"
          >
            {t.hero.cta}
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-medium text-base hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            {t.hero.viewServices}
          </button>
        </motion.div>

        {/* Share Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex justify-center mt-2"
        >
          <button
            type="button"
            data-ocid="hero.share_button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-400/40 text-blue-300 text-sm font-medium hover:bg-blue-500/10 hover:border-blue-400/70 hover:text-blue-200 transition-all duration-300"
          >
            <Share2 className="w-4 h-4" />
            Share this site
          </button>
        </motion.div>

        {/* Decorative gold section divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="section-divider mt-10"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
