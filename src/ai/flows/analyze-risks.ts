'use server';
/**
 * @fileOverview A project risk analysis AI agent.
 *
 * - analyzeRisks - A function that analyzes project risks.
 * - AnalyzeRisksInput - The input type for the function.
 * - AnalyzeRisksOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzeRisksInputSchema = z.object({
  project: z.object({
    title: z.string().describe('The title of the project.'),
    description: z.string().describe('A detailed description of the project scope and objectives.'),
    budget: z.number().describe('The total budget of the project.'),
    currency: z.string().describe('The currency of the budget (e.g., SAR).'),
    durationInDays: z.number().describe('The planned duration of the project in days.'),
  }).describe("The project data object."),
});

export type AnalyzeRisksInput = z.infer<typeof AnalyzeRisksInputSchema>;


const AnalyzeRisksOutputSchema = z.object({
  risks: z.array(z.object({
    category: z.enum(['Operational', 'Financial', 'Technical', 'Legal', 'External']).describe("The category of the identified risk."),
    description: z.string().describe("A clear and concise description of the risk."),
    impact: z.enum(['High', 'Medium', 'Low']).describe("The potential impact of the risk if it occurs."),
    probability: z.enum(['High', 'Medium', 'Low']).describe("The likelihood of the risk occurring."),
    mitigation: z.string().describe("A concrete, actionable recommendation to mitigate or manage the risk."),
  })).describe("A list of potential risks identified from the project data."),
});

export type AnalyzeRisksOutput = z.infer<typeof AnalyzeRisksOutputSchema>;


export async function analyzeRisks(
  input: AnalyzeRisksInput
): Promise<AnalyzeRisksOutput> {
  return analyzeRisksFlow(input);
}


const prompt = ai.definePrompt({
  name: 'analyzeRisksPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: AnalyzeRisksInputSchema},
  output: {schema: AnalyzeRisksOutputSchema},
  prompt: `You are a world-class Senior Risk Management Consultant for a major construction company in Saudi Arabia. Your task is to provide a professional risk analysis report based on the provided project data.

**Project Data:**
- **Project Title:** {{{project.title}}}
- **Description:** {{{project.description}}}
- **Budget:** {{{project.budget}}} {{{project.currency}}}
- **Duration:** {{{project.durationInDays}}} days

**Instructions:**
1.  **Analyze Holistically:** Read the project data carefully. Think about all potential problems that could arise during the project lifecycle.
2.  **Identify and Categorize Risks:** Identify at least 4-6 key risks from different categories (Operational, Financial, Technical, Legal, External). For each risk:
    *   **Description:** Clearly describe the risk. E.g., "Unexpected soil conditions could delay foundation work."
    *   **Category:** Classify it correctly.
    *   **Impact & Probability:** Assess the potential impact (High, Medium, Low) and the likelihood of it happening (High, Medium, Low). Be realistic. A high budget and long duration might increase the probability of price fluctuations.
    *   **Mitigation Strategy:** Provide a clear, actionable mitigation strategy. E.g., "Conduct a thorough geotechnical survey before starting excavation and allocate a contingency budget for potential soil treatment."
3.  **Output:** Provide the entire analysis in the required JSON format. Be professional, data-driven, and concise. Your goal is to help the project manager anticipate and prepare for challenges.
`,
});

const analyzeRisksFlow = ai.defineFlow(
  {
    name: 'analyzeRisksFlow',
    inputSchema: AnalyzeRisksInputSchema,
    outputSchema: AnalyzeRisksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
