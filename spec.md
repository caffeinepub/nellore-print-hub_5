# Nellore Print Hub

## Current State
Full-stack printing business website with:
- Homepage: hero, intro, services, quote form, gallery, reviews, contact, multilingual
- Customer login (name + mobile, no OTP), visitor tracking, promo welcome popup
- Admin panel at /admin (password: Magic123) with tabs: Quotes, Gallery, Reviews, Site Settings, Promo, Visitors, Messages

Known issues:
- Quote form file attachment is captured by name only; NOT uploaded to backend
- Logo upload in Admin > Site Settings uses addPhoto() which adds to gallery; should be a separate storage key
- Gallery has no lightbox/zoom for full image view
- Quote status is binary (new/replied); no accepted/rejected with reason
- Customer inbox: "Download" button uses `download` attribute which fails cross-origin
- PDF viewer in customer inbox: iframe doesn't reliably render PDFs across browsers
- Admin has no dedicated file manager / "drive" for uploaded documents

## Requested Changes (Diff)

### Add
- **Quote file attachment upload**: When customer submits quote, the attached file is uploaded to blob storage and the URL saved alongside the quote. Admin can preview/download it in the quote row.
- **Quote status: Accepted / Rejected**: New statuses `#accepted` and `#rejected` in addition to `#new_` and `#replied`. When admin sets accepted/rejected, a reason field is required; the customer receives an inbox notification with the reason.
- **Gallery lightbox**: Clicking any gallery image opens a full-screen modal with zoom, prev/next navigation.
- **Admin File Drive tab**: New tab in admin panel that shows all uploaded blobs (quotation PDFs, logo, design files) with title, date, preview button, download button, and delete button. Acts as a simple file manager.
- **Force download utility**: Frontend helper that fetches the blob URL and triggers a browser download, bypassing cross-origin `download` attribute issue.
- **Customer file attachment field in Quote type**: Backend Quote type gets an optional `attachmentUrl: ?Text` field. `submitQuoteWithAttachment` variant or updated `submitQuote` to accept optional attachment URL.

### Modify
- **Logo upload**: Use a dedicated backend field / separate blob key stored in `siteSettings.logoUrl` (new field), NOT addPhoto to gallery.
- **Quote form**: After file selection, upload file to blob storage before submitting quote; attach the resulting URL to the quote submission.
- **Admin quote row**: Show attached customer file with preview (image inline, PDF via Open button) and forced download. Show Accept/Reject buttons with reason input dialog.
- **Customer inbox MessageCard**: Replace `download` anchor with forced fetch-and-download function. Replace unreliable iframe PDF preview with a clean "Open PDF" button that opens in new tab (most reliable cross-browser). Show status change notifications (accepted/rejected with reason) distinctly.
- **SiteSettings type**: Add `logoUrl: Text` field.

### Remove
- Logo upload via addPhoto (no longer adds logo to gallery)

## Implementation Plan
1. Update Motoko backend:
   - Add `attachmentUrl: ?Text` to `Quote` type
   - Add `logoUrl: Text` to `SiteSettings`
   - Update `submitQuote` to accept optional `attachmentUrl`
   - Extend `QuoteStatus` to include `#accepted` and `#rejected`
   - Add `QuoteStatusUpdate` with reason: `updateQuoteStatusWithReason(id, status, reason)` — stores reason in Quote
   - Add `reason: ?Text` to Quote type for accepted/rejected notes
   - Add `getAllFiles()` query that returns all photos (used for file drive)

2. Update frontend:
   - QuoteSection: upload file first to blob storage, then call submitQuote with URL
   - Admin QuoteRow: show customer attachment (image preview or PDF open button + force-download), Accept/Reject buttons + reason modal, send status notification to customer inbox
   - Admin SiteSettings: logo upload saves to siteSettings.logoUrl via updateSiteSettings, not to gallery
   - Header: read logoUrl from siteSettings (backend), fallback to localStorage/generated logo
   - GallerySection: add lightbox modal with full image, prev/next, close
   - Admin: add "Files" tab showing all uploaded blobs as a drive view (title, date, preview, force-download, delete)
   - CustomerMessagesModal: replace iframe/download anchor with fetch-and-download helper; show accepted/rejected status messages with colored badge
