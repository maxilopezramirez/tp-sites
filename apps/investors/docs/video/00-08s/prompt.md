# Clip 00–08s · Bloque 1 — Apertura + Plataforma

## Inputs

- `00.png` — first frame · t=0:00 · punto luminoso en el centro, fondo negro
- `08.png` — last frame · t=0:08 · anillo cerrado + 5 íconos con labels alrededor (TICKETING · PAYMENTS · ACCESS CONTROL · ON-SITE OPS · DATA + AI)

## Veo 3.1 request

- Modelo: `veo-3.1-fast-generate-preview` (Lite para drafts, Standard para take final si vale la pena)
- `aspectRatio`: `"16:9"`
- `durationSeconds`: `8`
- `resolution`: `"1080p"`
- `generateAudio`: `false`
- `image`: contenido de `00.png`
- `lastFrame`: contenido de `08.png`

## Timestamp prompting

```
[00:00-00:01] Pure deep black canvas with subtle vignette. At the center, a
very small luminous dot appears in warm amber-red brand gradient (#ffab24
→ #ff5500), pulsing gently — the halo expands and contracts once.

[00:01-00:02] The dot keeps pulsing at the center. The composition stays
still and calm, waiting.

[00:02-00:04] The dot elongates clockwise from the 12 o'clock position and
starts tracing a luminous arc. The arc grows fast, following the contour of
an invisible centered circle, painting it one degree at a time in the warm
brand gradient.

[00:04-00:05] The arc fills the last remaining gap at 3 o'clock and the ring
becomes fully closed. The central core dot stays lit as an anchor.

[00:05-00:08] Five luminous monoline icons fade in one by one along the ring
path, in a choreographed sequence: ticket at 12 o'clock, payment card at
2:30, shield-with-check at 5, operations gear at 7:30, bar chart at 9:30.
Next to each icon, its small horizontal white sans-serif label fades in
(outside the ring): 'TICKETING', 'PAYMENTS', 'ACCESS CONTROL', 'ON-SITE
OPS', 'DATA + AI'. Each icon + label arrives with a soft warm glow and a
tiny pulse on appearance. The lower third of the canvas stays completely
empty black — no narrative text inside the clip. Flat 2D motion-graphic
style, minimalist, premium corporate aesthetic.
```

## Texto que va en post (no en el clip Veo)

Los 3 chunks narrativos se sobreimprimen sobre el clip en post-producción (Remotion / After Effects / ffmpeg drawtext). NO se piden a Veo. Veo solo trae el punto, el anillo, los íconos y los labels de módulo.

| Tiempo | Chunk |
|---|---|
| 0:02 — 0:03 | "Ticketing companies sell tickets." |
| 0:03 — 0:04 | "Ticketplus runs the entire event lifecycle." |
| 0:04 — 0:08 | "The operating system for live entertainment in Latin America." |

## Output esperado

`clip.mp4` — clip de 8s, 1080p, sin audio, sin texto narrativo. El último frame es continuidad para el clip 08-16s donde entrará la narrativa de origen (2014, in-house, no VC) sobre la misma plataforma ya visible.

## Continuidad con el clip siguiente

El `08.png` de esta carpeta tiene que ser idéntico al `00.png` de `../08-16s/` cuando ese clip se prepare. Esto garantiza transición invisible entre clips.
