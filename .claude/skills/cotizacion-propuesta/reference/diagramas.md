# Diagramas: seis recetas que cubren el 95% de las cotizaciones

Los diagramas son la mitad del valor del documento. No son decoración: cada uno
sustituye tres párrafos que el cliente no iba a leer. Regla de oro: **un diagrama
por idea difícil, ninguno por página bonita.**

## Reglas técnicas comunes

| Regla | Por qué |
|---|---|
| `viewBox="0 0 1000 H"` siempre 1000 de ancho | el SVG escala al ancho de la caja de texto (≈7 in). Trabajar en unidades de 1000 hace la aritmética trivial: `x=500` es el centro. |
| `svg{display:block;width:100%;height:auto}` (ya está en el CSS) | evita el hueco fantasma bajo el SVG y lo hace responsivo al zoom del build |
| Tamaño de texto: 13–18 unidades | a escala real ≈ 6.5–9 pt. Menos de 12 no se lee impreso; más de 20 compite con los títulos. |
| Una línea de texto = un `<text>` | SVG no rompe línea solo. Nada de `<foreignObject>`. Interlínea: +18 a +20 unidades en `y`. |
| Texto que puede desbordar: `text-anchor="end"` anclado al borde derecho | evita el clásico "corte automáti…" cortado por el borde del panel |
| Trazo `stroke-width="1"`, esquinas `rx="3"` | el documento entero usa filetes de 0.75–1 px; un diagrama con trazo grueso se ve de otro documento |
| Colores: solo los tokens | `#F4F2ED` relleno neutro, `#E3E0D9` borde, `#E9EFEE`/`#4E6B72` para lo destacado, `#CFCBC2` punteados, `#868C94` texto secundario, `#8E6B58` advertencias |
| Lo automático va punteado (`stroke-dasharray="3 3"`), lo humano va sólido y con relleno frío | el lector entiende la diferencia sin leyenda |
| Flechas con `<marker>` | definir uno por SVG con id único (`ar`, `ar2`, `ar3`…): dos SVG con el mismo id en la misma página colisionan |
| `role="img"` + `aria-label` describiendo el diagrama | el PDF queda legible por lectores de pantalla y obliga a poder explicarlo en una frase |

Marcador estándar (va dentro de `<defs>`):

```html
<marker id="ar" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
  <path d="M0,0 L6,3 L0,6" fill="none" stroke="#CFCBC2" stroke-width="1"/>
</marker>
```

Rejilla horizontal de N cajas en 1000 unidades: `ancho = (1000 - (N-1)*gap) / N`.
Para N=6 y gap=13 → ancho 156, posiciones `0, 169, 338, 507, 676, 845`.
Para N=3 y gap=20 → ancho 320, posiciones `0, 340, 680`.
Para N=4 y gap=32 → ancho 226, posiciones `0, 258, 516, 774`.

---

## 1. Comparativa de dos vías — "antes / después"

**Cuándo:** el problema es un proceso manual. Es el diagrama que más vende: el cliente
se ve a sí mismo en la fila de arriba.

**Estructura:** dos filas con las mismas posiciones en X. Arriba, N cajas sólidas numeradas
(el proceso de hoy). Abajo, las mismas posiciones: punteadas las que desaparecen,
sólidas y frías las que siguen siendo humanas. Una línea separa las dos vías.

```html
<div class="figcap">El recorrido de una orden</div>
<svg viewBox="0 0 1000 286" role="img" aria-label="Comparativa del recorrido manual de hoy contra el recorrido con el sistema">
  <defs>
    <marker id="ar" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6" fill="none" stroke="#CFCBC2" stroke-width="1"/>
    </marker>
  </defs>

  <text x="0" y="12" font-family="Inter" font-size="14" font-weight="600" letter-spacing="2.2" fill="#868C94">HOY · SEIS PASOS MANUALES</text>
  <g font-family="Inter" font-size="16" fill="#414750">
    <g>
      <rect x="0" y="26" width="156" height="80" rx="3" fill="#F4F2ED" stroke="#E3E0D9"/>
      <text x="12" y="50" font-size="13" font-weight="600" fill="#8E6B58">1</text>
      <text x="12" y="72">Copiar la orden</text><text x="12" y="90">al Excel</text>
    </g>
    <!-- repetir en x = 169, 338, 507, 676, 845 -->
  </g>
  <g stroke="#CFCBC2" stroke-width="1" marker-end="url(#ar)">
    <line x1="158" y1="66" x2="166" y2="66"/><!-- una por hueco -->
  </g>

  <line x1="0" y1="136" x2="1000" y2="136" stroke="#E3E0D9" stroke-width="1"/>

  <text x="0" y="168" font-family="Inter" font-size="14" font-weight="600" letter-spacing="2.2" fill="#4E6B72">CON EL PORTAL · DOS PASOS HUMANOS</text>
  <g font-family="Inter" font-size="16">
    <g><!-- paso que desaparece -->
      <rect x="0" y="182" width="156" height="80" rx="3" fill="none" stroke="#CFCBC2" stroke-dasharray="3 3"/>
      <text x="12" y="214" fill="#868C94" font-size="15">Automático</text>
      <text x="12" y="236" fill="#A6ABB1" font-size="13">espejo de la orden</text>
    </g>
    <g><!-- paso que sigue siendo humano -->
      <rect x="507" y="182" width="156" height="80" rx="3" fill="#E9EFEE" stroke="#4E6B72"/>
      <text x="519" y="208" font-size="13" font-weight="600" fill="#4E6B72">HUMANO</text>
      <text x="519" y="232" fill="#22262B">Capturar asientos</text>
    </g>
  </g>
</svg>
<p class="fignote">Explicación de una o dos líneas.</p>
```

---

## 2. Ruta en el tiempo — barras por semana

**Cuándo:** hay más de una fase. Sustituye a cualquier "cronograma" en tabla.

**Estructura:** columna izquierda de 260 unidades con nombre, precio y duración de cada fase;
a la derecha, rejilla vertical de semanas y una barra por fase, encadenadas.

- Ancho de semana = `(1000 - 260) / totalSemanas`. Con 13 semanas → 56.9.
- Barra de la fase i: `x = 260 + semanaInicio*ancho`, `width = duración*ancho`.
- Rellenos que se van aclarando: `#DCE5E4`, `#E2E9E8`, `#E9EDEB`, y `#F0EDE9` (cálido)
  para la última fase si es condicional. Nunca colores distintos: es la misma ruta.

```html
<svg viewBox="0 0 1000 250" role="img" aria-label="Tiempos de las cuatro fases a lo largo de trece semanas">
  <g font-family="Inter" font-size="13" fill="#A6ABB1">
    <text x="260" y="12">S1</text><!-- una etiqueta por semana -->
  </g>
  <g stroke="#EDEBE5" stroke-width="1">
    <line x1="260" y1="20" x2="260" y2="228"/><!-- una línea por semana -->
  </g>
  <g font-family="Inter">
    <text x="0" y="46" font-size="17" font-weight="600" fill="#22262B">Fase 1 · Portal de operación</text>
    <text x="0" y="66" font-size="14" fill="#868C94">$30,000 · 1–2 semanas</text>
    <rect x="260" y="34" width="114" height="30" rx="3" fill="#DCE5E4" stroke="#BCCECC"/>
    <text x="272" y="54" font-size="14" fill="#3D5A60">Operando</text>
  </g>
</svg>
```

Filas siguientes: `y` +60 por fase (46 → 106 → 166 → 226).

---

## 3. Arquitectura — entra / sistema / sale

**Cuándo:** hay que mostrar que un sistema central sustituye a un archivo compartido.

**Estructura:** izquierda las fuentes (232 de ancho), centro el sistema (330, resaltado
en frío, con lista interna), derecha las salidas (270). Flechas de izquierda a centro y
de centro a cada salida, saliendo del mismo punto medio.

```html
<svg viewBox="0 0 1000 244" role="img" aria-label="Las ventas entran al sistema y de ahí salen manifiestos, correos y reportes">
  <defs><marker id="ar2" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
    <path d="M0,0 L6,3 L0,6" fill="none" stroke="#BFBBB2" stroke-width="1"/></marker></defs>
  <g font-family="Inter">
    <text x="0" y="12" font-size="13" font-weight="600" letter-spacing="2" fill="#868C94">ENTRA</text>
    <rect x="0" y="26" width="232" height="62" rx="3" fill="#F4F2ED" stroke="#E3E0D9"/>
    <text x="14" y="52" font-size="16" fill="#22262B" font-weight="600">Tienda Shopify</text>
    <text x="14" y="72" font-size="14" fill="#868C94">cada venta, por webhook</text>

    <rect x="316" y="14" width="330" height="196" rx="3" fill="#E9EFEE" stroke="#4E6B72"/>
    <text x="334" y="44" font-size="18" font-weight="600" fill="#22262B">Portal de operación</text>
    <text x="334" y="64" font-size="14" fill="#4E6B72">una sola fuente de verdad</text>
    <line x1="334" y1="80" x2="628" y2="80" stroke="#BCCECC"/>
    <text x="334" y="104" font-size="15" fill="#3E444C">Órdenes con estado e historial</text>

    <text x="730" y="12" font-size="13" font-weight="600" letter-spacing="2" fill="#868C94">SALE</text>
    <rect x="730" y="26" width="270" height="56" rx="3" fill="#F4F2ED" stroke="#E3E0D9"/>
  </g>
  <g stroke="#BFBBB2" stroke-width="1" marker-end="url(#ar2)" fill="none">
    <path d="M232,57 L306,57"/>
    <path d="M646,112 L676,112 L676,54 L722,54"/>   <!-- codo hacia la salida de arriba -->
    <path d="M646,112 L722,112"/>                    <!-- salida de en medio -->
    <path d="M646,112 L676,112 L676,194 L722,194"/>  <!-- codo hacia la de abajo -->
  </g>
</svg>
```

---

## 4. Flujo con decisión — una entrada, tres desenlaces

**Cuándo:** un agente, un formulario o una regla que puede terminar de varias maneras.

**Estructura:** entrada a la izquierda, nodo central resaltado, tres cajas a la derecha.
Debajo del nodo central, una caja punteada con la fuente de datos, unida por línea punteada:
comunica "no se lo inventa, lo consulta".

```html
<rect x="292" y="180" width="248" height="52" rx="3" fill="none" stroke="#CFCBC2" stroke-dasharray="3 3"/>
<text x="308" y="202" font-size="14" font-weight="600" fill="#3E444C">Base de datos de la Fase 1</text>
<text x="308" y="221" font-size="13" fill="#868C94">funciones, secciones, precios y cupo</text>
<path d="M416,146 L416,178" stroke="#BFBBB2" stroke-width="1" stroke-dasharray="3 3"/>
```

Un detalle humano vale más que tres tecnicismos: en la caja de entrada, poner la hora
(`6:40 a.m. · nadie de turno`) en color cálido `#8E6B58`.

---

## 5. Tres variantes lado a lado

**Cuándo:** el sistema tiene que soportar tres reglas distintas y hay que probar que se
entendieron. Cada panel dibuja **su mecánica**, no un ícono.

- Panel 1, relación inmediata: círculo → línea con etiqueta → caja de resultado.
- Panel 2, acumulación con corte: barra de fondo + barra de avance + línea vertical cálida
  en el punto de corte, con la etiqueta anclada `text-anchor="end"` al borde.
- Panel 3, evento programado: línea de tiempo con puntos + caja al final + etiqueta de plazo.

```html
<svg viewBox="0 0 1000 152" role="img" aria-label="Las tres políticas de cupo">
  <rect x="340" y="0" width="320" height="152" rx="3" fill="#F8F7F4" stroke="#E3E0D9"/>
  <text x="358" y="30" font-size="16" font-weight="600" fill="#22262B">Cupo con precorte</text>
  <text x="358" y="52" font-size="13" fill="#868C94">contador en vivo y corte al llenarse</text>
  <rect x="358" y="82" width="284" height="26" rx="3" fill="#F1EFEA" stroke="#DDD9D1"/>
  <rect x="358" y="82" width="196" height="26" rx="3" fill="#DCE5E4" stroke="#BCCECC"/>
  <text x="370" y="100" font-size="13" fill="#3D5A60">70 de 100 lugares</text>
  <line x1="642" y1="74" x2="642" y2="116" stroke="#8E6B58" stroke-width="1.2"/>
  <text x="642" y="134" font-size="12" fill="#8E6B58" text-anchor="end">corte automático</text>
</svg>
```

---

## 6. Cadena lineal con condición

**Cuándo:** un ciclo de cuatro pasos donde uno depende de algo que no controlas.

**Estructura:** cuatro cajas de 226 unidades encadenadas con flechas; debajo del paso
condicionado, una caja punteada con la condición, unida por línea punteada y escrita en
color cálido. Es la forma honesta de cotizar algo que depende de un tercero — y la que
más confianza genera.

```html
<rect x="516" y="122" width="484" height="46" rx="3" fill="none" stroke="#CFCBC2" stroke-dasharray="3 3"/>
<text x="532" y="150" font-size="14" fill="#8E6B58">Requiere que el teatro acepte validar un código que no es suyo.</text>
<path d="M629,92 L629,120" stroke="#CFCBC2" stroke-width="1" stroke-dasharray="3 3"/>
```

---

## Errores que ya se cometieron (no repetirlos)

1. **Texto cortado por el borde del panel.** Todo texto que empiece después del 60% del
   ancho de su caja va con `text-anchor="end"` anclado al borde derecho de la caja.
2. **Dos SVG con el mismo `id` de marcador** en la misma página: el segundo pierde las flechas.
3. **Caja demasiado alta para su contenido**: deja un hueco muerto. La altura del `viewBox`
   se ajusta al último elemento + 16 unidades.
4. **Etiquetas de más.** Si hay que explicar el diagrama con una leyenda de colores, el
   diagrama está mal: renómbralo con palabras dentro de las cajas.
5. **Diagrama sin `figcap` ni `fignote`.** El título dice qué es; la nota dice qué concluir.
