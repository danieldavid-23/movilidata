const CONFIG = {
    ZONES: [
        { id: 1, name: "Centro", lat: 6.2442, lng: -75.5812, baseCongestion: 85 },
        { id: 2, name: "Belén", lat: 6.2200, lng: -75.6100, baseCongestion: 65 },
        { id: 3, name: "Laureles", lat: 6.2300, lng: -75.5900, baseCongestion: 55 },
        { id: 4, name: "Poblado", lat: 6.2100, lng: -75.5800, baseCongestion: 70 },
        { id: 5, name: "Robledo", lat: 6.2600, lng: -75.6000, baseCongestion: 45 },
        { id: 6, name: "San Javier", lat: 6.2500, lng: -75.6200, baseCongestion: 40 },
        { id: 7, name: "Buenos Aires", lat: 6.2350, lng: -75.5650, baseCongestion: 50 },
        { id: 8, name: "Castilla", lat: 6.2700, lng: -75.5700, baseCongestion: 48 },
        { id: 9, name: "Manrique", lat: 6.2650, lng: -75.5550, baseCongestion: 52 },
        { id: 10, name: "Santa Cruz", lat: 6.2750, lng: -75.5400, baseCongestion: 44 }
    ],
    API: { WEATHER: "https://api.open-meteo.com/v1/forecast?latitude=6.2442&longitude=-75.5812&current=temperature_2m,relative_humidity_2m,rain" },
    UPDATE_INTERVAL: 3000,
    WEATHER_UPDATE_INTERVAL: 20000
};
