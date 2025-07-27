// src/ai/flows/analyze-risks.types.ts
import {z} from 'zod';

export const AnalyzeRisksInputSchema = z.object({
  project: z.object({
    title: z.string().describe('The title of the project.'),
    description: z.string().describe('A detailed description of the project scope and objectives.'),
    budget: z.number().describe('The total budget of the project.'),
    currency: z.string().describe('The currency of the budget (e.g., SAR).'),
    durationInDays: z.number().describe('The planned duration of the project in days.'),
  }).describe("The project data object."),
});
export type AnalyzeRisksInput = z.infer<typeof AnalyzeRisksInputSchema>;


export const AnalyzeRisksOutputSchema = z.object({
  risks: z.array(z.object({
    category: z.enum(['Operational', 'Financial', 'Technical', 'Legal', 'External']).describe("The category of the identified risk."),
    description: z.string().describe("A clear and concise description of the risk."),
    impact: z.enum(['High', 'Medium', 'Low']).describe("The potential impact of the risk if it occurs."),
    probability: z.enum(['High', 'Medium', 'Low']).describe("The likelihood of the risk occurring."),
    mitigation: z.string().describe("A concrete, actionable recommendation to mitigate or manage the risk."),
  })).describe("A list of potential risks identified from the project data."),
});
export type AnalyzeRisksOutput = z.infer<typeof AnalyzeRisksOutputSchema>;
