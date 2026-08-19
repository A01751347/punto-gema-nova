# Versión pegable (cuando no hay skill)

Para usar en claude.ai, en otro repo o en cualquier sesión sin la skill instalada:
pega este bloque completo y debajo tu material del proyecto.

---

Necesito una cotización en PDF con mi estándar. Sigue estas instrucciones al pie de la letra.

**Formato.** Un archivo HTML donde cada `<section class="page">` es una hoja carta
(`8.5in × 11in`, `@page{size:letter;margin:0}`, `.page{width:8.5in;height:11in;overflow:hidden;
page-break-after:always;padding:.66in .78in .62in;position:relative}`). Se renderiza a PDF con
Chromium vía playwright-core (`page.pdf({width:'8.5in',height:'11in',printBackground:true,
margin:0})`), con la tipografía Inter incrustada como data URI desde `@fontsource/inter`.
Entre 8 y 12 páginas.

**Estilo.** Documento editorial de bajo contraste sobre papel cálido. Sin degradados, sin
fondos oscuros, sin sombras, sin íconos, sin emojis, sin serif. Tokens exactos:

`--paper:#FCFBF9` `--panel:#F4F2ED` `--ink:#22262B` `--text:#414750` `--muted:#868C94`
`--line:#E3E0D9` `--line-2:#CFCBC2` `--accent:#4E6B72` `--accent-soft:#E9EFEE`
`--clay:#8E6B58` `--clay-soft:#F2ECE6`

Tipografía única Inter 400/500/600/700. Título de portada 33 pt/600/−0.032em; `h2` 19 pt/600/
−0.028em; `h3` 11.6 pt/600; entrada 11.2 pt; texto 9.9 pt con interlínea 1.58; notas 8.4 pt;
rótulos en versalitas 7.2–7.6 pt/600 con tracking +0.14em. Cuanto más grande el texto, más
negativo el tracking; cuanto más pequeño y en mayúsculas, más positivo. Sin cursivas: el
énfasis va con peso 600 o con `--accent`.

**Estructura de la página.** Cabecera corrida (cliente · proyecto a la izquierda, `04 / 11`
a la derecha, filete abajo) y pie absoluto a `.42in` con el folio. Portada y cierre sin pie.
Rejillas: mitades, tercios o 1.55fr/1fr (texto + panel de apoyo). Componentes: rótulo de
sección, entrada, paneles neutro/frío/cálido/contorno, lista de ítems con guion fino,
hallazgos numerados, tira de tres cifras, tablas con cabecera en versalitas y fila de total.

**Páginas.** 1 portada con titular de resultado, índice de fases con precio y plazo, datos
y contacto · 2 entendimiento con diagrama antes/después y tres cifras · 3 diagnóstico con
5–7 hallazgos numerados · 4 la propuesta con diagrama de ruta en el tiempo y tabla de
inversión · 5+ una o dos páginas por fase (encabezado con precio y plazo, párrafo del costo
actual, un diagrama, qué incluye, por qué conviene, tira de tres cifras) · penúltima
condiciones comerciales · última recomendación, decisión en corto, resumen de la ruta y firma.

**Diagramas (lo más importante).** Mínimo tres SVG inline hechos a mano: el proceso de hoy
contra el de mañana, la ruta de fases sobre una escala de semanas, y la mecánica de la fase
más cara. `viewBox="0 0 1000 H"`, trazo de 1 px, esquinas `rx="3"`, texto de 13 a 18 unidades,
una línea de texto por `<text>` (SVG no envuelve), flechas con `<marker>` de id único por SVG,
lo automático en línea punteada y lo humano en relleno frío con borde `--accent`, condiciones
externas en caja punteada con texto `--clay`. Cada diagrama lleva título en versalitas arriba
y una nota de una o dos líneas abajo. Nada de leyendas de color: las palabras van dentro de
las cajas.

**Voz.** Lo lee un dueño de negocio, no un ingeniero. Empieza por lo que el cliente ya hace
bien. Nombra el problema con un número contable o una escena concreta. Cero jerga. Vende el
resultado, no el entregable ("Que nadie vuelva a copiar una orden a mano", no "Módulo de
sincronización"). Incluye al menos una salvedad honesta en su propio panel. Todo precio va
siempre acompañado de su plazo, y el mismo par se repite idéntico en todas las páginas.
Rangos, no fechas: `1 a 2 semanas` en prosa, `1–2 semanas` en tablas; el total es la suma de
los rangos.

**Densidad.** Después de renderizar, mide en cada página la distancia entre el final del
contenido y el pie. Escala el contenido de cada página con `zoom` entre 1.00 y 1.10 hasta
llenar la caja sin invadir el pie. Si una página se desborda, mueve un bloque a la siguiente;
nunca bajes el tipo global. Objetivo: entre 16 y 90 px de holgura en todas.

**Antes de entregarme el PDF:** exporta cada página a PNG y míralas. Verifica que ningún
texto de un SVG se corta, que las cifras no se parten en dos renglones, que la suma de las
fases da el total impreso y que el documento se entiende sin saber qué es un webhook.

Si en mi material hay dos precios, dos folios o plazos que no cuadran, pregúntame antes de
elegir. Si no puedes ver el sitio del cliente para tomar sus colores, dímelo y usa la paleta
de arriba.

---

Mi proyecto:
