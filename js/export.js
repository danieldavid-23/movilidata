// ============================================
// EXPORTAR - CSV Y TXT FUNCIONALES
// ============================================

function exportToExcel() {
    if (!window.trafficData || !window.trafficData.length) {
        Swal.fire('Error', 'No hay datos para exportar', 'error');
        return;
    }
    
    const stats = getGlobalStats();
    const now = new Date();
    
    // Crear CSV
    let csv = "Zona,Congestión (%),Accidentes,Velocidad (km/h),Riesgo,Actualización\n";
    window.trafficData.forEach(z => {
        csv += `${z.name},${z.congestion},${z.accidents},${z.velocidad},${z.rainRisk},${z.timestamp}\n`;
    });
    
    // Agregar resumen al final
    csv += `\nRESUMEN GENERAL\n`;
    csv += `Congestión Promedio,${stats.avgCongestion}%\n`;
    csv += `Total Accidentes,${stats.totalAccidents}\n`;
    csv += `Velocidad Promedio,${stats.avgSpeed} km/h\n`;
    csv += `Zonas con Riesgo,${stats.highRiskZones}\n`;
    
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `medmovil_datos_${now.toISOString().slice(0, 19).replace(/:/g, '-')}.csv`;
    link.click();
    
    Swal.fire('✅ Exportado', 'Archivo CSV descargado', 'success');
}

function generatePDFReport() {
    if (!window.trafficData || !window.trafficData.length) {
        Swal.fire('Error', 'No hay datos para generar reporte', 'error');
        return;
    }
    
    const stats = getGlobalStats();
    const now = new Date();
    
    let reporte = "=" . repeat(50) + "\n";
    reporte += "        MEDMOVIL OS - REPORTE DE MOVILIDAD\n";
    reporte += "=" . repeat(50) + "\n\n";
    reporte += `Fecha: ${now.toLocaleDateString()}\n`;
    reporte += `Hora: ${now.toLocaleTimeString()}\n\n`;
    reporte += "📈 RESUMEN GENERAL\n";
    reporte += "-".repeat(30) + "\n";
    reporte += `Congestión Promedio: ${stats.avgCongestion}%\n`;
    reporte += `Total Accidentes: ${stats.totalAccidents}\n`;
    reporte += `Velocidad Promedio: ${stats.avgSpeed} km/h\n`;
    reporte += `Zonas con Riesgo: ${stats.highRiskZones}\n\n`;
    reporte += "📍 DETALLE POR ZONA\n";
    reporte += "-".repeat(30) + "\n";
    
    window.trafficData.forEach(z => {
        reporte += `${z.name}: ${z.congestion}% congestión, ${z.accidents} accidentes, ${z.velocidad} km/h, Riesgo: ${z.rainRisk}\n`;
    });
    
    reporte += "\n" + "=".repeat(50) + "\n";
    reporte += "Reporte generado por MedMovil OS\n";
    reporte += "Plataforma Inteligente de Movilidad\n";
    
    const blob = new Blob([reporte], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `medmovil_reporte_${now.toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
    link.click();
    
    Swal.fire('✅ Reporte', 'Archivo TXT descargado', 'success');
}
