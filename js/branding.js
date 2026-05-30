/**
 * MEDMOVIL OS - Branding Configuración por Cliente
 * Personaliza el branding según el cliente municipales
 */

const BRANDING_CONFIG = {
    default: {
        name: "MedMovil OS",
        slogan: "Movilidad Inteligente",
        description: "Plataforma de monitoreo y gestión del tráfico en tiempo real",
        icon: "fas fa-traffic-light",
        primaryColor: "#6366f1",
        secondaryColor: "#8b5cf6",
        gradientStart: "#6366f1",
        gradientEnd: "#8b5cf6"
    },
    
    clientVariants: {
        medellin: {
            name: "MedMovil OS",
            slogan: "Movilidad Inteligente",
            primaryColor: "#6366f1",
            secondaryColor: "#8b5cf6"
        },
        
        cliente_azul: {
            name: "SmartTraffic",
            slogan: "Tu tráfico, nuestro compromiso",
            primaryColor: "#3b82f6",
            secondaryColor: "#0ea5e9"
        },
        
        cliente_verde: {
            name: "EcoMove",
            slogan: "Movilidad Sostenible",
            primaryColor: "#10b981",
            secondaryColor: "#14b8a6"
        },
        
        cliente_rojo: {
            name: "TrafficControl",
            slogan: "Seguridad Vial",
            primaryColor: "#ef4444",
            secondaryColor: "#f97316"
        },
        
        cliente_violeta: {
            name: "MoveSmart",
            slogan: "Ciudades Inteligentes",
            primaryColor: "#8b5cf6",
            secondaryColor: "#a855f7"
        }
    }
};

const BrandingManager = {
    currentClient: "default",
    
    applyBranding(clientKey) {
        const config = BRANDING_CONFIG.clientVariants[clientKey] || BRANDING_CONFIG.default;
        this.currentClient = clientKey;
        
        // Actualizar variables CSS
        document.documentElement.style.setProperty("--client-primary", config.primaryColor);
        document.documentElement.style.setProperty("--client-secondary", config.secondaryColor);
        
        // Actualizar elementos del DOM
        this.updateLogo(config.name, config.icon);
        this.updateSlogan(config.slogan);
        this.updateFavicon(config.primaryColor);
    },
    
    updateLogo(name, icon) {
        const logoElement = document.querySelector(".navbar-brand");
        if (logoElement) {
            const iconElement = logoElement.querySelector("i");
            if (iconElement) iconElement.className = icon;
            logoElement.querySelector("span")?.remove();
            logoElement.insertAdjacentHTML("beforeend", `<span class="ms-2">${name}</span>`);
        }
    },
    
    updateSlogan(slogan) {
        const sloganElement = document.querySelector(".client-slogan");
        if (sloganElement) sloganElement.textContent = slogan;
    },
    
    updateFavicon(color) {
        let favicon = document.querySelector("link[rel='icon']");
        if (!favicon) {
            favicon = document.createElement("link");
            favicon.rel = "icon";
            document.head.appendChild(favicon);
        }
        favicon.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".8em" font-size="90">${encodeURIComponent('🚦')}</text></svg>`;
    },
    
    getCurrentConfig() {
        return BRANDING_CONFIG.clientVariants[this.currentClient] || BRANDING_CONFIG.default;
    }
};

// Exportar para uso global
window.BrandingManager = BrandingManager;