# Credence Design Rules

> Read `design.md` in the repo root before building any feature, page, or component.
> That file is the single source of truth for all visual and interaction design.

## Quick Reference — Mandatory Rules for Every Feature

### Colours (never hardcode hex — use CSS custom properties)
- Background: `--color-bg` (#F7F5EF warm ivory)
- Secondary surface: `--color-surface` (#DCE6D7 sage)
- Primary brand / buttons: `--color-brand` (#34483D forest green)
- Accent (sparingly): `--color-accent` (#E9D5D2 dusty rose)
- Cards / borders: `--color-card` (#EAE3D8 warm beige)
- Body text: `--color-text` (#292D29 deep charcoal)
- Secondary text: `--color-text-muted` (#777F75 muted grey-green)

### Typography
- Headings: Agrandir → fallback `'Cormorant Garamond', Georgia, serif`
- Body / UI: Inter → fallback `system-ui, sans-serif`
- Monospace (IDs, hashes): JetBrains Mono → fallback `ui-monospace, monospace`
- Do NOT make every heading oversized or bold. Use scale and spacing for hierarchy.

### Components
- Buttons: 6px radius, forest green primary, transparent border secondary.
- Cards: 10px radius, `--shadow-card` shadow, `--color-card` background.
- Status labels: ALWAYS pair text + icon. Never colour-only.
  - Verified / Pending / Inconclusive / Unable to Verify / Rejected / Expired / Revoked
- Evidence panels: left border accent, source title + URL + timestamp + excerpt.
- Credential records: trustworthy and precise — not crypto-themed or flashy.

### Layout
- Generous negative space. Editorial asymmetry. Not repetitive card grids.
- Consistent spacing tokens (8px base unit, see design.md §10).
- Selective corner rounding — not pill-shaped everywhere.

### Motion
- Gentle, purposeful transitions only (150–360ms).
- Respect `prefers-reduced-motion` — all animations must degrade gracefully.
- No continuous looping, parallax, animated gradients, or glowing effects.

### Accessibility
- Keyboard-navigable with visible `:focus-visible` states.
- Semantic HTML (`<nav>`, `<main>`, `<aside>`, `<article>`, etc.).
- Min contrast 4.5:1 body text, 3:1 large text / UI.
- `aria-live` on loading states; focus trapping on modals.

### Do Not
- Use neon/purple/gradient backgrounds.
- Use glassmorphism or glowing border effects.
- Use stock photography, fake trust badges, or invented statistics.
- Use decorative blockchain symbols.
- Hardcode hex values in component styles.
- Communicate status with colour alone.

### Demo Data
- Label all demo content clearly: "This is a demonstration profile."
- Mark simulated flows as "Simulated".
- Never claim undeployed blockchain anchors are live.

---
Full specification: see [`design.md`](../../design.md) in the repo root.
