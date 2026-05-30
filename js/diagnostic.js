// ============================================
// DIAGNÓSTICO - Ver datos en consola
// ============================================
setTimeout(() => {
    console.log("=== DIAGNÓSTICO MEDMOVIL ===");
    console.log("trafficData:", window.trafficData);
    console.log("CONFIG.ZONES:", CONFIG.ZONES);
    console.log("getGlobalStats:", getGlobalStats());
}, 3000);
