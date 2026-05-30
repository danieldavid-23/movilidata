// ============================================
// TOP 5 ZONAS CONGESTIONADAS - CORREGIDO
// ============================================

function updateTopZones() {
    if (!window.trafficData || !window.trafficData.length) return;
    
    const sorted = [...window.trafficData].sort((a, b) => b.congestion - a.congestion);
    const top5 = sorted.slice(0, 5);
    const medals = ['🥇', '🥈', '🥉', '4°', '5°'];
    const colors = ['#ef4444', '#f59e0b', '#f59e0b', '#3b82f6', '#3b82f6'];
    
    const container = document.getElementById('topZonesList');
    if (!container) return;
    
    let html = '<div class="row">';
    top5.forEach((zone, idx) => {
        html += `
            <div class="col-md-6 mb-2">
                <div class="dashboard-card" style="background: #1e1b4b; border: 1px solid #6366f1; padding: 12px; border-radius: 12px;">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span style="font-size: 1.3rem;">${medals[idx]}</span>
                            <strong style="color: #ffffff; font-size: 14px; margin-left: 5px;">${zone.name}</strong>
                        </div>
                        <span class="badge" style="background: ${colors[idx]}; color: white; font-size: 13px; padding: 4px 12px;">${zone.congestion}%</span>
                    </div>
                    <div class="progress mt-2" style="height: 6px; background: #0f172a;">
                        <div class="progress-bar" style="width: ${zone.congestion}%; background: ${colors[idx]};"></div>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                        <small style="color: #cbd5e1;"><i class="fas fa-car-crash"></i> ${zone.accidents} acc</small>
                        <small style="color: #cbd5e1;"><i class="fas fa-tachometer-alt"></i> ${zone.velocidad} km/h</small>
                        <small style="color: #cbd5e1;"><i class="fas fa-cloud-rain"></i> ${zone.rainRisk}</small>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Actualizar cada 3 segundos
setInterval(() => {
    if (typeof updateTopZones === 'function') updateTopZones();
}, 3000);
