// ============================================
// API - DATOS EN TIEMPO REAL
// ============================================

let currentWeather = null;
let trafficData = [];

// Hacer global
window.trafficData = trafficData;
window.currentWeather = currentWeather;

async function getWeather() {
    try {
        const res = await fetch(CONFIG.API.WEATHER);
        const data = await res.json();
        if(data.current) {
            currentWeather = {
                temperature: Math.round(data.current.temperature_2m),
                humidity: data.current.relative_humidity_2m,
                rain: data.current.rain || 0,
                condition: data.current.rain>0?"Lluvia":"Despejado",
                icon: data.current.rain>0?"fa-cloud-rain":"fa-sun",
                source:"Open-Meteo"
            };
            window.currentWeather = currentWeather;
        }
    } catch(e) {
        currentWeather = { temperature:24, humidity:65, rain:0, condition:"Despejado", icon:"fa-sun", source:"Simulado" };
        window.currentWeather = currentWeather;
    }
    return currentWeather;
}

function generateTrafficData() {
    const now = new Date();
    const hour = now.getHours();
    const isRush = (hour>=7&&hour<=9)||(hour>=17&&hour<=19);
    
    trafficData = CONFIG.ZONES.map(z => {
        let c = z.baseCongestion + (isRush?Math.random()*15+10:0) + (Math.random()*10-5);
        c = Math.min(100, Math.max(0, Math.round(c)));
        let a = c>80?Math.floor(Math.random()*4)+1: c>60?Math.floor(Math.random()*2):0;
        let r = currentWeather?.rain>5?"Alto": currentWeather?.rain>1?"Medio":"Bajo";
        let v = Math.max(10, Math.min(60, Math.round(60-(c*0.5))));
        return { name:z.name, lat:z.lat, lng:z.lng, congestion:c, accidents:a, rainRisk:r, velocidad:v, timestamp:now.toLocaleTimeString() };
    });
    
    // Actualizar variable global
    window.trafficData = trafficData;
    
    return trafficData;
}

function getGlobalStats() {
    if(!trafficData.length) return null;
    return {
        avgCongestion: Math.round(trafficData.reduce((s,i)=>s+i.congestion,0)/trafficData.length),
        totalAccidents: trafficData.reduce((s,i)=>s+i.accidents,0),
        highRiskZones: trafficData.filter(i=>i.rainRisk==="Alto").length,
        avgSpeed: Math.round(trafficData.reduce((s,i)=>s+i.velocidad,0)/trafficData.length)
    };
}
