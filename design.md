# Credence — Design Guidelines
> **This file is the single source of truth for all visual and interaction design on Credence.**
> Every feature, page, and component must follow these guidelines. When in doubt, refer here first.

---

## 1. Design Goal

Create a **premium, elegant, soothing, human-designed** visual identity for Credence — a skill and achievement verification platform.

The site should feel like a thoughtful, design-conscious career-tech startup: **calm, credible, editorial, and refined**. Avoid the visual clichés of generic AI products.

**Brand tagline:** *Proof, not promises.*

---

## 2. Colour Palette

### Token Reference

| Token | Role | Hex |
|---|---|---|
| `--color-bg` | Main page background | `#F7F5EF` (warm ivory) |
| `--color-surface` | Soft secondary surface | `#DCE6D7` (sage) |
| `--color-brand` | Primary brand / dark surface | `#34483D` (muted forest green) |
| `--color-accent` | Accent | `#E9D5D2` (dusty rose) |
| `--color-highlight` | Small highlight | `#F0E7C9` (pale butter) |
| `--color-card` | Cards / dividers | `#EAE3D8` (warm beige) |
| `--color-text` | Primary text | `#292D29` (deep charcoal) |
| `--color-text-muted` | Secondary text | `#777F75` (muted grey-green) |

### Colour Usage Rules

- **Ivory (`#F7F5EF`)** is the dominant background — used on nearly all pages and panels.
- **Sage (`#DCE6D7`)** is for secondary sections, sidebar backgrounds, and alternate row fills.
- **Forest green (`#34483D`)** is for primary action buttons, key headings, dark hero sections, and the navigation bar when full-bleed dark is required.
- **Dusty rose (`#E9D5D2`)** and **pale butter (`#F0E7C9`)** are used sparingly — as badge fills, highlight chips, or tiny decorative accents. Never for backgrounds of full sections.
- **Warm beige (`#EAE3D8`)** is for card backgrounds, table row dividers, and subtle borders.
- **Deep charcoal (`#292D29`)** is the default body and heading colour on light backgrounds.
- **Muted grey-green (`#777F75`)** is for captions, metadata, timestamps, and disabled states.

### What NOT to Do with Colour

- No neon green, electric blue, or purple gradient backgrounds.
- No black-and-purple AI aesthetic.
- No pastel text on white backgrounds for important information.
- Never communicate verification status with colour alone — always pair with a text label or icon.
- No glowing borders or luminous drop shadows.

---

## 3. Typography

### Typefaces

| Usage | Font | Weight | Notes |
|---|---|---|---|
| Display / editorial headings | **Agrandir** | Regular (400) | Load from local file if available; use fallback stack otherwise |
| Section headings & UI headings | **Agrandir** | Regular or Medium | Do not bold every heading |
| Body copy | **Inter** | 400, 500 | Also acceptable: DM Sans, Outfit |
| Labels, captions, metadata | **Inter** | 400 | Smaller size, muted colour |
| Monospace (hashes, IDs) | **JetBrains Mono** or system mono | 400 | Used for credential IDs, transaction hashes |

### Agrandir Fallback Stack

```css
font-family: 'Agrandir', 'PP Agrandir', 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
```

### Type Scale (base 16px)

| Token | Size | Usage |
|---|---|---|
| `--text-xs` | 11px | Micro-labels, badges |
| `--text-sm` | 13px | Captions, timestamps, secondary metadata |
| `--text-base` | 15–16px | Body copy, form fields |
| `--text-md` | 18px | Card headings, list titles |
| `--text-lg` | 22px | Section subheadings |
| `--text-xl` | 28–32px | Section headings |
| `--text-2xl` | 40–48px | Page hero headings |
| `--text-3xl` | 56–72px | Landing display type |

### Typography Rules

- Use editorial-scale headings with deliberate line breaks and generous leading (line-height 1.2–1.4 for headings, 1.6–1.75 for body).
- Avoid making every heading bold or oversized. Use size and spacing to establish hierarchy, not weight alone.
- Keep body copy within a comfortable reading width (60–75 characters / ~680px max on large screens).
- Use tabular numerals (`font-variant-numeric: tabular-nums`) for data tables, timelines, and credential IDs.

---

## 4. Layout and Composition

### Grid

- **Desktop (≥1280px):** 12-column grid, 24px gutters, 80px horizontal padding.
- **Tablet (768–1279px):** 8-column grid, 20px gutters, 40px horizontal padding.
- **Mobile (<768px):** 4-column grid, 16px gutters, 20px horizontal padding.

### Spacing Scale

Use an 8px base unit. Named spacing tokens:

```
--space-1:  4px    --space-2:  8px   --space-3: 12px
--space-4: 16px    --space-5: 20px   --space-6: 24px
--space-8: 32px    --space-10: 40px  --space-12: 48px
--space-16: 64px   --space-20: 80px  --space-24: 96px
```

### Composition Rules

- Generous negative space — sections breathe, they do not compete.
- Editorial layouts with balanced asymmetry rather than repetitive grids of equal cards.
- Use realistic product UI previews, evidence diagrams, timelines, and credential records — not generic stock images or floating decorative cards.
- Dashboards should be information-rich but uncluttered: prioritise the most important data, collapse secondary details behind expandable panels or tabs.
- Use fine 1px borders (`--color-card`) as separators, not heavy dividers.
- Selective corner rounding: buttons `6px`, cards `10px`, modals `12px`, chips/tags `4px`. Not everything needs a pill shape.
- Restrained box-shadow only where it clarifies hierarchy. Standard card shadow: `0 2px 8px rgba(41, 45, 41, 0.06)`.
- The same design language applies across: landing page, candidate dashboard, employer dashboard, verification pages, public profile, and credential detail views.

---

## 5. Component Specifications

### 5.1 Buttons

```
Primary:   bg #34483D, text white, hover bg #2A3B31, border-radius 6px, px 20px py 10px
Secondary: bg transparent, border 1.5px #34483D, text #34483D, hover bg #EAE3D8
Text link: no border, text #34483D, underline on hover
Danger:    bg #C0392B (only for destructive actions), text white
Disabled:  opacity 0.45, cursor not-allowed
```

- All buttons must have a visible `:focus-visible` outline: `2px solid #34483D, outline-offset 3px`.
- Icon buttons must have an `aria-label`.

### 5.2 Form Controls

- Input height: 40px (desktop), 44px (mobile).
- Border: `1px solid #EAE3D8`. Focus: `1.5px solid #34483D`.
- Error state: `1.5px solid #B94040`, with an error message below in `--text-sm`, colour `#B94040`.
- Placeholder text: `#777F75`.
- All fields must have associated `<label>` elements.

### 5.3 Status / Verification Labels

Status labels must always show **both** a text label and a visual indicator (icon or coloured dot). Never use colour alone.

| Status | Badge background | Text colour | Icon |
|---|---|---|---|
| Verified | `#DCE6D7` | `#34483D` | checkmark |
| Pending | `#F0E7C9` | `#7A6A30` | clock |
| Inconclusive | `#EAE3D8` | `#5C5A50` | tilde |
| Unable to Verify | `#EAE3D8` | `#5C5A50` | question mark |
| Rejected | `#F5E4E4` | `#8B2E2E` | cross |
| Expired | `#EAE3D8` | `#777F75` | slash-circle |
| Revoked | `#F5E4E4` | `#8B2E2E` | slash-circle |

### 5.4 Evidence Panels

Each evidence panel shows:
- Source title (bold, `--text-md`)
- Source URL (truncated, linked, `--text-sm`, muted)
- Retrieval timestamp (`--text-xs`, muted, right-aligned)
- Source type chip (e.g., "GitHub", "Official Issuer", "News")
- Concise excerpt or relevant quote (body text, max 3 lines, expandable)
- Reliability indicator (e.g., "High confidence — official source")

Evidence panels use `--color-card` background with a left accent border in `--color-brand` for confirmed sources, and `--color-accent` for flagged/conflicting sources.

### 5.5 Credential Records

A credential record detail view must include:
- Credential ID (monospace, copyable)
- Issued date and expiry (if applicable)
- Issuer name and logo (or text badge)
- Verification status label (per 5.3)
- Claim summary (what was verified)
- Evidence count and link to evidence panel
- Blockchain anchor section (transaction hash, network, contract address — monospace, copyable; or "Not anchored" if not yet deployed)
- Integrity check status ("Hash matches" / "Mismatch" / "Not checked")

Credential detail views must feel trustworthy and precise — not flashy or crypto-themed.

### 5.6 Evidence Graph

The Evidence Graph is a recognisable product visual that explains the verification workflow.

Nodes (in order): Candidate → Skill/Achievement Claim → Supporting Source → AI Review → Credential Record

Design rules:
- Use thin 1px connecting lines in `--color-card` or `--color-text-muted`.
- Small purposeful icons for each node type (person, document, link, sparkle/AI, badge).
- Muted colour-coded nodes: use brand/sage/accent tones — not primary red/green/blue.
- Clicking a node opens a concise details panel (slide-in or popover) showing relevant metadata.
- The graph must explain the workflow, not act as decoration.
- Animate connection lines subtly on page load (stroke-dashoffset reveal, 600ms, ease-out).
- Must work in a static/simplified form for mobile.

### 5.7 Verification Timeline

Show the progression: Submitted → Evidence Discovery → AI Review → Policy Check → Issued / Rejected / Inconclusive

- Horizontal timeline on desktop, vertical on mobile.
- Each stage shows: label, date/time, and status icon.
- Completed stages: solid `--color-brand` dot and line.
- Active stage: pulsing dot (subtle, respects prefers-reduced-motion).
- Pending stages: dashed line, muted dot.

### 5.8 Search and Filters

- Search field with a magnifying-glass icon inside (left), clear button (right when populated).
- Filter chips: `--color-card` background, `--color-text` label, `border-radius 4px`. Active chip: `--color-brand` background, white text.
- Dropdowns: `--color-bg` background, `--color-card` border, gentle `box-shadow`. Options highlight on hover with `--color-surface` background.

### 5.9 Profile Header

Candidate profile header contains:
- Avatar (circular, 64px desktop / 48px mobile), with a verified badge overlay if the profile is verified.
- Full name (heading scale), tagline or role (muted, `--text-md`).
- Quick stats row: claims count, verified count, skills count.
- Action buttons: "Share Profile", "Download", "View Public Profile".
- Shareable URL field (copyable).
- QR code (real, generated from profile URL — not decorative).

### 5.10 Navigation

**Top navigation (desktop):**
- Forest green (`#34483D`) background or ivory with bottom border.
- Logo left, nav links centre or right, CTA button far right.
- Active link: `--color-accent` underline or weight change.
- No dropdown mega-menus with decorative images.

**Sidebar (candidate/employer dashboards):**
- Ivory or sage background, `--color-card` border-right.
- Icons and labels for each section.
- Active section: `--color-brand` left border accent, slightly darker background.
- Collapsible on tablet; bottom tab bar on mobile.

**Mobile navigation:**
- Hamburger icon opens a slide-in drawer.
- Touch targets minimum 44×44px.
- Bottom navigation bar for dashboard sections on mobile.

---

## 6. Signature Visuals

### Do Use
- Realistic product UI screenshots of the actual candidate and employer interfaces.
- Evidence diagrams, timelines, credential records, and the Evidence Graph.
- Skill passport layout showing bio, skills, projects, and verification history.
- Side-by-side candidate comparison tables.
- Job description matching view with explainable match scores.

### Do Not Use
- Random floating UI cards with no context.
- Meaningless charts or graphs.
- Decorative code snippets.
- Generic 3D objects or abstract blob illustrations.
- Stock photography of people at computers.
- Fake trust badges, invented customer logos, or fabricated statistics.
- Decorative blockchain/crypto symbols (chains, glowing padlocks, etc.).

---

## 7. Motion and Interaction

### Allowed Motion

- Gentle fade-in transitions on page load (`opacity 0 → 1`, 200–300ms, ease-out).
- Smooth panel/drawer slide transitions (240ms, ease-in-out).
- Evidence Graph connection-line reveal (stroke-dashoffset, 600ms, staggered).
- Subtle hover state changes on cards and buttons (background-color 150ms ease).
- Timeline active-stage pulse (scale 1 → 1.1 → 1, 1.6s loop, only while active).
- Progress indicator during evidence discovery (indeterminate bar or spinner — not animated gradient).
- Toast/notification slide-in (240ms ease).

### Not Allowed

- Continuous looping animations on idle state.
- Parallax scrolling effects.
- Animated gradient backgrounds.
- Glowing / pulsing border effects.
- Entrance animations on every element.
- Auto-playing video backgrounds.

### Reduced Motion

All animations must respect `@media (prefers-reduced-motion: reduce)`. When reduced motion is preferred, disable all transforms, transitions, and keyframe animations. Maintain all functionality — only remove motion.

---

## 8. Responsive Design

### Breakpoints

```
--bp-mobile:  < 768px
--bp-tablet:  768px – 1279px
--bp-desktop: >= 1280px
```

### Responsive Rules

| Context | Desktop | Tablet | Mobile |
|---|---|---|---|
| Navigation | Horizontal top nav | Horizontal top nav | Slide-in drawer + bottom tabs |
| Dashboard sidebar | Visible, full labels | Collapsible | Hidden, bottom tabs |
| Evidence panels | 2-column grid | 1-column grid | Stacked |
| Candidate comparison | Side-by-side table | Side-by-side, scrollable | Stacked cards |
| Evidence Graph | Full interactive | Simplified interactive | Static diagram |
| Credential detail | 2-column (info + meta) | 1-column | 1-column |
| Data tables | Full columns | Priority columns | Card view or horizontal scroll |

---

## 9. Accessibility

- All interactive elements must be keyboard-navigable in a logical tab order.
- Visible `:focus-visible` states on all focusable elements (2px outline, offset 3px).
- Use semantic HTML: `<nav>`, `<main>`, `<aside>`, `<article>`, `<header>`, `<footer>`, `<section>`.
- Every image needs `alt` text; decorative images use `alt=""`.
- All form inputs must have associated `<label>` or `aria-label`.
- Error messages must be associated with inputs via `aria-describedby`.
- Colour contrast: minimum 4.5:1 for body text, 3:1 for large text and UI components.
- Status indicators must never rely on colour alone (always include a text label or icon).
- Modal dialogs must trap focus and be dismissible via `Escape`.
- Loading states must communicate to screen readers via `aria-live` or `role="status"`.

---

## 10. CSS Custom Properties (Design Tokens)

All design tokens must be defined as CSS custom properties on `:root` and consumed from there — never hardcode hex values in component styles.

```css
:root {
  /* Colour */
  --color-bg:           #F7F5EF;
  --color-surface:      #DCE6D7;
  --color-brand:        #34483D;
  --color-brand-dark:   #2A3B31;
  --color-accent:       #E9D5D2;
  --color-highlight:    #F0E7C9;
  --color-card:         #EAE3D8;
  --color-text:         #292D29;
  --color-text-muted:   #777F75;
  --color-error:        #B94040;
  --color-border:       #DDD8CE;

  /* Typography */
  --font-heading: 'Agrandir', 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Inter', 'DM Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', ui-monospace, monospace;

  /* Type scale */
  --text-xs:   11px;
  --text-sm:   13px;
  --text-base: 16px;
  --text-md:   18px;
  --text-lg:   22px;
  --text-xl:   30px;
  --text-2xl:  44px;
  --text-3xl:  64px;

  /* Spacing */
  --space-1:  4px;  --space-2:  8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;   --space-6: 24px;
  --space-8: 32px;  --space-10: 40px;  --space-12: 48px;
  --space-16: 64px; --space-20: 80px;  --space-24: 96px;

  /* Radii */
  --radius-sm:   4px;
  --radius-md:   6px;
  --radius-lg:  10px;
  --radius-xl:  12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-card:    0 2px 8px rgba(41, 45, 41, 0.06);
  --shadow-modal:   0 8px 32px rgba(41, 45, 41, 0.12);
  --shadow-dropdown: 0 4px 16px rgba(41, 45, 41, 0.08);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 240ms ease-in-out;
  --transition-slow: 360ms ease-in-out;

  /* Layout */
  --max-content: 1200px;
  --max-reading:  720px;
}
```

---

## 11. Design Clichés to Avoid

| Avoid | Use Instead |
|---|---|
| Neon green / electric blue / purple gradients | Ivory, sage, forest green from the palette |
| Default black-and-purple AI aesthetic | Warm charcoal on ivory |
| Excessive glassmorphism and glowing effects | Subtle shadow-card, solid surfaces |
| Repetitive grids of identical rounded cards | Editorial asymmetric layouts |
| Oversized bold text in every section | Hierarchical scale, restrained weight |
| Random stock photography | Real product UI previews |
| Fake trust badges / invented statistics | Honest demo labels |
| Decorative blockchain / crypto symbols | Functional credential detail views |
| Overloaded dashboards | Information-rich but uncluttered |
| Unnecessary continuous animation | Purposeful, restrained transitions |
| Gradient hero banners | Ivory background with editorial typography |
| Pill-shaped everything | Selective radius per component spec |

---

## 12. Demo Data Standards

When building with fictional demo data (e.g., candidate "Aarav Mehta"):
- All demo content must be clearly labelled: e.g., a banner stating "This is a demonstration profile — no real verification has been performed."
- Simulated evidence discovery and AI review must be marked as "Simulated".
- Credential records that are not blockchain-anchored must not claim to be.
- Do not invent transaction hashes or claim a smart contract is deployed before it is.
- Verification statuses in demo data must reflect realistic states: at least one Verified, one Pending, and one Inconclusive.

---

## 13. File and Asset Conventions

| Asset type | Location | Notes |
|---|---|---|
| Global CSS tokens | `artifacts/credence/src/index.css` | `:root` tokens only, no component styles |
| Component styles | Co-located with component or in `src/styles/` | CSS Modules or styled-components |
| Agrandir font files | `artifacts/credence/public/fonts/` | WOFF2 preferred |
| Icons | Lucide React or similar lightweight library | No icon fonts |
| Images / screenshots | `artifacts/credence/public/images/` | WebP preferred, provide `alt` |
| QR code | Generated at runtime via library (e.g., `qrcode.react`) | Not a static image |

---

*Last updated: 2026-10-24. This file is the source of truth for Credence design. Maintained in the repo root.*
