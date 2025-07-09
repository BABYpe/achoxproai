// This is a mock service that simulates fetching real-time market data.
// In a real application, you would replace this with actual API calls to a data provider.

interface MarketPrices {
    materials: Record<string, number>;
    labor: number;
    currency: string;
}

const priceData: Record<string, MarketPrices> = {
    "riyadh": {
        materials: {
            "concrete": 450, // per cubic meter
            "steel_rebar": 3200, // per ton
            "bricks": 0.8, // per brick
            "plaster": 25, // per square meter
            "paint": 30, // per square meter
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
        },
        labor: 58,
        currency: "SAR",
    }
};

export function getMarketPrices(location: string): MarketPrices {
    const locationKey = location.toLowerCase().split(',')[0].trim();
    return priceData[locationKey] || priceData["default"];
}
