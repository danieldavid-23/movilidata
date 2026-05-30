let predictionChart = null;

function updateDashboard() {
    const stats = getGlobalStats();
    if(!stats) return;
    document.getElementById('dashboardCards').innerHTML = `
        <div class="col-md-3"><div class="dashboard-card"><i class="fas fa-car"></i><h2>${stats.avgCongestion}%</h2><p>Congestión</p><small>${stats.avgCongestion>70?'Crítica':stats.avgCongestion>50?'Alta':'Normal'}</small></div></div>
        <div class="col-md-3"><div class="dashboard-card"><i class="fas fa-car-crash"></i><h2>${stats.totalAccidents}</h2><p>Accidentes</p><small>Última hora</small></div></div>
        <div class="col-md-3"><div class="dashboard-card"><i class="fas fa-tachometer-alt"></i><h2>${stats.avgSpeed} km/h</h2><p>Velocidad</p><small>${stats.avgSpeed<30?'Lento':'Normal'}</small></div></div>
        <div class="col-md-3"><div class="dashboard-card"><i class="fas fa-cloud-rain"></i><h2>${stats.highRiskZones}</h2><p>Riesgo</p><small>Precaución</small></div></div>
    `;
}

function updateTable() {
    if(!trafficData.length) return;
    document.getElementById('zonesTableBody').innerHTML = trafficData.map(i => `
        <tr>
            <td><strong>${i.name}</strong></td>
            <td><div class="progress"><div class="progress-bar bg-${i.congestion>70?'danger':i.congestion>50?'warning':'success'}" style="width:${i.congestion}%">${i.congestion}%</div></div></td>
            <td><span class="badge bg-${i.accidents>0?'danger':'secondary'}">${i.accidents}</span></td>
            <td><span class="badge bg-info">${i.velocidad} km/h</span></td>
            <td><span class="badge bg-${i.rainRisk==='Alto'?'danger':i.rainRisk==='Medio'?'warning':'success'}">${i.rainRisk}</span></td>
            <td><small>${i.timestamp}</small></td>
        </tr>
    `).join('');
}

function updateWeather() {
    if(!currentWeather) return;
    const risk = currentWeather.rain>5?"Alto":currentWeather.rain>1?"Medio":"Bajo";
    document.getElementById('weatherCard').innerHTML = `
        <div class="row text-center">
            <div class="col-4"><i class="fas ${currentWeather.icon} fa-2x"></i><div>${currentWeather.temperature}°C</div><small>${currentWeather.condition}</small></div>
            <div class="col-4"><i class="fas fa-tint fa-2x"></i><div>${currentWeather.humidity}%</div><small>Humedad</small></div>
            <div class="col-4"><i class="fas fa-cloud-rain fa-2x"></i><div>${currentWeather.rain} mm</div><small>Lluvia</small></div>
        </div>
        <div class="text-center mt-2"><span class="badge bg-${risk==='Alto'?'danger':risk==='Medio'?'warning':'success'}">Riesgo: ${risk}</span><div class="text-muted mt-1"><small>${currentWeather.source}</small></div></div>
    `;
}

function updatePredictionChart() {
    const ctx = document.getElementById('predictionChart')?.getContext('2d');
    if(!ctx) return;
    const avg = trafficData.reduce((s,i)=>s+i.congestion,0)/trafficData.length;
    const labels=[], data=[];
    for(let i=0;i<=4;i++){ let h=(new Date().getHours()+i)%24; labels.push(`${h}:00`); let p=avg; if(h>=7&&h<=9) p+=15; if(h>=17&&h<=19) p+=20; data.push(Math.min(100,Math.max(0,Math.round(p)))); }
    if(predictionChart) predictionChart.destroy();
    predictionChart = new Chart(ctx, { type:'line', data:{ labels, datasets:[{ label:'Congestión (%)', data, borderColor:'#6366f1', fill:true, tension:0.4 }] }, options:{ responsive:true, scales:{ y:{ min:0, max:100 } } } });
}

function updateRecommendations() {
    const stats = getGlobalStats();
    if(!stats) return;
    let rec = stats.avgCongestion>70 ? "🔴 Alta congestión. Evite desplazamientos" : stats.avgCongestion>50 ? "🟡 Congestión moderada" : "✅ Flujo normal";
    if(currentWeather?.rain>5) rec += " | 🌧️ Lluvias intensas";
    document.getElementById('recommendations').innerHTML = `<div class="alert alert-info">${rec}</div>`;
}

function updateTimestamp() { document.getElementById('lastUpdateTime').innerText = new Date().toLocaleString(); }

function updateAll() { updateDashboard(); updateTable(); updateWeather(); updatePredictionChart(); updateRecommendations(); updateTimestamp(); }


