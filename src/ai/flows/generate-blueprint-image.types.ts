
import {z} from 'zod';

export const GenerateBlueprintImageInputSchema = z.object({
  prompt: z.string().describe('A detailed textual description of the desired architectural design.'),
  view: z.string().optional().describe('The specific view for 3D rendering, e.g., "Front facade".'),
});
export type GenerateBlueprintImageInput = z.infer<typeof GenerateBlueprintImageInputSchema>;

export const GenerateBlueprintImageOutputSchema = z.object({
  blueprintDataUri: z.string().describe("A 2D architectural blueprint image with a frame, as a data URI."),
  perspectiveDataUris: z.array(z.string()).describe("An array of at least three 3D exterior perspective images, as data URIs."),
});
export type GenerateBlueprintImageOutput = z.infer<typeof GenerateBlueprintImageOutputSchema>;
