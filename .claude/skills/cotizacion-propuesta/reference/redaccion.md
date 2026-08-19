# Redacción: la voz de estas cotizaciones

El documento lo lee un dueño de negocio, no un CTO. Está decidiendo si confía, no si la
arquitectura es correcta. Todo lo demás se deriva de eso.

## Las siete reglas

1. **Empieza por lo que el cliente ya hizo bien.** Primera frase del documento: lo que
   funciona. "MyTicket ya tiene tráfico que llega con intención de compra… La tienda
   funciona." Nadie compra a quien empieza diciéndole que todo está mal.
2. **Nombra el problema con un número contable.** No "procesos ineficientes": *seis pasos
   manuales por orden*, *$187 USD al mes*, *de 6 a 10 de la mañana nadie contesta*.
   Si no hay número, hay una escena concreta ("se le inventa un número de orden y se marca
   con apóstrofe").
3. **Cero jerga.** Ni "pasarela", ni "onboarding", ni "stack", ni "sinergia". Se dice
   *cobro con tarjeta*, *acompañamiento*, *el sistema*. Los términos que sí se conservan
   son los que el cliente ya usa en su día ("manifiesto", "taquilla", "cupo").
4. **Vende el resultado, no el entregable.** El título de cada fase es lo que deja de
   doler: "Que nadie vuelva a copiar una orden a mano", no "Módulo de sincronización".
5. **Di lo que no vas a poder hacer.** Cada propuesta lleva al menos una salvedad honesta
   en su propio panel: "Esta fase no depende principalmente del software… el acuerdo
   comercial puede tomar meses." Esa es la página que hace que te crean el resto.
6. **Todo precio va con su plazo.** Nunca aparece una cifra sin al lado cuánto tarda y qué
   incluye. Y el mismo par (precio, plazo) se repite idéntico en portada, tabla, encabezado
   de fase, tira de cifras y resumen final.
7. **Una idea por bloque.** Si un párrafo necesita "además", va aparte.

## Fórmulas que funcionan

- **Contraste temporal:** "Hoy X. Con la Fase 1, Y." Es el motor de todo el documento.
- **La pregunta del cliente en su propia voz:** «¿cuánto vendimos de Leonas esta semana?»,
  «tengo aquí a Santiago y no me has mandado su orden». Entre comillas angulares.
- **La cifra que no existe:** "Hoy esas tres cifras son intuiciones. Después de la Fase 1,
  son números." Convierte una promesa vaga en un entregable.
- **El costo de no hacerlo**, siempre en dinero o en horas, nunca en adjetivos.
- **Cierre de fase en una línea:** "El equipo pasa de transcribir a revisar."

## Qué va en cada página

| # | Página | Contenido obligatorio |
|---|---|---|
| 1 | Portada | titular con el resultado · dos frases de contexto · índice de fases con precio y plazo · cliente, autor, fecha, vigencia · contacto |
| 2 | Entendimiento | lo que ya funciona · el problema con número · **diagrama antes/después** · tres cifras clave · frase puente hacia la Fase 1 |
| 3 | Diagnóstico | 5–7 hallazgos numerados, cada uno con su evidencia · panel de "lo que no se toca" · panel de "lo que hoy no se puede medir" |
| 4 | La propuesta | por qué es por fases · **diagrama de ruta en el tiempo** · tabla de inversión con total · nota de IVA y ritmo de entrega |
| 5+ | Una o dos por fase | encabezado con precio y plazo · párrafo con el costo actual del problema · **un diagrama** · qué incluye · por qué conviene · tira de tres cifras |
| N−1 | Condiciones | servicio recurrente · forma de pago por fase · incluido / no incluido · alcance y vigencia · qué se necesita para arrancar |
| N | Cierre | recomendación de por dónde empezar · la decisión en corto · frase memorable · resumen de la ruta con "cuándo conviene" cada fase · firma y contacto |

Entre 8 y 12 páginas. Menos de 8 se siente ligero para un proyecto de seis cifras;
más de 12 no se lee.

## Precios y plazos

- Cifras en pesos con coma de millares y sin decimales: `$30,000`. Siempre "más IVA",
  dicho una vez por documento en la nota de la tabla.
- Rango de plazo, nunca fecha exacta: `1 a 2 semanas` en prosa, `1–2 semanas` en tablas.
- La suma total es la suma de los rangos: si las fases son 1–2, 2–3, 3–4 y 3–4, el total
  es **9–13 semanas**, no "12".
- Si el cliente pide rapidez, se demuestra con estructura (fases cortas, entregas
  semanales revisables), no con adjetivos.
- Esquema de pago: 50/50 en fases cortas; 40/30/30 en las de más de tres semanas.

## Antes de entregar: cinco preguntas

1. ¿Cada precio aparece con el mismo plazo en todas las páginas donde se repite?
2. ¿La suma de las fases da el total impreso?
3. ¿Hay al menos una salvedad honesta escrita sin adornos?
4. ¿Se puede leer el documento entero sin saber qué es un webhook?
5. ¿Cada diagrama se entiende sin leer el párrafo de al lado?
