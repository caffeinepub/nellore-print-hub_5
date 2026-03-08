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
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: email,
      href: `mailto:${email}`,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: address,
      href: "https://maps.app.goo.gl/gXba56vXmLXL1eFp7?g_st=ic",
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  return (
    <section id="contact" className="py-10 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase brand-gradient text-black mb-3">
            {t.contact.badge}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 mb-3">
            {t.contact.heading}
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
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
                  className="flex items-start gap-3 bg-white rounded-xl p-3 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-xs transition-all duration-200 group"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-gray-800 font-medium text-sm truncate transition-colors">
                      {item.value}
                    </div>
                  </div>
                  {item.href.startsWith("http") && (
                    <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 flex-shrink-0 mt-0.5 transition-colors" />
                  )}
                </motion.a>
              );
            })}

            {/* Compact Open Maps Button */}
            <motion.a
              href="https://maps.app.goo.gl/gXba56vXmLXL1eFp7?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.button"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 border border-current rounded-lg text-green-600 hover:text-green-700 hover:bg-green-50 transition-all duration-200 mt-1 font-medium"
            >
              <MapPin className="w-3.5 h-3.5" />
              {t.contact.openMap}
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          </motion.div>

          {/* Map embed visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-2xl overflow-hidden relative min-h-48 border border-gray-200 shadow-xs"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <div>
                <div className="font-display font-bold text-gray-900 text-base mb-0.5">
                  Nellore Print Hub
                </div>
                <div className="text-gray-500 text-sm">
                  Dargamitta, Nellore
                  <br />
                  Andhra Pradesh, India
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/gXba56vXmLXL1eFp7?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1.5 transition-colors"
              >
                {t.contact.viewOnMap}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            {/* Rainbow dot pattern background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,0,0,0.4) 1px, transparent 1px), radial-gradient(circle, rgba(0,136,255,0.3) 1px, transparent 1px)",
                backgroundSize: "20px 20px, 10px 10px",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
