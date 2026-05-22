# IR Site Redesign — Home + About Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `src/pages/index.astro` and `src/pages/about/index.astro` so both pages share a single narrative spine faithful to the canonical investor script (`script-en-v4-light.docx`), with a clean white aesthetic (no icons/SVG blobs), leitmotiv "The operating system for live entertainment across Latin America," and data layer (Stripe/Shopify/Toast) positioned as crescendo, not hook.

**Architecture:** Two-page rewrite with shared narrative spine. Home = WHY invest (mantra → scale → 5-reason thesis → platform tabs → 5 long-term charts → acceleration closing). About = WHO we are + proof drill-down (header → at-a-glance → investment case expanded → market → business model → flywheel → moat & platform → data layer crescendo → proof → team → closing). Both reuse existing `ir.css` classes; minimal new CSS added via `<style>` blocks in each page.

**Tech Stack:** Astro 5, `src/styles/ir.css` (existing — unchanged), `src/layouts/Site.astro` (existing — unchanged).

---

## File map

| Action | Path | What changes |
|---|---|---|
| Modify | `src/pages/index.astro` | Full rewrite — 6 sections, ~170 lines |
| Modify | `src/pages/about/index.astro` | Full rewrite — 10 sections, ~320 lines |
| Delete | `src/pages/about-v0/index.astro` | Test page, remove |

---

## Task 1: Rewrite Home (`src/pages/index.astro`)

**Files:**
- Modify: `apps/investors/src/pages/index.astro`

**Sections produced:**
1. Hero — mantra H1 + existing concert photo + 2 CTAs
2. Scale bar — 5 numbers (10.2M · $269M · 11 · 2,800 · 95%+)
3. Investment thesis — 5 cards using existing `.hl-list` / `.hl` / `.hl__n` classes
4. Platform tabs — same structure, reframed copy (moat language)
5. Long-Term View — 5 collapses (3 new added)
6. Closing — dark `.thesis` section with "acceleration event" line

- [ ] **Step 1: Replace `src/pages/index.astro` with the following content**

```astro
---
import Site from "../layouts/Site.astro";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const link = (p: string) => `${base}${p}`;

const heroImage = "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=2400&q=80";

const scale = [
  { value: "10.2M", label: "Tickets sold (2025)" },
  { value: "$269M", label: "Gross sales" },
  { value: "11", label: "Countries" },
  { value: "2,800", label: "Promoters & venues" },
  { value: "95%+", label: "Client retention" },
];

const thesis = [
  { n: "01", title: "Tailwinds.", body: "$40B Latin American live entertainment market growing at 16.6% CAGR — more than 4× the global rate of 3.8%. Six hundred seventy million people, median age low 30s, 85% urbanized, 70% smartphone penetration." },
  { n: "02", title: "Moat.", body: "Core software stack built in-house since 2014. Deployed across 11 countries, 12 years of multi-market operating data, more than 2,800 partner relationships, and 50+ local payment methods running on our infrastructure every day." },
  { n: "03", title: "Scale & proof.", body: "$269M in gross sales in 2025. Revenue grew 64%. EBITDA margin 37.3%. Q1 2026 revenue up 41% year over year, EBITDA margin 44%. More than 95% client retention." },
  { n: "04", title: "Category.", body: "The technology platform for Latin American live entertainment — serving the underserved 95% the global incumbents do not reach. Bootstrapped twelve years. Profitable." },
  { n: "05", title: "Proprietary AI.", body: "AI embedded across customer-facing services and internal operations: anti-fraud, dynamic pricing, demand forecasting. Built in-house with no reliance on third-party core infrastructure." },
];

const modules = [
  { id: "m-ticketing", label: "Event Ticketing", tags: "VIRTUAL QUEUE · 3D LAYOUTS · ELASTIC INFRA", title: "Event Ticketing", body: "High-concurrency sales engine for massive demand. Fair-randomization virtual queues handle spikes from a 100-seat theater to a national stadium. 3D seat-level layouts, real-time inventory sync, anti-bot, dynamic pricing. The same stack ran Ed Sheeran in Argentina & Paraguay (90,000 tickets) and FIFA U-20 World Cup Chile 2025.", stats: [{ v: "10.2M", l: "Tickets issued in 2025" }, { v: "39,800", l: "Events orchestrated · 99.9% uptime" }] },
  { id: "m-payments", label: "Payments & Banking", tags: "ACQUIRERS · BNPL · DIGITAL WALLETS · CARDS", title: "Payments & Banking", body: "50+ country-specific payment methods across LATAM. Regional and country-specific gateways, BNPL providers, international card networks, local debit and digital wallets. Each new market adds payment primitives to a shared infrastructure, deepening the moat against global incumbents.", stats: [{ v: "50+", l: "Country-specific payment methods" }, { v: "$269M", l: "2025 gross sales across 11 countries" }] },
  { id: "m-data", label: "Data & Analytics", tags: "REAL-TIME EVENT MANAGEMENT · BUSINESS INTELLIGENCE · AI", title: "Data & Analytics", body: "Live operational data across markets and partners — multi-year visibility into every partner running on Ticketplus, in real time. AI embedded across customer-facing services and internal operations: anti-fraud, dynamic pricing, demand forecasting. The data layer is the asset; ticketing is the first vertical.", stats: [{ v: "100%", l: "Transaction visibility · 11 jurisdictions" }, { v: "12 yrs", l: "Multi-market operating data" }] },
  { id: "m-access", label: "Access Control", tags: "DYNAMIC QR · BIOMETRIC · RFID / NFC", title: "Access Control", body: "Multi-layer validation, frictionless entry. Real-time validation, anti-fraud, facial recognition for VIP, cashless wristbands for festivals. The same access engine that runs a stadium gate also runs a national park trailhead — offline-capable, biometric-ready, fraud-resilient.", stats: [{ v: "99.9%", l: "Platform uptime · offline-capable validation" }, { v: "2,800", l: "Active partners · venues, parks, federations" }] },
  { id: "m-onsite", label: "On-Site Operations", tags: "KIOSKS · MOBILE POS · CASHLESS NFC", title: "On-Site Operations", body: "Seamless box office and in-venue experience. Self-service pickup, roaming sales with inventory sync, NFC for F&B and VIP. 36 people on direct payroll — the platform sustains the monthly work of 2,000+ on-site operators in Chile alone.", stats: [{ v: "2,000+", l: "Monthly on-site operators orchestrated · CL" }, { v: "36", l: "People on direct payroll · AI-leveraged ops" }] },
];

const charts = [
  {
    title: "LATAM Smart Ticketing Is Growing 4× the World",
    body: "South American live entertainment is moving from <strong>$27.7B in 2022 to $45.5B by 2028</strong> — a +64% expansion in six years. Inside that, smart ticketing is growing at <strong>16.6% CAGR vs. 3.8% globally</strong>: more than 4× the world rate. The structural underpenetration of digital ticketing in LATAM is exactly the window Ticketplus is consolidating.",
    src: "Sources: PwC GE&M Outlook · Mordor Intelligence · Grand View Horizon.",
  },
  {
    title: "Capturing the Data Layer of Live Entertainment",
    body: "Stripe captured the payments data layer. Shopify captured merchant data. Toast captured restaurant ops data. The pattern is the same: <strong>capture the data layer first, monetize adjacent verticals second</strong> — payments, BI, dynamic pricing, financial services. Ticketplus is doing this in LATAM live entertainment. The first vertical is ticketing; the long-term asset is the data layer that compounds over 11 jurisdictions and 50+ payment methods.",
    src: "Business-model parallel only · not a valuation reference. Source: public market data.",
  },
  {
    title: "Why Capital Cannot Replicate Twelve Years of Operational Infrastructure",
    body: "Eleven jurisdictions with different compliance systems. More than fifty local payment methods integrated across markets. More than twenty-eight hundred operating relationships embedded into the daily workflow of promoters and venues. And twelve years of operational and transaction data across multiple countries. <strong>Capital can compress many things. It cannot compress accumulated operational history.</strong>",
    src: "Source: Ticketplus internal data.",
  },
  {
    title: "The Land-and-Convert Flywheel: Built-In Intelligence Before Capital Deployment",
    body: "Most acquirers evaluate companies from the outside — bankers, diligence processes, limited historical data. Ticketplus performs diligence from inside the operating infrastructure itself. White-label partners enter at a 1.6% take rate; operating data flows from day one. Over multiple years, Ticketplus builds full business intelligence on the partner — real-time sales, margins, growth trends, execution quality. <strong>Today, more than 50 operators sit inside the conversion pipeline.</strong> These are operating relationships Ticketplus already understands deeply.",
    src: "Source: Ticketplus internal data.",
  },
  {
    title: "Financial Operating Leverage: Every Incremental Dollar Is Highly Profitable",
    body: "Revenue doubled from 2023 to 2025: $14.6M to $29.5M. EBITDA grew 77%, margin expanding from 34% to 37.3%. Q1 2026: revenue up 41% year over year, EBITDA margin 44.6% — <strong>on the seasonally weakest quarter</strong>. In a single quarter of 2026, Ticketplus delivered EBITDA close to what took a full year in 2023. This is a tech business with fixed costs — every incremental dollar of revenue is highly profitable.",
    src: "Source: Ticketplus audited IFRS financials (Baker Tilly, PCAOB-registered). Q1 2026 preliminary.",
  },
];
---
<Site title="Ticketplus · Investor Relations" current="home" description="The operating system for live entertainment across Latin America.">

  <!-- 1. HERO -->
  <header class="hero-ml">
    <div class="hero-ml__media" style={`background-image: url(${heroImage});`} aria-hidden="true"></div>
    <div class="hero-ml__scrim" aria-hidden="true"></div>
    <div class="hero-ml__inner">
      <h1 class="hero-ml__title">
        The operating system for live entertainment across Latin America.
      </h1>
      <div class="hero-ml__ctas">
        <a class="btn btn--primary" href={link("/about/")}>Our story</a>
        <a class="btn btn--ghost" href={link("/ipo/")}>IPO process</a>
      </div>
    </div>
  </header>

  <!-- 2. SCALE BAR -->
  <section class="scalebar">
    <div class="container">
      <ul class="scalebar__list">
        {scale.map((s) => (
          <li class="scalebar__item">
            <span class="scalebar__value">{s.value}</span>
            <span class="scalebar__label">{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>

  <!-- 3. INVESTMENT THESIS — 5 CARDS -->
  <section class="highlights">
    <div class="container">
      <p class="section__eyebrow">Investment thesis</p>
      <h2 class="section__title">Five reasons <span class="accent">this matters.</span></h2>
      <ol class="hl-list">
        {thesis.map((t, i) => (
          <li class={`hl${i >= 3 ? " hl--amber" : ""}`}>
            <span class="hl__n">{t.n}</span>
            <div>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>

  <!-- 4. PLATFORM TABS -->
  <section class="tabsec">
    <div class="container tabsec__inner">
      <p class="section__eyebrow section__eyebrow--inv">Platform</p>
      <h2 class="ecosystem__title">Ticketplus Is at the <span class="accent">Center of the Live Economy.</span></h2>
      <nav class="tabsec__nav" role="tablist">
        {modules.map((m, i) => (
          <button class={`tabsec__btn${i === 0 ? " is-active" : ""}`} data-target={m.id} role="tab">{m.label}</button>
        ))}
      </nav>
      {modules.map((m, i) => (
        <div id={m.id} class={`tabsec__panel${i === 0 ? " is-active" : ""}`} role="tabpanel">
          <div class="tabsec__content">
            <span class="ecosystem__bar" aria-hidden="true"></span>
            <p class="tabsec__tags">{m.tags}</p>
            <h3>{m.title}</h3>
            <p>{m.body}</p>
            <div class="tabsec__stats">
              {m.stats.map((s) => (
                <div><strong>{s.v}</strong><span>{s.l}</span></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>

  <!-- 5. LONG-TERM VIEW — 5 CHARTS -->
  <section class="longview">
    <div class="container longview__inner">
      <p class="section__eyebrow">Long-term view</p>
      <h2 class="ecosystem__title">Our Long-Term View in <span class="accent">5 Charts.</span></h2>
      {charts.map((c, i) => (
        <div class={`collapse${i === 0 ? " is-open" : ""}`}>
          <button class="collapse__head" type="button">
            <span>{i + 1} · {c.title}</span>
            <span class="chev" aria-hidden="true">⌃</span>
          </button>
          <div class="collapse__body">
            <p set:html={c.body}></p>
            <p class="chart__src">{c.src}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  <!-- 6. CLOSING -->
  <section class="thesis" style="padding: 120px 0;">
    <div class="container">
      <p class="section__eyebrow section__eyebrow--inv">The opportunity ahead</p>
      <h2 class="section__title section__title--inv">This is not a validation event.<br/>It is an <span class="accent">acceleration event.</span></h2>
      <a class="btn btn--primary" href={link("/contact/")} style="margin-top: 40px; display: inline-flex;">Contact IR</a>
    </div>
  </section>

  <script is:inline>
    (function () {
      var tabs = document.querySelectorAll('.tabsec__btn');
      var panels = document.querySelectorAll('.tabsec__panel');
      tabs.forEach(function (t) {
        t.addEventListener('click', function () {
          tabs.forEach(function (x) { x.classList.remove('is-active'); });
          panels.forEach(function (p) { p.classList.remove('is-active'); });
          t.classList.add('is-active');
          var target = document.getElementById(t.dataset.target);
          if (target) target.classList.add('is-active');
        });
      });
      document.querySelectorAll('.collapse__head').forEach(function (h) {
        h.addEventListener('click', function () {
          h.parentElement.classList.toggle('is-open');
        });
      });
    })();
  </script>
</Site>

<style>
  .scalebar {
    background: var(--color-surface-elevated);
    padding: 56px 0;
    border-bottom: 1px solid var(--color-border);
  }
  .scalebar__list {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-wrap: wrap;
  }
  .scalebar__item {
    flex: 1 1 0; min-width: 140px;
    padding-right: 40px;
    margin-right: 40px;
    border-right: 1px solid var(--color-border);
  }
  .scalebar__item:last-child { border-right: none; margin-right: 0; padding-right: 0; }
  .scalebar__value {
    display: block;
    font-family: var(--font-heading);
    font-weight: 800;
    font-size: clamp(28px, 3vw, 44px);
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--color-text-primary);
  }
  .scalebar__label {
    display: block;
    margin-top: 6px;
    font-family: var(--font-body);
    font-size: 13px;
    color: var(--color-text-muted);
    line-height: 1.4;
  }
  .hero-ml__ctas {
    display: flex;
    gap: 12px;
    margin-top: 32px;
    flex-wrap: wrap;
  }
  @media (max-width: 720px) {
    .scalebar__item { flex: 1 1 40%; border-right: none; margin-right: 0; padding-right: 0; }
    .scalebar__list { gap: 28px; }
  }
</style>
```

- [ ] **Step 2: Verify home renders without errors**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:4323/
```
Expected: `200`

- [ ] **Step 3: Check key text appears**

```bash
curl -s http://localhost:4323/ | grep -c "operating system"
```
Expected: `1` or more

- [ ] **Step 4: Open in browser and verify all 6 sections render**

Open `http://localhost:4323/` and confirm:
- Hero: "The operating system for live entertainment across Latin America."
- Scale bar: 5 numbers visible immediately below hero
- 5 thesis cards with "01 Tailwinds." through "05 Proprietary AI."
- Platform tabs (5 tabs, clickable)
- Long-Term View with 5 collapses (click each to verify they open)
- Dark closing section: "This is not a validation event."

- [ ] **Step 5: Commit**

```bash
git add apps/investors/src/pages/index.astro
git commit -m "feat(investors): home — rewrite to script-faithful narrative arc (operating system leitmotiv, 5 thesis cards, 5 long-term charts, acceleration closing)"
```

---

## Task 2: Rewrite About (`src/pages/about/index.astro`)

**Files:**
- Modify: `apps/investors/src/pages/about/index.astro`

**Sections produced:**
1. Page header — "Twelve years building the operating system…"
2. At a glance — left: company profile bullets / right: 6 KPIs grid
3. Investment case — same 5 reasons as home, expanded with full paragraphs
4. Market — market sizing cards + bullets + comparables (MELI/Nubank/DLocal/TP)
5. Business model → Partnership flywheel (model cards → Land/Learn/Convert)
6. Moat & Platform — moat block + 5 modules + competitive table
7. Data layer (crescendo) — Stripe/Shopify/Toast table + 4 intel forms + stats strip
8. Proof — diversification bars + NPS cards + financials KPI grid
9. Team — Yethro / Chien-Fu / Joaquín founder cards
10. Closing — "Nasdaq is the vehicle, not the goal."

- [ ] **Step 1: Replace `src/pages/about/index.astro` with the following content**

```astro
---
import Site from "../../layouts/Site.astro";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const link = (p: string) => `${base}${p}`;

const glanceLeft = [
  "Technology-first · vertically integrated · built fully in-house",
  "AI embedded across customer-facing services and internal operations",
  "11 countries · 30+ strategic cities · deepest LATAM footprint in the category",
  "Serving the underserved 95% the global incumbents do not reach",
  "Bootstrapped twelve years · profitable · financed through operations",
  "No material concentration across categories, geographies or clients",
];
const glanceRight = [
  { v: "10.2M", l: "Tickets processed (2025)" },
  { v: "$269M", l: "Platform gross sales" },
  { v: "2,800", l: "Active promoters & venues" },
  { v: "39,800", l: "Events managed" },
  { v: "46M", l: "User sessions" },
  { v: "95%+", l: "Client retention" },
];

const highlights = [
  { n: "01", title: "Large, underpenetrated market.", body: "$40B Latin American live entertainment opportunity. Smart ticketing growing at 16.6% CAGR — more than 4× the global rate of 3.8%. More than 670 million people, median age low 30s, 85% urbanized, expanding middle class, 70% smartphone penetration growing 8% annually." },
  { n: "02", title: "Structural moat.", body: "Core software stack built in-house since 2014. Deployed across 11 countries, with 12 years of multi-market operating data and 2,800+ partner relationships running on our infrastructure every day. More than 50 local payment methods integrated. Capital can compress many things. It cannot compress accumulated operational history." },
  { n: "03", title: "Scale & proof.", body: "$269M gross sales in 2025. Revenue grew 64% year over year. EBITDA margin expanded from 32.8% to 37.3%. Q1 2026 revenue up 41% year over year, EBITDA margin 44.6% — on the seasonally weakest quarter. More than 95% client retention." },
  { n: "04", title: "Category creation.", body: "The technology platform for Latin American live entertainment. We serve the underserved 95% the global incumbents do not reach — particularly independent promoters, venues and regional operators where global players historically have had limited penetration. Bootstrapped twelve years. Profitable." },
  { n: "05", title: "Proprietary AI-driven stack.", body: "AI embedded across customer-facing services and internal operations: anti-fraud, dynamic pricing, demand forecasting. Built in-house with no reliance on third-party core infrastructure. The same codebase runs a 100-ticket-per-night theater and the FIFA U-20 World Cup." },
];

const comparables = [
  { flag: "ARG", brand: "MercadoLibre", wedge: "E-commerce wedge", founded: 1999, ipo: 2007, years: 8 },
  { flag: "BRA", brand: "Nubank", wedge: "Financial services wedge", founded: 2013, ipo: 2021, years: 8 },
  { flag: "URU", brand: "DLocal", wedge: "Cross-border payments wedge", founded: 2016, ipo: 2021, years: 5 },
  { flag: "CHL", brand: "Ticketplus", wedge: "Live entertainment wedge", founded: 2014, ipo: 2026, years: 12, own: true },
];

const competitors = [
  { name: "Ticketplus", latam: true, local: true, primary: true, partners: true, wl: true, own: true },
  { name: "Ticketmaster", latam: true, local: false, primary: true, partners: true, wl: false },
  { name: "Fever", latam: true, local: false, primary: true, partners: true, wl: false },
  { name: "SeatGeek", latam: false, local: false, primary: true, partners: true, wl: false },
  { name: "AudienceView", latam: false, local: false, primary: false, partners: false, wl: true },
  { name: "Vivenu", latam: false, local: false, primary: false, partners: false, wl: true },
  { name: "StubHub", latam: false, local: false, primary: false, partners: false, wl: false },
  { name: "VividSeats", latam: false, local: false, primary: false, partners: false, wl: false },
];

const modules = [
  { n: "01", title: "Event Ticketing", sub: "Virtual queue · 3D layouts · elastic infra", body: "High-concurrency sales engine for massive demand. Fair randomization, real-time tracking, seat-level visualization." },
  { n: "02", title: "Payments & Banking", sub: "Acquirers · BNPL · digital wallets · cards", body: "50+ country-specific payment methods. Leading regional gateways, BNPL, international card networks and local debit." },
  { n: "03", title: "Data & Analytics", sub: "Real-time event management · BI", body: "Live operational data across markets and partners. Multi-year visibility into every partner running on our infrastructure." },
  { n: "04", title: "Access Control", sub: "Dynamic QR · Biometric · RFID/NFC", body: "Multi-layer validation, frictionless entry. Real-time validation, anti-fraud, facial recognition, cashless wristbands." },
  { n: "05", title: "On-Site Operations", sub: "Kiosks · Mobile POS · Cashless NFC", body: "Seamless box office and in-venue experience. Self-service pickup, roaming sales, NFC for F&amp;B and VIP." },
];

const dataLayer = [
  { brand: "Stripe", asset: "Payment data", expansion: "Commerce intelligence" },
  { brand: "Toast", asset: "Restaurant ops", expansion: "Expanding within installed base" },
  { brand: "Shopify", asset: "Merchant data", expansion: "Financial services" },
  { brand: "Ticketplus", asset: "Live entertainment data", expansion: "De-risked expansion", own: true },
];

const sectors = [
  { name: "Sports", pct: 32 },
  { name: "Music", pct: 30 },
  { name: "Holiday Events", pct: 22 },
  { name: "Other", pct: 7 },
  { name: "Travel", pct: 5 },
  { name: "Theater & Arts", pct: 4 },
];

const team = [
  { initials: "YD", name: "Yethro Dinamarca", role: "Chairman", body: "Long-term strategy, governance and the transition from regional platform to public company. Joined eight years ago to build the financial architecture and the path to capital markets." },
  { initials: "CC", name: "Chien-Fu Chen", role: "CEO & Co-Founder", body: "Wrote the first lines of code in 2014 and has architected the platform ever since. Every module of the operating system was built under his technical direction." },
  { initials: "JJ", name: "Joaquín Jadue", role: "CFO & Co-Founder", body: "Built the financial discipline and operating structure that brought the company to PCAOB-level public company standards. Bootstrapped without institutional equity for twelve years." },
];
---
<Site title="About Ticketplus · Investor Relations" current="about">

  <!-- 1. PAGE HEADER -->
  <header class="page-header">
    <div class="page-header__inner">
      <p class="page-header__eyebrow">About Ticketplus</p>
      <h1 class="page-header__title">Twelve years building the <span class="accent">operating system</span> for LATAM live entertainment.</h1>
      <p class="page-header__lead">Ticketing is the entry point. The long-term opportunity is the operating, transaction and data layer across Latin America.</p>
    </div>
  </header>

  <!-- 2. AT A GLANCE -->
  <section class="glance">
    <div class="container">
      <p class="section__eyebrow">At a glance · 2025</p>
      <div class="glance__grid">
        <div class="glance__left">
          <h2 class="section__title">This is already a <span class="accent">scaled infrastructure</span> platform.</h2>
          <ul class="glance__bullets">
            {glanceLeft.map((item) => <li>{item}</li>)}
          </ul>
        </div>
        <div class="glance__right">
          <ul class="glance__kpis">
            {glanceRight.map((k) => (
              <li>
                <span class="glance__kpi-value">{k.v}</span>
                <span class="glance__kpi-label">{k.l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. INVESTMENT CASE (expanded) -->
  <section class="highlights">
    <div class="container">
      <p class="section__eyebrow">Investment case</p>
      <h2 class="section__title">Five reasons <span class="accent">this matters.</span></h2>
      <ol class="hl-list">
        {highlights.map((h, i) => (
          <li class={`hl${i >= 3 ? " hl--amber" : ""}`}>
            <span class="hl__n">{h.n}</span>
            <div>
              <h3>{h.title}</h3>
              <p>{h.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>

  <!-- 4. MARKET -->
  <section class="market">
    <div class="container">
      <p class="section__eyebrow">Market opportunity · Market sizing</p>
      <h2 class="section__title">A $40B market, growing at <span class="accent-red">4× the global rate.</span></h2>
      <div class="market__cards">
        <article class="mcard">
          <p class="mcard__eyebrow">South American live events market</p>
          <p class="mcard__from">2022 · $27.7B</p>
          <p class="mcard__arrow">→</p>
          <p class="mcard__to">2028 · $45.5B</p>
          <p class="mcard__delta">+8.6% CAGR</p>
        </article>
        <article class="mcard mcard--amber">
          <p class="mcard__eyebrow">Smart ticketing LATAM</p>
          <p class="mcard__from">2024 · $1B</p>
          <p class="mcard__arrow">→</p>
          <p class="mcard__to">2030 · $2.5B</p>
          <p class="mcard__delta">+16.6% CAGR · 4× global</p>
        </article>
      </div>
      <ul class="market__bullets">
        <li><strong>670M+ population</strong> · median age low 30s · 85% urbanized · expanding middle class · 70% smartphone penetration growing +8% / yr.</li>
        <li><strong>&lt;20% share</strong> of LATAM ticketing market held by top global leaders (excl. Mexico, Brazil), vs. &gt;80% in US/EU — one of the few large markets where global incumbents have not consolidated.</li>
        <li><strong>Consolidation race underway.</strong> Live Nation acquired OCESA in Mexico (2025). CTS Eventim acquired Punto Ticket in Chile (2023). Credicorp acquired Joinnus in Peru (2025). The window to consolidate the underserved 95% is closing.</li>
      </ul>
      <p class="source">Sources: PwC GE&amp;M Outlook · Worldometer · Grand View Horizon · Mordor Intelligence.</p>
    </div>
  </section>

  <section class="comparables">
    <div class="container">
      <p class="section__eyebrow section__eyebrow--inv">Category</p>
      <h2 class="section__title section__title--inv">Same playbook. Different vertical. <span class="accent">Chile's chapter hasn't been written yet.</span></h2>
      <p class="comparables__lead">MercadoLibre, Nubank and DLocal each built the infrastructure layer on fragmented Latin American markets through a different vertical wedge. Bootstrapped longer than any of them, Ticketplus is the next chapter.</p>
      <ul class="comp-grid">
        {comparables.map((c) => (
          <li class={`comp${c.own ? " comp--own" : ""}`}>
            <span class="comp__flag">{c.flag}</span>
            <h3>{c.brand}</h3>
            <p class="comp__wedge">{c.wedge}</p>
            <p class="comp__line">Founded {c.founded} → IPO {c.ipo}</p>
            <p class="comp__years">{c.years} years</p>
          </li>
        ))}
      </ul>
      <p class="comparables__footnote">Comparables shown for business-model parallel only · not for valuation reference. Subject to listing.</p>
    </div>
  </section>

  <!-- 5. BUSINESS MODEL → PARTNERSHIP -->
  <section class="model">
    <div class="container">
      <p class="section__eyebrow">Business model · Two models</p>
      <h2 class="section__title">Same platform. <span class="accent">Different monetization depth.</span></h2>
      <div class="model__grid">
        <article class="model__card model__card--wl">
          <header>
            <h3>White-Label SaaS</h3>
            <span class="tag tag--amber">Accelerator</span>
          </header>
          <p class="model__sub">Partners adopt the platform under their own brand. Tech is ours, market access is theirs.</p>
          <ul class="model__stats">
            <li><strong>6%</strong><span>of 2025 revenue</span></li>
            <li><strong>1.6%</strong><span>take rate</span></li>
            <li><strong>$109M</strong><span>2025 gross sales</span></li>
          </ul>
          <ul class="model__bullets">
            <li>Profitable, asset-light regional expansion.</li>
            <li>Full data visibility = M&amp;A pipeline.</li>
            <li>Operating data flows from day one.</li>
          </ul>
        </article>
        <article class="model__card model__card--fo">
          <header>
            <h3>Full Operation</h3>
            <span class="tag tag--red">Core</span>
          </header>
          <p class="model__sub">Full event management + advanced sales + marketing + on-site operations, end-to-end.</p>
          <ul class="model__stats">
            <li><strong>94%</strong><span>of 2025 revenue</span></li>
            <li><strong>17.3%</strong><span>take rate</span></li>
            <li><strong>$160M</strong><span>2025 gross sales</span></li>
          </ul>
          <ul class="model__bullets">
            <li>High-profile events: concerts, sports, festivals.</li>
            <li>Full margin capture across the event lifecycle.</li>
            <li>Embedded support drives stickiness across 11 markets.</li>
          </ul>
        </article>
      </div>
      <p class="model__note">Both models operate on the same codebase. We aren't running two businesses — we're running one continuum where partners enter at White-Label and graduate to Full Operation when the data tells us they are ready.</p>
    </div>
  </section>

  <section class="flywheel">
    <div class="container">
      <p class="section__eyebrow section__eyebrow--inv">Partnership strategy</p>
      <h2 class="section__title section__title--inv">We operate our partners <span class="accent">for years</span> before we convert them.</h2>
      <ol class="fw">
        <li>
          <span class="fw__n">1</span>
          <p class="fw__phase">Land</p>
          <h3>Market entry via White-Label</h3>
          <p>Partner adopts the platform under their brand at a 1.6% take rate. Operating data starts flowing from day one.</p>
        </li>
        <li>
          <span class="fw__n">2</span>
          <p class="fw__phase">Learn</p>
          <h3>Full business intelligence</h3>
          <p>Real-time sales, margins and growth trends. Multi-year evidence de-risks every conversion decision.</p>
        </li>
        <li>
          <span class="fw__n">3</span>
          <p class="fw__phase">Convert</p>
          <h3>Full Operation conversion</h3>
          <p>Strategic conversion of top performers at 17.3% take rate, full revenue capture and minimal integration risk.</p>
        </li>
      </ol>
      <p class="fw__footer"><strong>50+ conversion targets in pipeline.</strong> 11 → 25 markets. We see every partner's real P&amp;L, churn and margins because they have run on our infrastructure for 2–5 years.</p>
    </div>
  </section>

  <!-- 6. MOAT & PLATFORM -->
  <section class="platform">
    <div class="container">
      <p class="section__eyebrow">Platform &amp; moat</p>
      <h2 class="section__title">Why global players <span class="accent-red">can't capture this market.</span></h2>
      <div class="platform__grid">
        <aside class="moat">
          <h3>What blocks the incumbents</h3>
          <ul>
            <li><strong>Regulation</strong> · 11 jurisdictions · fiscal compliance per market</li>
            <li><strong>Payment gateways</strong> · local acquirers, BNPL, wallets across 11 markets</li>
            <li><strong>Relationships</strong> · 2,800+ partners embedded in daily ops</li>
            <li><strong>Data</strong> · 12 years multi-market · no mono-country can match</li>
          </ul>
          <p class="moat__quote">"Built in-house with no reliance on third-party core infrastructure."</p>
        </aside>
        <ol class="modules">
          {modules.map((m) => (
            <li class="module">
              <span class="module__n">{m.n}</span>
              <div>
                <h4>{m.title}</h4>
                <p class="module__sub">{m.sub}</p>
                <p set:html={m.body}></p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>

  <section class="compete">
    <div class="container">
      <p class="section__eyebrow">Competitive landscape</p>
      <h2 class="section__title">Competitive position in <span class="accent-red">Latin America.</span></h2>
      <p class="section__lead">Ticketplus combines what others split. Capabilities matrix based on publicly available information as of May 2026.</p>
      <div class="compete__wrap">
        <table class="compete__table">
          <thead>
            <tr>
              <th></th>
              <th>LATAM presence</th>
              <th>Local market focus</th>
              <th>Primary tickets</th>
              <th>Partners &amp; sponsoring</th>
              <th>White-label</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((c) => (
              <tr class={c.own ? "own" : ""}>
                <th scope="row">{c.name}</th>
                <td>{c.latam ? <span class="yes">✓</span> : <span class="no">×</span>}</td>
                <td>{c.local ? <span class="yes">✓</span> : <span class="no">×</span>}</td>
                <td>{c.primary ? <span class="yes">✓</span> : <span class="no">×</span>}</td>
                <td>{c.partners ? <span class="yes">✓</span> : <span class="no">×</span>}</td>
                <td>{c.wl ? <span class="yes">✓</span> : <span class="no">×</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p class="source">Illustrative comparison · categories simplified · not a comprehensive competitive analysis.</p>
    </div>
  </section>

  <!-- 7. DATA LAYER (crescendo) -->
  <section id="thesis" class="thesis">
    <div class="container">
      <p class="section__eyebrow section__eyebrow--inv">Competitive advantage · The data layer</p>
      <h2 class="section__title section__title--inv">We do not compete against ticketing companies. <span class="accent">We capture the data layer.</span></h2>
      <div class="thesis__grid">
        <div class="thesis__copy">
          <p>Over 10.2 million tickets a year across 11 jurisdictions, we capture the full data layer of regional live entertainment: who buys, what they buy, when, in which venue, with which payment method, at which price, with which behavioral pattern.</p>
          <p>That data composes — day by day, across 11 markets, 50+ payment methods, thousands of local commercial relationships. No global player can replicate it by acquisition. It is the asset, and it compounds.</p>
          <p>Ticketing is the first vertical. The verticals adjacent to the data layer — payments, BI, dynamic pricing, financial services for partners — are the long-term expansion thesis.</p>
          <p style="margin-top: 8px; font-style: italic; color: rgba(255,255,255,0.65); font-size: 15px;">"The company that owns the operating and transaction layer of an industry often becomes far more valuable than the entry product itself."</p>
        </div>
        <div class="thesis__table">
          <p class="thesis__table-title">A proven playbook</p>
          <table>
            <thead>
              <tr><th>Company</th><th>Data captured</th><th>Adjacent expansion</th></tr>
            </thead>
            <tbody>
              {dataLayer.map((row) => (
                <tr class={row.own ? "own" : ""}>
                  <td>{row.brand}</td>
                  <td>{row.asset}</td>
                  <td>{row.expansion}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p class="thesis__footnote">Business-model parallel only · not a valuation reference.</p>
        </div>
      </div>
      <div class="thesis__strip">
        <span><strong>100%</strong> Transaction visibility</span>
        <span><strong>11</strong> Country regulatory &amp; payments stack</span>
        <span><strong>12 years</strong> of multi-market operating data</span>
      </div>
    </div>
  </section>

  <!-- 8. PROOF -->
  <section class="div">
    <div class="container">
      <p class="section__eyebrow">Diversification</p>
      <h2 class="section__title">Diversified across sectors. <span class="accent-red">Loved by our customers.</span></h2>
      <div class="div__grid">
        <div class="div__chart">
          <p class="div__chart-title">Sector mix · 2025 gross sales</p>
          <ul class="bars">
            {sectors.map((s) => (
              <li>
                <span class="bars__label">{s.name}</span>
                <span class="bars__bar"><span class="bars__fill" style={`width:${s.pct * 2.5}%`}></span></span>
                <span class="bars__pct">{s.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div class="nps">
          <div class="nps__card"><strong>+59</strong><span>NPS promoter</span></div>
          <div class="nps__card"><strong>+58</strong><span>NPS buyer</span></div>
          <div class="nps__card nps__card--amber"><strong>95%+</strong><span>Client retention</span></div>
          <p class="nps__note">Top-quartile NPS for live entertainment. No single category dominates · 11-country diversification · no material client concentration.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="kpis">
    <div class="container">
      <p class="section__eyebrow">Financials · 2023–2026</p>
      <h2 class="section__title">Growing fast. <span class="accent">Growing profitably.</span></h2>
      <p class="section__lead">Audited under IFRS by Baker Tilly (PCAOB-registered). Revenue doubled 2023→2025. EBITDA grew 77% in 2025. Zero institutional equity raised in twelve years.</p>
      <ul class="kpi-grid">
        <li class="kpi"><span class="kpi__value">$29.5M</span><span class="kpi__label">Net revenue (2025 audited)</span></li>
        <li class="kpi"><span class="kpi__value">+64%</span><span class="kpi__label">Revenue YoY (2024→2025)</span></li>
        <li class="kpi"><span class="kpi__value">37.3%</span><span class="kpi__label">EBITDA margin (2025)</span></li>
        <li class="kpi"><span class="kpi__value">+41%</span><span class="kpi__label">Revenue YoY (Q1 2026)</span></li>
        <li class="kpi"><span class="kpi__value">44.6%</span><span class="kpi__label">EBITDA margin (Q1 2026)</span></li>
        <li class="kpi"><span class="kpi__value">0</span><span class="kpi__label">Institutional equity raised in 12 years</span></li>
      </ul>
      <p class="source">Q1 2026 preliminary. Source: Ticketplus audited IFRS financials (Baker Tilly, PCAOB-registered).</p>
    </div>
  </section>

  <!-- 9. TEAM -->
  <section class="leadership">
    <div class="container">
      <p class="section__eyebrow">Leadership</p>
      <h2 class="section__title">Operators, <span class="accent">not promoters.</span></h2>
      <p class="section__lead">The three people below built every layer of this company. Pre-IPO ownership remains 100% with founders, chairman and key employees.</p>
      <div class="founders">
        {team.map((t) => (
          <div class="founder">
            <span class="founder__avatar">{t.initials}</span>
            <p class="founder__role">{t.role}</p>
            <h3>{t.name}</h3>
            <ul>
              <li>{t.body}</li>
            </ul>
          </div>
        ))}
      </div>
      <p class="leadership__strip">Leadership remains deeply aligned with the business, with ownership concentrated among founders, management and key employees. <strong>The IPO is our first equity raise — not a liquidity event.</strong></p>
    </div>
  </section>

  <!-- 10. CLOSING -->
  <section class="thesis" style="padding: 120px 0;">
    <div class="container">
      <p class="section__eyebrow section__eyebrow--inv">The thesis</p>
      <h2 class="section__title section__title--inv">Ticketplus is building the operating system for live entertainment across Latin America. <span class="accent">Nasdaq is the vehicle, not the goal.</span></h2>
      <p class="about-closing__lead">The goal is to build the operating, transaction and data infrastructure layer for live entertainment across Latin America. This is not a validation event. It is an acceleration event.</p>
      <a class="btn btn--primary" href={link("/contact/")} style="display: inline-flex;">Contact IR</a>
    </div>
  </section>

  <nav class="pagenav">
    <div class="container pagenav__inner">
      <a class="pagenav__side" href={link("/")}>
        <span class="pagenav__label">← Back</span>
        <span class="pagenav__title">Overview</span>
      </a>
      <a class="pagenav__side pagenav__side--next" href={link("/leadership/")}>
        <span class="pagenav__label">Next →</span>
        <span class="pagenav__title">Leadership</span>
      </a>
    </div>
  </nav>
</Site>

<style>
  /* At a glance */
  .glance { background: var(--color-surface-elevated); }
  .glance__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    margin-top: 48px;
    align-items: start;
  }
  .glance__bullets {
    list-style: none; padding: 0; margin: 24px 0 0;
    display: grid; gap: 0;
  }
  .glance__bullets li {
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--color-text-muted);
    line-height: 1.55;
    padding: 14px 0;
    border-top: 1px solid var(--color-border);
  }
  .glance__bullets li:first-child { border-top: none; padding-top: 0; }
  .glance__kpis {
    list-style: none; padding: 0; margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border-top: 1px solid var(--color-border);
    border-left: 1px solid var(--color-border);
  }
  .glance__kpis li {
    padding: 24px 20px;
    border-right: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }
  .glance__kpi-value {
    display: block;
    font-family: var(--font-heading);
    font-weight: 800;
    font-size: clamp(28px, 3vw, 40px);
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--color-text-primary);
  }
  .glance__kpi-label {
    display: block;
    margin-top: 4px;
    font-family: var(--font-body);
    font-size: 12px;
    color: var(--color-text-muted);
    line-height: 1.4;
  }

  /* Closing lead paragraph */
  .about-closing__lead {
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.65;
    color: rgba(255,255,255,0.82);
    max-width: 760px;
    margin: 24px 0 40px;
  }

  @media (max-width: 880px) {
    .glance__grid { grid-template-columns: 1fr; gap: 40px; }
  }
</style>
```

- [ ] **Step 2: Verify about renders without errors**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:4323/about/
```
Expected: `200`

- [ ] **Step 3: Check key text appears**

```bash
curl -s http://localhost:4323/about/ | grep -c "Nasdaq is the vehicle"
```
Expected: `1`

- [ ] **Step 4: Open in browser and verify all 10 sections render**

Open `http://localhost:4323/about/` and confirm:
- Header: "Twelve years building the operating system…"
- At a glance: left bullets + right 2×3 KPI grid
- 5 investment case cards
- Market cards + consolidation bullets + comparables (MELI/Nubank/DLocal/TP)
- Business model cards (WL + FO) + Land/Learn/Convert flywheel
- Moat block + 5 modules + competitive table
- Data layer section (dark, Stripe/Toast/Shopify table)
- Diversification bars + NPS cards + financials KPI grid
- Team: YD / CC / JJ founder cards with initials avatar
- Closing: "Nasdaq is the vehicle, not the goal."

- [ ] **Step 5: Commit**

```bash
git add apps/investors/src/pages/about/index.astro
git commit -m "feat(investors): about — rewrite to script-faithful 10-section narrative (data layer crescendo, team, closing Slide 21)"
```

---

## Task 3: Remove test pages

**Files:**
- Delete: `apps/investors/src/pages/about-v0/index.astro`

- [ ] **Step 1: Delete test page**

```bash
rm apps/investors/src/pages/about-v0/index.astro
rmdir apps/investors/src/pages/about-v0
```

- [ ] **Step 2: Verify 404**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:4323/about-v0/
```
Expected: `404`

- [ ] **Step 3: Commit**

```bash
git add -A apps/investors/src/pages/about-v0
git commit -m "chore(investors): remove about-v0 test page"
```
