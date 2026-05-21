# tp-sites

Monorepo de los 3 sitios Ticketplus:

| App | Subdominio futuro | Puerto dev |
|-----|-------------------|------------|
| `apps/home` | (landing local) | 4320 |
| `apps/business` | business.ticketplus.com (Full Op) | 4321 |
| `apps/platform` | platform.ticketplus.com (Whitelabel) | 4322 |
| `apps/investors` | investors.ticketplus.com | 4323 |

`packages/ui` contiene componentes compartidos (back flotante, tokens TP).

## Comandos

```bash
pnpm install            # primera vez
pnpm dev                # levanta los 4 apps en paralelo
pnpm dev:business       # uno solo
pnpm build              # build de todos
```

Abrí `http://localhost:4320/` para el home con los 3 botones.

## docs/

Cada app tiene `apps/<app>/docs/` para pegar referencias que después se transformarán en componentes y páginas.
