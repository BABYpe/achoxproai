
'use server';

/**
 * @fileOverview An AI agent to analyze a project description and suggest its type and quality.
 *
 * - analyzeProjectDescription - A function that handles the project description analysis.
 */

import {ai} from '@/ai/genkit';
import { AnalyzeProjectDescriptionInputSchema, AnalyzeProjectDescriptionOutputSchema, type AnalyzeProjectDescriptionInput, type AnalyzeProjectDescriptionOutput } from './analyze-project-description.types';


export async function analyzeProjectDescription(input: AnalyzeProjectDescriptionInput): Promise<AnalyzeProjectDescriptionOutput> {
  return analyzeProjectDescriptionFlow(input);
}


const prompt = ai.definePrompt({
  name: 'analyzeProjectDescriptionPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: AnalyzeProjectDescriptionInputSchema},
  output: {schema: AnalyzeProjectDescriptionOutputSchema},
  prompt: `You are an expert project management assistant. Your task is to analyze a user's project description and extract key information.

**Instructions:**
1.  **Analyze Project Type:** Based on the description, determine the most appropriate project type from the available options.
2.  **Analyze Quality Level:** Infer the desired quality level from keywords. If words like "فاخر", "فخم", "luxury", "high-end" are used, choose 'luxury'. If words like "ممتاز", "جودة عالية", "premium" are used, choose 'premium'. Otherwise, default to 'standard'.
3.  **Suggest Blueprint Prompt:** (Optional) Based on the description, formulate a concise and clear prompt that could be used by an image generation AI to create a preliminary architectural drawing or concept sketch for the project.

**User's Project Description:**
"{{{description}}}"

Analyze the description and provide the output in the required JSON format.
`,
});

const analyzeProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'analyzeProjectDescriptionFlow',
    inputSchema: AnalyzeProjectDescriptionInputSchema,
    outputSchema: AnalyzeProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
