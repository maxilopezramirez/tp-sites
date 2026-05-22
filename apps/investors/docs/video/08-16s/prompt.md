# Clip 08–16s · Bloque 2 — Origen + escala LATAM

## Inputs

- `00.png` — first frame · t=0:08 · idéntico al `08.png` del clip 00-08s (anillo cerrado + 5 íconos con labels)
- `08.png` — last frame · t=0:16 · misma base + 11 dots LATAM en órbita exterior al anillo

## Veo 3.1 request

- Modelo: `veo-3.1-fast-generate-preview`
- `aspectRatio`: `"16:9"`
- `durationSeconds`: `8`
- `resolution`: `"1080p"`
- `generateAudio`: `false`
- `image`: contenido de `00.png`
- `lastFrame`: contenido de `08.png`

## Timestamp prompting

```
[00:00-00:01] The closed ring with its 5 module icons + labels (TICKETING,
PAYMENTS, ACCESS CONTROL, ON-SITE OPS, DATA + AI) sits stable at the center.
The ring pulses softly once, the central core dot glows. A calm beat to let
the platform register.

[00:01-00:05] Eleven small luminous round dots fade in one by one along a
wider invisible outer ring around the main platform ring (radius ~32% of
canvas height). The dots appear in a smooth choreographed sequence, going
clockwise starting from 12 o'clock. Each dot is small (~0.7% canvas width),
warm white-amber glow, with a tiny halo on appearance — like distant stars
lighting up around the platform. By the end of this segment, all 11 dots are
visible, forming a constellation around the central ring.

[00:05-00:08] All 11 LATAM country dots sit quietly in their outer orbit
around the platform. The main ring and its 5 modules + labels remain stable.
The ring pulses softly. The central dot pulses once more. Flat 2D motion-
graphic style, minimalist, premium corporate aesthetic.
```

## Texto que va en post (no en el clip Veo)

El chunk narrativo de escala se sobreimprime sobre el clip en post-producción. NO se pide a Veo. Veo solo trae el anillo, los 5 módulos con sus labels, y los 11 dots LATAM apareciendo en órbita exterior.

| Tiempo | Chunk |
|---|---|
| 0:11 — 0:14 | "12 years · 11 countries · 10M tickets / year." |

## Output esperado

`clip.mp4` — clip de 8s, 1080p, sin audio, sin texto narrativo. El último frame es continuidad para el clip 16-24s, donde la plataforma con su huella LATAM va a apuntalar el segundo modelo de GTM (Full Op vs White-Label).

## Continuidad

- `00.png` = `../00-08s/08.png` (verificar hash)
- `08.png` será `../16-24s/00.png` cuando ese clip se prepare.
