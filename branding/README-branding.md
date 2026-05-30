# MedMovil OS - Branding para Clientes

## Paleta de Colores Principal

| Uso | Color | Hex | RGB |
|-----|-------|-----|-----|
| Fondo Principal | Azul Oscuro | `#0f172a` | rgb(15, 31, 42) |
| Fondo Secundario | Violeta Oscuro | `#1e1b4b` | rgb(30, 27, 75) |
| Color Accento | Índigo | `#6366f1` | rgb(99, 102, 241) |
| Éxito | Verde | `#10b981` | rgb(16, 185, 139) |
| Alerta | Rojo | `#ef4444` | rgb(239, 68, 68) |
| Advertencia | Ámbar | `#f59e0b` | rgb(245, 158, 11) |
| Info | Azul | `#3b82f6` | rgb(59, 130, 246) |

### Variables CSS
```css
--brand-primary: #6366f1;
--brand-primary-dark: #4f46e5;
--brand-success: #10b981;
--brand-warning: #f59e0b;
--brand-danger: #ef4444;
--brand-info: #3b82f6;
--brand-bg-dark: #0f172a;
--brand-bg-card: #1e1b4b;
```

## Tipografografía

- **Font Principal**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Font Monospace**: Consolas, 'Courier New', monospace (para datos técnicos)

### Jerografía
| Elemento | Tamaño | Peso | Color |
|----------|--------|------|-------|
| Logo/Brand | 1.3rem | Bold | White |
| Títulos | 2rem | Bold | White |
| Subtítulos | 1rem | 600 | #a78bfa |
| Texto | 0.85rem | 400 | White |
| Texto secundario | 0.7rem | 400 | #94a3b8 |

## Iconografía

**Primary Icon**: `fas fa-traffic-light` (color: #6366f1)

Iconos por módulo:
- Dashboard: `fas fa-chart-line`
- Mapa: `fas fa-map`
- Clima: `fas fa-cloud-sun`
- Ranking: `fas fa-tachometer-alt`
- Top Zonas: `fas fa-trophy`
- Alertas: `fas fa-bell`
- Historial: `fas fa-history`
- Rutas: `fas fa-route`
- Recomendaciones: `fas fa-lightbulb`

## Logo del Cliente

### Concepto Principal
**MedMovil OS** - "Movilidad Inteligente"

**Slogan**: "Tu ciudad, en tiempo real"

### Variaciones de Logo

1. **Logo Principal**: Semáforo + Texto
2. **Logo Compacto**: Solo semáforo (para favicon)
3. **Logo Horizontal**: Icono + Texto "MedMovil OS"
4. **Logo Vertical**: Icono encima + Texto abajo

### Uso del Logo

```html
<!-- Header -->
<a class="navbar-brand" href="#">
    <i class="fas fa-traffic-light"></i> MedMovil OS
</a>

<!-- Footer -->
<p>© 2026 MedMovil OS - Movilidad Inteligente</p>
```

## Estilo UI Components

### Botones
```css
.btn-action {
    background: rgba(99, 102, 241, 0.2);
    color: white;
    border-radius: 40px;
    border: none;
    transition: all 0.3s;
}

.btn-login {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

.btn-danger-brand {
    background: linear-gradient(135deg, #ef4444, #dc2626);
}
```

### Tarjetas
```css
.card-brand {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(99, 102, 241, 0.2);
}
```

## Identidad del Cliente

### Sector
- Movilidad urbana / Smart Cities
- Gobierno / Municipal
- Tecnología IoT

### Público Objetivo
- Autoridades municipales
- Departamento de tránsito
- Ciudadanos que consultan tráfico
- Empresas de logística

### Valores
- Innovación tecnológica
- Seguridad vial
- Eficiencia urbana
- Sostenibilidad
- Transparencia en datos

## Adaptaciones por Cliente

Para personalizar el branding según el cliente:

| Cliente | Color primario | Slogan |
|---------|--------------|--------|
| Municipio 1 | #6366f1 (índigo) | "Movilidad Inteligente" |
| Municipio 2 | #3b82f6 (azul) | "Tráfico Controlado" |
| Municipio 3 | #8b5cf6 (violeta) | "Circula Seguro" |

## Favicon
```
favicon.ico: Semáforo (font-awesome) en color #6366f1
```

## Meta Tags Recomendados
```html
<meta name="description" content="Plataforma de movilidad inteligente con monitoreo de tráfico en tiempo real">
<meta name="theme-color" content="#6366f1">
```

---

*Branding creado para MedMovil OS - Adaptable a cualquier cliente municipal*