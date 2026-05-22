export function AboutTicketplus() {
  return (
    <>
      <style>{`
        .about-tp {
          background: var(--color-surface-elevated);
          font-family: var(--font-body);
        }

        /* ── container ──────────────────────────────────────── */
        .about-tp__container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 112px 32px;
        }

        /* ── section 1 · page header ────────────────────────── */
        .about-tp__header {
          margin-bottom: 96px;
        }

        /* ── section 2 · thesis ─────────────────────────────── */
        .about-tp__thesis {}

        .about-tp__body-copy {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 780px;
        }

        .about-tp__body-copy p {
          font-family: var(--font-body);
          font-size: 17px;
          line-height: 1.6;
          color: var(--color-text-muted);
          margin: 0;
        }

        /* ── playbook sub-block ──────────────────────────────── */
        .about-tp__playbook {
          margin-top: 80px;
        }

        .about-tp__playbook-title {
          font-family: var(--font-heading);
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--color-text-primary);
          margin: 0 0 24px;
        }

        .about-tp__table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .about-tp__table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-body);
          min-width: 520px;
        }

        .about-tp__table thead th {
          font-family: var(--font-heading);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          text-align: left;
          padding: 0 12px 16px 12px;
          border-bottom: 1px solid var(--color-border);
        }

        .about-tp__table thead th:first-child {
          padding-left: 14px;
        }

        .about-tp__table tbody td {
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--color-text-primary);
          padding: 18px 12px;
          border-bottom: 1px solid var(--color-border);
          vertical-align: top;
          line-height: 1.45;
        }

        .about-tp__table tbody td:first-child {
          font-weight: 600;
          padding-left: 14px;
        }

        .about-tp__table tbody tr.about-tp__own-row td {
          background: rgba(255, 171, 36, 0.04);
        }

        .about-tp__table tbody tr.about-tp__own-row td:first-child {
          border-left: 2px solid var(--color-secondary);
          padding-left: 12px;
        }

        .about-tp__table tbody tr:last-child td {
          border-bottom: none;
        }

        /* ── stats sub-block ─────────────────────────────────── */
        .about-tp__stats {
          margin-top: 96px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 64px;
        }

        .about-tp__stat {}

        .about-tp__stat-value {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(56px, 6vw, 88px);
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: #000000;
          display: block;
        }

        .about-tp__stat-label {
          display: block;
          margin-top: 12px;
          max-width: 260px;
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.4;
          color: var(--color-text-muted);
        }

        /* ── responsive ──────────────────────────────────────── */
        @media (max-width: 900px) {
          .about-tp__stats {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
          }
        }

        @media (max-width: 600px) {
          .about-tp__container {
            padding: 72px 24px;
          }

          .about-tp__header {
            margin-bottom: 64px;
          }

          .about-tp__stats {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .about-tp__playbook {
            margin-top: 56px;
          }
        }
      `}</style>

      <div className="about-tp">
        <div className="about-tp__container">

          {/* ── SECTION 1 · Page header ───────────────────── */}
          <header className="about-tp__header">
            <span className="section__eyebrow">About TicketPlus</span>

            <h1 className="section__title">
              The infrastructure for the{" "}
              <span className="accent">live economy</span>{" "}
              of Latin America.
            </h1>

            <p className="section__lead">
              Thesis, market, business model and platform — the full story on a
              single page. Bootstrapped 12 years, profitable, aligned for the
              long term.
            </p>
          </header>

          {/* ── SECTION 2 · Investment thesis ─────────────── */}
          <section className="about-tp__thesis">
            <span className="section__eyebrow">
              Investment Thesis · The Data Layer
            </span>

            <h2 className="section__title">
              We do not compete against ticketing companies. We capture the{" "}
              <span className="accent">data layer</span>.
            </h2>

            <div className="about-tp__body-copy">
              <p>
                Over 10.2 million tickets a year across 11 jurisdictions, we
                capture the full data layer of regional live entertainment: who
                buys, what they buy, when, in which venue, with which payment
                method, at which price, with which behavioral pattern.
              </p>
              <p>
                That data composes — day by day, across 11 markets, 50+ payment
                methods, thousands of local commercial relationships. No global
                player can replicate it by acquisition. It is the asset, and it
                compounds.
              </p>
              <p>
                Ticketing is the first vertical. The verticals adjacent to the
                data layer — payments, BI, dynamic pricing, financial services
                for partners — are the long-term expansion thesis.
              </p>
            </div>

            {/* ── Playbook sub-block ─────────────────────── */}
            <div className="about-tp__playbook">
              <h3 className="about-tp__playbook-title">A proven playbook</h3>

              <div className="about-tp__table-wrap">
                <table className="about-tp__table">
                  <thead>
                    <tr>
                      <th scope="col">Company</th>
                      <th scope="col">Data captured</th>
                      <th scope="col">Adjacent expansion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Stripe</td>
                      <td>Payment data</td>
                      <td>Commerce intelligence</td>
                    </tr>
                    <tr>
                      <td>Toast</td>
                      <td>Restaurant ops</td>
                      <td>Expanding within installed base</td>
                    </tr>
                    <tr>
                      <td>Shopify</td>
                      <td>Merchant data</td>
                      <td>Financial services</td>
                    </tr>
                    <tr className="about-tp__own-row">
                      <td>TicketPlus</td>
                      <td>Live entertainment data</td>
                      <td>De-risked expansion</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="source">
                Business-model parallel only · not a valuation reference.
              </p>
            </div>

            {/* ── Stats sub-block ────────────────────────── */}
            <div className="about-tp__stats">
              <div className="about-tp__stat">
                <span className="about-tp__stat-value">100%</span>
                <span className="about-tp__stat-label">
                  Transaction visibility
                </span>
              </div>

              <div className="about-tp__stat">
                <span className="about-tp__stat-value">11</span>
                <span className="about-tp__stat-label">
                  Country regulatory &amp; payments stack
                </span>
              </div>

              <div className="about-tp__stat">
                <span className="about-tp__stat-value">12 yrs</span>
                <span className="about-tp__stat-label">
                  of multi-market operating data
                </span>
              </div>
            </div>

          </section>
        </div>
      </div>
    </>
  );
}
