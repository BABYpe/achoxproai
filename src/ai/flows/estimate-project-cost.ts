
'use server';

/**
 * @fileOverview An advanced project planning and cost estimation AI agent.
 *
 * - estimateProjectCost - A function that handles the entire project planning process.
 * - EstimateProjectCostInput - The input type for the estimateProjectCost function.
 * - EstimateProjectCostOutput - The return type for the estimateProjectCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { getMarketPrices } from '@/ai/services/market-data';

const EstimateProjectCostInputSchema = z.object({
  location: z.string().describe('The location of the project (e.g., city).'),
  size: z.string().describe('The size of the project (e.g., in square meters).'),
  type: z.string().describe('The type of the project (e.g., residential villa, commercial building, event setup).'),
  quality: z.enum(['standard', 'premium', 'luxury']).describe('The desired quality level for finishing and materials.'),
  scopeOfWork: z.string().describe('A detailed description of the work to be done. This can be from user input or AI analysis of a blueprint.'),
  currentDate: z.string().optional().describe('The current date in YYYY-MM-DD format.'),
});
export type EstimateProjectCostInput = z.infer<typeof EstimateProjectCostInputSchema>;

export const EstimateProjectCostOutputSchema = z.object({
    totalEstimatedCost: z.string().describe('The total estimated cost for the project in the local currency (e.g., "1,250,000 SAR").'),
    boq: z.array(z.object({
        id: z.string().describe("A unique identifier for the item (e.g., 'C-202')."),
        category: z.string().describe("The category of the work (e.g., 'Concrete Works')."),
        description: z.string().describe("A detailed description of the BOQ item."),
        unit: z.string().describe("The unit of measurement (e.g., 'm³', 'ton', 'sqm')."),
        quantity: z.number().describe("The quantity of the item."),
        unitPrice: z.number().describe("The estimated cost per unit."),
        total: z.number().describe("The total estimated cost for the item (quantity * unitPrice).")
    })).describe("A detailed Bill of Quantities for the project."),
    crewRecommendation: z.object({
        totalPersonnel: z.number().describe("The total number of recommended personnel."),
        breakdown: z.record(z.string(), z.number()).describe('A breakdown of the recommended crew by role (e.g., { "Project Manager": 1, "Site Engineer": 2, "Laborer": 15 }).')
    }).describe("Recommendation for the required project team."),
    ganttChartData: z.array(z.object({
        id: z.number().describe("A numeric ID for the task."),
        task: z.string().describe("The name of the task or project phase."),
        responsible: z.string().describe("The party responsible for the task (e.g., 'Contractor', 'Client')."),
        start: z.string().describe("The estimated start date in YYYY-MM-DD format."),
        end: z.string().describe("The estimated end date in YYYY-MM-DD format."),
        duration: z.number().describe("The duration of the task in days."),
        progress: z.number().describe("The initial progress, which should be 0.")
    })).describe("The data for generating a project schedule Gantt chart."),
    financialRisks: z.array(z.object({
        risk: z.string().describe("A description of the potential financial risk."),
        mitigation: z.string().describe("A suggested strategy to mitigate this risk."),
    })).describe("A list of potential financial risks and mitigation strategies based on the project scope and BOQ.")
});
export type EstimateProjectCostOutput = z.infer<typeof EstimateProjectCostOutputSchema>;


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
