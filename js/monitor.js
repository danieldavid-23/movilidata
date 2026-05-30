// MONITOR DE DATOS
setInterval(() => {
    if (window.trafficData && window.trafficData.length) {
        const avg = window.trafficData.reduce((s, z) => s + z.congestion, 0) / window.trafficData.length;
        console.log("📊 [MONITOR] Datos reales - Promedio:", Math.round(avg), "% - Zonas:", window.trafficData.length);
    } else {
        console.log("⚠️ [MONITOR] window.trafficData vacío o no existe");
    }
}, 2000);
