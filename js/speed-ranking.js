// ============================================
// RANKING DE VELOCIDAD - CORREGIDO
// ============================================

function updateSpeedRanking() {
    if (!window.trafficData || !window.trafficData.length) return;
    
    const sorted = [...window.trafficData].sort((a, b) => b.velocidad - a.velocidad);
    const medals = ['🥇', '🥈', '🥉'];
    
    const container = document.getElementById('speedRankingList');
    if (!container) return;
    
    let html = '<div class="row">';
    sorted.forEach((zone, idx) => {
        let medal = idx < 3 ? medals[idx] : `${idx + 1}°`;
        let badgeClass = '';
        let status = '';
        
        if (zone.velocidad >= 45) {
            badgeClass = 'bg-success';
            status = '🚀 Rápido';
        } else if (zone.velocidad >= 30) {
            badgeClass = 'bg-info';
            status = '🚗 Normal';
        } else {
            badgeClass = 'bg-warning';
            status = '🐌 Lento';
        }
        
        html += `
            <div class="col-md-6 mb-2">
                <div class="dashboard-card" style="background: #1e1b4b; border: 1px solid #6366f1; padding: 12px; border-radius: 12px;">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span style="font-size: 1.2rem;">${medal}</span>
                            <strong style="color: #ffffff; font-size: 14px; margin-left: 5px;">${zone.name}</strong>
                        </div>
                        <span class="badge ${badgeClass}" style="font-size: 13px; padding: 4px 12px;">${zone.velocidad} km/h</span>
                    </div>
                    <div class="mt-2">
                        <small style="color: #cbd5e1;">${status}</small>
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
    if (typeof updateSpeedRanking === 'function') updateSpeedRanking();
}, 3000);
