import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useGetSiteSettings } from "../../hooks/useQueries";
import { useLang } from "../../lib/i18n";

export default function ContactSection() {
  const { t } = useLang();
  const { data: settings } = useGetSiteSettings();

  const phone = settings?.phone ?? "+91 93905 35070";
  const email = settings?.email ?? "magic.nelloreprinthub@gmail.com";
  const address = settings?.address ?? "Dargamitta, Nellore, Andhra Pradesh";

  const contactItems = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
      color: "text-emerald-700",
      bg: "bg-emerald-100",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: email,
      href: `mailto:${email}`,
      color: "text-blue-700",
      bg: "bg-blue-100",
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: address,
      href: "https://maps.app.goo.gl/gXba56vXmLXL1eFp7?g_st=ic",
      color: "text-amber-700",
      bg: "bg-amber-100",
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
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase brand-gradient text-white mb-4">
            {t.contact.badge}
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-gray-900 mb-4">
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
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 hover:bg-gray-50 border border-gray-200 hover:border-blue-200 shadow-sm transition-all duration-200 group"
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
                    <div className="text-gray-800 font-medium text-sm truncate group-hover:text-gray-900 transition-colors">
                      {item.value}
                    </div>
                  </div>
                  {item.href.startsWith("http") && (
                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-gray-500 flex-shrink-0 mt-0.5 transition-colors" />
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
              className="inline-flex items-center gap-2 px-6 py-3.5 brand-gradient rounded-xl text-white font-bold text-sm hover:scale-105 hover:shadow-fire transition-all duration-300 mt-2"
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
            className="bg-white rounded-2xl overflow-hidden relative min-h-72 border border-gray-200 shadow-sm"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="w-16 h-16 rounded-full brand-gradient flex items-center justify-center animate-fire-pulse">
                <MapPin className="w-8 h-8 text-black" />
              </div>
              <div>
                <div className="font-display font-bold text-gray-900 text-xl mb-1">
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
                className="text-blue-700 hover:text-blue-900 text-sm font-medium flex items-center gap-1.5 transition-colors"
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
