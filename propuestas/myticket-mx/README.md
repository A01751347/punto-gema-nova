# Cotización MyTicket MX — MT-2026-237

Propuesta de 11 páginas (tamaño carta) para la plataforma de operación de MyTicket MX.

- `propuesta.html` — documento completo (una `<section class="page">` por página).
- `build.mjs` — inserta las tipografías como data URI, aplica el ajuste de densidad y renderiza el PDF con Chromium.
- `Cotizacion-MyTicket-MX-MT-2026-237.pdf` — entregable.

## Regenerar

```bash
npm install
npm run build          # PDF + PNGs de revisión en preview/
ZOOM=1.10 npm run build  # ajusta la escala del contenido (por defecto 1.10)
```

Requiere Chromium; la ruta se toma de `CHROME_PATH` (por defecto la de Playwright).

## Paleta

Definida en `:root` dentro de `propuesta.html`:

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#120E1C` | fondo de portada y cierre, títulos |
| `--crimson` | `#D81E3F` | acento principal (telón / boleto) |
| `--amber` | `#F2B138` | acento secundario, cifras destacadas |
| `--surface` | `#F8F6FB` | tarjetas |

Es una paleta propuesta, no la oficial de la marca: el dominio `myticketmx.com` está
bloqueado por la política de salida de red de esta sesión, así que no se pudo leer la
identidad real del sitio. Para alinearla basta con cambiar esos cuatro tokens.
