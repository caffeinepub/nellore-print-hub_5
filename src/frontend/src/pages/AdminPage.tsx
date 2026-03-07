import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Printer,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Quote } from "../backend.d";
import { ServiceType, useGetQuotes } from "../hooks/useQueries";

const ADMIN_PASSWORD = "Magic123";

const SERVICE_LABELS: Record<string, string> = {
  [ServiceType.digitalPrinting]: "Digital Printing",
  [ServiceType.flexBanner]: "Flex Banner",
  [ServiceType.stickerPrinting]: "Sticker Printing",
  [ServiceType.tShirtPrinting]: "T-Shirt Printing",
};

const SERVICE_COLORS: Record<string, string> = {
  [ServiceType.digitalPrinting]:
    "bg-blue-500/15 text-blue-300 border-blue-500/20",
  [ServiceType.flexBanner]:
    "bg-amber-500/15 text-amber-300 border-amber-500/20",
  [ServiceType.stickerPrinting]:
    "bg-pink-500/15 text-pink-300 border-pink-500/20",
  [ServiceType.tShirtPrinting]:
    "bg-green-500/15 text-green-300 border-green-500/20",
};

function formatTimestamp(ts: bigint): string {
  try {
    // ICP timestamps are in nanoseconds
    const ms = Number(ts / 1_000_000n);
    return new Date(ms).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

function QuotesTable({ quotes }: { quotes: Quote[] }) {
  if (quotes.length === 0) {
    return (
      <div
        data-ocid="admin.empty_state"
        className="flex flex-col items-center justify-center py-20 text-center glass rounded-2xl"
      >
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Printer className="w-7 h-7 text-muted-foreground" />
        </div>
        <p className="text-white font-semibold mb-1">No quotes yet</p>
        <p className="text-muted-foreground text-sm">
          Quote submissions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div data-ocid="admin.table" className="glass rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/8 hover:bg-transparent">
            <TableHead className="text-white/60 font-semibold">#</TableHead>
            <TableHead className="text-white/60 font-semibold">Name</TableHead>
            <TableHead className="text-white/60 font-semibold">
              Mobile
            </TableHead>
            <TableHead className="text-white/60 font-semibold">
              Service
            </TableHead>
            <TableHead className="text-white/60 font-semibold hidden md:table-cell">
              Details
            </TableHead>
            <TableHead className="text-white/60 font-semibold hidden lg:table-cell">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((quote, idx) => (
            <TableRow
              key={String(quote.id)}
              data-ocid={`admin.row.${idx + 1}`}
              className="border-white/6 hover:bg-white/4 transition-colors"
            >
              <TableCell className="text-muted-foreground text-sm font-mono">
                {idx + 1}
              </TableCell>
              <TableCell className="text-white font-medium">
                {quote.name}
              </TableCell>
              <TableCell>
                <a
                  href={`tel:${quote.mobile}`}
                  className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                >
                  {quote.mobile}
                </a>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${SERVICE_COLORS[quote.service] || "bg-white/10 text-white/70 border-white/20"}`}
                >
                  {SERVICE_LABELS[quote.service] || String(quote.service)}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm max-w-xs hidden md:table-cell">
                <span className="line-clamp-2">{quote.details}</span>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm hidden lg:table-cell whitespace-nowrap">
                {formatTimestamp(quote.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function Dashboard() {
  const { data: quotes, isLoading, isError } = useGetQuotes();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center">
              <Printer className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="font-display font-black text-2xl text-white">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-sm">Nellore Print Hub</p>
            </div>
          </div>
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </a>
        </div>

        {/* Stats */}
        {!isLoading && !isError && quotes && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4">
              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                Total Quotes
              </div>
              <div className="font-display font-black text-2xl text-white">
                {quotes.length}
              </div>
            </div>
            {Object.entries(SERVICE_LABELS).map(([key, label]) => (
              <div key={key} className="glass rounded-xl p-4">
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1 truncate">
                  {label}
                </div>
                <div className="font-display font-black text-2xl text-white">
                  {quotes.filter((q) => q.service === key).length}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div data-ocid="admin.loading_state" className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl bg-white/5" />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div
            data-ocid="admin.error_state"
            className="flex items-center gap-3 p-5 glass rounded-2xl border border-red-500/20 text-red-400"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
              Failed to load quotes. Please refresh and try again.
            </p>
          </div>
        )}

        {/* Quotes table */}
        {!isLoading && !isError && quotes && <QuotesTable quotes={quotes} />}
      </div>
    </div>
  );
}

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
    // Simulate small delay
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
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
        {/* Card */}
        <div className="glass rounded-2xl p-8 border border-white/10">
          {/* Logo */}
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

            {/* Error state */}
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
