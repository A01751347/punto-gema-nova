# Cotización MyTicket MX — MT-2026-237

Propuesta de 11 páginas (tamaño carta) para la plataforma de operación de MyTicket MX.

- `propuesta.html` — documento completo (una `<section class="page">` por página, diagramas en SVG inline).
- `build.mjs` — inserta las tipografías como data URI, ajusta la densidad de cada página y renderiza el PDF con Chromium.
- `Cotizacion-MyTicket-MX-MT-2026-237.pdf` — entregable.

## Regenerar

```bash
npm install
npm run build              # PDF + PNGs de revisión en preview/
ZOOM_MAX=1.06 npm run build  # límite del ajuste de densidad (por defecto 1.10)
```

El build imprime la holgura en píxeles entre el final del contenido y el pie de cada página;
si alguna baja de 6 hay que recortar contenido en esa página.

## Sistema visual

Documento editorial de bajo contraste: papel cálido, sin degradados, un solo acento frío y otro cálido,
tipografía Source Serif 4 para títulos e Inter para texto. Los diagramas usan trazo fino de 1 px,
relleno plano y los mismos tokens de color.

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#FCFBF9` | fondo de todas las páginas |
| `--ink` | `#22262B` | títulos y cifras |
| `--text` | `#414750` | texto corrido |
| `--accent` | `#4E6B72` | rótulos de sección, elementos destacados de los diagramas |
| `--clay` | `#8E6B58` | acento cálido, para advertencias y notas |
| `--line` | `#E3E0D9` | filetes y bordes |
| `--panel` | `#F4F2ED` | paneles y cajas de los diagramas |

Es una paleta propuesta, no la oficial de la marca: el dominio `myticketmx.com` está bloqueado por la
política de salida de red de esta sesión, así que no se pudo leer la identidad real del sitio.
Para alinearla basta con cambiar esos tokens en `:root`.
