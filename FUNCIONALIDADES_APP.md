# Punto Gema Nova — Documento Maestro de Funcionalidades

> Documento de referencia para el rediseño completo del sitio. Describe **qué tiene hoy la aplicación**, **qué le falta** y **qué debería agregarse en el futuro**. Pensado como insumo para definir wireframes, design system y prioridades de producto.

---

## 1. Identidad del proyecto

**Punto Gema Nova** es un e-commerce de **joyería artesanal mexicana** elaborada con piedras semipreciosas, perlas y chapa de oro. La marca combina venta directa al consumidor con un componente de consultoría/personalización y storytelling artesanal.

**Propuesta de valor:**
- Piezas únicas o de tiraje corto hechas a mano en México.
- Énfasis en materiales naturales (piedras, perlas, chapa de oro) con storytelling de origen.
- Personalización vía quiz de estilo + consultoría 1:1.
- Operación en México con facturación fiscal (RFC/CFDI) y pagos locales (MercadoPago).

**Público objetivo:** mujeres mexicanas adultas que buscan joyería artesanal con significado (uso diario, regalo, ocasiones especiales).

---

## 2. Stack técnico actual

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Estilos | Tailwind CSS 4 |
| Base de datos | PostgreSQL (Neon) + Prisma ORM |
| Autenticación | AWS Cognito |
| Pagos | MercadoPago |
| Storage | AWS S3 (imágenes/videos) |
| Email | Nodemailer + Resend |
| Validación | Zod |
| Gráficas admin | Recharts |
| Blog | React Markdown |
| Tipografías | Inter + Cormorant Garamond |

---

## 3. Mapa completo de funcionalidades **actuales**

### 3.1 Catálogo y tienda
- Listado de productos en `/tienda` con filtros (categoría, precio, material) y ordenamiento.
- Ficha de producto con galería, descripción, materiales, instrucciones de cuidado.
- Etiquetas: Nuevo, Bestseller, Descuento.
- Categorías: anillos, collares, pulseras, aretes (CRUD en BD).
- Páginas dedicadas a materiales (`/materiales`, `/materiales/:slug`) con descripción, origen y beneficios.
- Página de colecciones (`/colecciones`).
- Tipos de colección en BD: **permanente, casi-única, personalizado, temporada**.
- Búsqueda global vía overlay (`SearchOverlay`).
- Componentes "Shop the Look" y testimoniales en home.
- Carrusel de banners gestionable desde admin.

### 3.2 Carrito y checkout
- Carrito persistente en `CartContext`.
- Drawer lateral de carrito (`CartDrawer`).
- Página `/carrito` para revisión.
- Checkout (`/checkout`) integrado con **MercadoPago**.
- Aplicación de **cupones** (% o monto fijo, mínimo de compra, máximo descuento, vigencias, límite de usos).
- Estados de pago: success / failure / pending con páginas dedicadas y `orderId`.
- Webhook `/api/webhooks/mercadopago` para confirmación asíncrona.

### 3.3 Cuentas de usuario
- Registro, login, verificación de email y recuperación de contraseña (AWS Cognito).
- Dashboard de cuenta (`/cuenta`).
- Edición de perfil, gestión de direcciones (multi-dirección con default).
- Historial de pedidos y detalle por orden.
- Roles: **CUSTOMER**, **EDITOR**, **ADMIN**.

### 3.4 Facturación fiscal mexicana
- Página pública `/facturacion` para que el cliente solicite factura post-compra.
- Captura de RFC, razón social, régimen fiscal, uso CFDI, CP.
- Estados: PENDING / GENERATED / FAILED.
- Almacena XML y PDF (URLs S3).
- Panel admin en `/admin/facturas` con bandeja de solicitudes y emails de notificación configurables.

### 3.5 Contenido y marketing
- Blog con editor Markdown, categorías, tags, imagen destacada, SEO meta.
- Banners hero/destacado con imagen o video, CTA configurable y orden.
- Newsletter (suscripción desde footer, almacenamiento en BD).
- Quiz de estilo (`/quiz`) con perfilado (minimalista / bohemio / clásico / atrevido) y recomendación de productos.
- Página de proceso artesanal (`/proceso`).
- Página de personalización (`/personalizados`) con enlace a WhatsApp.
- Página de regalos (`/regalos`).
- Páginas informativas: envíos, devoluciones, FAQ, ayuda, contacto, política de privacidad, rastreo.

### 3.6 Panel administrativo
- Dashboard con gráficas (Recharts).
- CRUD de productos (con subida de imágenes a S3, multi-material, multi-categoría).
- Gestión de pedidos: cambio de estado, asignación de tracking, notas internas.
- Listado de clientes con historial de compras.
- CRUD de blog (Markdown).
- CRUD de banners.
- CRUD de cupones.
- Bandeja de facturas.
- Configuración: lista de emails para notificaciones de orden y de factura.
- Acción de prueba de envío de emails.

### 3.7 Modelos de datos existentes (Prisma)
`User`, `Product`, `Category`, `Material`, `Order`, `OrderItem`, `Review`, `Address`, `Coupon`, `BlogPost`, `NewsletterSubscriber`, `Banner`, `InvoiceRequest`, `Bundle`, `QuizResult`, `StoreSettings`.

---

## 4. Funcionalidades **en esquema pero no terminadas**

Estas ya existen como modelo de datos o componente pero no tienen UI completa o flujo cerrado:

1. **Reseñas de productos (`Review`)** — schema completo (rating, título, comentario, imágenes, verificación, aprobación) pero **no hay UI** para que el cliente las deje ni para mostrarlas en la ficha del producto, ni moderación en admin.
2. **Bundles / sets coordinados (`Bundle`)** — modelo N:M con productos existe; falta página de tienda, ficha de bundle y armado dinámico ("Shop the Look" hoy es estático).
3. **Quiz de estilo** — captura respuestas y guarda `QuizResult`, pero las recomendaciones son lógica básica; no hay panel para analizar resultados ni email de seguimiento.
4. **Instagram Feed** — componente existe como placeholder, sin integración real con Instagram Graph API.
5. **Origen de materiales** — el campo `origin` existe pero los datos están incompletos; no hay mapa o storytelling visual.
6. **WhatsApp** — solo es link hardcoded; no hay flujo conversacional ni captura de leads.
7. **Página `/sobre-nosotros`** — estructura básica, falta contenido editorial.
8. **FAQ y centro de ayuda** — contenido estático en código, debería ser editable desde admin.
9. **Generación real de CFDI** — actualmente el admin sube manualmente XML/PDF; falta integración con PAC (Facturama, SW Sapien, etc.).

---

## 5. Funcionalidades **que faltan y deberían agregarse**

Agrupadas por prioridad sugerida. Pensar cada bloque al definir el diseño.

### 5.1 Prioridad ALTA (impacto directo en conversión y operación)

#### a) Wishlist / Favoritos
- Botón corazón en ficha de producto y en card.
- Página `/cuenta/favoritos`.
- Compartir wishlist por link (caso "regalos").

#### b) Reseñas con UI completa
- Sección de reviews en ficha de producto con rating promedio, distribución de estrellas, fotos.
- Formulario post-compra (email automático X días después de "DELIVERED").
- Moderación en admin (aprobar / rechazar / responder).
- Filtros (más recientes, mejor calificadas, con foto).

#### c) Variantes de producto
Hoy un producto = una SKU. Se necesitan variantes por:
- **Talla** (anillos, pulseras).
- **Color/Acabado** (chapa oro, plata, rosa).
- **Largo** (collares: 40 / 45 / 50 cm).
- Cada variante con su propio stock, precio opcional, imagen y SKU.

#### d) Inventario real
- Decremento automático al confirmar pago.
- Reserva temporal durante el checkout.
- Alertas de stock bajo en admin.
- "Notifícame cuando vuelva" para productos agotados.

#### e) Búsqueda avanzada
- Autocompletado con productos, categorías, materiales y posts.
- Sugerencias populares.
- Resultados con filtros aplicables (precio, material, disponibilidad).
- Buscador con tolerancia a faltas y acentos.

#### f) Cotizador / personalización guiada
- Flujo paso a paso para piezas personalizadas (`/personalizados`):
  1. Tipo de pieza
  2. Material principal
  3. Piedra(s)
  4. Talla / largo
  5. Mensaje grabado (opcional)
- Captura datos del cliente y envía a admin como **OrderRequest** (nuevo modelo) para cotización manual.

#### g) Múltiples métodos de pago
Hoy solo MercadoPago. Sumar:
- **Stripe** (tarjetas internacionales).
- **PayPal** (opcional para clientes fuera de MX).
- **Mensualidades sin intereses** (MercadoPago ya lo permite, configurarlo).
- **Transferencia / SPEI** con confirmación manual.

#### h) Cálculo real de envíos
- Integración con paquetería (DHL, Estafeta, Fedex, 99minutos).
- Cotización por CP en checkout.
- Múltiples opciones: estándar, express, recolección en tienda/estudio.
- Tracking automático vía API.

### 5.2 Prioridad MEDIA (retención, branding y CRO)

#### i) Programa de fidelidad
- Puntos por compra, reseña, referido.
- Niveles (semilla, cuarzo, ámbar, ópalo) con beneficios.
- Canje por descuentos o piezas exclusivas.

#### j) Referidos
- Código único por usuario, descuento al referido y al referente.

#### k) Suscripción / "Caja del mes"
- Programa estilo "joya del mes" con pago recurrente.

#### l) Gift cards / Tarjetas de regalo
- Compra de tarjeta digital con valor, mensaje y fecha de envío.
- Canje al checkout.

#### m) Reservar / apartar pieza única
- Para colecciones "casi-única" o "personalizado", botón "Apartar" con anticipo del 30%.

#### n) Lookbook editorial
- Página tipo revista con sesiones de fotos, modelos usando piezas, tags clicables ("ver pieza").

#### o) Configurador 3D / AR Try-On
- Visualización 3D de anillos y aretes.
- "Pruébalo en ti" con cámara para aretes y collares (filtros tipo AR).

#### p) Comparador
- Comparar hasta 3 piezas lado a lado (precio, material, medidas).

#### q) Notificaciones del pedido
- Emails transaccionales por cada cambio de estado (ya hay envío básico, falta plantillas finas).
- SMS / WhatsApp con tracking.
- Push web (opcional).

#### r) Centro de ayuda / FAQ dinámico
- FAQ editable desde admin con categorías.
- Búsqueda interna.
- Tickets de soporte ligados al pedido.

#### s) Live chat / WhatsApp embebido
- Widget de chat (WhatsApp Business API o Crisp/Intercom).
- Handoff a humano en horario hábil, bot fuera de horario.

### 5.3 Prioridad BAJA / largo plazo

#### t) Multi-idioma (i18n)
- Español por default, inglés como segundo idioma para turismo y exportación.

#### u) Multi-moneda
- MXN, USD; conversión automática.

#### v) Marketplace de artesanas asociadas
- Cada artesana con perfil propio, historia, piezas firmadas por ella.

#### w) App móvil (PWA o nativa)
- Mínimo: configurar Next.js como PWA con offline básico.

#### x) Eventos / talleres
- Página de eventos presenciales (talleres de cuidado, lanzamientos).
- Compra de boleto con cupo.

#### y) Integración con CRM
- HubSpot / Mailchimp / Klaviyo para automatizaciones de email marketing (carrito abandonado, win-back, cumpleaños).

#### z) Analítica avanzada
- GA4, Meta Pixel, TikTok Pixel.
- Eventos de e-commerce estándar.
- Heatmaps (Hotjar/Clarity).

---

## 6. Mejoras al panel administrativo

| Área | Falta |
|------|-------|
| Dashboard | KPIs: AOV, conversión, recompra, top productos por margen, devoluciones |
| Pedidos | Impresión de etiqueta de envío, batch de cambio de estado, exportar CSV |
| Clientes | Segmentación (VIP, dormidos, nuevos), notas internas, CLV |
| Productos | Duplicar producto, importación CSV masiva, edición masiva de precio/stock |
| Inventario | Movimientos manuales, conteo físico, alertas |
| Marketing | Editor visual de banners, A/B testing, popups configurables |
| Contenido | CMS para páginas estáticas (about, FAQ, envíos), versiones y previews |
| Reportes | Ventas por periodo, por material, por colección, por canal |
| Roles | Permisos granulares por sección (no solo CUSTOMER/EDITOR/ADMIN) |
| Auditoría | Log de cambios (quién editó qué y cuándo) |

---

## 7. Mejoras técnicas y de UX transversales

1. **Performance**: imágenes con `next/image` AVIF, blur placeholders, lazy load de secciones below-the-fold.
2. **SEO**: sitemap dinámico, schema.org (Product, Review, BreadcrumbList, Organization, BlogPosting), Open Graph completo.
3. **Accesibilidad (WCAG AA)**: contraste, navegación por teclado, ARIA en drawers/modals, alt text obligatorio en admin.
4. **Mobile-first real**: el e-commerce de joyería se compra mayormente en mobile; revisar gallery, filtros, checkout en pantallas pequeñas.
5. **Diseño consistente**: design system con tokens (color, tipografía, spacing, shadows, radii) y componentes documentados.
6. **Modo claro/oscuro** (opcional, evaluar con la marca).
7. **Manejo de errores y estados vacíos** con ilustraciones de marca.
8. **Onboarding del usuario nuevo** (post-registro: completar perfil, hacer quiz, primer cupón).
9. **Email transaccional con branding**: hoy es texto plano; necesita plantillas HTML alineadas al diseño.

---

## 8. Resumen ejecutivo para el equipo de diseño

Al rediseñar el sitio deben considerar **estos bloques visuales clave**:

### Públicos
1. **Home** — hero con banner/video, USP de marca, productos destacados, shop the look, bestsellers, blog, testimoniales, Instagram.
2. **Tienda** — grid con filtros laterales, ordenamiento, chips activos, paginación o scroll infinito.
3. **Ficha de producto** — galería + zoom, badges, precio, variantes (talla/color/largo), CTA agregar al carrito, materiales con link, cuidado, reseñas, productos relacionados, "completa el look".
4. **Carrito y checkout** — drawer + página completa, mini-resumen pegajoso, cupón, dirección, envío con cotización real, métodos de pago.
5. **Cuenta** — sidebar con perfil, pedidos (timeline visual), direcciones, facturación, favoritos, recompensas (futuro).
6. **Quiz** — flujo fullscreen tipo conversacional con progreso, resultado con perfil + recomendación.
7. **Personalizados** — landing editorial + cotizador paso a paso.
8. **Materiales y colecciones** — mood pages, storytelling, mapas de origen.
9. **Blog** — index editorial, post con tipografía generosa, related posts.
10. **Soporte / FAQ / contacto / rastreo** — autoservicio claro.

### Admin
1. **Dashboard** con tarjetas de KPI + gráficas.
2. **Tablas potentes** (filtros, búsqueda, bulk actions, exportación).
3. **Formularios largos** divididos en secciones con autoguardado.
4. **Editor de contenido** Markdown con preview.
5. **Gestor de imágenes** con biblioteca S3 reutilizable.

---

## 9. Roadmap sugerido (alto nivel)

**Fase 1 — Pulir lo que ya hay (4-6 semanas)**
- Reseñas (UI + moderación).
- Wishlist.
- Variantes de producto.
- Inventario real.
- Plantillas de email HTML.
- Mobile polish.
- SEO y schema.org.

**Fase 2 — Conversión y retención (6-8 semanas)**
- Búsqueda avanzada.
- Cálculo de envíos real.
- Más métodos de pago.
- Carrito abandonado + win-back.
- Gift cards.
- CFDI vía PAC real.

**Fase 3 — Diferenciación de marca (8-12 semanas)**
- Cotizador / personalización guiada.
- Lookbook editorial.
- Programa de lealtad.
- Try-on AR para aretes.
- Multi-idioma EN.

**Fase 4 — Escala (continua)**
- App / PWA.
- Marketplace de artesanas.
- Suscripción.
- BI y analítica avanzada.

---

*Este documento debe ser revisado junto al equipo de marca, diseño y operaciones antes de cerrar wireframes finales.*
