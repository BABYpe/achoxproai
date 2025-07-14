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
  errorsFound: z.array(z.string()).describe("A list of potential engineering errors or inconsistencies found in the blueprint."),
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
  prompt: `You are an expert Senior Project Engineer specializing in blueprint analysis for a major construction company in Saudi Arabia.

Your task is to perform a comprehensive analysis of the provided blueprint.

**Instructions:**
1.  **Summarize Scope of Work:** Briefly describe the main purpose and scope of the project as depicted in the blueprint.
2.  **Detect Errors & Inconsistencies:** Carefully examine the blueprint for any potential engineering errors, inconsistencies, or missing information. Examples include conflicting dimensions, structural issues, non-compliance with standard practices, or missing labels. List any findings. If no errors are found, return an empty array.
3.  **Extract Quantities:** Accurately extract key quantities:
    *   Total floor area.
    *   Total length of all walls/lines.
    *   Counts of distinct objects (e.g., "Doors", "Windows", "Columns").
4.  **List Required Items:** Based on the blueprint, identify and list the primary construction items or materials needed for execution (e.g., "Concrete for foundations", "Rebar for columns", "Blockwork for walls").

**Blueprint Image to Analyze:**
{{media url=blueprintDataUri}}

Provide the complete analysis in the required JSON format. Be thorough, precise, and professional.
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
