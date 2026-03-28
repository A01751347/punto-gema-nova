# ESTRUCTURA COMPLETA DEL PROYECTO - E-COMMERCE PLANTILLA

> **Proyecto original:** YUTNUU (Dermocosmetics E-Commerce)
> **Framework:** Next.js 16.1.1 + React 19 + TypeScript + Tailwind CSS 4
> **Base de datos:** PostgreSQL (Neon) + Prisma ORM
> **Autenticacion:** AWS Cognito
> **Pagos:** MercadoPago
> **Storage:** AWS S3
> **Email:** Nodemailer + Resend

---

## TABLA DE CONTENIDOS

1. [Estructura de Directorios](#1-estructura-de-directorios)
2. [Archivos de Configuracion (Raiz)](#2-archivos-de-configuracion-raiz)
3. [Paginas Publicas (Frontend)](#3-paginas-publicas-frontend)
4. [Paginas de Autenticacion](#4-paginas-de-autenticacion)
5. [Paginas de Cuenta de Usuario](#5-paginas-de-cuenta-de-usuario)
6. [Paginas de Tienda y Checkout](#6-paginas-de-tienda-y-checkout)
7. [Panel de Administracion](#7-panel-de-administracion)
8. [Paginas Informativas / Contenido](#8-paginas-informativas--contenido)
9. [Paginas de Soporte](#9-paginas-de-soporte)
10. [API Routes (Backend)](#10-api-routes-backend)
11. [Server Actions](#11-server-actions)
12. [Componentes (src/components)](#12-componentes-srccomponents)
13. [Componentes Legacy (components/)](#13-componentes-legacy-components)
14. [Librerias y Utilidades (src/lib)](#14-librerias-y-utilidades-srclib)
15. [Librerias Raiz (lib/)](#15-librerias-raiz-lib)
16. [Types (Tipos TypeScript)](#16-types-tipos-typescript)
17. [Base de Datos (Prisma)](#17-base-de-datos-prisma)
18. [Scripts de Utilidad](#18-scripts-de-utilidad)
19. [Assets Publicos](#19-assets-publicos)
20. [Dependencias del Proyecto](#20-dependencias-del-proyecto)
21. [Resumen de Cambios Necesarios](#21-resumen-de-cambios-necesarios)

---

## 1. ESTRUCTURA DE DIRECTORIOS

```
cremas/
├── .claude/                          # Configuracion Claude IDE
├── components/                       # Componentes legacy (fuera de src)
│   ├── layout/                       # Header, Footer, SearchOverlay
│   ├── shop/                         # ProductCard, FilterSidebar, SortDropdown
│   └── ui/                           # Badge, Breadcrumbs, Button, Card, Input, Modal
├── lib/                              # Librerias raiz (fuera de src)
│   ├── auth/                         # Cognito, middleware, auth-context
│   ├── db/                           # Prisma client
│   ├── email/                        # Mailer config
│   └── storage/                      # S3 config
├── prisma/                           # Schema y seeds de BD
├── public/                           # Assets estaticos
│   └── images/                       # Imagenes
├── scripts/                          # Scripts de utilidad/seed
├── src/                              # Codigo fuente principal
│   ├── app/                          # Next.js App Router (todas las paginas)
│   │   ├── actions/                  # Server Actions
│   │   │   └── admin/                # Server Actions de admin
│   │   ├── admin/                    # Panel de administracion
│   │   │   ├── blog/                 # CRUD blog
│   │   │   ├── clientes/             # Gestion clientes
│   │   │   ├── configuracion/        # Ajustes
│   │   │   ├── cupones/              # Gestion cupones
│   │   │   ├── facturas/             # Gestion facturas
│   │   │   ├── marketing/banners/    # Gestion banners
│   │   │   ├── pedidos/              # Gestion pedidos
│   │   │   └── productos/            # CRUD productos
│   │   ├── api/                      # API Routes
│   │   │   ├── newsletter/subscribe/ # Suscripcion newsletter
│   │   │   ├── products/             # API productos
│   │   │   └── webhooks/mercadopago/ # Webhook pagos
│   │   ├── ayuda/                    # Pagina de ayuda
│   │   ├── blog/                     # Blog publico
│   │   ├── carrito/                  # Carrito de compras
│   │   ├── checkout/                 # Proceso de pago
│   │   │   ├── success/[orderId]/    # Pago exitoso
│   │   │   ├── failure/[orderId]/    # Pago fallido
│   │   │   └── pending/[orderId]/    # Pago pendiente
│   │   ├── ciencia/                  # Pagina ciencia
│   │   ├── contacto/                 # Formulario contacto
│   │   ├── cuenta/                   # Panel usuario
│   │   │   ├── direcciones/          # CRUD direcciones
│   │   │   ├── pedidos/              # Historial pedidos
│   │   │   └── perfil/               # Perfil usuario
│   │   ├── devoluciones/             # Politica devoluciones
│   │   ├── envios/                   # Info envios
│   │   ├── facturacion/              # Facturacion usuario
│   │   ├── faq/                      # Preguntas frecuentes
│   │   ├── ingredientes/             # Ingredientes
│   │   ├── login/                    # Inicio sesion
│   │   ├── metodologia/              # Metodologia
│   │   ├── politica-privacidad/      # Privacidad
│   │   ├── quiz/                     # Quiz de piel
│   │   ├── rastreo/                  # Rastreo pedidos
│   │   ├── recuperar-password/       # Recuperar contrasenya
│   │   ├── referencias/              # Referencias cientificas
│   │   ├── registro/                 # Registro usuario
│   │   ├── rutinas/                  # Rutinas
│   │   ├── sobre-nosotros/           # Sobre nosotros
│   │   ├── tienda/                   # Catalogo tienda
│   │   │   └── [slug]/              # Detalle producto
│   │   └── verificar/                # Verificacion email
│   ├── components/                   # Componentes nuevos
│   │   ├── account/                  # AccountSidebar, AddressForm
│   │   ├── cart/                     # CartDrawer, CartItem
│   │   ├── home/                     # HeroCarousel
│   │   ├── layout/                   # Shell
│   │   └── product/                  # ProductGallery, ProductInfo, etc.
│   └── lib/                          # Librerias de app
│       ├── blog/                     # Blog actions
│       ├── cart/                     # CartContext
│       ├── email/                    # Email service
│       ├── ingredients/              # Ingredient actions
│       └── payment/                  # MercadoPago config
└── types/                            # Tipos TypeScript compartidos
```

---

## 2. ARCHIVOS DE CONFIGURACION (RAIZ)

| Archivo | Descripcion | Que cambiar |
|---------|-------------|-------------|
| `package.json` | Dependencias y scripts del proyecto | Nombre del proyecto (`"name": "cremas"`) |
| `next.config.ts` | Configuracion de Next.js | Dominios de imagenes, redirects |
| `tailwind.config.ts` | Tema de Tailwind (colores, fuentes) | Colores brand: cream, primary, secondary, accent |
| `postcss.config.mjs` | Config PostCSS | No requiere cambios |
| `tsconfig.json` | Config TypeScript | No requiere cambios |
| `eslint.config.mjs` | Config ESLint | No requiere cambios |
| `.env` | Variables de entorno | TODAS las variables (DB, AWS, MercadoPago, email) |
| `env.example` | Template de variables de entorno | Actualizar con nuevas variables |
| `.gitignore` | Archivos ignorados por Git | No requiere cambios |
| `DOCUMENTACION_PROYECTO_COTIZACION.md` | Doc del proyecto original | Eliminar o reescribir |
| `ESTRATEGIA_NOTIFICACIONES_ADMIN.md` | Estrategia de notificaciones | Eliminar o reescribir |
| `debug-fetch.js` | Script debug | Eliminar |
| `debug-products.js` | Script debug | Eliminar |

---

## 3. PAGINAS PUBLICAS (FRONTEND)

### Home Page
| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/layout.tsx` | - | Layout raiz (HTML, providers, Header/Footer) |
| `src/app/page.tsx` | `/` | Pagina principal / Landing |
| `src/app/globals.css` | - | Estilos globales CSS |
| `src/app/favicon.ico` | - | Favicon del sitio |

---

## 4. PAGINAS DE AUTENTICACION

| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/login/page.tsx` | `/login` | Inicio de sesion |
| `src/app/registro/page.tsx` | `/registro` | Registro de nuevo usuario |
| `src/app/verificar/page.tsx` | `/verificar` | Verificacion de email (codigo Cognito) |
| `src/app/recuperar-password/page.tsx` | `/recuperar-password` | Recuperacion de contrasenya |

---

## 5. PAGINAS DE CUENTA DE USUARIO

| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/cuenta/layout.tsx` | `/cuenta/*` | Layout de cuenta (sidebar + contenido) |
| `src/app/cuenta/page.tsx` | `/cuenta` | Dashboard de cuenta / Resumen |
| `src/app/cuenta/perfil/page.tsx` | `/cuenta/perfil` | Editar perfil del usuario |
| `src/app/cuenta/pedidos/page.tsx` | `/cuenta/pedidos` | Historial de pedidos |
| `src/app/cuenta/pedidos/[id]/page.tsx` | `/cuenta/pedidos/:id` | Detalle de un pedido |
| `src/app/cuenta/direcciones/page.tsx` | `/cuenta/direcciones` | Lista de direcciones guardadas |
| `src/app/cuenta/direcciones/nueva/page.tsx` | `/cuenta/direcciones/nueva` | Agregar nueva direccion |
| `src/app/cuenta/direcciones/editar/[id]/page.tsx` | `/cuenta/direcciones/editar/:id` | Editar direccion existente |
| `src/app/facturacion/page.tsx` | `/facturacion` | Solicitar factura (datos fiscales) |

---

## 6. PAGINAS DE TIENDA Y CHECKOUT

| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/tienda/page.tsx` | `/tienda` | Catalogo de productos (filtros, busqueda) |
| `src/app/tienda/[slug]/page.tsx` | `/tienda/:slug` | Pagina de detalle de producto |
| `src/app/carrito/page.tsx` | `/carrito` | Carrito de compras |
| `src/app/checkout/page.tsx` | `/checkout` | Proceso de pago |
| `src/app/checkout/success/[orderId]/page.tsx` | `/checkout/success/:orderId` | Confirmacion de pago exitoso |
| `src/app/checkout/failure/[orderId]/page.tsx` | `/checkout/failure/:orderId` | Pago fallido |
| `src/app/checkout/pending/[orderId]/page.tsx` | `/checkout/pending/:orderId` | Pago pendiente |

---

## 7. PANEL DE ADMINISTRACION

### Layout y Dashboard
| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/admin/layout.tsx` | `/admin/*` | Layout admin (sidebar, proteccion de ruta) |
| `src/app/admin/page.tsx` | `/admin` | Dashboard principal (estadisticas, graficas) |

### Gestion de Pedidos
| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/admin/pedidos/page.tsx` | `/admin/pedidos` | Lista de todos los pedidos |
| `src/app/admin/pedidos/[id]/page.tsx` | `/admin/pedidos/:id` | Detalle de pedido (cambiar estado, tracking) |

### Gestion de Productos
| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/admin/productos/page.tsx` | `/admin/productos` | Lista de productos |
| `src/app/admin/productos/nuevo/page.tsx` | `/admin/productos/nuevo` | Crear nuevo producto |
| `src/app/admin/productos/editar/[id]/page.tsx` | `/admin/productos/editar/:id` | Editar producto existente |

### Gestion de Clientes
| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/admin/clientes/page.tsx` | `/admin/clientes` | Lista de clientes registrados |

### Gestion de Blog
| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/admin/blog/page.tsx` | `/admin/blog` | Lista de posts del blog |
| `src/app/admin/blog/new/page.tsx` | `/admin/blog/new` | Crear nuevo post |
| `src/app/admin/blog/[id]/edit/page.tsx` | `/admin/blog/:id/edit` | Editar post existente |
| `src/app/admin/blog/PostForm.tsx` | - | Componente formulario de post |
| `src/app/admin/blog/DeleteButton.tsx` | - | Componente boton eliminar post |

### Gestion de Cupones
| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/admin/cupones/page.tsx` | `/admin/cupones` | Lista de cupones |
| `src/app/admin/cupones/nuevo/page.tsx` | `/admin/cupones/nuevo` | Crear nuevo cupon |

### Gestion de Facturas
| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/admin/facturas/page.tsx` | `/admin/facturas` | Lista de solicitudes de factura |

### Gestion de Marketing / Banners
| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/admin/marketing/banners/page.tsx` | `/admin/marketing/banners` | Lista de banners |
| `src/app/admin/marketing/banners/nuevo/page.tsx` | `/admin/marketing/banners/nuevo` | Crear nuevo banner |
| `src/app/admin/marketing/banners/editar/[id]/page.tsx` | `/admin/marketing/banners/editar/:id` | Editar banner |

### Configuracion
| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/admin/configuracion/page.tsx` | `/admin/configuracion` | Ajustes de la tienda (emails notificacion) |

---

## 8. PAGINAS INFORMATIVAS / CONTENIDO

| Archivo | Ruta URL | Descripcion | Contenido especifico |
|---------|----------|-------------|----------------------|
| `src/app/sobre-nosotros/page.tsx` | `/sobre-nosotros` | Pagina "Sobre Nosotros" | Historia de la marca YUTNUU |
| `src/app/metodologia/page.tsx` | `/metodologia` | Metodologia | Proceso cientifico de las cremas |
| `src/app/ciencia/page.tsx` | `/ciencia` | Ciencia detras de los productos | Respaldo cientifico |
| `src/app/rutinas/page.tsx` | `/rutinas` | Rutinas de cuidado de piel | Rutinas AM/PM |
| `src/app/ingredientes/page.tsx` | `/ingredientes` | Listado de ingredientes | Base de datos de ingredientes |
| `src/app/ingredientes/[slug]/page.tsx` | `/ingredientes/:slug` | Detalle de ingrediente | Info cientifica del ingrediente |
| `src/app/referencias/page.tsx` | `/referencias` | Referencias cientificas | Papers y estudios |
| `src/app/quiz/page.tsx` | `/quiz` | Quiz de tipo de piel | Cuestionario interactivo |
| `src/app/blog/page.tsx` | `/blog` | Listado de articulos | Blog de skincare |
| `src/app/blog/[slug]/page.tsx` | `/blog/:slug` | Articulo individual | Post completo |

---

## 9. PAGINAS DE SOPORTE

| Archivo | Ruta URL | Descripcion |
|---------|----------|-------------|
| `src/app/contacto/page.tsx` | `/contacto` | Pagina de contacto |
| `src/app/contacto/ContactForm.tsx` | - | Componente formulario de contacto |
| `src/app/faq/page.tsx` | `/faq` | Preguntas frecuentes |
| `src/app/ayuda/page.tsx` | `/ayuda` | Centro de ayuda |
| `src/app/envios/page.tsx` | `/envios` | Informacion de envios |
| `src/app/devoluciones/page.tsx` | `/devoluciones` | Politica de devoluciones |
| `src/app/politica-privacidad/page.tsx` | `/politica-privacidad` | Aviso de privacidad |
| `src/app/rastreo/page.tsx` | `/rastreo` | Rastreo de pedidos |

---

## 10. API ROUTES (BACKEND)

| Archivo | Endpoint | Metodo | Descripcion |
|---------|----------|--------|-------------|
| `src/app/api/products/route.ts` | `/api/products` | GET | Obtener lista de productos |
| `src/app/api/newsletter/subscribe/route.ts` | `/api/newsletter/subscribe` | POST | Suscripcion a newsletter |
| `src/app/api/webhooks/mercadopago/route.ts` | `/api/webhooks/mercadopago` | POST | Webhook de MercadoPago (notifica estado de pagos) |

---

## 11. SERVER ACTIONS

### Acciones Generales (Usuario)
| Archivo | Funcionalidad |
|---------|---------------|
| `src/app/actions/auth-actions.ts` | Login, registro, verificacion, logout, recuperar password |
| `src/app/actions/address-actions.ts` | CRUD de direcciones del usuario |
| `src/app/actions/createOrder.ts` | Crear orden de compra + preferencia MercadoPago |
| `src/app/actions/order-actions.ts` | Consultar pedidos del usuario, rastreo |
| `src/app/actions/billing.ts` | Solicitar factura, datos fiscales |
| `src/app/actions/product-search.ts` | Busqueda de productos |
| `src/app/actions/upload-actions.ts` | Subida de archivos a S3 |

### Acciones de Admin
| Archivo | Funcionalidad |
|---------|---------------|
| `src/app/actions/admin/admin-actions.ts` | Dashboard stats, operaciones generales admin |
| `src/app/actions/admin/product-actions.ts` | CRUD productos (crear, editar, eliminar) |
| `src/app/actions/admin/customer-actions.ts` | Lista y gestion de clientes |
| `src/app/actions/admin/customer-history.ts` | Historial de compras por cliente |
| `src/app/actions/admin/admin-order-details.ts` | Detalle de orden (admin view) |
| `src/app/actions/admin/admin-tracking.ts` | Asignar numero de rastreo, cambiar estado envio |
| `src/app/actions/admin/billing-actions.ts` | Gestion de solicitudes de factura |
| `src/app/actions/admin/coupon-actions.ts` | CRUD cupones de descuento |
| `src/app/actions/admin/banner-actions.ts` | CRUD banners de marketing |
| `src/app/actions/admin/settings-actions.ts` | Configuracion de tienda (emails notificacion) |
| `src/app/actions/admin/test-email-actions.ts` | Envio de emails de prueba |

---

## 12. COMPONENTES (src/components)

### Layout
| Archivo | Descripcion |
|---------|-------------|
| `src/components/layout/Shell.tsx` | Wrapper principal (Header + contenido + Footer) |

### Home
| Archivo | Descripcion |
|---------|-------------|
| `src/components/home/HeroCarousel.tsx` | Carrusel hero de la pagina principal (banners) |

### Producto
| Archivo | Descripcion |
|---------|-------------|
| `src/components/product/ProductInfo.tsx` | Info del producto (nombre, precio, descripcion, CTA) |
| `src/components/product/ProductGallery.tsx` | Galeria de imagenes del producto |
| `src/components/product/ScienceSection.tsx` | Seccion cientifica del producto (mecanismo, resultados) |
| `src/components/product/IngredientsList.tsx` | Lista de ingredientes del producto |

### Carrito
| Archivo | Descripcion |
|---------|-------------|
| `src/components/cart/CartDrawer.tsx` | Drawer lateral del carrito (sidebar) |
| `src/components/cart/CartItem.tsx` | Item individual dentro del carrito |

### Cuenta
| Archivo | Descripcion |
|---------|-------------|
| `src/components/account/AccountSidebar.tsx` | Sidebar de navegacion de cuenta |
| `src/components/account/AddressForm.tsx` | Formulario para crear/editar direcciones |

---

## 13. COMPONENTES LEGACY (components/)

> **NOTA:** Estos estan fuera de `src/`. Evaluar mover a `src/components/` o unificar.

### Layout
| Archivo | Descripcion |
|---------|-------------|
| `components/layout/Header.tsx` | Header principal del sitio (navbar, logo, menu) |
| `components/layout/Footer.tsx` | Footer del sitio (links, newsletter, copyright) |
| `components/layout/SearchOverlay.tsx` | Overlay de busqueda de productos |

### Shop
| Archivo | Descripcion |
|---------|-------------|
| `components/shop/ProductCard.tsx` | Tarjeta de producto (grid de tienda) |
| `components/shop/FilterSidebar.tsx` | Barra lateral de filtros (categoria, precio, etc.) |
| `components/shop/SortDropdown.tsx` | Dropdown de ordenamiento de productos |

### UI (Componentes Reutilizables)
| Archivo | Descripcion |
|---------|-------------|
| `components/ui/Badge.tsx` | Badge/etiqueta (nuevo, bestseller, descuento) |
| `components/ui/Breadcrumbs.tsx` | Migas de pan para navegacion |
| `components/ui/Button.tsx` | Boton reutilizable con variantes |
| `components/ui/Card.tsx` | Tarjeta generica |
| `components/ui/Input.tsx` | Campo de entrada reutilizable |
| `components/ui/Modal.tsx` | Modal/dialogo generico |

---

## 14. LIBRERIAS Y UTILIDADES (src/lib)

| Archivo | Descripcion |
|---------|-------------|
| `src/lib/payment/mercadopago.ts` | Configuracion e instancia de MercadoPago SDK |
| `src/lib/cart/CartContext.tsx` | Context de React para estado del carrito (add, remove, clear) |
| `src/lib/blog/actions.ts` | Funciones para obtener posts del blog (getAll, getBySlug) |
| `src/lib/ingredients/actions.ts` | Funciones para obtener ingredientes |
| `src/lib/email/email-service.ts` | Servicio de email (templates, envio) |

---

## 15. LIBRERIAS RAIZ (lib/)

> **NOTA:** Estas estan fuera de `src/`. Son dependencias core del sistema.

| Archivo | Descripcion |
|---------|-------------|
| `lib/auth/cognito.ts` | Configuracion AWS Cognito (signUp, signIn, verify, forgotPassword) |
| `lib/auth/middleware.ts` | Middleware de autenticacion (verificar token, obtener usuario) |
| `lib/auth/auth-context.tsx` | React Context para autenticacion (user state, login/logout) |
| `lib/db/prisma.ts` | Singleton del cliente Prisma (conexion a BD) |
| `lib/email/mailer.ts` | Configuracion de Nodemailer (SMTP transport) |
| `lib/storage/s3.ts` | Configuracion AWS S3 (upload, getSignedUrl, delete) |

---

## 16. TYPES (TIPOS TYPESCRIPT)

| Archivo | Descripcion |
|---------|-------------|
| `types/index.ts` | Definiciones de tipos compartidos (Product, Order, User, Cart, etc.) |

---

## 17. BASE DE DATOS (PRISMA)

### Schema (`prisma/schema.prisma`)

| Modelo | Tabla | Descripcion | Campos clave |
|--------|-------|-------------|--------------|
| `User` | `users` | Usuarios registrados | email, cognitoId, role, skinType, skinConcerns |
| `Product` | `products` | Productos del catalogo | slug, name, price, stock, images, benefits, howToUse |
| `Category` | `categories` | Categorias de productos | slug, name, sortOrder |
| `ProductCategory` | `product_categories` | Relacion Producto-Categoria (N:M) | productId, categoryId |
| `Ingredient` | `ingredients` | Ingredientes activos | slug, name, benefits, precautions |
| `ProductIngredient` | `product_ingredients` | Relacion Producto-Ingrediente (N:M) | concentration, isKeyIngredient |
| `Reference` | `references` | Referencias cientificas | title, url, authors, year |
| `IngredientReference` | `ingredient_references` | Relacion Ingrediente-Referencia (N:M) | ingredientId, referenceId |
| `Address` | `addresses` | Direcciones de envio | address1, city, state, postalCode, country (default "MX") |
| `Order` | `orders` | Ordenes de compra | orderNumber, status, paymentStatus, total, trackingNumber |
| `OrderItem` | `order_items` | Items de cada orden | productId, name, sku, price, quantity |
| `Review` | `reviews` | Resenyas de productos | rating (1-5), comment, isVerified |
| `Routine` | `routines` | Rutinas de skincare | skinType, concerns, timeframe |
| `RoutineProduct` | `routine_products` | Productos en rutinas | step, timeOfDay, instructions |
| `Bundle` | `bundles` | Paquetes de productos | price, compareAtPrice |
| `BundleProduct` | `bundle_products` | Productos en paquetes | quantity |
| `QuizResult` | `quiz_results` | Resultados del quiz | skinType, concerns, recommendedProducts |
| `Coupon` | `coupons` | Cupones de descuento | code, discountType, discountValue, usageLimit |
| `BlogPost` | `blog_posts` | Articulos del blog | slug, title, content, tags, isPublished |
| `NewsletterSubscriber` | `newsletter_subscribers` | Suscriptores newsletter | email, isActive |
| `Banner` | `banners` | Banners de marketing | title, imageUrl, position, ctaLink |
| `InvoiceRequest` | `invoice_requests` | Solicitudes de factura | rfc, razonSocial, regimenFiscal, usoCfdi |
| `StoreSettings` | `store_settings` | Configuracion de tienda | orderNotificationEmails, invoiceNotificationEmails |

### Enums
| Enum | Valores |
|------|---------|
| `UserRole` | CUSTOMER, ADMIN, EDITOR |
| `OrderStatus` | PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED |
| `PaymentStatus` | PENDING, COMPLETED, FAILED, REFUNDED |
| `InvoiceStatus` | PENDING, GENERATED, FAILED |

### Seeds
| Archivo | Descripcion |
|---------|-------------|
| `prisma/seed.ts` | Seed inicial de datos (usuarios, categorias, productos) |
| `prisma/seed-orders.ts` | Seed de ordenes de ejemplo |

---

## 18. SCRIPTS DE UTILIDAD

| Archivo | Descripcion | Accion |
|---------|-------------|--------|
| `scripts/check-products.js` | Valida productos en la BD | Eliminar o adaptar |
| `scripts/list-categories.js` | Lista categorias existentes | Eliminar o adaptar |
| `scripts/seed-blog.js` | Inserta posts de blog de ejemplo | Reescribir con nuevo contenido |
| `scripts/seed-yutnuu.js` | Inserta productos YUTNUU | Reescribir con nuevos productos |
| `scripts/test-email.js` | Prueba envio de emails | Mantener, actualizar config |

---

## 19. ASSETS PUBLICOS

| Archivo | Descripcion | Accion |
|---------|-------------|--------|
| `public/favicon.ico` | Via `src/app/favicon.ico` | Reemplazar |
| `public/images/banner-tuna.png` | Banner de tuna/YUTNUU | Reemplazar |
| `public/images/tuna.png` | Imagen de tuna | Reemplazar |
| `public/file.svg` | SVG generico Next.js | Eliminar |
| `public/globe.svg` | SVG generico Next.js | Eliminar |
| `public/next.svg` | Logo Next.js | Eliminar |
| `public/vercel.svg` | Logo Vercel | Eliminar |
| `public/window.svg` | SVG generico Next.js | Eliminar |

---

## 20. DEPENDENCIAS DEL PROYECTO

### Produccion
| Paquete | Version | Uso |
|---------|---------|-----|
| `next` | 16.1.1 | Framework principal |
| `react` / `react-dom` | 19.2.3 | UI Framework |
| `@prisma/client` | 5.22.0 | ORM para PostgreSQL |
| `@prisma/adapter-pg` | 7.2.0 | Adaptador PostgreSQL |
| `pg` | 8.16.3 | Driver PostgreSQL |
| `@aws-sdk/client-cognito-identity-provider` | 3.958.0 | Autenticacion AWS Cognito |
| `@aws-sdk/client-s3` | 3.958.0 | Storage AWS S3 |
| `@aws-sdk/s3-request-presigner` | 3.958.0 | URLs firmadas S3 |
| `mercadopago` | 2.11.0 | Procesamiento de pagos |
| `nodemailer` | 7.0.12 | Envio de emails SMTP |
| `resend` | 6.9.3 | Servicio de email alternativo |
| `zod` | 4.2.1 | Validacion de schemas |
| `bcryptjs` | 3.0.3 | Hash de passwords |
| `lucide-react` | 0.562.0 | Iconos |
| `recharts` | 3.6.0 | Graficas (admin dashboard) |
| `react-markdown` | 10.1.0 | Renderizar Markdown (blog) |
| `@tailwindcss/typography` | 0.5.19 | Tipografia para contenido |

### Desarrollo
| Paquete | Version | Uso |
|---------|---------|-----|
| `typescript` | 5.x | Tipado estatico |
| `tailwindcss` | 4.x | Framework CSS |
| `@tailwindcss/postcss` | 4.x | Plugin PostCSS |
| `eslint` | 9.x | Linter |
| `eslint-config-next` | 16.1.1 | Config ESLint para Next.js |
| `prisma` | 5.22.0 | CLI de Prisma |
| `dotenv` | 17.2.3 | Variables de entorno |

---

## 21. RESUMEN DE CAMBIOS NECESARIOS

### Para convertir en plantilla reutilizable:

#### Identidad de Marca (PRIORIDAD ALTA)
- [ ] `src/app/layout.tsx` — Nombre del sitio, metadata, fonts
- [ ] `tailwind.config.ts` — Paleta de colores (cream, primary, secondary, accent)
- [ ] `src/app/globals.css` — Variables CSS custom
- [ ] `components/layout/Header.tsx` — Logo, nombre, navegacion
- [ ] `components/layout/Footer.tsx` — Info de marca, links, copyright
- [ ] `public/favicon.ico` — Favicon
- [ ] `public/images/*` — Todas las imagenes

#### Contenido Especifico de Dermocosmetics (REESCRIBIR)
- [ ] `src/app/page.tsx` — Home page completa
- [ ] `src/app/sobre-nosotros/page.tsx` — Historia de marca
- [ ] `src/app/metodologia/page.tsx` — Contenido de metodologia
- [ ] `src/app/ciencia/page.tsx` — Contenido cientifico
- [ ] `src/app/rutinas/page.tsx` — Rutinas (especifico skincare)
- [ ] `src/app/ingredientes/*` — Todo el sistema de ingredientes
- [ ] `src/app/referencias/page.tsx` — Referencias cientificas
- [ ] `src/app/quiz/page.tsx` — Quiz de piel (especifico skincare)
- [ ] `src/app/faq/page.tsx` — Preguntas frecuentes
- [ ] `src/app/envios/page.tsx` — Politica de envios
- [ ] `src/app/devoluciones/page.tsx` — Politica de devoluciones
- [ ] `src/app/politica-privacidad/page.tsx` — Aviso de privacidad

#### Base de Datos (ADAPTAR)
- [ ] `prisma/schema.prisma` — Campos especificos (skinType, skinConcerns, etc.)
- [ ] `prisma/seed.ts` — Datos de seed
- [ ] `scripts/seed-yutnuu.js` — Productos de ejemplo
- [ ] `scripts/seed-blog.js` — Posts de ejemplo

#### Configuracion (ACTUALIZAR)
- [ ] `.env` — Todas las credenciales y URLs
- [ ] `package.json` — Nombre del proyecto

#### Paginas Especificas que PUEDEN NO NECESITARSE
- Ingredientes (`/ingredientes`) — Solo si vendes productos con ingredientes
- Rutinas (`/rutinas`) — Solo para skincare/salud
- Quiz (`/quiz`) — Solo si necesitas recomendaciones
- Ciencia (`/ciencia`) — Solo para productos cientificos
- Referencias (`/referencias`) — Solo para respaldo academico
- Facturacion (`/facturacion`) — Solo para Mexico (RFC, CFDI)

#### Funcionalidad que SE MANTIENE (es generica)
- Sistema de autenticacion completo
- CRUD de productos
- Carrito de compras
- Checkout con MercadoPago
- Gestion de pedidos (usuario y admin)
- Sistema de direcciones
- Panel de administracion completo
- Blog / CMS
- Newsletter
- Cupones de descuento
- Banners de marketing
- Rastreo de pedidos
- Sistema de emails

---

## CONTEO TOTAL DE ARCHIVOS

| Categoria | Cantidad |
|-----------|----------|
| Paginas (`page.tsx`) | **51** |
| Layouts (`layout.tsx`) | **3** |
| API Routes (`route.ts`) | **3** |
| Server Actions (`.ts`) | **18** |
| Componentes src/ (`.tsx`) | **10** |
| Componentes legacy/ (`.tsx`) | **12** |
| Componentes inline en paginas | **3** |
| Librerias src/lib/ | **5** |
| Librerias lib/ | **6** |
| Types | **1** |
| Prisma (schema + seeds) | **3** |
| Scripts | **5** |
| Assets publicos | **7** |
| Config raiz | **~13** |
| **TOTAL ARCHIVOS DEL PROYECTO** | **~140** |
