'use server';

/**
 * @fileOverview A project cost estimation AI agent.
 *
 * - estimateProjectCost - A function that handles the project cost estimation process.
 * - EstimateProjectCostInput - The input type for the estimateProjectCost function.
 * - EstimateProjectCostOutput - The return type for the estimateProjectCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getMarketPrices } from '@/ai/services/market-data';

const EstimateProjectCostInputSchema = z.object({
  location: z.string().describe('The location of the project.'),
  size: z.string().describe('The size of the project (e.g., in square meters).'),
  type: z.string().describe('The type of the project (e.g., residential, commercial).'),
});
export type EstimateProjectCostInput = z.infer<typeof EstimateProjectCostInputSchema>;

const EstimateProjectCostOutputSchema = z.object({
  costRange: z.string().describe('The estimated cost range for the project in the local currency (e.g., SAR).'),
  breakdown: z.object({
    materials: z.string().describe('Estimated cost for materials.'),
    labor: z.string().describe('Estimated cost for labor.'),
    permits: z.string().describe('Estimated cost for permits and fees.'),
    other: z.string().describe('Estimated cost for other miscellaneous items.'),
  }).describe('A detailed breakdown of the estimated costs.'),
});
export type EstimateProjectCostOutput = z.infer<typeof EstimateProjectCostOutputSchema>;


export async function estimateProjectCost(input: EstimateProjectCostInput): Promise<EstimateProjectCostOutput> {
  return estimateProjectCostFlow(input);
}

const getRealTimeMarketPrices = ai.defineTool(
    {
        name: 'getRealTimeMarketPrices',
        description: 'Gets real-time market prices for construction materials and labor for a specific location.',
        inputSchema: z.object({ location: z.string() }),
        outputSchema: z.object({
            materials: z.record(z.number()).describe('A record of material names and their prices per unit.'),
            labor: z.number().describe('The average hourly wage for general construction labor.'),
            currency: z.string().describe('The currency of the prices (e.g., SAR, USD).'),
        }),
    },
    async (input) => {
        return getMarketPrices(input.location);
    }
);


const prompt = ai.definePrompt({
  name: 'estimateProjectCostPrompt',
  input: {schema: EstimateProjectCostInputSchema},
  output: {schema: EstimateProjectCostOutputSchema},
  tools: [getRealTimeMarketPrices],
  prompt: `You are an expert construction cost estimator for projects in the Middle East, particularly Saudi Arabia.
Your task is to provide a detailed and realistic cost estimation for a construction project.

First, you **MUST** use the 'getRealTimeMarketPrices' tool to fetch the current market prices for materials and labor in the specified project location.

Then, based on the project details and the real-time market data you obtained, calculate an estimated cost range and a detailed cost breakdown.

**Project Details:**
- **Project Location:** {{{location}}}
- **Project Size:** {{{size}}} square meters
- **Project Type:** {{{type}}}

Provide the final output in the required JSON format, with all monetary values in the currency provided by the tool.
Be professional and thorough in your breakdown.
`,
});

const estimateProjectCostFlow = ai.defineFlow(
  {
    name: 'estimateProjectCostFlow',
    inputSchema: EstimateProjectCostInputSchema,
    outputSchema: EstimateProjectCostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
