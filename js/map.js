// ============================================
// MAPA CON PUNTOS VISIBLES Y HEATMAP
// ============================================

let map;
let heatLayer;
let markers = [];

function initMap() {
    map = L.map('map').setView([6.2442, -75.5812], 12);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap & CARTO',
        subdomains: 'abcd'
    }).addTo(map);
    
    L.control.scale({ metric: true, imperial: false, position: 'bottomleft' }).addTo(map);
    
    console.log("✅ Mapa iniciado");
}

function updateHeatmap() {
    if (!map || !trafficData || !trafficData.length) return;
    
    if (heatLayer) map.removeLayer(heatLayer);
    
    const heatData = trafficData.map(item => [item.lat, item.lng, item.congestion / 100]);
    
    heatLayer = L.heatLayer(heatData, {
        radius: 40,
        blur: 25,
        maxZoom: 15,
        minOpacity: 0.4,
        gradient: {
            0.2: '#10b981',
            0.4: '#3b82f6',
            0.6: '#f59e0b',
            0.8: '#ef4444',
            1.0: '#991b1b'
        }
    });
    
    heatLayer.addTo(map);
    console.log("✅ Heatmap actualizado");
}

function updateZoneMarkers() {
    if (!map || !trafficData || !trafficData.length) return;
    
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    
    trafficData.forEach(zone => {
        let color;
        if (zone.congestion >= 80) color = '#ef4444';
        else if (zone.congestion >= 60) color = '#f59e0b';
        else if (zone.congestion >= 40) color = '#3b82f6';
        else color = '#10b981';
        
        let radius = 14 + (zone.congestion / 12);
        
        const circle = L.circleMarker([zone.lat, zone.lng], {
            radius: radius,
            fillColor: color,
            color: '#ffffff',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        }).addTo(map);
        
        circle.bindPopup(`
            <div style="min-width: 220px; font-family: 'Segoe UI', sans-serif;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <div style="width: 35px; height: 35px; background: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-location-dot" style="color: white; font-size: 16px;"></i>
                    </div>
                    <div>
                        <h5 style="margin: 0; color: #1f2937;">${zone.name}</h5>
                        <small style="color: #6b7280;">Medellín</small>
                    </div>
                </div>
                <hr style="margin: 5px 0;">
                <p style="margin: 5px 0;"><strong>🚦 Congestión:</strong> <span style="color: ${color};">${zone.congestion}%</span></p>
                <p style="margin: 5px 0;"><strong>💥 Accidentes:</strong> ${zone.accidents}</p>
                <p style="margin: 5px 0;"><strong>⚡ Velocidad:</strong> ${zone.velocidad} km/h</p>
                <p style="margin: 5px 0;"><strong>🌧️ Riesgo:</strong> ${zone.rainRisk}</p>
                <div class="progress mt-2" style="height: 6px;"><div class="progress-bar" style="width: ${zone.congestion}%; background: ${color};"></div></div>
                <small class="text-muted mt-2 d-block"><i class="fas fa-clock"></i> ${zone.timestamp}</small>
            </div>
        `);
        
        markers.push(circle);
    });
    
    console.log("✅ Marcadores actualizados:", markers.length);
}

function refreshMap() { if (map) map.invalidateSize(); }
function fitMapBounds() { if (map && trafficData.length) { const bounds = L.latLngBounds(trafficData.map(z => [z.lat, z.lng])); map.fitBounds(bounds); } }

// Forzar actualización de marcadores cada vez que se actualizan datos
if (typeof setInterval !== 'undefined') {
    setInterval(() => { if (typeof updateZoneMarkers === 'function') updateZoneMarkers(); }, 3000);
}
