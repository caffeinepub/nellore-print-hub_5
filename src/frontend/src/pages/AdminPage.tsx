import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  Images,
  List,
  Loader2,
  Lock,
  MessageSquare,
  Pencil,
  Phone,
  Printer,
  RefreshCw,
  Save,
  Settings,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import type { Photo, Quote } from "../backend.d";
import {
  QuoteStatus,
  ServiceType,
  useAddPhotoWithProgress,
  useDeletePhoto,
  useGetPhotos,
  useGetQuotes,
  useGetSiteSettings,
  useUpdatePhotoTitle,
  useUpdateQuoteStatus,
  useUpdateSiteSettings,
} from "../hooks/useQueries";

const ADMIN_PASSWORD = "Magic123";

const SERVICE_LABELS: Record<string, string> = {
  [ServiceType.digitalPrinting]: "Digital Printing",
  [ServiceType.flexBanner]: "Flex Banner",
  [ServiceType.stickerPrinting]: "Sticker Printing",
  [ServiceType.tShirtPrinting]: "T-Shirt Printing",
};

const SERVICE_COLORS: Record<string, string> = {
  [ServiceType.digitalPrinting]:
    "bg-blue-500/15 text-blue-300 border-blue-500/30",
  [ServiceType.flexBanner]:
    "bg-amber-500/15 text-amber-300 border-amber-500/30",
  [ServiceType.stickerPrinting]:
    "bg-pink-500/15 text-pink-300 border-pink-500/30",
  [ServiceType.tShirtPrinting]:
    "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

function formatTimestamp(ts: bigint): string {
  try {
    const ms = Number(ts / 1_000_000n);
    return new Date(ms).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

// ─── Quote Row with Expandable Detail ─────────────────────────────────────────

function QuoteRow({
  quote,
  idx,
  isExpanded,
  onToggle,
}: {
  quote: Quote;
  idx: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const updateStatus = useUpdateQuoteStatus();
  const isNew = quote.status === QuoteStatus.new_;

  const whatsappMsg = encodeURIComponent(
    `Hi ${quote.name}, regarding your ${SERVICE_LABELS[quote.service] ?? quote.service} quote — we're happy to assist! Please let us know your availability.`,
  );

  const handleToggleStatus = async () => {
    const newStatus = isNew ? QuoteStatus.replied : QuoteStatus.new_;
    try {
      await updateStatus.mutateAsync({ id: quote.id, status: newStatus });
      toast.success(
        `Quote marked as "${newStatus === QuoteStatus.replied ? "Replied" : "New"}"`,
      );
    } catch {
      toast.error("Failed to update status. Please try again.");
    }
  };

  return (
    <>
      <TableRow
        data-ocid={`admin.row.${idx + 1}`}
        onClick={onToggle}
        className="border-white/6 hover:bg-white/4 transition-colors cursor-pointer select-none"
      >
        <TableCell className="text-muted-foreground text-sm font-mono w-10">
          {idx + 1}
        </TableCell>
        <TableCell className="text-white font-semibold">{quote.name}</TableCell>
        <TableCell>
          <a
            href={`tel:${quote.mobile}`}
            onClick={(e) => e.stopPropagation()}
            className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
          >
            {quote.mobile}
          </a>
        </TableCell>
        <TableCell>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${SERVICE_COLORS[quote.service] ?? "bg-white/10 text-white/70 border-white/20"}`}
          >
            {SERVICE_LABELS[quote.service] ?? String(quote.service)}
          </span>
        </TableCell>
        <TableCell>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
              isNew
                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isNew ? "bg-amber-400" : "bg-emerald-400"}`}
            />
            {isNew ? "New" : "Replied"}
          </span>
        </TableCell>
        <TableCell className="text-muted-foreground text-sm hidden lg:table-cell whitespace-nowrap">
          {formatTimestamp(quote.timestamp)}
        </TableCell>
        <TableCell className="w-8">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/40"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </TableCell>
      </TableRow>

      {/* Expandable detail row */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <TableRow className="border-none hover:bg-transparent">
            <TableCell colSpan={7} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-5 pt-2 bg-white/3 border-b border-white/6">
                  {/* Project details */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                      Project Details
                    </p>
                    <p className="text-white/90 text-sm leading-relaxed glass rounded-xl p-4">
                      {quote.details || (
                        <span className="text-muted-foreground italic">
                          No details provided.
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${quote.mobile}`}
                      data-ocid={`admin.quote.call.button.${idx + 1}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200 hover:border-emerald-400/50"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call {quote.name}
                      </Button>
                    </a>

                    <a
                      href={`https://wa.me/${quote.mobile.replace(/[^0-9]/g, "")}?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid={`admin.quote.whatsapp.button.${idx + 1}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 hover:text-[#1db954] hover:border-[#25D366]/50"
                      >
                        <SiWhatsapp className="w-3.5 h-3.5" />
                        WhatsApp
                      </Button>
                    </a>

                    <Button
                      variant="outline"
                      size="sm"
                      data-ocid={`admin.quote.reply.toggle.${idx + 1}`}
                      disabled={updateStatus.isPending}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus();
                      }}
                      className={`gap-2 ${
                        isNew
                          ? "bg-orange-500/10 border-orange-500/30 text-orange-300 hover:bg-orange-500/20 hover:border-orange-400/50"
                          : "bg-white/8 border-white/15 text-white/60 hover:bg-white/12 hover:text-white/80"
                      }`}
                    >
                      {updateStatus.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : isNew ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <RefreshCw className="w-3.5 h-3.5" />
                      )}
                      {updateStatus.isPending
                        ? "Updating..."
                        : isNew
                          ? "Mark as Replied"
                          : "Mark as New"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TableCell>
          </TableRow>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Quotes Panel ──────────────────────────────────────────────────────────────

type FilterType = "all" | "new" | "replied";

function QuotesPanel() {
  const { data: quotes, isLoading, isError } = useGetQuotes();
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = (quotes ?? []).filter((q) => {
    if (filter === "new") return q.status === QuoteStatus.new_;
    if (filter === "replied") return q.status === QuoteStatus.replied;
    return true;
  });

  const totalCount = quotes?.length ?? 0;
  const newCount =
    quotes?.filter((q) => q.status === QuoteStatus.new_).length ?? 0;
  const repliedCount =
    quotes?.filter((q) => q.status === QuoteStatus.replied).length ?? 0;

  const FILTERS: {
    key: FilterType;
    label: string;
    count: number;
    color: string;
  }[] = [
    { key: "all", label: "All Quotes", count: totalCount, color: "text-white" },
    { key: "new", label: "New", count: newCount, color: "text-amber-300" },
    {
      key: "replied",
      label: "Replied",
      count: repliedCount,
      color: "text-emerald-300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass rounded-xl p-4 flex flex-col gap-1"
        >
          <span className="text-muted-foreground text-xs uppercase tracking-wider">
            Total Quotes
          </span>
          <span className="font-display font-black text-3xl text-white">
            {isLoading ? (
              <Skeleton className="h-8 w-12 bg-white/5" />
            ) : (
              totalCount
            )}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-4 flex flex-col gap-1 border border-amber-500/20"
        >
          <span className="text-amber-400/70 text-xs uppercase tracking-wider">
            New
          </span>
          <span className="font-display font-black text-3xl text-amber-300">
            {isLoading ? (
              <Skeleton className="h-8 w-12 bg-white/5" />
            ) : (
              newCount
            )}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-xl p-4 flex flex-col gap-1 border border-emerald-500/20"
        >
          <span className="text-emerald-400/70 text-xs uppercase tracking-wider">
            Replied
          </span>
          <span className="font-display font-black text-3xl text-emerald-300">
            {isLoading ? (
              <Skeleton className="h-8 w-12 bg-white/5" />
            ) : (
              repliedCount
            )}
          </span>
        </motion.div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            data-ocid="admin.quotes.filter.tab"
            onClick={() => {
              setFilter(f.key);
              setExpandedId(null);
            }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              filter === f.key
                ? "brand-gradient text-black font-bold shadow-fire"
                : "glass text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            {f.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                filter === f.key ? "bg-black/20" : "bg-white/10"
              } ${f.color}`}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div data-ocid="admin.loading_state" className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl bg-white/5" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div
          data-ocid="admin.error_state"
          className="flex items-center gap-3 p-5 glass rounded-2xl border border-red-500/20 text-red-400"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">Failed to load quotes. Please refresh.</p>
        </div>
      )}

      {/* Table */}
      {!isLoading &&
        !isError &&
        (filtered.length === 0 ? (
          <div
            data-ocid="admin.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center glass rounded-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Printer className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-white font-semibold mb-1">No quotes found</p>
            <p className="text-muted-foreground text-sm">
              {filter === "all"
                ? "Quote submissions will appear here."
                : `No "${filter}" quotes at the moment.`}
            </p>
          </div>
        ) : (
          <div
            data-ocid="admin.table"
            className="glass rounded-2xl overflow-hidden"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-white/8 hover:bg-transparent">
                  <TableHead className="text-white/60 font-semibold w-10">
                    #
                  </TableHead>
                  <TableHead className="text-white/60 font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="text-white/60 font-semibold">
                    Mobile
                  </TableHead>
                  <TableHead className="text-white/60 font-semibold">
                    Service
                  </TableHead>
                  <TableHead className="text-white/60 font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-white/60 font-semibold hidden lg:table-cell">
                    Date
                  </TableHead>
                  <TableHead className="w-8" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((quote, idx) => (
                  <QuoteRow
                    key={String(quote.id)}
                    quote={quote}
                    idx={idx}
                    isExpanded={expandedId === String(quote.id)}
                    onToggle={() =>
                      setExpandedId(
                        expandedId === String(quote.id)
                          ? null
                          : String(quote.id),
                      )
                    }
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
    </div>
  );
}

// ─── Site Settings Panel ───────────────────────────────────────────────────────

function SiteSettingsPanel() {
  const { data: settings, isLoading, isError } = useGetSiteSettings();
  const updateSettings = useUpdateSiteSettings();

  const [form, setForm] = useState({
    siteName: "",
    tagline: "",
    phone: "",
    email: "",
    address: "",
    whatsapp: "",
  });
  const [logoUrl, setLogoUrl] = useState("");
  const [logoPreviewOk, setLogoPreviewOk] = useState(false);

  // Sync form when settings load
  useEffect(() => {
    if (settings) {
      setForm({
        siteName: settings.siteName,
        tagline: settings.tagline,
        phone: settings.phone,
        email: settings.email,
        address: settings.address,
        whatsapp: settings.whatsapp,
      });
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync({
        siteName: form.siteName,
        tagline: form.tagline,
        phone: form.phone,
        email: form.email,
        address: form.address,
        whatsapp: form.whatsapp,
      });
      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Failed to save settings. Please try again.");
    }
  };

  const handleField =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  if (isLoading) {
    return (
      <div data-ocid="admin.settings.loading_state" className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24 bg-white/5" />
            <Skeleton className="h-11 w-full bg-white/5 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        data-ocid="admin.settings.error_state"
        className="flex items-center gap-3 p-5 glass rounded-2xl border border-red-500/20 text-red-400"
      >
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm">Failed to load site settings. Please refresh.</p>
      </div>
    );
  }

  const inputClass =
    "bg-white/5 border-white/12 text-white placeholder:text-white/30 h-11 focus:border-orange-500/50 focus:ring-orange-500/20 rounded-xl";

  return (
    <div className="space-y-8">
      <div className="glass rounded-2xl p-6 space-y-6">
        <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
          <Settings className="w-5 h-5 text-orange-400" />
          Business Information
        </h3>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Site Name */}
          <div className="space-y-2">
            <Label className="text-white/80 text-sm font-medium">
              Site Name
            </Label>
            <Input
              data-ocid="admin.settings.sitename.input"
              value={form.siteName}
              onChange={handleField("siteName")}
              placeholder="e.g. Nellore Print Hub"
              className={inputClass}
            />
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <Label className="text-white/80 text-sm font-medium">Tagline</Label>
            <Input
              data-ocid="admin.settings.tagline.input"
              value={form.tagline}
              onChange={handleField("tagline")}
              placeholder="e.g. Premium Printing Solutions"
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label className="text-white/80 text-sm font-medium">
              Phone Number
            </Label>
            <Input
              data-ocid="admin.settings.phone.input"
              type="tel"
              value={form.phone}
              onChange={handleField("phone")}
              placeholder="+91 99999 99999"
              className={inputClass}
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label className="text-white/80 text-sm font-medium">
              WhatsApp Number
            </Label>
            <Input
              data-ocid="admin.settings.whatsapp.input"
              type="tel"
              value={form.whatsapp}
              onChange={handleField("whatsapp")}
              placeholder="919999999999 (with country code)"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-white/80 text-sm font-medium">
              Email Address
            </Label>
            <Input
              data-ocid="admin.settings.email.input"
              type="email"
              value={form.email}
              onChange={handleField("email")}
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>

          {/* Address */}
          <div className="space-y-2 sm:col-span-2">
            <Label className="text-white/80 text-sm font-medium">Address</Label>
            <Textarea
              data-ocid="admin.settings.address.input"
              value={form.address}
              onChange={handleField("address")}
              placeholder="Full business address"
              rows={2}
              className="bg-white/5 border-white/12 text-white placeholder:text-white/30 focus:border-orange-500/50 focus:ring-orange-500/20 rounded-xl resize-none"
            />
          </div>
        </div>
      </div>

      {/* Logo Preview Section */}
      <div className="glass rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
          <Printer className="w-5 h-5 text-orange-400" />
          Logo Preview
        </h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80 text-sm font-medium">
              Logo URL
            </Label>
            <Input
              value={logoUrl}
              onChange={(e) => {
                setLogoUrl(e.target.value);
                setLogoPreviewOk(false);
              }}
              placeholder="https://example.com/logo.png or /assets/uploads/logo.png"
              className={inputClass}
            />
          </div>
          {logoUrl && (
            <div className="flex items-center gap-4">
              <div className="glass rounded-xl p-3 flex items-center justify-center min-w-20 min-h-16">
                <img
                  src={logoUrl}
                  alt="Logo preview"
                  className="max-h-16 max-w-36 object-contain"
                  onLoad={() => setLogoPreviewOk(true)}
                  onError={() => setLogoPreviewOk(false)}
                />
              </div>
              <div>
                {logoPreviewOk ? (
                  <span className="flex items-center gap-1.5 text-emerald-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Logo loaded successfully
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Could not load image
                  </span>
                )}
                <p className="text-muted-foreground text-xs mt-1">
                  Current logo: /assets/uploads/IMG_0635-1.png
                </p>
              </div>
            </div>
          )}
          {!logoUrl && (
            <div className="flex items-center gap-4">
              <div className="glass rounded-xl p-3 flex items-center justify-center min-w-20 min-h-16">
                <img
                  src="/assets/uploads/IMG_0635-1.png"
                  alt="Current logo"
                  className="max-h-16 max-w-36 object-contain"
                />
              </div>
              <p className="text-muted-foreground text-sm">
                Current active logo — enter a URL above to preview a
                replacement.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Save button */}
      <Button
        data-ocid="admin.settings.save.button"
        onClick={handleSave}
        disabled={updateSettings.isPending}
        className="w-full h-12 brand-gradient text-black font-bold rounded-xl hover:scale-[1.01] transition-all duration-200 disabled:opacity-60 disabled:scale-100 text-base gap-2"
      >
        {updateSettings.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Save Settings
          </>
        )}
      </Button>
    </div>
  );
}

// ─── Gallery Panel ─────────────────────────────────────────────────────────────

function PhotoCard({
  photo,
  idx,
  onDelete,
}: {
  photo: Photo;
  idx: number;
  onDelete: (id: bigint) => void;
}) {
  const updateTitle = useUpdatePhotoTitle();
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(photo.title);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTitleSave = async () => {
    const trimmed = titleValue.trim();
    if (!trimmed || trimmed === photo.title) {
      setTitleValue(photo.title);
      setIsEditing(false);
      return;
    }
    try {
      await updateTitle.mutateAsync({ id: photo.id, newTitle: trimmed });
      toast.success("Title updated");
    } catch {
      toast.error("Failed to update title");
      setTitleValue(photo.title);
    }
    setIsEditing(false);
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.25 }}
      className="glass rounded-2xl overflow-hidden border border-white/8 group"
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
        <img
          src={photo.blob.getDirectURL()}
          alt={photo.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Delete overlay */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5">
          <AnimatePresence>
            {confirmDelete ? (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 bg-black/80 backdrop-blur-sm rounded-lg p-1"
              >
                <span className="text-white/70 text-xs px-1">Delete?</span>
                <button
                  type="button"
                  data-ocid={`gallery.photo.delete_button.${idx + 1}`}
                  onClick={() => onDelete(photo.id)}
                  className="px-2 py-1 bg-red-500/80 hover:bg-red-500 text-white text-xs font-semibold rounded-md transition-colors"
                >
                  Yes
                </button>
                <button
                  type="button"
                  data-ocid={`gallery.photo.cancel_button.${idx + 1}`}
                  onClick={() => setConfirmDelete(false)}
                  className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md transition-colors"
                >
                  No
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="trash"
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setConfirmDelete(true)}
                className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Title */}
      <div className="px-3 py-2.5 flex items-center gap-2">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTitleSave();
              if (e.key === "Escape") {
                setTitleValue(photo.title);
                setIsEditing(false);
              }
            }}
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:border-orange-500/60 min-w-0"
          />
        ) : (
          <button
            type="button"
            className="flex-1 text-left text-white/90 text-sm font-medium truncate cursor-pointer hover:text-white transition-colors bg-transparent border-0 p-0 min-w-0"
            title="Click to edit title"
            onClick={handleEditStart}
          >
            {photo.title || "Untitled"}
          </button>
        )}
        <button
          type="button"
          onClick={handleEditStart}
          className="text-white/30 hover:text-orange-400 transition-colors flex-shrink-0"
          aria-label="Edit title"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        {updateTitle.isPending && (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-400 flex-shrink-0" />
        )}
      </div>
    </motion.div>
  );
}

function GalleryPanel() {
  const { data: photos, isLoading, isError } = useGetPhotos();
  const addPhoto = useAddPhotoWithProgress();
  const deletePhoto = useDeletePhoto();

  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sortedPhotos = [...(photos ?? [])].sort((a, b) => {
    const orderDiff = Number(a.order - b.order);
    if (orderDiff !== 0) return orderDiff;
    return Number(a.id - b.id);
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!uploadTitle) {
        setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadTitle.trim()) {
      toast.error("Please select a file and enter a title.");
      return;
    }

    const arrayBuffer = await selectedFile.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer) as Uint8Array<ArrayBuffer>;
    const order = BigInt((photos?.length ?? 0) + 1);

    setUploadProgress(0);

    try {
      await addPhoto.mutateAsync({
        bytes,
        title: uploadTitle.trim(),
        order,
        onProgress: (pct) => setUploadProgress(pct),
      });
      toast.success("Photo uploaded successfully!");
      setSelectedFile(null);
      setUploadTitle("");
      setUploadProgress(0);
      setShowUpload(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      toast.error("Upload failed. Please try again.");
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deletePhoto.mutateAsync(id);
      toast.success("Photo deleted.");
    } catch {
      toast.error("Failed to delete photo.");
    }
  };

  const inputClass =
    "bg-white/5 border-white/12 text-white placeholder:text-white/30 h-11 focus:border-orange-500/50 focus:ring-orange-500/20 rounded-xl";

  return (
    <div className="space-y-6">
      {/* Upload button + panel */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {sortedPhotos.length} photo{sortedPhotos.length !== 1 ? "s" : ""} in
          gallery
        </p>
        <Button
          data-ocid="gallery.upload_button"
          onClick={() => setShowUpload((v) => !v)}
          className="gap-2 brand-gradient text-black font-bold rounded-xl hover:scale-[1.02] transition-all duration-200"
        >
          {showUpload ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload Photo
            </>
          )}
        </Button>
      </div>

      {/* Upload panel */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="glass rounded-2xl p-6 border border-orange-500/20 space-y-4">
              <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
                <Upload className="w-4 h-4 text-orange-400" />
                Upload New Project Photo
              </h3>

              {/* File input */}
              <div className="space-y-2">
                <span className="text-white/80 text-sm font-medium block">
                  Photo File
                </span>
                <label
                  data-ocid="gallery.dropzone"
                  htmlFor="gallery-file-input"
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/15 hover:border-orange-500/40 rounded-xl p-6 cursor-pointer transition-all duration-200 bg-white/3 hover:bg-white/6"
                >
                  {selectedFile ? (
                    <>
                      <CheckCircle2 className="w-8 h-8 text-orange-400" />
                      <p className="text-white font-medium text-sm">
                        {selectedFile.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {(selectedFile.size / 1024).toFixed(0)} KB — click to
                        change
                      </p>
                    </>
                  ) : (
                    <>
                      <Images className="w-8 h-8 text-white/30" />
                      <p className="text-white/60 text-sm">
                        Click to select an image
                      </p>
                      <p className="text-white/30 text-xs">
                        JPG, PNG, WebP supported
                      </p>
                    </>
                  )}
                </label>
                <input
                  id="gallery-file-input"
                  ref={fileInputRef}
                  data-ocid="gallery.upload_button"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Title input */}
              <div className="space-y-2">
                <Label className="text-white/80 text-sm font-medium">
                  Photo Title
                </Label>
                <Input
                  data-ocid="gallery.title.input"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Business Cards for Ravi Textiles"
                  className={inputClass}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && selectedFile) handleUpload();
                  }}
                />
              </div>

              {/* Progress bar */}
              <AnimatePresence>
                {addPhoto.isPending && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-1.5"
                  >
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Uploading…</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress
                      value={uploadProgress}
                      className="h-1.5 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-amber-400"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <Button
                data-ocid="gallery.submit_button"
                onClick={handleUpload}
                disabled={
                  addPhoto.isPending || !selectedFile || !uploadTitle.trim()
                }
                className="w-full h-11 brand-gradient text-black font-bold rounded-xl hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:scale-100 gap-2"
              >
                {addPhoto.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading */}
      {isLoading && (
        <div
          data-ocid="gallery.loading_state"
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton
              key={i}
              className="w-full aspect-[4/3] rounded-2xl bg-white/5"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div
          data-ocid="gallery.error_state"
          className="flex items-center gap-3 p-5 glass rounded-2xl border border-red-500/20 text-red-400"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">Failed to load photos. Please refresh.</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && sortedPhotos.length === 0 && (
        <div
          data-ocid="gallery.empty_state"
          className="flex flex-col items-center justify-center py-20 text-center glass rounded-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Images className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-white font-semibold mb-1">No photos yet</p>
          <p className="text-muted-foreground text-sm">
            Upload your first project photo to showcase your work.
          </p>
        </div>
      )}

      {/* Photo grid */}
      {!isLoading && !isError && sortedPhotos.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          data-ocid="gallery.list"
        >
          <AnimatePresence>
            {sortedPhotos.map((photo, idx) => (
              <PhotoCard
                key={String(photo.id)}
                photo={photo}
                idx={idx}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

// ─── Dashboard (after login) ───────────────────────────────────────────────────

type AdminTab = "quotes" | "settings" | "gallery";

function Dashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("quotes");

  return (
    <div className="min-h-screen bg-background text-foreground print-bg">
      {/* Top header bar */}
      <header className="glass-dark border-b border-white/8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          {/* Logo + title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center">
              <Printer className="w-4 h-4 text-black" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-black text-lg text-white leading-none">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-xs">Nellore Print Hub</p>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-1 rounded-xl glass p-1">
            <button
              type="button"
              data-ocid="admin.quotes.tab"
              onClick={() => setActiveTab("quotes")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "quotes"
                  ? "brand-gradient text-black font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Quotes</span>
            </button>
            <button
              type="button"
              data-ocid="admin.settings.tab"
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "settings"
                  ? "brand-gradient text-black font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Site Settings</span>
            </button>
            <button
              type="button"
              data-ocid="admin.gallery.tab"
              onClick={() => setActiveTab("gallery")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "gallery"
                  ? "brand-gradient text-black font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Images className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </button>
          </div>

          {/* Back to site */}
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to site</span>
          </a>
        </div>

        {/* Indian tricolor stripe */}
        <div
          className="w-full h-0.5 opacity-40"
          style={{
            background:
              "linear-gradient(90deg, #FF6B00 33%, #FFFFFF 33% 66%, #138808 66%)",
          }}
        />
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "quotes" ? (
            <motion.div
              key="quotes"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.22 }}
            >
              <div className="mb-6">
                <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-orange-400" />
                  Quote Requests
                </h2>
                <p className="text-muted-foreground text-sm mt-0.5">
                  View and manage all incoming print quote requests.
                </p>
              </div>
              <QuotesPanel />
            </motion.div>
          ) : activeTab === "settings" ? (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
            >
              <div className="mb-6">
                <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
                  <Settings className="w-6 h-6 text-orange-400" />
                  Site Settings
                </h2>
                <p className="text-muted-foreground text-sm mt-0.5">
                  Edit your business info — changes go live immediately.
                </p>
              </div>
              <div className="max-w-2xl">
                <SiteSettingsPanel />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
            >
              <div className="mb-6">
                <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
                  <Images className="w-6 h-6 text-orange-400" />
                  Project Gallery
                </h2>
                <p className="text-muted-foreground text-sm mt-0.5">
                  Upload and manage photos shown in the gallery.
                </p>
              </div>
              <GalleryPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ─── Login Screen ──────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    await new Promise((r) => setTimeout(r, 500));
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setError(true);
    }
    setIsLoading(false);
  };

  if (authenticated) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #ff4d00, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        <div className="glass rounded-2xl p-8 border border-white/10">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl brand-gradient flex items-center justify-center fire-glow">
              <Lock className="w-7 h-7 text-black" />
            </div>
            <div className="text-center">
              <h1 className="font-display font-black text-xl text-white">
                Admin Access
              </h1>
              <p className="text-muted-foreground text-sm">Nellore Print Hub</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="admin-pass"
                className="text-white/80 text-sm font-medium"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="admin-pass"
                  type={showPass ? "text" : "password"}
                  data-ocid="admin.input"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  required
                  className={`bg-white/5 border-white/12 text-white placeholder:text-white/30 h-11 pr-10 ${
                    error
                      ? "border-red-500/50 focus:border-red-500/50"
                      : "focus:border-orange-500/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  data-ocid="admin.error_state"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Access Denied. Incorrect password.
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              data-ocid="admin.submit_button"
              disabled={isLoading}
              className="w-full h-11 brand-gradient text-black font-bold rounded-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Login to Dashboard"
              )}
            </Button>
          </form>

          <a
            href="/"
            className="block text-center mt-5 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            ← Back to website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
