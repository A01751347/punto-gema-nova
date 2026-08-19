# Sistema visual

Documento editorial de bajo contraste. La regla que gobierna todo: **el papel manda,
el color se administra con cuentagotas.** Si una página necesita color para verse bien,
está mal jerarquizada.

## Tokens (van en `:root`, no se inventan valores fuera de esta tabla)

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#FCFBF9` | fondo de todas las páginas, incluidas portada y cierre |
| `--panel` | `#F4F2ED` | paneles neutros y cajas de diagrama |
| `--panel-2` | `#EFEDE7` | variante para superponer sobre `--panel` |
| `--ink` | `#22262B` | títulos, cifras, negritas |
| `--text` | `#414750` | texto corrido |
| `--muted` | `#868C94` | rótulos, notas al pie de figura, texto secundario |
| `--line` | `#E3E0D9` | filetes finos, bordes de caja |
| `--line-2` | `#CFCBC2` | filetes de jerarquía superior (cabecera de tabla, separadores fuertes) |
| `--accent` | `#4E6B72` | rótulo de sección, elementos destacados del diagrama, cifras del cierre |
| `--accent-soft` | `#E9EFEE` | relleno de lo destacado |
| `--clay` | `#8E6B58` | acento cálido: advertencias, condiciones, números de paso |
| `--clay-soft` | `#F2ECE6` | relleno de panel de advertencia |

Prohibido: degradados, sombras, fondos oscuros de página, más de dos acentos,
saturaciones altas, íconos de librería, emojis.

Cambiar de marca = cambiar `--accent` y `--clay`. Nada más. Si el cliente tiene azul
corporativo, se usa una versión desaturada de ese azul como `--accent` (bajarle 30–40%
de saturación); el resto de la paleta no se toca.

## Tipografía

Una sola familia: **Inter** (400/500/600/700), incrustada como data URI por el build.
Nada de serif, nada de fuentes de display.

| Elemento | Tamaño | Peso | Tracking |
|---|---|---|---|
| Título de portada (`.cover h1`) | 33 pt | 600 | −0.032em |
| Título de página (`h2`) | 19 pt | 600 | −0.028em |
| Subtítulo (`h3`) | 11.6 pt | 600 | −0.018em |
| Rótulo de bloque (`h4`) | 9.9 pt | 600 | — |
| Entrada (`.lead`) | 11.2 pt | 400 | — |
| Texto corrido (`body`) | 9.9 pt / 1.58 | 400 | −0.004em |
| Nota (`.small`) | 8.4 pt | 400 | — |
| Rótulo versalita (`.label`, `.figcap`, `th`, `.k`) | 7.2–7.6 pt | 600 | +0.14 a +0.18em, mayúsculas |
| Cifra (`.facts .v`, `.amount .v`) | 11–17.5 pt | 600 | −0.018em |

Regla de tracking: **cuanto más grande, más negativo; cuanto más pequeño y en mayúsculas,
más positivo.** Es lo que hace que un documento en Inter no parezca una plantilla.

Sin cursivas. El énfasis se hace con `--ink` + peso 600, o con `--accent` para una sola
frase por página como máximo.

## Rejilla y página

- Hoja carta: `8.5in × 11in`, `@page{margin:0}`, cada página es `<section class="page">`.
- Márgenes: `.66in` arriba, `.78in` a los lados, `.62in` abajo.
- Cabecera corrida (`.hdr`): izquierda cliente · proyecto, derecha `04 / 11`. Filete abajo.
- Pie (`.ftr`): posición absoluta a `.42in` del borde, folio a la izquierda y dato de
  contacto o de la fase a la derecha. La portada y el cierre no lo llevan.
- Columnas: `.cols` + `.c2` (mitades), `.c3` (tercios) o `.c-side` (1.55fr / 1fr:
  texto principal y panel de apoyo). No existe una cuarta variante; si hace falta,
  el contenido está mal repartido.
- Ancho máximo de párrafo introductorio: `6.1in`–`6.4in`. Un `.lead` a todo lo ancho
  de la caja no se lee.

## Componentes y cuándo usar cada uno

| Componente | Para qué | Cuándo NO |
|---|---|---|
| `.label` | rótulo de sección sobre el `h2` | más de uno por página |
| `.lead` | primer párrafo de una página | dos seguidos de más de tres líneas |
| `.panel` | apunte lateral neutro | como caja de texto genérica: si tiene más de 4 líneas, es un párrafo |
| `.panel.cool` | consecuencia positiva, dato que confirma | más de uno por página |
| `.panel.warm` | advertencia, condición, ahorro que hay que mirar | para algo que no sea una salvedad |
| `.panel.line` | caja de requisitos o de decisión (sin relleno) | como panel de lujo |
| `.quote` | una frase memorable, solo en el cierre o en una página bisagra | como cita de relleno |
| `ul.items` | entregables, requisitos | más de 7 ítems: parte en dos columnas |
| `.finding` | lista numerada de hallazgos del diagnóstico | fuera de la página de diagnóstico |
| `.facts` | tres cifras de cierre de fase (inversión / entrega / requisito) | con menos de tres o más de tres columnas |
| `.phase` + `.amount` | encabezado de página de fase con el precio a la derecha | en páginas que no son de fase |
| `table` | inversión, forma de pago, servicio recurrente | para maquetar: si no son datos, no es tabla |

## Densidad: la regla del pie

El build escala el contenido de cada página (`zoom` entre 1.00 y 1.10) hasta llenar la
caja de texto sin invadir el pie, e imprime la holgura resultante:

```
holgura al pie: 1:140 2:22 3:16 4:59 5:54 6:16 7:44 8:46 9:18 10:16 11:71
```

- **< 6 px:** la página se desborda. Recorta contenido, no bajes el tipo.
- **> 120 px** en una página que no sea la portada: falta contenido. Añade un panel,
  una nota o un diagrama; no estires interlineados.
- Objetivo: todas las páginas entre 16 y 90.

Nunca se resuelve un desborde bajando `ZOOM_MAX` global: eso encoge todo el documento
para salvar una página. Se resuelve moviendo un bloque a la página siguiente.

## Errores de maquetación ya cometidos (evítalos)

1. **Columna pegada a la anterior en tablas.** Una celda `.r` no lleva padding derecho;
   la siguiente necesita `td.r+td{padding-left:.7rem}` (ya está en el CSS).
2. **Cifras que se parten en dos renglones** (`− $3,500 /` + `mes`): `white-space:nowrap`.
3. **Títulos de tarjeta que envuelven** en rejillas de 4 columnas: bajar a 10 pt y
   reducir el padding derecho antes que aceptar el salto.
4. **Un `flex:1` como único relleno** en una página: deja un hueco de aire en medio.
   Mejor un bloque de contenido real (índice, resumen, nota).
5. **Repetir el mismo dato tres veces en la misma página** (precio en el encabezado, en
   el texto y en `.facts`): en el encabezado y en `.facts`, nunca en medio del párrafo.
