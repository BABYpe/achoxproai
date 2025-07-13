
'use server';

/**
 * @fileOverview An AI agent to analyze a project description and suggest its type and quality.
 *
 * - analyzeProjectDescription - A function that handles the project description analysis.
 * - AnalyzeProjectDescriptionInput - The input type for the analyzeProjectDescription function.
 * - AnalyzeProjectDescriptionOutput - The return type for the analyzeProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzeProjectDescriptionInputSchema = z.object({
  description: z.string().describe('A textual description of the project provided by the user.'),
});
export type AnalyzeProjectDescriptionInput = z.infer<typeof AnalyzeProjectDescriptionInputSchema>;

const AnalyzeProjectDescriptionOutputSchema = z.object({
    projectType: z.enum(['residential_villa', 'interior_finishing', 'commercial_building', 'event_setup', 'other']).describe('The most likely type of the project based on the description.'),
    quality: z.enum(['standard', 'premium', 'luxury']).describe('The most likely quality level based on keywords in the description (e.g., "luxury", "high-end", "basic").'),
    initialBlueprintPrompt: z.string().optional().describe('A suggested prompt for generating an initial blueprint or diagram based on the description.'),
});
export type AnalyzeProjectDescriptionOutput = z.infer<typeof AnalyzeProjectDescriptionOutputSchema>;


export async function analyzeProjectDescription(input: AnalyzeProjectDescriptionInput): Promise<AnalyzeProjectDescriptionOutput> {
  return analyzeProjectDescriptionFlow(input);
}


const prompt = ai.definePrompt({
  name: 'analyzeProjectDescriptionPrompt',
  model: 'gemini-1.5-flash-latest',
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
