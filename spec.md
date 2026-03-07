# Nellore Print Hub

## Current State

- Full landing page with services, quote form, gallery, and contact sections.
- Admin panel at `/admin` (password: Magic123) with two tabs: Quotes and Site Settings.
- Gallery section on the homepage displays 4 static placeholder images (generated at build time).
- Backend stores quotes and site settings in Motoko.
- No ability to upload or manage gallery photos without rebuilding the app.

## Requested Changes (Diff)

### Add
- `GalleryPhoto` type in backend: `{ id: Nat, url: Text, title: Text, order: Nat, timestamp: Int }`.
- Backend functions: `addGalleryPhoto`, `getGalleryPhotos`, `deleteGalleryPhoto`, `updateGalleryPhotoTitle`.
- blob-storage component for photo uploads from admin panel.
- New **Gallery** tab in the admin dashboard (third tab alongside Quotes and Site Settings).
- Admin Gallery tab features:
  - Upload button to add new photos (with title input) using blob-storage.
  - Grid of uploaded photos with delete button on each and editable title.
  - Loading, error, and empty states.
- Homepage `GallerySection` updated to fetch photos dynamically from backend instead of using hardcoded static images.
- If no photos have been uploaded yet, fall back to placeholder images.

### Modify
- `AdminPage.tsx`: Add `"gallery"` as a third `AdminTab`, add Gallery tab button in header, add `GalleryPanel` component.
- `GallerySection.tsx`: Replace static `GALLERY_SRCS` array with dynamic data from `useGetGalleryPhotos` hook.
- `backend.d.ts`: Add `GalleryPhoto` interface and new backend function signatures.
- `useQueries.ts` (or equivalent hooks file): Add `useGetGalleryPhotos`, `useAddGalleryPhoto`, `useDeleteGalleryPhoto`, `useUpdateGalleryPhotoTitle` hooks.

### Remove
- Static hardcoded gallery image array in `GallerySection.tsx` (replaced by dynamic data).

## Implementation Plan

1. Select `blob-storage` Caffeine component.
2. Regenerate Motoko backend with `GalleryPhoto` type and gallery CRUD functions alongside existing quote and site settings logic.
3. Update `backend.d.ts` with new types and function signatures.
4. Add gallery query hooks to hooks file.
5. Build `GalleryPanel` admin component: photo upload with title, photo grid, delete per photo.
6. Add Gallery tab to admin `Dashboard` header and tab switcher.
7. Update `GallerySection.tsx` to load photos from backend dynamically.
