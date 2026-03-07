import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useLang } from "../../lib/i18n";

export default function ContactSection() {
  const { t } = useLang();

  const contactItems = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: "+91 93905 35070",
      href: "tel:+919390535070",
      color: "text-emerald-400",
      bg: "bg-emerald-500/15",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: "magic.nelloreprinthub@gmail.com",
      href: "mailto:magic.nelloreprinthub@gmail.com",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: "Dargamitta, Nellore, Andhra Pradesh",
      href: "https://maps.app.goo.gl/gXba56vXmLXL1eFp7?g_st=ic",
      color: "text-amber-400",
      bg: "bg-amber-500/15",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase brand-gradient text-black mb-4">
            {t.contact.badge}
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
            {t.contact.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {contactItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 glass rounded-2xl p-5 hover:bg-white/8 transition-all duration-200 group"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="text-white font-medium text-sm truncate group-hover:text-white transition-colors">
                      {item.value}
                    </div>
                  </div>
                  {item.href.startsWith("http") && (
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/80 flex-shrink-0 mt-0.5 transition-colors" />
                  )}
                </motion.a>
              );
            })}

            {/* Open Maps Button */}
            <motion.a
              href="https://maps.app.goo.gl/gXba56vXmLXL1eFp7?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.button"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 brand-gradient rounded-xl text-black font-bold text-sm hover:scale-105 hover:shadow-fire transition-all duration-300 mt-2"
            >
              <MapPin className="w-4 h-4" />
              {t.contact.openMap}
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>

          {/* Map embed placeholder / visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass rounded-2xl overflow-hidden relative min-h-72"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="w-16 h-16 rounded-full brand-gradient flex items-center justify-center animate-fire-pulse">
                <MapPin className="w-8 h-8 text-black" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-xl mb-1">
                  Nellore Print Hub
                </div>
                <div className="text-muted-foreground text-sm">
                  Dargamitta, Nellore
                  <br />
                  Andhra Pradesh, India
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/gXba56vXmLXL1eFp7?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white text-sm font-medium flex items-center gap-1.5 transition-colors"
              >
                {t.contact.viewOnMap}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            {/* Mandala-dot pattern background */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,193,7,0.3) 1px, transparent 1px), radial-gradient(circle, rgba(255,107,0,0.2) 1px, transparent 1px)",
                backgroundSize: "20px 20px, 10px 10px",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
