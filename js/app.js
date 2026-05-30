let updateInterval, weatherInterval;

async function init() {
    console.log("🚀 Iniciando MedMovil OS...");
    
    // Verificar autenticación
    if(window.auth && window.auth.checkSession) {
        const session = window.auth.checkSession();
        if(!session) { 
            window.location.href = 'pages/login.html'; 
            return; 
        }
        const userNameSpan = document.getElementById('userName');
        if(userNameSpan) userNameSpan.innerText = session.name.split(' ')[0];
    }
    
    // Inicializar componentes
    if(typeof initMap === 'function') initMap();
    if(typeof initAdvancedStats === 'function') initAdvancedStats();
    if(typeof initRouteSelectors === 'function') setTimeout(initRouteSelectors, 500);
    
    // Cargar datos
    await getWeather();
    generateTrafficData();
    
    // Actualizar todo
    updateAll(); if(typeof updateAdvancedStats === "function") updateAdvancedStats();
    if(typeof updateHeatmap === 'function') updateHeatmap();
    if(typeof updateAdvancedStats === 'function') updateAdvancedStats();
    if(typeof updateTopZones === 'function') updateTopZones();
    if(typeof updateSpeedRanking === 'function') updateSpeedRanking();
    if(typeof checkAndSendAlerts === 'function') checkAndSendAlerts();
    
    // Iniciar actualizaciones
    startAutoUpdates();
    setupEvents();
    
    console.log("✅ MedMovil OS funcionando");
}

function startAutoUpdates() {
    if(updateInterval) clearInterval(updateInterval);
    if(weatherInterval) clearInterval(weatherInterval);
    
    updateInterval = setInterval(() => {
        generateTrafficData();
        updateAll(); if(typeof updateAdvancedStats === "function") updateAdvancedStats();
        if(typeof updateHeatmap === 'function') updateHeatmap();
        if(typeof updateAdvancedStats === 'function') updateAdvancedStats();
        if(typeof updateTopZones === 'function') updateTopZones();
        if(typeof updateSpeedRanking === 'function') updateSpeedRanking();
        if(typeof checkAndSendAlerts === 'function') checkAndSendAlerts();
    }, 3000);
    
    weatherInterval = setInterval(async () => {
        await getWeather();
        updateWeather();
        generateTrafficData();
        updateAll(); if(typeof updateAdvancedStats === "function") updateAdvancedStats();
        if(typeof updateHeatmap === 'function') updateHeatmap();
    }, 20000);
}

function setupEvents() {
    // Cerrar sesión
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            Swal.fire({
                title: '¿Cerrar sesión?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#6366f1',
                cancelButtonColor: '#ef4444'
            }).then((result) => {
                if(result.isConfirmed) {
                    if(window.auth?.logout) window.auth.logout();
                    window.location.href = 'pages/login.html';
                }
            });
        });
    }
    
    // Rutas
    const calculateBtn = document.getElementById('calculateRouteBtn');
    if(calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            if(typeof calculateRoute === 'function') calculateRoute();
        });
    }
    
    // Exportar CSV
    const exportBtn = document.getElementById('exportExcelBtn');
    if(exportBtn) {
        exportBtn.addEventListener('click', () => {
            if(typeof exportToExcel === 'function') exportToExcel();
        });
    }
    
    // Reporte
    const reportBtn = document.getElementById('reportBtn');
    if(reportBtn) {
        reportBtn.addEventListener('click', () => {
            if(typeof generatePDFReport === 'function') generatePDFReport();
        });
    }
    
    // Historial
    const historyBtn = document.getElementById('historyBtn');
    if(historyBtn) {
        historyBtn.addEventListener('click', () => {
            if(typeof showHistoryModal === 'function') showHistoryModal();
        });
    }
    
    // Alertas
    const alertHistoryBtn = document.getElementById('alertHistoryBtn');
    if(alertHistoryBtn) {
        alertHistoryBtn.addEventListener('click', () => {
            if(typeof showAlertHistory === 'function') showAlertHistory();
        });
    }
    
    // Ajustar mapa
    const fitBoundsBtn = document.getElementById('fitBoundsBtn');
    if(fitBoundsBtn) {
        fitBoundsBtn.addEventListener('click', () => {
            if(map) map.fitBounds([[6.21, -75.62], [6.27, -75.54]]);
        });
    }
}

document.addEventListener('DOMContentLoaded', init);

