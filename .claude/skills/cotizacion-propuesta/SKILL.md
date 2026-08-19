---
name: cotizacion-propuesta
description: Genera una cotización o propuesta comercial en PDF con el estándar de Santiago Serrano — documento editorial de 8 a 12 páginas tamaño carta, con diagramas SVG, tabla de inversión por fases y condiciones comerciales. Úsala cuando el usuario pida cotizar un proyecto, armar una propuesta para un cliente, convertir notas de una reunión o un diagnóstico en un PDF presentable, o actualizar precios, plazos o alcance de una propuesta ya hecha. Palabras que la disparan: cotización, cotizar, propuesta, presupuesto, PDF para el cliente, propuesta comercial.
---

# Cotización / propuesta comercial en PDF

Produce un PDF de 8–12 páginas carta: HTML + CSS renderizado con Chromium, tipografía
Inter incrustada, diagramas SVG hechos a mano y un ajuste automático de densidad por página.

**El resultado no es un documento bonito: es una herramienta de venta.** El cliente decide
si confía leyendo esto. Todo lo que no ayude a esa decisión, sobra.

## Antes de escribir una sola línea

Necesitas estos datos. Lo que falte, **pregúntalo en una sola tanda** (`AskUserQuestion`),
no a cuentagotas, y nunca lo inventes:

- Cliente: empresa, persona de contacto.
- Autor: nombre, oficio, correo, teléfono.
- Folio, fecha y vigencia (por defecto 30 días naturales).
- El diagnóstico: qué hace hoy el cliente a mano, con qué herramientas, y qué le cuesta
  (en dinero, en horas o en ventas perdidas). Sin esto no hay propuesta, hay catálogo.
- Fases: nombre, alcance, precio y plazo de cada una.
- Servicio recurrente, forma de pago y qué queda fuera.

Si el usuario te entrega un texto largo (notas, una minuta, un borrador), **no lo reescribas
de cero**: respeta sus cifras y sus frases buenas, y solo reorganiza y recorta.

**Contradicciones:** si el material trae dos precios distintos para la misma fase, dos
folios o un plazo que no cuadra con otra página, **no elijas en silencio**. Pregunta con
`AskUserQuestion` mostrando las dos opciones y qué implica cada una (p. ej. cómo cambia
el total). Si el usuario no está, aplica la que deje el documento coherente y dilo al entregar.

**Colores de marca:** intenta ver el sitio del cliente (`WebFetch`). Si la red lo bloquea
o no hay sitio, **dilo explícitamente al entregar** y usa la paleta por defecto; ofrece
cambiarla con dos tokens en cuanto te pasen el logo.

## Montaje

```bash
mkdir -p propuestas/<cliente> && cd propuestas/<cliente>
cp <skill>/assets/{build.mjs,package.json,plantilla.html} .
mv plantilla.html propuesta.html
npm install                 # @fontsource/inter + playwright-core
npm run build               # PDF + PNGs en preview/
```

Chromium ya está instalado en este entorno (`/opt/pw-browsers/chromium-*/chrome-linux/chrome`);
si la ruta cambia, pásala en `CHROME_PATH`. No ejecutes `playwright install`.

## Procedimiento

1. **Estructura primero.** Escribe la lista de páginas con su titular antes de maquetar
   nada. Sigue el reparto de `reference/redaccion.md § Qué va en cada página`.
2. **Redacta con las reglas de voz** de `reference/redaccion.md`: empieza por lo que ya
   funciona, cifras contables, cero jerga, resultado en vez de entregable, una salvedad
   honesta, y precio siempre con plazo.
3. **Diagrama las tres ideas difíciles.** Mínimo tres SVG: el proceso de hoy contra el de
   mañana, la ruta de fases en el tiempo, y la mecánica de la fase más cara. Recetas
   completas en `reference/diagramas.md`. Un diagrama por idea difícil, ninguno de adorno.
4. **Maqueta** sobre `assets/plantilla.html`, usando solo los componentes del sistema
   (`reference/sistema-visual.md`). No inventes clases ni colores nuevos.
5. **Compila y mira.** `npm run build` imprime la holgura al pie de cada página:
   ```
   holgura al pie: 1:140 2:22 3:16 4:59 ...
   ```
   - `< 6` → la página se desborda: mueve un bloque a la siguiente, no encojas el tipo.
   - `> 120` (salvo portada) → falta contenido: añade un panel, una nota o una cifra.
   - Objetivo: todo entre 16 y 90.
6. **Revisa las páginas como imágenes**, no solo el HTML: lee `preview/p0X.png` con la
   herramienta de lectura. Los errores que importan (texto cortado en un SVG, columna
   pegada, cifra partida en dos renglones) solo se ven así. Revisa al menos la portada,
   una página con diagrama y el cierre.
7. **Verifica los números** con la lista de `reference/redaccion.md § Antes de entregar`.
8. **Entrega**: manda el PDF con `SendUserFile`, resume en el chat qué decisiones tomaste
   (sobre todo las ambigüedades que resolviste), y haz commit del HTML + `build.mjs` para
   que la propuesta se pueda regenerar cuando cambien precios.

## Lo que nunca se hace

- Degradados, fondos oscuros de página, sombras, más de dos acentos, íconos de librería, emojis.
- Serif, fuentes de display o segunda familia tipográfica.
- Cifras inventadas, plazos "estimados" sin decir que lo son, capacidades que no vas a construir.
- Bajar el tamaño de letra global para que quepa una página.
- Entregar sin haber visto los PNG.

## Archivos

| Archivo | Contenido |
|---|---|
| `assets/plantilla.html` | sistema visual completo en CSS + esqueleto de las siete plantillas de página |
| `assets/build.mjs` | render a PDF, tipografías incrustadas, ajuste de densidad, chequeo de holgura, PNGs |
| `assets/package.json` | dependencias (`@fontsource/inter`, `playwright-core`) y `npm run build` |
| `reference/sistema-visual.md` | tokens, escala tipográfica, rejilla, catálogo de componentes, errores ya cometidos |
| `reference/diagramas.md` | seis recetas de diagrama con SVG completo, aritmética de rejilla y reglas técnicas |
| `reference/redaccion.md` | voz, fórmulas, contenido obligatorio por página, convenciones de precio y plazo, verificación final |
| `PROMPT.md` | la misma norma condensada, para pegar en una sesión sin la skill instalada |

**Ejemplo terminado de referencia:** `propuestas/myticket-mx/propuesta.html` en este repo
(11 páginas, seis diagramas, cuatro fases). Cuando dudes de una decisión de maquetación,
mírala ahí antes de inventar.
