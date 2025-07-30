// src/ai/flows/analyze-project-description.types.ts
import {z} from 'zod';

export const AnalyzeProjectDescriptionInputSchema = z.object({
  description: z.string().describe('A textual description of the project provided by the user.'),
});
export type AnalyzeProjectDescriptionInput = z.infer<typeof AnalyzeProjectDescriptionInputSchema>;

export const AnalyzeProjectDescriptionOutputSchema = z.object({
    projectType: z.enum(['residential_villa', 'commercial_building', 'interior_finishing', 'event_hall', 'office_space', 'restaurant', 'other']).describe('The most likely type of the project based on the description.'),
    quality: z.enum(['standard', 'premium', 'luxury']).describe('The most likely quality level based on keywords in the description (e.g., "luxury", "high-end", "basic").'),
    initialBlueprintPrompt: z.string().optional().describe('A suggested prompt for generating an initial blueprint or diagram based on the description.'),
});
export type AnalyzeProjectDescriptionOutput = z.infer<typeof AnalyzeProjectDescriptionOutputSchema>;

    