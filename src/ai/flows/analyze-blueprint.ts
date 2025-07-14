// src/ai/flows/analyze-blueprint.ts
'use server';
/**
 * @fileOverview A blueprint analysis AI agent.
 *
 * - analyzeBlueprint - A function that handles the blueprint analysis process.
 * - AnalyzeBlueprintInput - The input type for the analyzeBlueprint function.
 * - AnalyzeBlueprintOutput - The return type for the analyzeBlueprint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeBlueprintInputSchema = z.object({
  blueprintDataUri: z
    .string()
    .describe(
      "A blueprint file (PDF, DWG, DXF, JPG, PNG), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeBlueprintInput = z.infer<typeof AnalyzeBlueprintInputSchema>;

const AnalyzeBlueprintOutputSchema = z.object({
  scopeOfWork: z.string().describe("A summary of the scope of work based on the blueprint."),
  warnings: z.array(z.string()).describe("A list of potential engineering errors, inconsistencies, or risks found in the blueprint, referencing Saudi Building Codes (SBC) where applicable."),
  recommendations: z.array(z.string()).describe("A list of actionable recommendations for design improvement or to mitigate potential issues."),
  quantities: z.object({
    area: z.string().describe('The total area of the blueprint.'),
    length: z.string().describe('The total length of lines in the blueprint.'),
    objectCounts: z
      .record(z.string(), z.number())
      .describe('Counts of different objects identified in the blueprint (e.g., doors, windows, columns).'),
  }),
  requiredItems: z.array(z.object({
      item: z.string().describe("The name of the required construction item."),
      reason: z.string().describe("The reason or context for requiring this item based on the blueprint."),
  })).describe("A list of required items or materials to execute the plan."),
});
export type AnalyzeBlueprintOutput = z.infer<typeof AnalyzeBlueprintOutputSchema>;

export async function analyzeBlueprint(input: AnalyzeBlueprintInput): Promise<AnalyzeBlueprintOutput> {
  return analyzeBlueprintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBlueprintPrompt',
  model: 'gemini-pro',
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
