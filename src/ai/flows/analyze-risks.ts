'use server';
/**
 * @fileOverview A project risk analysis AI agent.
 *
 * - analyzeRisks - A function that analyzes project risks.
 * - AnalyzeRisksInput - The input type for the function.
 * - AnalyzeRisksOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import { AnalyzeRisksInputSchema, AnalyzeRisksOutputSchema, type AnalyzeRisksInput, type AnalyzeRisksOutput } from './analyze-risks.types';


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
  prompt: `You are a world-class Senior Risk Management Consultant for a major construction company in Saudi Arabia, specializing in identifying and mitigating project risks according to international standards (e.g., PMI's PMBOK). Your task is to provide a professional risk analysis report based on the provided project data.

**Project Data:**
- **Project Title:** {{{project.title}}}
- **Description:** {{{project.description}}}
- **Budget:** {{{project.budget}}} {{{project.currency}}}
- **Duration:** {{{project.durationInDays}}} days

**Instructions:**
1.  **Analyze Holistically:** Read the project data carefully. Think about all potential problems that could arise during the project lifecycle, from planning and design to execution and handover.
2.  **Identify and Categorize Risks:** Identify at least 4-6 key risks from different categories (Operational, Financial, Technical, Legal, External/Environmental). For each risk:
    *   **Description:** Clearly and specifically describe the risk. E.g., "Unexpected subsurface rock formations could delay foundation work and increase excavation costs."
    *   **Category:** Classify it correctly.
    *   **Impact & Probability:** Assess the potential impact (High, Medium, Low) and the likelihood of it happening (High, Medium, Low). Be realistic. A high budget and long duration might increase the probability of price fluctuations and regulatory changes.
    *   **Mitigation Strategy:** Provide a clear, actionable, and specific mitigation strategy. E.g., "Conduct a thorough geotechnical survey with soil borings before starting excavation. Allocate a 10% contingency in the budget specifically for potential foundation-related issues."
3.  **Output:** Provide the entire analysis in the required JSON format. Be professional, data-driven, and concise. Your goal is to help the project manager anticipate and prepare for challenges proactively.
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
