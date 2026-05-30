# MedMovil OS - Sistema de Movilidad Inteligente

Plataforma web para monitoreo y gestión del tráfico en tiempo real, desarrollada para Medellín, Colombia.

## 🚀 Características

- **Dashboard en tiempo real** con métricas de congestión, accidentes, velocidad y riesgo
- **Mapa de calor** interactivo con Leaflet.js
- **Clima en tiempo real** mediante API Open-Meteo
- **Predicción de congestión** por hora del día
- **Sistema de alertas automáticas** con notificaciones visuales
- **Ranking de velocidad** y top 5 zonas congestionadas
- **Buscador de rutas** con cálculo de distancia y tiempo estimado
- **Exportación de datos** a CSV y generación de reportes TXT

## 📁 Estructura del Proyecto

```
MedMovil_Definitivo/
├── index.html           # Página principal
├── css/
│   └── styles.css       # Estilos
├── js/
│   ├── app.js           # Inicialización
│   ├── config.js        # Configuración zonas
│   ├── api.js           # API clima y datos
│   ├── auth/
│   │   └── auth.js      # Autenticación
│   ├── ui.js            # Interfaz usuario
│   ├── map.js           # Mapa Leaflet
│   ├── stats.js         # Gráficos Chart.js
│   ├── alerts.js        # Sistema alertas
│   ├── routes.js        # Cálculo rutas
│   ├── history.js       # Historial tráfico
│   ├── top.js           # Top 5 congestionadas
│   ├── speed-ranking.js # Ranking velocidad
│   ├── export.js        # Exportar CSV
│   └── ...              # Otros módulos
└── pages/
    └── login.html       # Login
```

## 🔧 Tecnologías

Bootstrap 5.3, Leaflet 1.9.4, Chart.js, SweetAlert2

## 👤 Credenciales

- Admin: admin@medmovil.com / admin123
- Usuario: demo@medmovil.com / demo123

## 🏁 Zonas

Centro, Belén, Laureles, Poblado, Robledo, San Javier, Buenos Aires, Castilla, Manrique, Santa Cruz
