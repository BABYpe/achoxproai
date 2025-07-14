
'use server';

/**
 * @fileOverview An advanced project planning and cost estimation AI agent.
 *
 * - estimateProjectCost - A function that handles the entire project planning process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { getMarketPrices } from '@/ai/services/market-data';
import { EstimateProjectCostInputSchema, EstimateProjectCostOutputSchema, type EstimateProjectCostInput, type EstimateProjectCostOutput } from './estimate-project-cost.types';


export async function estimateProjectCost(input: EstimateProjectCostInput): Promise<EstimateProjectCostOutput> {
  return estimateProjectCostFlow(input);
}

const getRealTimeMarketPrices = ai.defineTool(
    {
        name: 'getRealTimeMarketPrices',
        description: 'Gets real-time market prices for construction materials and labor for a specific location and quality level.',
        inputSchema: z.object({ 
            location: z.string(),
            quality: z.enum(['standard', 'premium', 'luxury']) 
        }),
        outputSchema: z.object({
            materials: z.record(z.string(), z.number()).describe('A record of material names and their prices per unit.'),
            labor: z.number().describe('The average hourly wage for general construction labor.'),
            currency: z.string().describe('The currency of the prices (e.g., SAR, USD).'),
        }),
    },
    async (input) => {
        return getMarketPrices(input.location, input.quality);
    }
);


const prompt = ai.definePrompt({
  name: 'estimateProjectCostPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: EstimateProjectCostInputSchema},
  output: {schema: EstimateProjectCostOutputSchema},
  tools: [getRealTimeMarketPrices],
  prompt: `You are a world-class Senior Project Planner and Financial Risk Analyst for a major construction and events company in Saudi Arabia.
Your task is to create a complete and professional project plan based on the user's input.

**CRITICAL INSTRUCTIONS:**
1.  **Use Market Data:** You **MUST** start by calling the 'getRealTimeMarketPrices' tool to fetch current prices for the specified location and quality. This is mandatory.
2.  **Analyze Inputs:** Carefully analyze all project details: location, size, type, quality, and scope of work. The 'scopeOfWork' is the most important input; use it as the primary source of truth for what needs to be built.
3.  **Generate Dynamic & Relevant BOQ:** Create a comprehensive Bill of Quantities (BOQ) that is **highly specific** to the project type and the detailed scope of work. Use the market data to assign realistic unit prices.
4.  **Recommend Crew:** Based on the project size and complexity, recommend a suitable team size and composition.
5.  **Create Gantt Chart Data:** Develop a high-level project schedule (Gantt chart data). Break the project into logical phases/tasks. Estimate durations and provide start/end dates (assume the project starts next Monday from today, {{currentDate}}). Set initial progress for all tasks to 0.
6.  **Identify Financial Risks:** Based on the scope and BOQ, identify potential financial risks. Examples: "ambiguity in finishing material specifications could lead to cost overruns", "dependency on a single supplier for a critical item", "unusually high market price for steel". For each risk, suggest a mitigation strategy. If no specific risks, return an empty array.
7.  **Calculate Total Cost:** Sum up the total of all BOQ items to get the total estimated cost. Format it as a string with the currency (e.g., "1,500,000 SAR").
8.  **Output:** Provide the entire plan in the required JSON format. Be thorough, professional, and realistic in your estimations.

**Project Details to Analyze:**
- **Project Location:** {{{location}}}
- **Project Size:** {{{size}}} square meters
- **Project Type:** {{{type}}}
- **Quality Level:** {{{quality}}}
- **Scope of Work:** {{{scopeOfWork}}}

Now, generate the complete project plan.
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
