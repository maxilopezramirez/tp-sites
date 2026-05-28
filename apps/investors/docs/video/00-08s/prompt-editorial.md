# Clip 00–08s · Bloque 1 — Apertura + Plataforma (editorial style)

> **Variante editorial** — esta es la versión en estilo ilustración editorial (referencia UpSend / Drift / Pleo) adaptado a la paleta brand. Convive con la versión geométrica (`00.png` / `08.png` / `prompt.md`) para comparar.

## Inputs

- `00-editorial.png` — first frame · t=0:00 · canvas crema vacío con marcas decorativas sutiles
- `08-editorial.png` — last frame · t=0:08 · personaje productor central + 5 cards de módulo flotando alrededor

## Veo 3.1 request

- Modelo: `veo-3.1-fast-generate-preview`
- `aspectRatio`: `"16:9"`
- `durationSeconds`: `8`
- `resolution`: `"1080p"`
- `generateAudio`: `false`
- `image`: contenido de `00-editorial.png`
- `lastFrame`: contenido de `08-editorial.png`

## Timestamp prompting

```
[00:00-00:02] Soft cream canvas (#f6f3ee) with subtle decorative gestural
marks scattered sparsely — small gray dots, tiny curves, faint dot-grid
hints in the corners. The frame is otherwise empty and still. Calm pause.

[00:02-00:04] A young professional event-producer character fades in
smoothly at the center of the canvas, framed waist-up, drawn in flat 2D
monoline style with clean black outlines, medium gray skin tones, and an
amber-to-red brand-gradient shirt (#ffab24 → #ff5500) — the only saturated
color on the character. The figure settles into a neutral confident pose
holding a small device in one hand. The fade-in is smooth, not abrupt.

[00:04-00:06] Two flat 2D UI cards drift in from off-canvas with soft drop
shadows, arriving in quick succession: first from the upper-left, a
stylized smartphone card showing a ticket-shaped rectangle on its screen
with a warm amber accent strip; then from the upper-right, a small
floating payment-card widget in dark gray with a thin red accent stripe.
Each card arrives with a gentle bob and settles into position around the
character.

[00:06-00:08] Three more flat 2D cards drift in completing the
constellation: from mid-left a square QR-code-style card (black-and-white
pattern); from mid-right a small dashboard-widget card showing a tiny
gauge and a 2-bar chart with one amber accent dot; from the lower-right
area a shield-with-check icon card in monochrome with a single red check
mark. By t=0:08 all five cards float around the character at evenly
distributed positions, softly breathing in place. The character is also
gently breathing (microscopic vertical sway). Decorative background marks
remain stable.

The lower 14% of the canvas stays completely empty soft cream — reserved
for a subtitle overlay added later in post-production.

Style: flat 2D vector illustration, editorial SaaS-explainer aesthetic,
clean black outlines, monochrome gray base palette plus amber-to-red brand
accent, soft drop shadows under floating cards, warm cream paper-like
feel. Calm, premium, institutional investor-relations visual language.
ABSOLUTELY NO TEXT anywhere in the frame — the cards contain only abstract
UI shapes, never typography.
```

## Texto que va en post (subtitle letterbox)

El subtítulo se aplica en post sobre el letterbox inferior (~14% del frame) — fuera del clip Veo.

| Tiempo | Subtítulo |
|---|---|
| 0:02 — 0:03 | "Ticketing companies sell tickets." |
| 0:03 — 0:04 | "Ticketplus runs the entire event lifecycle." |
| 0:04 — 0:08 | "The operating system for live entertainment in Latin America." |

## Output esperado

`clip-editorial.mp4` — clip de 8s, 1080p, sin audio, sin texto dentro del frame. Letterbox + subtítulo se overlayean en post.

## Continuidad

El `08-editorial.png` será la base del `00-editorial.png` del clip 08-16s cuando se prepare. La continuidad invisible se sostiene en la posición del personaje y las 5 cards.
