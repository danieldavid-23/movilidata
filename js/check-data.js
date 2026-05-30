// Verificar datos reales cada 5 segundos
setInterval(() => {
    if (window.trafficData && window.trafficData.length) {
        const avg = window.trafficData.reduce((s, z) => s + z.congestion, 0) / window.trafficData.length;
        console.log("📊 DATOS REALES EN TIEMPO REAL - Promedio:", Math.round(avg), "%");
    }
}, 5000);
