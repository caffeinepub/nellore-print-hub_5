import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BadgeIndianRupee,
  Brush,
  CheckCircle2,
  Loader2,
  Send,
  Upload,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ServiceType, useSubmitQuote } from "../../hooks/useQueries";
import { useLang } from "../../lib/i18n";

const SERVICE_VALUES = [
  ServiceType.digitalPrinting,
  ServiceType.flexBanner,
  ServiceType.stickerPrinting,
  ServiceType.tShirtPrinting,
];

const FEATURE_ICONS = [Zap, Brush, BadgeIndianRupee];

export default function QuoteSection() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState<ServiceType>(
    ServiceType.digitalPrinting,
  );
  const [details, setDetails] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: submitQuote, isPending } = useSubmitQuote();

  const SERVICE_OPTIONS = t.quote.services.map((label, i) => ({
    label,
    value: SERVICE_VALUES[i],
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || !details.trim()) {
      toast.error(t.quote.errorRequired);
      return;
    }

    try {
      await submitQuote({
        name: name.trim(),
        mobile: mobile.trim(),
        service,
        details: details.trim(),
      });
      setSubmitted(true);
      toast.success(t.quote.successToast);
      setName("");
      setMobile("");
      setService(ServiceType.digitalPrinting);
      setDetails("");
      setFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      toast.error(t.quote.errorFailed);
    }
  };

  return (
    <section id="quote" className="py-24 px-6 relative">
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(255,80,0,0.4), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase brand-gradient text-white mb-4">
              {t.quote.badge}
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-6 leading-tight">
              {t.quote.heading1}
              <br />
              <span className="brand-gradient-text">{t.quote.heading2}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t.quote.subtitle}
            </p>

            <div className="space-y-4">
              {t.quote.features.map((item, i) => {
                const FeatureIcon = FEATURE_ICONS[i];
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center flex-shrink-0">
                      <FeatureIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">
                        {item.title}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card india-border rounded-2xl p-8 space-y-5 shadow-md"
            >
              {/* Success state */}
              {submitted && (
                <motion.div
                  data-ocid="quote.success_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">
                    {t.quote.successMsg}
                  </span>
                </motion.div>
              )}

              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="quote-name"
                  className="text-orange-200 text-sm font-medium"
                >
                  {t.quote.form.name}{" "}
                  <span className="text-orange-400/60">
                    {t.quote.form.required}
                  </span>
                </Label>
                <Input
                  id="quote-name"
                  type="text"
                  data-ocid="quote.input"
                  placeholder={t.quote.form.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-red-950/40 border-orange-800/40 text-white placeholder:text-orange-300/40 focus:border-orange-500 focus:ring-orange-900/30 h-11"
                />
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <Label
                  htmlFor="quote-mobile"
                  className="text-orange-200 text-sm font-medium"
                >
                  {t.quote.form.mobile}{" "}
                  <span className="text-orange-400/60">
                    {t.quote.form.required}
                  </span>
                </Label>
                <Input
                  id="quote-mobile"
                  type="tel"
                  data-ocid="quote.mobile_input"
                  placeholder={t.quote.form.mobilePlaceholder}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  className="bg-red-950/40 border-orange-800/40 text-white placeholder:text-orange-300/40 focus:border-orange-500 focus:ring-orange-900/30 h-11"
                />
              </div>

              {/* Service */}
              <div className="space-y-2">
                <Label className="text-orange-200 text-sm font-medium">
                  {t.quote.form.service}{" "}
                  <span className="text-orange-400/60">
                    {t.quote.form.required}
                  </span>
                </Label>
                <Select
                  value={service}
                  onValueChange={(val) => setService(val as ServiceType)}
                >
                  <SelectTrigger
                    data-ocid="quote.select"
                    className="bg-red-950/40 border-orange-800/40 text-white focus:border-orange-500 h-11"
                  >
                    <SelectValue
                      placeholder={t.quote.form.servicePlaceholder}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-red-950 border-orange-800/50">
                    {SERVICE_OPTIONS.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-orange-100 hover:bg-orange-900/40 focus:bg-orange-900/40"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Project Details */}
              <div className="space-y-2">
                <Label
                  htmlFor="quote-details"
                  className="text-orange-200 text-sm font-medium"
                >
                  {t.quote.form.details}{" "}
                  <span className="text-orange-400/60">
                    {t.quote.form.required}
                  </span>
                </Label>
                <Textarea
                  id="quote-details"
                  data-ocid="quote.textarea"
                  placeholder={t.quote.form.detailsPlaceholder}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                  rows={4}
                  className="bg-red-950/40 border-orange-800/40 text-white placeholder:text-orange-300/40 focus:border-orange-500 focus:ring-orange-900/30 resize-none"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label className="text-orange-200 text-sm font-medium">
                  {t.quote.form.fileLabel}{" "}
                  <span className="text-orange-400/60 font-normal">
                    {t.quote.form.fileOptional}
                  </span>
                </Label>
                <button
                  type="button"
                  className="relative cursor-pointer w-full text-left"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-orange-800/40 border-dashed bg-red-950/30 hover:bg-orange-900/20 hover:border-orange-600/50 transition-all duration-200">
                    <Upload className="w-5 h-5 text-orange-400/60 flex-shrink-0" />
                    <span className="text-sm text-orange-300/60">
                      {fileName || t.quote.form.fileUpload}
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    data-ocid="quote.upload_button"
                    accept=".pdf,.png,.jpg,.jpeg,.ai,.eps,.svg"
                    onChange={handleFileChange}
                    className="sr-only"
                    aria-label="Upload design file"
                  />
                </button>
              </div>

              {/* Loading state */}
              {isPending && (
                <div
                  data-ocid="quote.loading_state"
                  className="flex items-center gap-2 text-orange-300/70 text-sm"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.quote.submittingMsg}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                data-ocid="quote.submit_button"
                disabled={isPending}
                className="w-full h-12 brand-gradient text-white font-bold text-base rounded-xl hover:scale-[1.02] hover:shadow-fire transition-all duration-300 disabled:opacity-60 disabled:scale-100"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t.quote.form.submitting}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t.quote.form.submit}
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
