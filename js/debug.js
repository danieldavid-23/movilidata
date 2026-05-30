// DIAGNÓSTICO COMPLETO
console.log("=== INICIO DIAGNÓSTICO ===");
console.log("1. Verificando window.trafficData:", window.trafficData);
console.log("2. Verificando CONFIG.ZONES:", CONFIG?.ZONES?.length);

// Monitorear cambios en trafficData
let lastLength = 0;
setInterval(() => {
    if (window.trafficData && window.trafficData.length !== lastLength) {
        lastLength = window.trafficData.length;
        console.log(`📊 trafficData actualizado: ${lastLength} zonas`);
        if (lastLength > 0) {
            console.log("Primera zona:", window.trafficData[0]);
        }
    }
}, 1000);
