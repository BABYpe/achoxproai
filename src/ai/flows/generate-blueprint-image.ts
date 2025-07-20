
'use server';

/**
 * @fileOverview An AI agent to generate architectural images (blueprints and perspectives) from a text prompt.
 *
 * - generateBlueprintImage - The main function that orchestrates image generation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GenerateBlueprintImageInputSchema = z.object({
  prompt: z.string().describe('A detailed textual description of the desired architectural design.'),
});
export type GenerateBlueprintImageInput = z.infer<typeof GenerateBlueprintImageInputSchema>;

export const GenerateBlueprintImageOutputSchema = z.object({
  blueprintDataUri: z.string().describe("A 2D architectural blueprint image, as a data URI."),
  perspectiveDataUri: z.string().describe("A 3D exterior perspective image, as a data URI."),
});
export type GenerateBlueprintImageOutput = z.infer<typeof GenerateBlueprintImageOutputSchema>;

export async function generateBlueprintImage(input: GenerateBlueprintImageInput): Promise<GenerateBlueprintImageOutput> {
  return generateBlueprintImageFlow(input);
}


// This is the flow for generating the 2D blueprint
const blueprintPrompt = ai.definePrompt({
    name: 'blueprintImagePrompt',
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    input: { schema: GenerateBlueprintImageInputSchema },
    config: {
        responseModalities: ['IMAGE'],
    },
    prompt: `Generate a clean, professional, black and white architectural floor plan. The plan should be detailed, with clear labels for rooms and dimensions in meters. The style should be that of a professional architectural drawing.
    
    Design Details: {{{prompt}}}`,
});

// This is the flow for generating the 3D perspective
const perspectivePrompt = ai.definePrompt({
    name: 'perspectiveImagePrompt',
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    input: { schema: GenerateBlueprintImageInputSchema },
    config: {
        responseModalities: ['IMAGE'],
    },
    prompt: `Generate a photorealistic 3D architectural rendering of the exterior of a building. The style should be modern and high-quality, suitable for a client presentation.
    
    Design Details: {{{prompt}}}`,
});


const generateBlueprintImageFlow = ai.defineFlow(
  {
    name: 'generateBlueprintImageFlow',
    inputSchema: GenerateBlueprintImageInputSchema,
    outputSchema: GenerateBlueprintImageOutputSchema,
  },
  async (input) => {
    // Generate both images in parallel for better performance
    const [blueprintResult, perspectiveResult] = await Promise.all([
      blueprintPrompt(input),
      perspectivePrompt(input),
    ]);
    
    const blueprintDataUri = blueprintResult.media?.url;
    const perspectiveDataUri = perspectiveResult.media?.url;

    if (!blueprintDataUri || !perspectiveDataUri) {
      throw new Error("Image generation failed to return one or both images.");
    }

    return {
      blueprintDataUri,
      perspectiveDataUri,
    };
  }
);
