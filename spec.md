# Nellore Print Hub

## Current State
- Light paper-white theme with ink-blue primary and saffron orange accent colors
- Hero section has two CTA buttons (Start Order, View Services) and a separate smaller Share button below them
- All sections use blue/saffron brand palette
- Background is warm paper-white with halftone dot texture
- Gallery section shows "Our Work" with photos

## Requested Changes (Diff)

### Add
- A third prominent CTA button row in the Hero: "Start Your Order", "View Services", "Share this site" — all three displayed as equal-weight buttons in a single row/group (not separate rows)
- A call-to-action band/strip AFTER the Gallery ("Our Work") section with the same three action buttons: Start Your Order, View Services, Share this site — so users are prompted to act after seeing the finished projects

### Modify
- **Theme color overhaul**: Replace the blue/saffron palette with a red-orange fire gradient theme
  - Background: deep warm dark red (#1a0500) or very dark burnt orange as base
  - Primary brand color: vivid red-to-orange gradient (#FF2200 → #FF7A00)
  - Accent: bright amber/orange (#FF9500)
  - Text on dark backgrounds: white or warm cream (#FFF5E0)
  - Text on light elements: deep charcoal (#1A0800)
  - Cards/sections: dark semi-transparent red-tinted surfaces
  - Halftone dot texture: tinted red/orange instead of blue
  - Section dividers: red-to-orange gradient
  - All brand-gradient, glass, fire-glow utilities updated to red-orange palette
  - All inline blue/saffron color references in Hero, Intro, Services, Gallery sections replaced with red-orange equivalents
  - Header glass effect: dark red-tinted
  - Footer: deep dark red background

### Remove
- The separate small "Share this site" button that appears below the two hero CTAs (it will be merged into the main three-button group)

## Implementation Plan
1. Update `index.css` — remap all OKLCH CSS variables and utility classes to red-orange fire palette
2. Update `HeroSection.tsx` — replace two-button + share layout with a unified three-button group (Start Your Order, View Services, Share this site); update all inline color references to red-orange
3. Update `IntroSection.tsx` — update stat badge colors and gradient references to red-orange
4. Update `ServicesSection.tsx` — update badge and section header gradient references; service card colors can keep their individual accents but section-level elements use red-orange
5. Update `GallerySection.tsx` — update badge and overlay to red-orange
6. Add a new `PostGalleryCTA.tsx` component — a bold strip after the gallery with heading "Ready to start your project?" and three buttons: Start Your Order (primary), View Services (secondary), Share this site (ghost)
7. Update `HomePage.tsx` — insert `<PostGalleryCTA />` between `<GallerySection />` and `<ReviewsSection />`
8. Update Header, Footer, WhatsApp, FloatingSocial, MobileBottomNav, Contact, Quote, Reviews sections — apply red-orange color palette throughout
