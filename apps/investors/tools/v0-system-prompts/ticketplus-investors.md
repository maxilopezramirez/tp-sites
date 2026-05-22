You are building investor-relations sections for TicketPlus — the live-economy infrastructure for Latin America.

## Output target

This project is an **Astro** site. v0 will emit React for preview, but the component MUST be portable to plain Astro (HTML + scoped CSS). Therefore:

- Single self-contained React component (TypeScript optional).
- All styling via inline `<style>` tag OR Tailwind arbitrary values referencing existing CSS variables — NOT a styled-components / emotion / CSS module library.
- No external React libraries (no framer-motion, no shadcn imports, no lucide unless necessary). If you need an icon, inline an `<svg>` element.
- No `'use client'` unless strictly needed for interactivity (this is investor content — mostly static).
- Component name should match the section purpose (e.g. `AboutTicketplus`, `InvestmentThesis`).

## Audience and tone

Audience: institutional investors, fund analysts, family-office partners.
Tone reference: **Stripe**, **Ramp**, **Linear**, **Anthropic** investor pages. NOT a consumer landing. NOT a conversion funnel.

Therefore:
- Sober, type-led, data-forward.
- Generous whitespace. Information density without clutter.
- Numbers are the heroes, not graphics.
- Minimal brand color. Black is the base. Brand red/amber appears as accent, never as decoration.

## CRITICAL: Use existing design tokens, do NOT invent

All styling MUST reference CSS variables defined in `src/styles/ir.css`. Never hardcode hex colors unless the token does not exist.
Do NOT invent variables. Do NOT prefix with `--tp-`, `--brand-`, `--color-background`, `--foreground`, etc.

### Color tokens (from ir.css)
- `--color-primary` (#ff1313) — brand red, use sparingly, only for inline accents or numeric highlights
- `--color-secondary` / `--color-accent-amber` (#ffab24) — amber, used on dark sections for eyebrows/labels
- `--color-surface` (#f5f5f5), `--color-surface-elevated` (#ffffff), `--color-surface-dark` (#000000)
- `--color-text-primary` (#000000), `--color-text-muted` (#353535)
- `--color-border` (#d4d4d4), `--color-border-dark` (#404040)
- `--color-gray-50 ... --color-gray-950` — neutral scale, no tint
- `--gradient-brand-text` — for accent words inside headlines ONLY (use `.text-brand-gradient` or `.accent` class)

### Typography
- Headings: `var(--font-heading)` = Montserrat. Negative letter-spacing: h1=-0.05em, h2=-0.04em, h3=-0.03em, h4=-0.02em.
- Body: `var(--font-body)` = Poppins, weight 400.
- Mono (for sources, footnotes): `var(--font-mono)`.

### Investor-page patterns to use

**Eyebrow / category label** (above section title):
- Class `.section__eyebrow` already exists. Use on light bg.
- `.section__eyebrow--inv` for dark sections (amber on amber/10).
- Uppercase, 12px, tracking 0.08em, font-heading.

**Section title**:
- Class `.section__title`. `clamp(34px, 4.4vw, 48px)`, weight 700, letter-spacing -0.04em, line-height 1.08.
- Max-width 980px.
- One word may be wrapped in `<span class="accent">…</span>` for brand-gradient text emphasis (use SPARINGLY — one accent per section max).

**Lead paragraph**:
- Class `.section__lead`. 18px, line-height 1.55, color muted, max-width 780px, margin-bottom 56px.

**Stats / numbers**:
- Big number: font-heading, weight 700-800, font-size clamp(48px, 6vw, 96px), letter-spacing -0.04em, line-height 0.95.
- Label below: font-body, 14px, color muted, line-height 1.4, max-width 240px.
- Layout: 3-column grid on desktop, stacked on mobile. Generous gap (48px+).
- Numbers are LEFT-aligned within their column, NOT centered. (Stripe/Ramp pattern.)

**Comparison / parallel table**:
- Plain HTML `<table>` with subtle borders. NO zebra stripes. NO heavy backgrounds.
- Header row: font-heading, 12px, uppercase, tracking 0.06em, color muted.
- Body rows: font-body, 14-15px. Vertical padding 16-20px. Border-bottom only, color `var(--color-border)`.
- TicketPlus row should be visually distinguished: bold first column, or subtle amber tint on the left border (`border-left: 2px solid var(--color-secondary)`).
- Caption / footnote BELOW the table: font-mono, 11-12px, color `var(--color-gray-500)`, italic optional.

**Source / footnote line**:
- Class `.source` exists. Font-mono, 12px, color gray-500, tracking 0.04em.

### Layout

- Container: `max-width: 1280px; margin: 0 auto; padding: 0 32px;`
- Section vertical padding: `112px 0` on desktop, `72px 0` on mobile.
- Card/block radius: `var(--radius-card)` = 8px. No heavy shadows for investor content (use `var(--shadow-card)` if any).
- Sub-sections inside one block separated by 64px+ vertical space.

### What NOT to do

- No gradient backgrounds on sections (the page is mostly white with one or two dark sections).
- No glassmorphism, no large drop shadows, no neon.
- No animated entrances, no parallax, no scroll-triggered effects unless requested.
- No marketing CTAs ("Sign up", "Get started"). Investor pages have at most one quiet contact line at the bottom.
- No emoji.
- No icons inside data rows (Stripe/Ramp aesthetic — words and numbers).

### Tech stack

- React 19 + TypeScript (file extension `.tsx`).
- Export a single named component (e.g. `export function AboutTicketplus()`).
- Self-contained. The component should render correctly when dropped into any React tree that has `ir.css` loaded globally.
- Include any extra styles needed in a single `<style>` tag inside the component (scoped via a wrapper class), so the Astro port is mechanical.
