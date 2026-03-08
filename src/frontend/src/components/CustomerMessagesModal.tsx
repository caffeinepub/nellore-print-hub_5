import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, ExternalLink, FileText, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { SiWhatsapp } from "react-icons/si";
import type { AdminMessage } from "../backend.d";
import {
  useGetMessagesForCustomer,
  useMarkMessageRead,
} from "../hooks/useQueries";

function formatMessageDate(ts: bigint): string {
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

function MessageCard({
  message,
  idx,
}: {
  message: AdminMessage;
  idx: number;
  customerName: string;
}) {
  const waText = encodeURIComponent(
    `Re: ${message.subject} - Hi, I received your message. `,
  );
  const waUrl = `https://wa.me/919390535070?text=${waText}`;
  const urlMatch = message.body.match(/https?:\/\/[^\s]+/);

  return (
    <motion.div
      data-ocid={`messages.item.${idx + 1}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2, delay: idx * 0.05 }}
      className={`rounded-2xl p-4 border transition-all duration-200 ${
        !message.isRead
          ? "border-[#e1306c]/30 bg-[#e1306c]/6"
          : "border-white/8 bg-white/3"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center flex-shrink-0">
            <Mail className="w-3.5 h-3.5 text-black" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">
              {message.subject}
            </p>
            <p className="text-white/40 text-xs mt-0.5">
              {formatMessageDate(message.timestamp)}
            </p>
          </div>
        </div>
        {!message.isRead && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[#e1306c]/20 text-[#e1306c] border border-[#e1306c]/30 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e1306c] animate-pulse" />
            Unread
          </span>
        )}
      </div>

      {/* Body */}
      <p className="text-white/75 text-sm leading-relaxed pl-10">
        {message.body}
      </p>

      {/* Inline PDF viewer */}
      {urlMatch && (
        <div
          className="mt-3 w-full"
          data-ocid={`messages.quotation.panel.${idx + 1}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span className="text-blue-400 text-xs font-semibold">
              Your Quotation
            </span>
            <a
              href={urlMatch[0]}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`messages.quotation.button.${idx + 1}`}
              className="ml-auto flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-blue-500/12 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-200"
            >
              <ExternalLink className="w-3 h-3" />
              Full Screen
            </a>
          </div>
          <iframe
            src={urlMatch[0]}
            title="Quotation PDF"
            className="w-full rounded-xl border border-white/10 bg-white"
            style={{ height: "420px" }}
          />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap justify-end gap-2 mt-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25D366]/12 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all duration-200"
        >
          <SiWhatsapp className="w-3.5 h-3.5" />
          Reply on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

interface CustomerMessagesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mobile: string;
  customerName: string;
}

export default function CustomerMessagesModal({
  open,
  onOpenChange,
  mobile,
  customerName,
}: CustomerMessagesModalProps) {
  const { data: messages, isLoading } = useGetMessagesForCustomer(mobile);
  const markRead = useMarkMessageRead();
  const markReadRef = useRef(markRead.mutateAsync);
  markReadRef.current = markRead.mutateAsync;

  // Auto-mark all unread messages as read when modal opens
  useEffect(() => {
    if (!open || !messages) return;
    const unread = messages.filter((m) => !m.isRead);
    if (unread.length === 0) return;
    // Mark all unread in parallel
    Promise.all(unread.map((m) => markReadRef.current(m.id))).catch(() => {
      // silently ignore
    });
  }, [open, messages]);

  const sortedMessages = [...(messages ?? [])].sort((a, b) =>
    Number(b.timestamp - a.timestamp),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-ocid="messages.dialog"
        className="max-w-lg w-full rounded-2xl border border-white/12 p-0 overflow-hidden"
        style={{ background: "rgba(10,10,10,0.98)" }}
      >
        {/* Header gradient stripe */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, #833ab4, #e1306c, #fd1d1d, #f56040, #fcb045)",
          }}
        />

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-white font-display font-bold text-lg">
              <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center flex-shrink-0">
                <Bell className="w-4 h-4 text-black" />
              </div>
              <div>
                <span>My Messages</span>
                <p className="text-muted-foreground text-xs font-normal mt-0.5">
                  Messages from Nellore Print Hub for {customerName}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-5 max-h-[60vh] overflow-y-auto pr-1 -mr-1 space-y-3">
            {/* Loading */}
            {isLoading && (
              <div data-ocid="messages.loading_state" className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-28 w-full rounded-2xl bg-white/5"
                  />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && sortedMessages.length === 0 && (
              <div
                data-ocid="messages.empty_state"
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white/20" />
                </div>
                <p className="text-white/60 font-semibold text-sm">
                  No messages from us yet
                </p>
                <p className="text-white/30 text-xs mt-1">
                  We'll notify you here when we send something special.
                </p>
              </div>
            )}

            {/* Messages */}
            {!isLoading && sortedMessages.length > 0 && (
              <AnimatePresence initial={false}>
                {sortedMessages.map((msg, idx) => (
                  <MessageCard
                    key={String(msg.id)}
                    message={msg}
                    idx={idx}
                    customerName={customerName}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
