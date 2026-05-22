# Clip 00–08s · Beat 1 — Misión

## Inputs

- `00.png` — first frame · t=0:00
- `08.png` — last frame · t=0:08

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
[00:00-00:01] Pure deep black canvas with subtle vignette. The luminous dot at
the exact center pulses gently with a warm amber-red glow (#ffab24 → #ff5500),
halo expanding and contracting once per second.

[00:01-00:03] The dot remains at the center, continuing its slow soft pulse.
The halo breathes in and out. The composition is otherwise static and calm.

[00:03-00:05] The dot begins to trace a ring clockwise from the 12 o'clock
position. A luminous arc emerges and extends steadily, painting the ring one
degree at a time. The brand gradient follows the leading edge.

[00:05-00:08] The arc accelerates slightly, sweeping past 6 o'clock and
continuing clockwise. By t=0:08 roughly 85% of the ring is drawn — the gap
remaining is at the 3 o'clock position (right side). The central dot stays
glowing throughout. Flat 2D motion-graphic style, minimalist, premium
corporate aesthetic.
```

## Texto que va en post (no en el clip Veo)

Los siguientes 3 chunks se sobreimprimen sobre el clip en post-producción (Remotion / After Effects / ffmpeg drawtext). Nunca van dentro de la generación de Veo.

| Tiempo | Chunk |
|---|---|
| 0:02 — 0:04 | "Ticketing companies sell tickets." |
| 0:04 — 0:05 | "Ticketplus runs the entire event lifecycle." |
| 0:05 — 0:08 | "The operating system for live entertainment in Latin America." |

## Output esperado

`clip.mp4` — clip de 8s, 1080p, sin audio, sin texto. Listo para concat con el siguiente clip y para overlay de texto en post.

## Continuidad con el clip siguiente

El `08.png` de esta carpeta tiene que ser idéntico al `00.png` de `../08-16s/` cuando ese clip se prepare. Esto garantiza transición invisible entre clips.
