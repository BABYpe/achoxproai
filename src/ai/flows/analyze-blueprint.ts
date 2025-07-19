// src/ai/flows/analyze-blueprint.ts
'use server';
/**
 * @fileOverview A blueprint analysis AI agent.
 *
 * - analyzeBlueprint - A function that handles the blueprint analysis process.
 */

import {ai} from '@/ai/genkit';
import { AnalyzeBlueprintInputSchema, AnalyzeBlueprintOutputSchema, type AnalyzeBlueprintInput, type AnalyzeBlueprintOutput } from './analyze-blueprint.types';


export async function analyzeBlueprint(input: AnalyzeBlueprintInput): Promise<AnalyzeBlueprintOutput> {
  return analyzeBlueprintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBlueprintPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: AnalyzeBlueprintInputSchema},
  output: {schema: AnalyzeBlueprintOutputSchema},
  prompt: `You are an expert AI Engineering Consultant, specializing in the Saudi Building Code (SBC). Your task is to perform a comprehensive, critical analysis of the provided blueprint.

**Instructions:**
1.  **Summarize Scope of Work:** Briefly describe the main purpose and scope of the project as depicted in the blueprint.
2.  **Identify Warnings & Risks:** Scrutinize the blueprint for any potential engineering errors, ambiguities, inconsistencies, or non-compliance issues. Reference specific Saudi Building Codes (SBC) if possible (e.g., "SBC 201 for structural requirements"). List these as clear, concise warnings. If none, return an empty array.
3.  **Provide Actionable Recommendations:** Based on the identified warnings and general best practices, provide a list of concrete, actionable recommendations to improve the design, enhance safety, or clarify ambiguities.
4.  **Extract Quantities:** Accurately extract key quantities:
    *   Total floor area.
    *   Total length of all walls/lines.
    *   Counts of distinct objects (e.g., "Doors", "Windows", "Columns").
5.  **List Required Items:** Based on the blueprint, identify and list the primary construction items or materials needed for execution.

**Blueprint Image to Analyze:**
{{media url=blueprintDataUri}}

Provide the complete analysis in the required JSON format. Be thorough, precise, and act as a professional consultant aiming to prevent issues before they arise.
`,
});

const analyzeBlueprintFlow = ai.defineFlow(
  {
    name: 'analyzeBlueprintFlow',
    inputSchema: AnalyzeBlueprintInputSchema,
    outputSchema: AnalyzeBlueprintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    