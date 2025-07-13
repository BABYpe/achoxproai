// This is a mock service that simulates fetching real-time market data.
// In a real application, you would replace this with actual API calls to a data provider.

type Quality = 'standard' | 'premium' | 'luxury';

interface MarketPrices {
    materials: Record<string, number>;
    labor: number;
    currency: string;
}

const priceData: Record<string, Omit<MarketPrices, 'materials'> & { materials: Record<string, number | Record<Quality, number>> }> = {
    "riyadh": {
        materials: {
            "concrete": 450, // per cubic meter
            "steel_rebar": 3200, // per ton
            "bricks": 0.8, // per brick
            "plaster": 25, // per square meter
            "paint": 30, // per square meter
            "finishing_materials": { // This is now quality-dependent
                "standard": 250, // per sq meter
                "premium": 500, // per sq meter
                "luxury": 1200, // per sq meter
            }
        },
        labor: 55, // per hour
        currency: "SAR",
    },
    "jeddah": {
        materials: {
            "concrete": 470,
            "steel_rebar": 3300,
            "bricks": 0.85,
            "plaster": 28,
            "paint": 32,
             "finishing_materials": {
                "standard": 270,
                "premium": 550,
                "luxury": 1300,
            }
        },
        labor: 60,
        currency: "SAR",
    },
    "dammam": {
         materials: {
            "concrete": 440,
            "steel_rebar": 3150,
            "bricks": 0.78,
            "plaster": 24,
            "paint": 29,
            "finishing_materials": {
                "standard": 245,
                "premium": 490,
                "luxury": 1150,
            }
        },
        labor: 52,
        currency: "SAR",
    },
     "default": {
        materials: {
            "concrete": 460,
            "steel_rebar": 3250,
            "bricks": 0.82,
            "plaster": 26,
            "paint": 31,
            "finishing_materials": {
                "standard": 250,
                "premium": 500,
                "luxury": 1200,
            }
        },
        labor: 58,
        currency: "SAR",
    }
};

/**
 * Gets market prices for a given location and quality.
 * @param location The project location (e.g., "Riyadh").
 * @param quality The desired quality level.
 * @returns An object with material prices, labor costs, and currency.
 */
export function getMarketPrices(location: string, quality: Quality): MarketPrices {
    const locationKey = location.toLowerCase().split(',')[0].trim();
    const data = priceData[locationKey] || priceData["default"];

    const resolvedMaterials: Record<string, number> = {};

    for (const key in data.materials) {
        const value = data.materials[key];
        if (typeof value === 'number') {
            resolvedMaterials[key] = value;
        } else if (typeof value === 'object' && quality in value) {
            resolvedMaterials[key] = value[quality];
        }
    }

    return {
        materials: resolvedMaterials,
        labor: data.labor,
        currency: data.currency,
    };
}
