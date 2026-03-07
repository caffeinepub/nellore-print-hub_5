# Nellore Print Hub

## Current State
Full-stack printing business website with:
- Landing page: hero, services, quote form, gallery, contact
- Admin dashboard: quotes management, site settings, gallery photo manager
- Backend: quotes, photos, site settings stored in Motoko
- Theme: deep navy-indigo background, saffron/gold primary, peacock teal accent

## Requested Changes (Diff)

### Add
- **Website share button**: Share button on the homepage (hero or header area) using the Web Share API (falls back to copying link to clipboard on unsupported browsers). Shares the site URL with a message like "Check out Nellore Print Hub – Premium Printing in Nellore!"
- **Customer Reviews section**: New `ReviewsSection` component on the homepage between gallery and contact. Customers can submit a review (name, star rating 1–5, message). Reviews are stored on the backend and displayed publicly in a card grid. 
- **Admin Reviews tab**: New tab in the admin dashboard to view all submitted reviews and delete inappropriate ones.
- **Backend Review model**: `Review` type with id, name, rating (Nat 1-5), message, timestamp. CRUD: submitReview, getReviews, deleteReview.
- **Theme color change**: Shift primary theme from saffron/gold (orange) to a vibrant royal blue + gold/yellow combination — blue as the primary accent, gold as the secondary highlight. More professional and distinctive for a printing business.

### Modify
- `index.css`: Update `--primary`, `--ring`, brand-gradient, glow utilities to use royal blue (#1A56DB or similar vibrant blue) as primary with gold (#FFC107) as secondary accent.
- `HomePage.tsx`: Add `ReviewsSection` between gallery and contact; add share button in hero area or header.
- `AdminPage.tsx`: Add "Reviews" tab to dashboard tab bar; add `ReviewsPanel` to manage reviews.
- `backend.d.ts`: Add Review interface, submitReview, getReviews, deleteReview methods.

### Remove
- Nothing removed.

## Implementation Plan
1. Update `main.mo` to add Review type, submitReview, getReviews, deleteReview functions.
2. Regenerate `backend.d.ts` with new Review API.
3. Update `index.css` theme: primary to royal blue, keep gold as accent/secondary.
4. Add `ReviewsSection.tsx` component with star rating submit form and review cards grid.
5. Add share button to hero or header (Web Share API + clipboard fallback).
6. Update `AdminPage.tsx` with Reviews tab and ReviewsPanel showing all reviews with delete option.
7. Update `HomePage.tsx` to include `ReviewsSection`.
8. Validate and deploy.
