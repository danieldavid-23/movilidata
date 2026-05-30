// ============================================
// RUTAS - VERSIÓN CORREGIDA
// ============================================

let routeInitialized = false;

function initRouteSelectors() {
    if (routeInitialized) return;
    const origin = document.getElementById('originZone');
    const dest = document.getElementById('destZone');
    if (!origin || !dest) return;
    
    const zones = CONFIG.ZONES.map(z => `<option value="${z.name}">${z.name}</option>`).join('');
    origin.innerHTML = '<option value="">-- Origen --</option>' + zones;
    dest.innerHTML = '<option value="">-- Destino --</option>' + zones;
    routeInitialized = true;
    console.log("✅ Selectores de rutas inicializados con", CONFIG.ZONES.length, "zonas");
}

function calculateRoute() {
    const originValue = document.getElementById('originZone').value;
    const destValue = document.getElementById('destZone').value;
    const resultDiv = document.getElementById('routeResult');
    
    console.log("Calculando ruta:", originValue, "→", destValue);
    
    if (!originValue || !destValue) {
        Swal.fire('Error', 'Selecciona origen y destino', 'error');
        return;
    }
    
    if (originValue === destValue) {
        Swal.fire('Error', 'Origen y destino no pueden ser iguales', 'error');
        return;
    }
    
    // Buscar en trafficData o en CONFIG.ZONES si no hay datos
    let originZone = window.trafficData?.find(z => z.name === originValue);
    let destZone = window.trafficData?.find(z => z.name === destValue);
    
    if (!originZone) {
        originZone = CONFIG.ZONES.find(z => z.name === originValue);
    }
    if (!destZone) {
        destZone = CONFIG.ZONES.find(z => z.name === destValue);
    }
    
    if (!originZone || !destZone) {
        console.error("No se encontraron zonas:", originValue, destValue);
        Swal.fire('Error', 'No se encontraron datos de las zonas', 'error');
        return;
    }
    
    // Calcular distancia
    const R = 6371;
    const dLat = (destZone.lat - originZone.lat) * Math.PI / 180;
    const dLon = (destZone.lng - originZone.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(originZone.lat * Math.PI/180) * Math.cos(destZone.lat * Math.PI/180) * Math.sin(dLon/2)**2;
    const distance = (R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)))).toFixed(1);
    
    // Tiempo basado en congestión (si hay datos reales)
    const congestion = (originZone.congestion || 50 + destZone.congestion || 50) / 2;
    let speed = congestion > 70 ? 15 : congestion > 50 ? 25 : 35;
    const time = Math.round((parseFloat(distance) / speed) * 60);
    
    let warning = congestion > 70 ? '⚠️ Alta congestión' : congestion > 50 ? '⚠️ Congestión moderada' : '✅ Buen flujo';
    let tip = congestion > 70 ? '💡 Recomendación: Salir después de las 8pm' : congestion > 50 ? '💡 Considere ruta alterna' : '💡 Buen momento para viajar';
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="alert alert-info mt-3" style="background: #1e1b4b; border-left: 4px solid #6366f1;">
            <i class="fas fa-road"></i> <strong>Distancia:</strong> ${distance} km<br>
            <i class="fas fa-clock"></i> <strong>Tiempo estimado:</strong> ${time} minutos<br>
            <i class="fas fa-chart-line"></i> <strong>Condición:</strong> ${warning}<br>
            <i class="fas fa-lightbulb"></i> ${tip}
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => setTimeout(initRouteSelectors, 1000));
