# Nellore Print Hub

## Current State
- Customer login exists but is triggered only via a "Login" button in the header nav
- No auto-login on page load — customers must manually click the button
- Theme uses a rainbow multi-color palette (red, orange, yellow, green, blue, violet) which feels busy
- LoginModal has no "free website" messaging

## Requested Changes (Diff)

### Add
- Auto-open login modal on first visit (when no `nph_customer` in localStorage)
- "Free website" badge/text inside the login modal, prominently placed
- Clear messaging that no OTP is needed, just name and number

### Modify
- LoginModal: show a friendly headline like "Welcome to Nellore Print Hub — Free Access!", add a "100% Free • No OTP • Instant Access" badge, make it feel warm and welcoming
- Theme: replace the busy rainbow palette with a clean, professional yet attractive scheme — warm white background, deep navy/indigo as primary, saffron orange as accent highlight; simple and good-looking for customers
- index.css: update CSS custom properties and gradient utilities to match new theme
- App.tsx: add auto-login trigger logic — after actor is ready, if no customer in localStorage, open login modal automatically
- Header.tsx: pass loginOpen state down or use a shared event so App-level auto-open works seamlessly

### Remove
- Rainbow gradient backgrounds from buttons and the top bar stripe (replace with clean solid/subtle gradient)

## Implementation Plan
1. Update `index.css` — new color tokens: warm white background, deep navy primary, saffron orange accent, clean grays; remove rainbow gradient utilities, replace with simple brand gradient (navy→saffron)
2. Update `LoginModal.tsx` — add "FREE" badge, "100% Free Access" headline, update colors to match new theme, keep "No OTP" note prominent
3. Update `App.tsx` — add auto-login modal trigger: if actor ready and no `nph_customer` in storage, fire an event or set state to open LoginModal on first load
4. Update `Header.tsx` — respond to auto-open event from App, show modal on first visit automatically
5. Update `HomePage.tsx` if needed for new theme utilities
6. Validate and deploy
