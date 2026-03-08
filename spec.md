# Nellore Print Hub

## Current State
Full-stack printing company website with homepage sections (Hero, Intro, Services, Quote, Gallery, Reviews, Contact, Footer) and an admin panel at `/admin`. The admin panel has tabs: Quotes, Gallery, Reviews, Site Settings, Visitors, Promo. The site uses a dark premium theme with a magenta/purple/orange/teal logo gradient palette. Fonts are Plus Jakarta Sans + General Sans.

## Requested Changes (Diff)

### Add
- **Professional generated logo** in the header: use `/assets/generated/nellore-print-hub-logo-transparent.dim_600x200.png` as the default logo displayed in the Header component (replacing the current uploaded logo fallback path).
- **PDF reply/quotation upload in admin Quotes panel**: inside the expanded quote row detail, add a "Upload Quotation PDF" button that allows the admin to attach a PDF file to that specific quote. Once uploaded, show a "View PDF" / "Download PDF" link on the same row. Store PDF blob references using `ExternalBlob` (already available via blob-storage). The PDF upload uses the existing `useAddPhotoWithProgress` hook conceptually -- but since only images are typed, use a direct file-to-blob upload approach with progress indicator.
- **Quote status change button**: The "Mark as Replied / Mark as New" toggle button already exists in the expanded row. Make it also appear as a standalone compact status badge/button directly in the collapsed table row (not just hidden in the expandable area) so admin can change status in one click without expanding.

### Modify
- **Theme -- Green & Fresh**: Replace the entire dark magenta/purple/orange/teal palette with an emerald/forest green + crisp white premium theme:
  - Background: white (`#ffffff`) / very light sage (`#f0f7f2`)
  - Primary color: forest green (`oklch(0.40 0.15 145)`)
  - Accent: emerald (`oklch(0.55 0.18 152)`)
  - Text: near-black (`#1a2e1a`) on light backgrounds
  - Brand gradient: forest green to emerald (`#1a5c32` → `#2d9e5e`)
  - Cards: white with subtle green border/shadow
  - Glass surfaces: semi-transparent white
  - All `brand-gradient`, `brand-gradient-text`, `glass`, `glass-dark`, `fire-glow`, `saffron-glow` utilities updated to green palette
  - Tailwind `brand` colors updated: `brand.green` = `#1a5c32`, `brand.emerald` = `#2d9e5e`, remove magenta/purple/orange/teal
  - Update all inline className references from magenta/orange/purple/teal brand classes to green equivalents
- **Font -- Premium professional**: Switch body font to `Inter` (or keep General Sans as display) and use `Playfair Display` or `Plus Jakarta Sans` for headings. Ensure fonts are declared properly in index.css. Make headings use `font-display` (Plus Jakarta Sans) for a sharp premium look with tighter letter-spacing.
- **Header logo**: Display the new generated logo `/assets/generated/nellore-print-hub-logo-transparent.dim_600x200.png` with a white or transparent background, height 56px, as the default logo (when no localStorage override is present).
- **Admin panel color scheme**: All admin UI colors updated to match the green theme (green buttons, green badges, green borders).

### Remove
- Old magenta/purple color references throughout all components
- `brand-magenta`, `brand-purple`, `brand-orange`, `brand-teal` CSS variables and Tailwind color entries (replace with green palette)

## Implementation Plan
1. Update `index.css`: replace OKLCH theme variables with green/white palette, update `brand-gradient`, `glass`, `glass-dark`, utility classes to green. Add Playfair Display or keep Plus Jakarta Sans for display headings with new green color tokens.
2. Update `tailwind.config.js`: replace `brand.magenta/purple/orange/teal` with `brand.green/emerald/leaf`. Update `shadow-fire` → `shadow-green`, keyframe colors.
3. Update `Header.tsx`: set default logo to `/assets/generated/nellore-print-hub-logo-transparent.dim_600x200.png`.
4. Update `AdminPage.tsx`:
   - Add "Upload Quotation PDF" section inside the expandable `QuoteRow` detail panel. On upload, show a download/view link.
   - Move status toggle button to also appear in the collapsed table row (as a compact pill button alongside the status badge, stopping click propagation).
   - Update all color class references from magenta/orange/brand-magenta to green equivalents.
5. Update all `sections/*.tsx` components: replace all hardcoded magenta/orange/teal color classes with green equivalents.
6. Validate build.
