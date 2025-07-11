
'use server';

/**
 * @fileOverview An advanced project planning and cost estimation AI agent.
 *
 * - estimateProjectCost - A function that handles the entire project planning process.
 * - EstimateProjectCostInput - The input type for the estimateProjectCost function.
 * - EstimateProjectCostOutput - The return type for the estimateProjectCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getMarketPrices } from '@/ai/services/market-data';

const EstimateProjectCostInputSchema = z.object({
  location: z.string().describe('The location of the project (e.g., city).'),
  size: z.string().describe('The size of the project (e.g., in square meters).'),
  type: z.string().describe('The type of the project (e.g., residential villa, commercial building, event setup).'),
  quality: z.enum(['standard', 'premium', 'luxury']).describe('The desired quality level for finishing and materials.'),
  scopeOfWork: z.string().describe('A detailed description of the work to be done.'),
  currentDate: z.string().optional().describe('The current date in YYYY-MM-DD format.'),
});
export type EstimateProjectCostInput = z.infer<typeof EstimateProjectCostInputSchema>;

const EstimateProjectCostOutputSchema = z.object({
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
    })).describe("The data for generating a project schedule Gantt chart.")
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
            materials: z.record(z.string(), z.number()).describe('A record of material names and their prices per unit.'),
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
  prompt: `You are a world-class Senior Project Planner for a major construction and events company in Saudi Arabia.
Your task is to create a complete and professional project plan based on the user's input.

**CRITICAL INSTRUCTIONS:**
1.  **Use Market Data:** You **MUST** start by calling the 'getRealTimeMarketPrices' tool to fetch current prices for the specified location. This is mandatory.
2.  **Analyze Inputs:** Carefully analyze all project details: location, size, type, quality, and scope of work. The quality level (standard, premium, luxury) and the project type (e.g., residential_villa, interior_finishing, event_setup) are critical. They determine the specific materials, tasks, and costs involved.
3.  **Generate Dynamic & Relevant BOQ:** Create a comprehensive Bill of Quantities (BOQ) that is **highly specific** to the project type. For example:
    *   If the type is 'residential_villa', include items for excavation, concrete, masonry, plumbing, electrical, etc.
    *   If the type is 'interior_finishing', focus on items like demolition (if any), drywall, painting, flooring, and custom joinery.
    *   If the type is 'event_setup', include items like staging, lighting rigs, sound systems, and temporary structures.
    *   Use the market data to assign realistic unit prices and calculate totals for each item.
4.  **Recommend Crew:** Based on the project size and complexity, recommend a suitable team size and composition.
5.  **Create Gantt Chart Data:** Develop a high-level project schedule (Gantt chart data). Break the project into logical phases/tasks relevant to the project type. Estimate durations and provide start/end dates (assume the project starts next Monday from today, {{currentDate}}). Set initial progress for all tasks to 0.
6.  **Calculate Total Cost:** Sum up the total of all BOQ items to get the total estimated cost. Format it as a string with the currency (e.g., "1,500,000 SAR").
7.  **Output:** Provide the entire plan in the required JSON format. Be thorough, professional, and realistic in your estimations.

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
