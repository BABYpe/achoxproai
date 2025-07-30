
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


// --- PROMPTS FOR SPECIALIZED BLUEPRINTS ---

const architecturalPrompt = ai.definePrompt({
    name: 'architecturalImagePrompt',
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    input: { schema: GenerateBlueprintImageInputSchema },
    config: { responseModalities: ['IMAGE', 'TEXT'] },
    prompt: (input) => `Generate a clean, professional, highly-detailed, black and white architectural floor plan for a **${input.projectType}** with a desired quality level of **${input.quality}** and an approximate area of **${input.area} square meters**. The plan should be detailed, with clear labels for rooms and dimensions in meters. The style should be that of a professional architectural drawing.
    **Crucially, add a professional-looking frame around the entire blueprint image.** Inside the frame, at the bottom, include a title block. In the title block, add the text: "Architectural Plan" and "Designed by: AchoX Pro AI".
    
    User's Design Details: ${input.prompt}`,
});

const electricalPrompt = ai.definePrompt({
    name: 'electricalImagePrompt',
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    input: { schema: GenerateBlueprintImageInputSchema },
    config: { responseModalities: ['IMAGE', 'TEXT'] },
    prompt: (input) => `Generate a clean, professional, black and white electrical engineering blueprint for a **${input.projectType}** (approx. ${input.area} sqm, ${input.quality} quality). The plan must overlay on a faint architectural floor plan. Show the layout of lighting fixtures (using standard symbols like circles), power outlets (sockets), switches, and the main electrical panel (distribution board). Use clear lines to indicate wiring paths.
    **Add a professional frame and a title block with the text "Electrical Plan" and "Designed by: AchoX Pro AI".**
    
    Base Architectural Design: ${input.prompt}`,
});

const hvacPrompt = ai.definePrompt({
    name: 'hvacImagePrompt',
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    input: { schema: GenerateBlueprintImageInputSchema },
    config: { responseModalities: ['IMAGE', 'TEXT'] },
    prompt: (input) => `Generate a clean, professional, black and white HVAC (Heating, Ventilation, and Air Conditioning) blueprint for a **${input.projectType}** (approx. ${input.area} sqm, ${input.quality} quality). The plan must overlay on a faint architectural floor plan. Illustrate the layout of the ductwork for supply and return air, the location of indoor AC units (e.g., split or central units based on the quality level), and thermostat locations.
    **Add a professional frame and a title block with the text "HVAC Plan" and "Designed by: AchoX Pro AI".**
    
    Base Architectural Design: ${input.prompt}`,
});

const plumbingPrompt = ai.definePrompt({
    name: 'plumbingImagePrompt',
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    input: { schema: GenerateBlueprintImageInputSchema },
    config: { responseModalities: ['IMAGE', 'TEXT'] },
    prompt: (input) => `Generate a clean, professional, black and white plumbing and sanitary blueprint for a **${input.projectType}** (approx. ${input.area} sqm, ${input.quality} quality). The plan must overlay on a faint architectural floor plan. Show the layout of water supply lines (hot and cold), drainage pipes for sinks, toilets, and showers, and main sewer connections. Use standard plumbing symbols.
    **Add a professional frame and a title block with the text "Plumbing & Sanitary Plan" and "Designed by: AchoX Pro AI".**
    
    Base Architectural Design: ${input.prompt}`,
});

const perspectivePrompt = ai.definePrompt({
    name: 'perspectiveImagePrompt',
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    input: { schema: GenerateBlueprintImageInputSchema },
    config: { responseModalities: ['IMAGE', 'TEXT'] },
    prompt: (input) => `Generate a photorealistic 3D architectural rendering of the exterior of a **${input.projectType}**. The style should be modern and of **${input.quality}** quality, suitable for a client presentation.
    
    Render View: **${input.view}**
    
    Design Details: ${input.prompt}`,
});


const generateBlueprintImageFlow = ai.defineFlow(
  {
    name: 'generateBlueprintImageFlow',
    inputSchema: GenerateBlueprintImageInputSchema,
    outputSchema: GenerateBlueprintImageOutputSchema,
  },
  async (input) => {
    const placeholderImage = "https://placehold.co/800x600.png";

    // Generate all blueprints and perspectives in parallel
    const [
        archResult,
        elecResult,
        hvacResult,
        plumbResult,
        perspectivesResult
    ] = await Promise.all([
        architecturalPrompt(input).catch(e => { console.error("Arch generation failed:", e); return null; }),
        electricalPrompt(input).catch(e => { console.error("Elec generation failed:", e); return null; }),
        hvacPrompt(input).catch(e => { console.error("HVAC generation failed:", e); return null; }),
        plumbingPrompt(input).catch(e => { console.error("Plumbing generation failed:", e); return null; }),
        Promise.all([
            'Front facade, eye-level view',
            'Side perspective view, showing depth and side details',
            'Aerial or bird\'s-eye view'
        ].map(view => perspectivePrompt({ ...input, view }).catch(e => {
            console.error(`Perspective for view '${view}' failed:`, e);
            return null;
        })))
    ]);

    const perspectiveDataUris = perspectivesResult.map(result => result?.media?.url || placeholderImage);
    while (perspectiveDataUris.length < 3) {
        perspectiveDataUris.push(placeholderImage);
    }
    
    return {
      architecturalBlueprintDataUri: archResult?.media?.url || placeholderImage,
      electricalBlueprintDataUri: elecResult?.media?.url || placeholderImage,
      hvacBlueprintDataUri: hvacResult?.media?.url || placeholderImage,
      plumbingBlueprintDataUri: plumbResult?.media?.url || placeholderImage,
      perspectiveDataUris: perspectiveDataUris,
    };
  }
);
