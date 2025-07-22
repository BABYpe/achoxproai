
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
    let blueprintDataUri: string | undefined;
    const perspectiveDataUris: (string | undefined)[] = [];

    // Generate blueprint
    try {
        const blueprintResult = await blueprintPrompt(input);
        blueprintDataUri = blueprintResult.media?.url;
    } catch (e) {
        console.error("Failed to generate 2D blueprint:", e);
        blueprintDataUri = undefined; // Ensure it's undefined on failure
    }

    // Generate perspectives in parallel
    const perspectiveViews = [
        'Front facade, eye-level view',
        'Side perspective view, showing depth and side details',
        'Aerial or bird\'s-eye view'
    ];
    
    const perspectivePromises = perspectiveViews.map(view => 
        perspectivePrompt({ ...input, view }).catch(e => {
            console.error(`Failed to generate perspective for view '${view}':`, e);
            return null; // Return null on failure for a specific view
        })
    );

    const perspectiveResults = await Promise.all(perspectivePromises);
    
    perspectiveResults.forEach(result => {
        perspectiveDataUris.push(result?.media?.url);
    });

    const placeholderImage = "https://placehold.co/800x600.png";

    // Ensure we always return a valid structure, using placeholders for failed images
    const finalBlueprintUri = blueprintDataUri || placeholderImage;
    const finalPerspectiveUris = perspectiveDataUris.map(uri => uri || placeholderImage);

    // Ensure there are always at least 3 perspective images
    while (finalPerspectiveUris.length < 3) {
        finalPerspectiveUris.push(placeholderImage);
    }
    
    if (!blueprintDataUri) {
        console.warn("Blueprint generation failed, using placeholder.");
    }
    if (perspectiveDataUris.some(uri => !uri)) {
        console.warn("One or more perspective generations failed, using placeholders.");
    }


    return {
      blueprintDataUri: finalBlueprintUri,
      perspectiveDataUris: finalPerspectiveUris,
    };
  }
);
