# IR Site Redesign — Design Spec
**Date:** 2026-05-22
**Scope:** `apps/investors` — `/` (home) + `/about/`
**Source of truth:** `~/Downloads/script-en-v4-light.docx` (v18.05.2026)
**Reference:** MELI investor.mercadolibre.com (structure only, not style)

---

## Principles

- Home and About are **one narrative split by reading pace** — same spine, two zoom levels.
- Every section maps to a tested slide from the canonical script.
- **Leitmotiv**: *"The operating system for live entertainment across Latin America."* Appears in hero (home) and page header (about). Echoed in closing of both.
- Visual: clean, mostly white, typography-led, no icons or images (except hero photo on home). Stripe/Ramp/Linear aesthetic.
- Data layer (Stripe/Shopify/Toast) is **crescendo**, not hook — appears late in both pages (Long-Term View chart 2 on home, section 7 on about).

---

## HOME (`/`) — new spine

| # | Section | Content | Script |
|---|---|---|---|
| 1 | **Hero** | H1: *"The operating system for live entertainment across Latin America."* Sub: *"Ticketing is the entry point. The long-term opportunity is the operating, transaction and data layer."* Existing concert photo. 2 CTAs: Our story → /about/ · IPO → /ipo/ | Slides 4, 21 |
| 2 | **Scale bar** | 5 numbers, large type, left-aligned: 10.2M tickets · $269M GMV · 11 countries · 2,800 partners · 95%+ retention | Slide 5 |
| 3 | **Investment thesis — 5 cards** | Order from slide 6 exactly: **Tailwinds** ($40B, 16.6% CAGR, 4× global) · **Moat** (12y in-house, 11 países, 2,800 partners, 50+ payment methods) · **Scale & proof** ($269M GMV, +64% rev, 37% EBITDA) · **Category** (OS for LATAM live entertainment, underserved 95%, bootstrapped 12y, profitable) · **AI** (anti-fraud, dynamic pricing, demand forecasting — built in-house) | Slide 6 |
| 4 | **"At the Center of the Live Economy" — 5 tabs** | Existing tab structure kept. Copy reframed from feature language → moat/infrastructure language per slide 12. | Slide 12 |
| 5 | **Long-Term View — 5 charts** | Complete all 5 (currently only 2 exist): 1: LATAM 4× ✓ · 2: Data layer / Stripe-Shopify-Toast ✓ · 3: *Why capital cannot replicate 12 years of operational infrastructure* (slide 11) · 4: *The land-and-convert flywheel* (slide 9) · 5: *Financial operating leverage* (slide 16) | Slides 7, 19, 11, 9, 16 |
| 6 | **Closing** | *"This is not a validation event. It is an acceleration event."* + Contact IR CTA | Slide 21 |

**Removed from current home:** hero-cards block (IR Briefing / Our Growth Story / IPO Process) → absorbed into Hero CTAs. "Our Ecosystem is Our Strength" video section → moves to About.

---

## ABOUT (`/about/`) — new spine

| # | Section | Content | Script |
|---|---|---|---|
| 1 | **Page header** | Different from home hero. *"Twelve years building the operating system for LATAM live entertainment."* Narrative opening, not slogan. | Slides 4, A1 |
| 2 | **At a glance** | Left: tech-first · vertically integrated · built fully in-house · AI embedded · 11 countries · underserved 95%. Right: 10.2M · $269M · 2,800 · 40k events · 46M sessions · 95%+ retention. | Slide 5 |
| 3 | **Investment case** (expanded) | Same 5 reasons as home cards but each with full paragraph + supporting data. Deep version of the same block. | Slide 6 |
| 4 | **Market** | $40B, 16.6% CAGR, fragmentation (<20% global share in LATAM ex-Mexico/Brazil), consolidation race (Live Nation→OCESA, CTS→Punto Ticket, Credicorp→Joinnus). *"The window is closing."* Sub-block: MELI/Nubank/DLocal/TP comparables (Appendix 2 — business-model parallel only). | Slides 7, 13, A2 |
| 5 | **Business model → Partnership** | Two models. One platform. FO (94%, 17.3% take rate, $160M GMV) + WL (6%, 1.6% take rate, $109M GMV). Immediately followed by Land / Learn / Convert flywheel. Banker-tested order: model first, flywheel second. | Slides 8, 9 |
| 6 | **Moat & Platform** | Why capital cannot replicate: regulation · payments · relationships · data. 5 platform modules. Competitive matrix (8 players). | Slides 11, 12, 14 |
| 7 | **Data layer** (crescendo) | Stripe / Shopify / Toast parallel. 4 forms of intelligence: transaction · consumer behavior · operator performance · market dynamics. *"The company that owns the operating and transaction layer of an industry often becomes far more valuable than the entry product itself."* | Slide 19 |
| 8 | **Proof** | Diversification first (no sector, no customer, NPS +59/+58, 95% retention) → Financials (3-year audited: $14.6M→$29.5M rev, +64%, 37% EBITDA → Q1 2026: +41%, 44% margin). | Slides 15, 16 |
| 9 | **Team** | Yethro Dinamarca (Chairman) · Chien-Fu Chen (CEO) · Joaquín Jadue (CFO). Quote: *"Operators, not promoters."* Ownership: 100% pre-IPO with founders, chairman, key employees. | Slide 4, A1 |
| 10 | **Closing** | *"The thesis is simple. Ticketplus is building the operating system for live entertainment across Latin America. Nasdaq is the vehicle, not the goal."* + Contact IR | Slide 21 |

**Consolidated from current about (12 → 10 sections):**
- Structural gap → absorbed into Market
- AI & technology → absorbed into Moat & Platform
- Comparables (MELI/Nubank/DLocal) → sub-block inside Market

---

## Visual rules

- Background: white (`var(--color-surface-elevated)`) for most sections. Black (`var(--color-surface-dark)`) for hero and closing.
- No icons. No SVG blobs. No decorative images.
- Hero: existing concert photo from Unsplash (current home).
- Typography: existing `ir.css` tokens (Montserrat headings, Poppins body).
- Numbers: large, left-aligned, font-heading weight 800, `clamp(56px, 6vw, 88px)`.
- Accent: `.accent` class (brand gradient text) used once per section max — on the key word of the headline.
- Tables: plain HTML, no zebra, border-bottom only. TP row distinguished with amber left-border.

---

## What stays unchanged

- `src/styles/ir.css` — no changes to design tokens
- `src/layouts/Site.astro` — no changes to nav/footer
- `/ipo/`, `/leadership/`, `/contact/` — out of scope
