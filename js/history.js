// ============================================
// HISTORIAL - FUNCIONAL
// ============================================

function showHistoryModal() {
    if (!window.trafficData || !window.trafficData.length) {
        Swal.fire('Historial', 'No hay datos disponibles', 'info');
        return;
    }
    
    const now = new Date();
    let html = '<div style="max-height: 350px; overflow-y: auto;">';
    html += '<table style="width:100%; color:white; border-collapse: collapse;">';
    html += '<thead><tr style="background:#1e1b4b;"><th style="padding:8px;">Zona</th><th style="padding:8px;">Congestión</th><th style="padding:8px;">Accidentes</th><th style="padding:8px;">Velocidad</th><th style="padding:8px;">Hora</th></tr></thead><tbody>';
    
    window.trafficData.forEach(z => {
        let badgeColor = z.congestion > 70 ? '#ef4444' : z.congestion > 50 ? '#f59e0b' : '#10b981';
        html += `<tr style="border-bottom:1px solid #2d2f5e;">
                    <td style="padding:8px;"><strong>${z.name}</strong></td>
                    <td style="padding:8px;"><span style="background:${badgeColor}; padding:2px 8px; border-radius:20px;">${z.congestion}%</span></td>
                    <td style="padding:8px;">${z.accidents}</td>
                    <td style="padding:8px;">${z.velocidad} km/h</td>
                    <td style="padding:8px;">${z.timestamp}</td>
                 </tr>`;
    });
    
    html += '</tbody></table></div>';
    html += `<div style="margin-top:10px; text-align:center; color:#64748b;"><small>Actualizado: ${now.toLocaleTimeString()}</small></div>`;
    
    Swal.fire({
        title: '<i class="fas fa-history"></i> Historial de Tráfico',
        html: html,
        background: '#0f172a',
        color: '#fff',
        width: '700px',
        confirmButtonColor: '#6366f1'
    });
}
