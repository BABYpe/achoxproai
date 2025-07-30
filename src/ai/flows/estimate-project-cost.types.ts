// src/ai/flows/estimate-project-cost.types.ts
import {z} from 'zod';

export const EstimateProjectCostInputSchema = z.object({
  location: z.string().describe('The location of the project (e.g., city).'),
  size: z.string().describe('The size of the project (e.g., in square meters).'),
  type: z.enum(['residential_villa', 'commercial_building', 'interior_finishing', 'event_hall', 'office_space', 'restaurant', 'other']).describe('The type of the project (e.g., residential villa, commercial building, event setup).'),
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

    
