# Documentación del Proyecto: Plataforma E-commerce YUTNÜÜ

## 1. Alcance del Proyecto (Scope)

El proyecto consiste en el desarrollo, implementación y despliegue de una plataforma de comercio electrónico robusta y escalable para la marca **YUTNÜÜ**. La plataforma está diseñada no solo para la venta de productos, sino también como un centro educativo y de transparencia sobre el cuidado de la piel, integrando blogs, rutinas y evidencia científica.

El sistema se construye utilizando tecnologías modernas (Next.js, TypeScript, TailwindCSS) y servicios en la nube (AWS Cognito, AWS S3, Vercel), garantizando alto rendimiento, seguridad y facilidad de mantenimiento. Incluye un panel de administración completo para la gestión de productos, órdenes, clientes, cupones y contenido.

---

## 2. Requerimientos Funcionales

### 2.1. Experiencia de Usuario (Frontend Público)
*   **Página de Inicio**: Sección "Hero" con video/banner principal, productos destacados, y navegación intuitiva.
*   **Tienda (Catálogo)**: Listado de productos con filtros básicos.
*   **Detalle de Producto (PDP)**: Información detallada, precio, respaldo científico, ingredientes, modo de uso, y botón de añadir al carrito.
*   **Carrito de Compras**: Gestión de ítems (agregar, eliminar, actualizar cantidad), cálculo de subtotales.
*   **Checkout**: Flujo de pago seguro, formulario de envío, integración con pasarelas de pago (PayPal, MercadoPago).
*   **Autenticación**: Registro, Inicio de Sesión, Verificación de Email, Recuperación de Contraseña, Login Social (opcional en roadmap).
*   **Cuenta de Usuario**:
    *   Panel de control del usuario.
    *   Historial de órdenes.
    *   Gestión de direcciones de envío.
    *   Configuración de perfil.
*   **Contenido Educativo**:
    *   **Blog**: Listado de artículos, detalle de artículo con soporte Markdown e imágenes.
    *   **Rutinas**: Sección de rutinas de cuidado de la piel.
    *   **Ciencia y Transparencia**: Bibliotecas de ingredientes y explicación científica.
*   **Quiz de Piel**: Herramienta interactiva para recomendar productos.

### 2.2. Panel de Administración (Backend)
*   **Dashboard**: Vista general de métricas (ventas, pedidos recientes).
*   **Gestión de Productos**: Crear, leer, actualizar y eliminar (CRUD) productos, incluyendo manejo de inventario, precios y carga de imágenes a AWS S3.
*   **Gestión de Pedidos**: Ver lista de pedidos, detalles, cambiar estados de envío/pago.
*   **Gestión de Clientes**: Ver lista de usuarios registrados e historial.
*   **Marketing y Contenido**:
    *   Gestión de Banners promocionales.
    *   Gestión de Artículos del Blog (CRUD con editor Markdown).
    *   Sistema de Cupones de descuento básicos.

### 2.3. Infraestructura y Servicios
*   **Base de Datos**: PostgreSQL gestionado para persistencia de datos relacional (Usuarios, Productos, Órdenes).
*   **Almacenamiento**: AWS S3 para almacenamiento seguro y escalable de imágenes (productos, blog, banners).
*   **Autenticación**: AWS Cognito para gestión segura de identidades.
*   **Notificaciones**: Envío de correos transaccionales (confirmación de orden, bienvenida).

---

## 3. Requerimientos No Funcionales

*   **Rendimiento**: Carga rápida de páginas optimizada por Next.js (SSR/SSG). Optimización automática de imágenes.
*   **Escalabilidad**: Arquitectura serverless/edge lista para escalar en Vercel y AWS.
*   **Seguridad**:
    *   Protección de rutas administrativas.
    *   Validación de datos con Zod.
    *   Manejo seguro de credenciales con variables de entorno.
*   **Responsividad**: Diseño 100% adaptativo (Mobile-First) funcionando en móviles, tablets y escritorio.
*   **SEO**: Implementación de metadatos dinámicos, sitemap y estructura semántica para motores de búsqueda.
*   **Disponibilidad**: Uptime garantizado por la infraestructura cloud (Vercel/AWS).

---

## 4. Estrategia de Pruebas de Usuario (UAT)

Las pruebas se realizarán en un entorno de **Staging** antes del despliegue final a Producción.

1.  **Pruebas de Flujo Crítico (Checkout)**:
    *   Usuario invitado vs Usuario registrado.
    *   Cálculo correcto de impuestos y envío.
    *   Procesamiento exitoso y fallido de pagos.
2.  **Pruebas de Gestión de Contenido**:
    *   Creación y edición de un producto completo con imágenes.
    *   Publicación de un artículo de blog y verificación de formato.
3.  **Pruebas de Responsividad**:
    *   Verificación visual en dispositivos iOS y Android.
    *   Prueba de menús y navegación táctil.
4.  **Pruebas de Seguridad**:
    *   Intento de acceso a /admin sin credenciales.
    *   Validación de formularios con datos erróneos.

---

## 5. Listado de Tareas de Implementación (Track Actual)

### Configuración del Proyecto
- [x] Inicializar proyecto Next.js con TypeScript y TailwindCSS.
- [x] Configurar estructura (app router, componentes, lib).
- [x] Configurar paleta de colores y variables CSS.
- [x] Configurar esquema de Base de Datos PostgreSQL (Prisma).

### Autenticación e Infraestructura
- [x] Integración con AWS Cognito.
- [x] Configuración de AWS S3 para imágenes.
- [x] Middleware y utilidades de sesión.
- [ ] Configurar SMTP para notificaciones (Pendiente).

### Base de Datos y Modelos
- [x] Diseñar esquema (Productos, Ordenes, Usuarios).
- [x] Migraciones y utilidades de conexión.

### Componentes Core
- [x] Layouts (Header, Footer, Nav).
- [x] UI Components (Botones, Inputs, Cards).
- [x] Diseño responsivo base.

### Páginas Públicas - Fase 1
- [x] Landing Page (Home) con secciones clave.
- [x] Listado de Productos (Tienda).
- [x] Detalle de Producto (PDP).
- [x] Carrito de Compras (Funcionalidad base, requiere revisión de bugs).
- [x] Flujo de Checkout completo (Mercado Pago integrado).

### Páginas Públicas - Fase 2
- [x] Página de Rutinas.
- [x] Sección de Ciencia y Transparencia.
- [ ] Librería de Ingredientes.
- [x] Blog (Listado y Detalle implementado con Markdown).
- [x] Páginas estáticas (Nosotros, Contacto).

### Cuenta de Usuario
- [x] Login/Registro.
- [x] Dashboard de Usuario.
- [x] Historial de Órdenes.
- [x] Direcciones.
- [x] Perfil.

### Admin Dashboard (MVP)
- [x] Autenticación Admin.
- [x] Dashboard Overview.
- [x] Gestión de Productos (CRUD + S3).
- [x] Gestión de Banners y Cupones.
- [x] Gestión de Blog (Markdown + S3).
- [x] Visualización de Clientes y Pedidos.

---

## 6. Cotización Estimada

_Nota: Esta cotización es una estimación basada en horas de desarrollo estándar para un perfil Senior Full-Stack._

| Fase / Módulo | Descripción | Tiempo Est. (Horas) | Costo Est. (MXN) |
| :--- | :--- | :---: | :---: |
| **1. Configuración e Infraestructura** | Setup Next.js, AWS (S3, Cognito), DB, CI/CD Vercel. | 20h | $24,000 |
| **2. Backend & Base de Datos** | Modelado de datos, Server Actions, API, Prisma. | 30h | $36,000 |
| **3. Frontend Público (Tienda)** | Home, Catálogo, PDP, Blog, Rutinas, UI/UX Kit. | 50h | $60,000 |
| **4. Funcionalidad E-commerce** | Carrito, Checkout, Integración Pagos, Cupones. | 40h | $48,000 |
| **5. Panel de Administración** | Dashboard completo, CRUDs complejos, Gestión archivos. | 35h | $42,000 |
| **6. Autenticación y Cuentas** | Flujos completos de usuario, email, seguridad. | 15h | $18,000 |
| **7. Testing y Optimización** | QA, SEO técnico, Performance, Ajustes finales. | 15h | $18,000 |
| **8. Despliegue y Documentación** | Puesta en producción, guías de usuario. | 10h | $12,000 |
| | | | |
| **TOTAL ESTIMADO** | | **215h** | **$258,000** |

*Precios referenciales basados en una tarifa promedio de $1,200 MXN/hora + IVA.*

### Condiciones Comerciales
*   **Tiempo de entrega total estimado**: 6-8 Semanas.
*   **Soporte**: 1 mes de soporte post-lanzamiento para corrección de bugs incluido.
*   **Costos de terceros**: No incluye costos de hosting (Vercel Pro), dominio o servicios de AWS (se facturan directo al cliente).
