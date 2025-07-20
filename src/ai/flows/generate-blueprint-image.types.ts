// src/ai/flows/generate-blueprint-image.types.ts
import {z} from 'zod';

export const GenerateBlueprintImageInputSchema = z.object({
  prompt: z.string().describe('A detailed textual description of the desired architectural design.'),
});
export type GenerateBlueprintImageInput = z.infer<typeof GenerateBlueprintImageInputSchema>;

export const GenerateBlueprintImageOutputSchema = z.object({
  blueprintDataUri: z.string().describe("A 2D architectural blueprint image, as a data URI."),
  perspectiveDataUri: z.string().describe("A 3D exterior perspective image, as a data URI."),
});
export type GenerateBlueprintImageOutput = z.infer<typeof GenerateBlueprintImageOutputSchema>;
