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
  model: 'googleai/gemini-1.5-pro-latest',
  input: {schema: AnalyzeBlueprintInputSchema},
  output: {schema: AnalyzeBlueprintOutputSchema},
  prompt: `You are a lead project reviewer at a top-tier international consultancy firm (e.g., AECOM, Bechtel), with 20+ years of experience in large-scale Saudi projects. Your specialty is forensic engineering and compliance with the Saudi Building Code (SBC). Your task is to perform a meticulous, critical analysis of the provided blueprint.

**INSTRUCTIONS:**

1.  **Project Scope Summary:**
    *   Analyze the blueprint and provide a concise, professional summary of the project's scope of work. What is being built? What is its primary purpose?

2.  **Detailed Warnings & Risk Assessment (SBC Focus):**
    *   Scrutinize the blueprint for any potential engineering errors, ambiguities, design flaws, constructability issues, inconsistencies, or non-compliance issues.
    *   For each issue found, create a distinct warning object.
    *   **Categorize** each warning (e.g., 'Structural', 'Architectural', 'Electrical', 'Mechanical', 'Plumbing', 'SBC Compliance').
    *   **Assign a Severity Level** to each warning (High, Medium, Low).
    *   Provide a clear **Description** of the issue. You **MUST** reference specific Saudi Building Codes (SBC) where applicable (e.g., "Non-compliance with SBC 201, Section 5.2.3, regarding minimum beam depth for the specified span.").
    *   If no warnings are found, return an empty array.

3.  **Actionable Recommendations:**
    *   For each warning identified, provide a concrete, actionable **Recommendation** to resolve the issue or mitigate the risk. The recommendation should be practical, clear, and reference engineering best practices.

4.  **Quantitative Analysis:**
    *   Accurately extract key quantities from the blueprint.
    *   Calculate the total floor area.
    *   Estimate the total length of all walls/lines.
    *   Provide counts of distinct objects identified (e.g., "Doors", "Windows", "Columns", "Sinks").

5.  **Required Items Identification (Bill of Materials):**
    *   Based on the blueprint, identify and list the primary construction items or materials needed for execution. For each item, provide a brief justification based on the blueprint's content.

**Blueprint Image to Analyze:**
{{media url=blueprintDataUri}}

**OUTPUT FORMAT:**
Provide the complete analysis in the required, structured JSON format. Your response must be thorough, precise, and reflect the quality of a leading international engineering consultancy. The goal is to prevent costly errors before they happen on site.
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
