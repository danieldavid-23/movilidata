# MedMovil OS - Kit de Branding

Guía rápida para personalizar el branding del producto según cada cliente.

## Instalación

Agregar en el `<head>` del HTML:
```html
<link rel="stylesheet" href="css/branding.css">
<script src="js/branding.js"></script>
```

## Configuración Inicial

En `js/branding.js`, modificar la propiedad `primaryColor` y `secondaryColor` según el cliente:

```javascript
const BRANDING_CONFIG = {
    clientVariants: {
        // Agregar nueva variante
        nombre_cliente: {
            name: "Nombre del Producto",
            slogan: "Slogan personalizado",
            primaryColor: "#XXXXXX", // Color principal
            secondaryColor: "#XXXXXX" // Color secundario
        }
    }
};
```

## Aplicar Branding

```javascript
// Al iniciar la aplicación
BrandingManager.applyBranding("nombre_cliente");

// Ejemplo:
BrandingManager.applyBranding("medellin"); // Usa config default
BrandingManager.applyBranding("cliente_azul"); // Variante azul
```

## Personalización de Elementos

### Navbar
```html
<nav class="navbar client-header">
    <a class="navbar-brand client-logo">
        <i class="fas fa-traffic-light"></i>
        <span>MedMovil OS</span>
    </a>
    <span class="client-slogan">Movilidad Inteligente</span>
</nav>
```

### Botones Principales
```html
<button class="btn client-btn-primary">Acción Principal</button>
<button class="btn client-btn-action">Acción Secundaria</button>
```

### Badge de Estado
```html
<span class="badge client-badge">Estado</span>
```

### Cards
```html
<div class="card client-card">
    <div class="card-header client-card-header">
        <i class="fas fa-chart-line"></i> Título
    </div>
    <div class="card-body">
        Contenido
    </div>
</div>
```

## Paletas Predefinidas

| Variante | Uso Recomendado | Primary | Secondary |
|----------|-----------------|---------|-----------|
| default | General/Urbano | #6366f1 (índigo) | #8b5cf6 (violeta) |
| cliente_azul | Ciudades costeras | #3b82f6 (azul) | #0ea5e9 (celeste) |
| cliente_verde | Ciudades sostenibles | #10b981 (verde) | #14b8a6 (turquesa) |
| cliente_rojo | Seguridad/fuerza | #ef4444 (rojo) | #f97316 (naranja) |
| cliente_violeta | Zonas tecnológicas | #8b5cf6 (violeta) | #a855f7 (púrpura) |

## Footer

```html
<footer class="footer client-footer">
    <div class="container text-center">
        <p>© 2026 [NOMBRE_CLIENTE] - <span class="client-slogan">[SLOGAN]</span></p>
    </div>
</footer>
```

## Login Page Branding

Para personalizar la página de login:

```css
/* En branding.css */
.client-login-card {
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid var(--client-border-color);
}
```

## Cambios sin Modificar Código

Para cambiar el branding sin tocar JS:

1. Editar variables en `:root` del archivo `css/branding.css`
2. Recargar la página para aplicar cambios

---

*Desarrollado para MedMovil OS - Adaptable a cualquier cliente municipal*