
'use server';

/**
 * @fileOverview An AI agent to generate architectural images (blueprints and perspectives) from a text prompt.
 *
 * - generateBlueprintImage - The main function that orchestrates image generation.
 */

import { ai } from '@/ai/genkit';
import { GenerateBlueprintImageInputSchema, GenerateBlueprintImageOutputSchema, type GenerateBlueprintImageInput, type GenerateBlueprintImageOutput } from './generate-blueprint-image.types';

export async function generateBlueprintImage(input: GenerateBlueprintImageInput): Promise<GenerateBlueprintImageOutput> {
  return generateBlueprintImageFlow(input);
}


// This is the flow for generating the 2D blueprint
const blueprintPrompt = ai.definePrompt({
    name: 'blueprintImagePrompt',
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    input: { schema: GenerateBlueprintImageInputSchema },
    config: {
        responseModalities: ['IMAGE', 'TEXT'],
    },
    prompt: `Generate a clean, professional, highly-detailed, black and white architectural floor plan. The plan should be detailed, with clear labels for rooms and dimensions in meters. The style should be that of a professional architectural drawing.
    **Crucially, add a professional-looking frame around the entire blueprint image.** Inside the frame, at the bottom, include a title block. In the title block, add the text: "Designed by: Eng. Bassem Al-Mohandes" and "Company: AchoX Pro Engineering".
    
    Design Details: {{{prompt}}}`,
});

// This is the flow for generating the 3D perspectives
const perspectivePrompt = ai.definePrompt({
    name: 'perspectiveImagePrompt',
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    input: { schema: GenerateBlueprintImageInputSchema },
    config: {
        responseModalities: ['IMAGE', 'TEXT'],
    },
    // The prompt is a function to generate different views
    prompt: (input) => `Generate a photorealistic 3D architectural rendering of the exterior of a building. The style should be modern and high-quality, suitable for a client presentation.
    
    Render View: **${input.view}**
    
    Design Details: {{{prompt}}}`,
});


const generateBlueprintImageFlow = ai.defineFlow(
  {
    name: 'generateBlueprintImageFlow',
    inputSchema: GenerateBlueprintImageInputSchema,
    outputSchema: GenerateBlueprintImageOutputSchema,
  },
  async (input) => {
    // Generate blueprint and 3 perspectives in parallel
    const [blueprintResult, perspectiveResult1, perspectiveResult2, perspectiveResult3] = await Promise.all([
      blueprintPrompt(input),
      perspectivePrompt({ ...input, view: 'Front facade, eye-level view' }),
      perspectivePrompt({ ...input, view: 'Side perspective view, showing depth and side details' }),
      perspectivePrompt({ ...input, view: 'Aerial or bird\'s-eye view' }),
    ]);
    
    const blueprintDataUri = blueprintResult.media?.url;
    const perspectiveDataUris = [
        perspectiveResult1.media?.url,
        perspectiveResult2.media?.url,
        perspectiveResult3.media?.url,
    ].filter((uri): uri is string => !!uri);

    if (!blueprintDataUri || perspectiveDataUris.length < 3) {
      throw new Error("Image generation failed to return one or more images.");
    }

    return {
      blueprintDataUri,
      perspectiveDataUris,
    };
  }
);
