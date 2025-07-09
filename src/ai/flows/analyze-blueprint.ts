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
  quantities: z.object({
    area: z.string().describe('The total area of the blueprint.'),
    length: z.string().describe('The total length of lines in the blueprint.'),
    objectCounts: z
      .record(z.string(), z.number())
      .describe('Counts of different objects identified in the blueprint.'),
  }),
});
export type AnalyzeBlueprintOutput = z.infer<typeof AnalyzeBlueprintOutputSchema>;

export async function analyzeBlueprint(input: AnalyzeBlueprintInput): Promise<AnalyzeBlueprintOutput> {
  return analyzeBlueprintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBlueprintPrompt',
  input: {schema: AnalyzeBlueprintInputSchema},
  output: {schema: AnalyzeBlueprintOutputSchema},
  prompt: `You are an expert project engineer specializing in blueprint analysis.

You will analyze the provided blueprint image and extract key quantities such as area, length, and counts of various objects.

Blueprint Image: {{media url=blueprintDataUri}}

Provide the extracted quantities in JSON format.
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
