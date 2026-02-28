# Estrategia de Notificaciones Internas (Administrador)

Este documento define el plan estratégico y técnico para implementar un sistema de notificaciones por correo electrónico dirigido al administrador. El objetivo es recibir un correo de aviso en la cuenta personal cada vez que ocurra una acción importante en la tienda (creación de un pedido, solicitud de facturación, etc.) para incentivar la revisión del panel de administración.

## 1. Configuración de Variables de Entorno
Para evitar codificar (hardcode) correos electrónicos directamente en el código fuente, se creará una variable de entorno dedicada a recibir notificaciones internas.

- **Variable:** `ADMIN_EMAIL` (o `NOTIFICATIONS_EMAIL`)
- **Archivos a modificar:** `.env`, `.env.example`.
- **Acción:** Asignar tu correo personal (por ejemplo, `mi.correo@gmail.com`) a esta variable tanto en el entorno local (archivo `.env`) como en el entorno de producción (Vercel u otro proveedor de hosting).

## 2. Desarrollo de Nuevas Plantillas de Correo (Nodemailer)
En el archivo actual de servicio de correos (`src/lib/email/email-service.ts`), existen funciones que ya mandan notificaciones a los clientes. Se crearán funciones homólogas destinadas al administrador. 

### a) Notificación de Nuevo Pedido
Se agregará la función `sendAdminOrderNotificationEmail(order, user, adminEmail)`:
- **Asunto:** `[NUEVO PEDIDO] Pedido #${order.orderNumber} - $${total}`
- **Contenido:**
  - Detalles breves del cliente (Nombre y Correo).
  - Resumen del pedido (Productos, cantidades y total).
  - Un enlace directo (botón) (ej. `<a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/pedidos/${order.id}">Ver pedido en admin</a>`) para acceder al sistema rápidamente.

### b) Notificación de Solicitud de Factura
Se agregará la función `sendAdminInvoiceNotificationEmail(request, order, adminEmail)`:
- **Asunto:** `[SOLICITUD DE FACTURA] Pedido #${order.orderNumber}`
- **Contenido:**
  - Detalles fiscales enviados (RFC, Razón Social).
  - Un enlace directo al módulo de facturación o al pedido en el panel de administrador para procesar el XML/PDF.

### c) Otras Notificaciones (Opcional a Futuro)
- Nuevos contactos (formulario de contacto, si existe).
- Advertencias de bajo stock (si se implementa control de inventario).

## 3. Integración en el Flujo Actual (Rutas y Server Actions)
Se deben invocar las nuevas funciones dentro de los procesos que capturan estas acciones.

- **Webhooks de Pago (Pedidos):** En `/src/app/api/webhooks/mercadopago/route.ts`, justo cuando el pago es aprobado y se llama a `sendOrderConfirmationEmail` al cliente, se añadirá la llamada a `sendAdminOrderNotificationEmail`.
- **Solicitud de Facturas:** En `/src/app/actions/billing.ts` o donde se maneja la solicitud, junto con la llamada a `sendInvoiceRequestNotification`, se llamará simultáneamente a `sendAdminInvoiceNotificationEmail`.

**⚡ Buena Práctica (Rendimiento):** 
Para no afectar los tiempos de respuesta del lado del cliente, es recomendable agrupar los envíos en paralelo usando `Promise.all` o `Promise.allSettled`, de este modo enviar ambos correos (cliente y admin) no tomará el doble de tiempo.
```typescript
await Promise.allSettled([
  sendOrderConfirmationEmail(order, user),
  sendAdminOrderNotificationEmail(order, user, process.env.ADMIN_EMAIL)
]);
```

## 4. Próximos Pasos (Hoja de Ruta de Desarrollo)
Cuando desees avanzar y construir esto, el orden de trabajo recomendado será:
1. Agregar el email personal en el `.env`.
2. Escribir las dos nuevas funciones de templates HTML en `src/lib/email/email-service.ts`.
3. Inyectar las llamadas a dichos metodos en el backend (`mercadopago webhook` y `billing action`).
4. Hacer una compra de prueba en entorno local o staging y verificar que llega el mail tanto a la cuenta de prueba como a tu correo personal.
