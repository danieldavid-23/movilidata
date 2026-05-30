// ============================================
// SISTEMA DE ALERTAS - POSICIÓN INFERIOR DERECHA
// ============================================

let alertHistory = [];
let lastAlertTime = null;

function checkAndSendAlerts() {
    const stats = getGlobalStats();
    if (!stats || !window.trafficData || !window.trafficData.length) {
        return;
    }
    
    const now = new Date();
    if (lastAlertTime && (now - lastAlertTime) < 15000) return;
    
    let newAlert = null;
    
    // Alerta por congestión
    if (stats.avgCongestion > 75) {
        newAlert = { 
            type: 'danger', 
            title: '🚨 CONGESTIÓN CRÍTICA', 
            message: `${stats.avgCongestion}% en toda la ciudad`,
            action: 'Evite desplazamientos no esenciales',
            time: now
        };
    } else if (stats.avgCongestion > 60) {
        newAlert = { 
            type: 'warning', 
            title: '⚠️ TRÁFICO INTENSO', 
            message: `${stats.avgCongestion}% - Precaución`,
            action: 'Considere rutas alternas',
            time: now
        };
    }
    
    // Alerta por accidentes
    const highAccidentZones = window.trafficData.filter(z => z.accidents > 2);
    if (highAccidentZones.length > 0 && !newAlert) {
        newAlert = {
            type: 'warning',
            title: '💥 ACCIDENTES REPORTADOS',
            message: `${highAccidentZones.map(z => z.name).join(', ')}`,
            action: 'Maneje con precaución',
            time: now
        };
    }
    
    // Alerta por lluvia
    if (window.currentWeather && window.currentWeather.rain > 5 && !newAlert) {
        newAlert = {
            type: 'info',
            title: '🌧️ LLUVIAS INTENSAS',
            message: `${window.currentWeather.rain} mm de precipitación`,
            action: 'Reduzca velocidad y aumente distancia',
            time: now
        };
    }
    
    if (newAlert) {
        alertHistory.unshift(newAlert);
        lastAlertTime = now;
        showAlertNotification(newAlert);
        if (alertHistory.length > 10) alertHistory.pop();
        console.log("🔔 Alerta enviada:", newAlert.title);
    }
}

function showAlertNotification(alert) {
    const colors = { danger: '#ef4444', warning: '#f59e0b', info: '#3b82f6' };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        width: 320px;
        background: #0f172a;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        cursor: pointer;
        animation: slideInRight 0.3s ease;
        overflow: hidden;
    `;
    
    notification.innerHTML = `
        <div style="background: ${colors[alert.type]}; padding: 10px 12px; color: white; font-weight: bold;">
            <i class="fas ${alert.type === 'danger' ? 'fa-exclamation-triangle' : alert.type === 'warning' ? 'fa-shield-alt' : 'fa-cloud-rain'}"></i> ${alert.title}
        </div>
        <div style="padding: 12px;">
            <p style="margin: 0 0 8px 0; color: #cbd5e1; font-size: 13px;">${alert.message}</p>
            <p style="margin: 0; color: #a78bfa; font-size: 11px;"><i class="fas fa-lightbulb"></i> ${alert.action}</p>
        </div>
        <button onclick="this.parentElement.remove()" style="position: absolute; top: 8px; right: 8px; background: none; border: none; color: white; cursor: pointer;">×</button>
    `;
    
    notification.onclick = (e) => {
        if (e.target.tagName !== 'BUTTON') {
            notification.remove();
            showAlertDetail(alert);
        }
    };
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 8000);
}

function showAlertDetail(alert) {
    const colors = { danger: '#ef4444', warning: '#f59e0b', info: '#3b82f6' };
    Swal.fire({
        title: alert.title,
        html: `
            <div style="text-align: left;">
                <div style="background: ${colors[alert.type]}20; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                    <p style="margin: 0; font-size: 14px;">${alert.message}</p>
                </div>
                <p><i class="fas fa-lightbulb" style="color: #f59e0b;"></i> <strong>Recomendación:</strong> ${alert.action}</p>
                <small class="text-muted">${new Date(alert.time).toLocaleString()}</small>
            </div>
        `,
        icon: alert.type === 'danger' ? 'error' : alert.type === 'warning' ? 'warning' : 'info',
        background: '#0f172a',
        color: '#fff',
        confirmButtonColor: colors[alert.type],
        confirmButtonText: 'Entendido'
    });
}

function showAlertHistory() {
    if (alertHistory.length === 0) {
        Swal.fire('Alertas', 'No hay alertas registradas', 'info');
        return;
    }
    
    let html = '<div style="max-height: 400px; overflow-y: auto;">';
    alertHistory.forEach(alert => {
        const color = alert.type === 'danger' ? '#ef4444' : alert.type === 'warning' ? '#f59e0b' : '#3b82f6';
        html += `
            <div style="border-left: 4px solid ${color}; padding: 12px; margin-bottom: 10px; background: #1e1b4b; border-radius: 8px;">
                <strong style="color: white;">${alert.title}</strong>
                <p style="margin: 5px 0; font-size: 12px; color: #cbd5e1;">${alert.message}</p>
                <small style="color: #64748b;">${new Date(alert.time).toLocaleTimeString()}</small>
            </div>
        `;
    });
    html += '</div>';
    
    Swal.fire({
        title: '📋 Historial de Alertas',
        html: html,
        background: '#0f172a',
        color: '#fff',
        width: '500px',
        confirmButtonColor: '#6366f1'
    });
}

// Estilos para animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(style);
