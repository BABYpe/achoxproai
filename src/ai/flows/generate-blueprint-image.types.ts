
import {z} from 'zod';

export const GenerateBlueprintImageInputSchema = z.object({
  prompt: z.string().describe('A detailed textual description of the desired architectural design.'),
  view: z.string().optional().describe('The specific view for 3D rendering, e.g., "Front facade".'),
});
export type GenerateBlueprintImageInput = z.infer<typeof GenerateBlueprintImageInputSchema>;

export const GenerateBlueprintImageOutputSchema = z.object({
  architecturalBlueprintDataUri: z.string().describe("A 2D architectural floor plan image with a frame, as a data URI."),
  electricalBlueprintDataUri: z.string().describe("A 2D electrical plan image, as a data URI."),
  hvacBlueprintDataUri: z.string().describe("A 2D HVAC (air conditioning) plan image, as a data URI."),
  plumbingBlueprintDataUri: z.string().describe("A 2D plumbing and sanitary plan image, as a data URI."),
  perspectiveDataUris: z.array(z.string()).describe("An array of at least three 3D exterior perspective images, as data URIs."),
});
export type GenerateBlueprintImageOutput = z.infer<typeof GenerateBlueprintImageOutputSchema>;
