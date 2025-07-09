'use server';

/**
 * @fileOverview A project cost estimation AI agent.
 *
 * - estimateProjectCost - A function that handles the project cost estimation process.
 * - EstimateProjectCostInput - The input type for the estimateProjectCost function.
 * - EstimateProjectCostOutput - The return type for the estimateProjectCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateProjectCostInputSchema = z.object({
  location: z.string().describe('The location of the project.'),
  size: z.string().describe('The size of the project (e.g., in square meters).'),
  type: z.string().describe('The type of the project (e.g., residential, commercial).'),
});
export type EstimateProjectCostInput = z.infer<typeof EstimateProjectCostInputSchema>;

const EstimateProjectCostOutputSchema = z.object({
  costRange: z.string().describe('The estimated cost range for the project.'),
});
export type EstimateProjectCostOutput = z.infer<typeof EstimateProjectCostOutputSchema>;

export async function estimateProjectCost(input: EstimateProjectCostInput): Promise<EstimateProjectCostOutput> {
  return estimateProjectCostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateProjectCostPrompt',
  input: {schema: EstimateProjectCostInputSchema},
  output: {schema: EstimateProjectCostOutputSchema},
  prompt: `You are an expert in construction cost estimation. Based on the project parameters,
you will generate an estimated cost range for the project. Provide the cost range in USD.

Project Location: {{{location}}}
Project Size: {{{size}}}
Project Type: {{{type}}}
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
