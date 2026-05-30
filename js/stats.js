// ============================================
// ESTADÍSTICAS - ACCEDIENDO A DATOS GLOBALES
// ============================================

let hourlyChart = null;
let comparisonChart = null;
let statsReady = false;

function initAdvancedStats() {
    if (statsReady) return;
    
    if (hourlyChart) { hourlyChart.destroy(); hourlyChart = null; }
    if (comparisonChart) { comparisonChart.destroy(); comparisonChart = null; }
    
    const hourlyCtx = document.getElementById('hourlyChart')?.getContext('2d');
    if (hourlyCtx) {
        hourlyChart = new Chart(hourlyCtx, {
            type: 'bar',
            data: {
                labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'],
                datasets: [{ label: 'Congestión (%)', data: [0, 0, 0, 0, 0, 0], backgroundColor: '#6366f1', borderRadius: 8 }]
            },
            options: { responsive: true, scales: { y: { min: 0, max: 100 } } }
        });
    }
    
    const radarCtx = document.getElementById('comparisonChart')?.getContext('2d');
    if (radarCtx) {
        comparisonChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Centro', 'Belén', 'Laureles', 'Poblado', 'Robledo', 'San Javier', 'Buenos Aires', 'Castilla', 'Manrique', 'Santa Cruz'],
                datasets: [{ label: 'Congestión', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], backgroundColor: 'rgba(99,102,241,0.2)', borderColor: '#6366f1', borderWidth: 2 }]
            },
                options: { 
        responsive: true, 
        maintainAspectRatio: true,
        plugins: {
            legend: { 
                labels: { color: '#cbd5e1', font: { size: 11, weight: 'bold' } }
            },
            tooltip: { backgroundColor: '#0f172a', titleColor: '#fff', bodyColor: '#cbd5e1' }
        },
        scales: {
            r: {
                ticks: { color: '#94a3b8', backdropColor: 'transparent', stepSize: 20 },
                grid: { color: 'rgba(203, 213, 225, 0.15)' },
                angleLines: { color: 'rgba(203, 213, 225, 0.15)' },
                pointLabels: { color: '#a78bfa', font: { size: 10, weight: 'bold' } }
            }
        }
    }
        });
    }
    
    statsReady = true;
    console.log("✅ Gráficos inicializados");
}

function updateAdvancedStats() {
    if (!statsReady) return;
    
    // Acceder directamente a la variable global
    const datos = window.trafficData;
    
    if (!datos || !datos.length) {
        console.log("⏳ Esperando datos reales...", window.trafficData);
        return;
    }
    
    const total = datos.reduce((sum, zone) => sum + (zone.congestion || 0), 0);
    const avgCongestion = Math.round(total / datos.length);
    console.log("📊 DATOS REALES - Promedio:", avgCongestion, "de", datos.length, "zonas");
    
    if (hourlyChart) {
        const hour = new Date().getHours();
        let data = [35, 75, 55, 65, 80, 45];
        if (hour >= 6 && hour < 9) data[0] = avgCongestion;
        else if (hour >= 9 && hour < 12) data[1] = avgCongestion;
        else if (hour >= 12 && hour < 15) data[2] = avgCongestion;
        else if (hour >= 15 && hour < 18) data[3] = avgCongestion;
        else if (hour >= 18 && hour < 21) data[4] = avgCongestion;
        else data[5] = avgCongestion;
        
        hourlyChart.data.datasets[0].data = data;
        hourlyChart.update();
    }
    
    if (comparisonChart) {
        const zones = ['Centro', 'Belén', 'Laureles', 'Poblado', 'Robledo', 'San Javier', 'Buenos Aires', 'Castilla', 'Manrique', 'Santa Cruz'];
        const radarData = zones.map(name => {
            const zone = datos.find(z => z.name === name);
            return zone ? zone.congestion : 50;
        });
        comparisonChart.data.datasets[0].data = radarData;
        comparisonChart.update();
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initAdvancedStats, 1000);
});

// Actualizar cada 2 segundos
setInterval(() => {
    if (window.trafficData && window.trafficData.length) {
        updateAdvancedStats();
    }
}, 2000);

