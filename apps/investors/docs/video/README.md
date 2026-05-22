# Video IR Ticketplus · carpeta de producción Veo

Una carpeta por clip de 8 segundos. Cada carpeta contiene todo lo que el agente Veo necesita para generar ese clip — sin ambigüedad y sin depender de docs externos.

## Convención

```
video/
├── README.md                       este archivo
├── 00-08s/
│   ├── 00.png                      first frame (input image)
│   ├── 08.png                      last frame (input lastFrame)
│   ├── prompt.md                   timestamp prompting + parámetros Veo
│   └── clip.mp4                    (output, lo deja el agente Veo)
├── 08-16s/
│   ├── 00.png                      first frame · debe ser idéntico a 00-08s/08.png
│   ├── 08.png
│   ├── prompt.md
│   └── clip.mp4
└── ...
```

Cada carpeta es **autónoma**: el agente abre la carpeta, lee `prompt.md`, manda `00.png` como `image` y `08.png` como `lastFrame` a la API de Veo 3.1, recibe el `.mp4` y lo guarda como `clip.mp4` dentro de la misma carpeta.

## Reglas

1. **Continuidad invisible** — el `08.png` del clip N tiene que ser literalmente el mismo PNG que el `00.png` del clip N+1. La forma más segura es copiar el archivo y verificar el hash.
2. **8 segundos exactos** — `lastFrame` solo funciona con `durationSeconds: 8`. Si un beat narrativo necesita 12 s, se parte en 2 clips de 8 s con frame intermedio compartido.
3. **Sin texto en Veo** — el copy del video se sobreimprime en post (Remotion / AE). Todos los chunks de texto que aparecen en `prompt.md` bajo "Texto que va en post" se aplican después de la generación.
4. **Sin audio en Veo** — siempre `generateAudio: false`. Música y SFX se componen en post para evitar drift entre clips.
5. **Geometría = Nano Banana. Movimiento = Veo.** Los anchors (`00.png`, `08.png`) los genera Nano Banana con precisión geométrica. Veo solo interpola movimiento entre los dos.

## Modelos

| Modelo | Costo 8s | Cuándo usar |
|---|---|---|
| `veo-3.1-lite-generate-preview` | $0.64 | drafts e iteración |
| `veo-3.1-fast-generate-preview` | $0.96 | default de producción |
| `veo-3.1-generate-preview` | $3.20 | shots clave (Beat 7 data layer · Beat 8 cierre) |

## Estado por clip

| Clip | Beat | Estado | Notas |
|---|---|---|---|
| `00-08s/` | 1 — Misión | anchors generados · listo para test Veo | dot pulsa → arco corto |
| `08-16s/` | 2 — Origen | pendiente anchors | arco corto → arco crece + íconos ticket/sale/QR |
| `16-24s/` | 3 — Plataforma | pendiente anchors | íconos de 5 módulos pueblan el arco |
| `24-32s/` | 4 — Dos modelos | pendiente anchors | aparece segundo arco amarillo (WL) |
| `32-40s/` | 5 — Land·Learn·Convert | pendiente anchors | dots LATAM aparecen alrededor del anillo |
| `40-48s/` | 6 — Donde no llegan | pendiente anchors | 11 dots iluminados · anillo completo |
| `48-56s/` | 7 — Data layer | pendiente anchors · **shot clave** | líneas convergen al centro luminoso |
| `56-64s/` | 8 — Cierre | pendiente anchors · **shot clave** | fade a gradient brand pleno |

Cuando un clip se aprueba, su `clip.mp4` queda dentro de la carpeta. Concat final con `ffmpeg`.
