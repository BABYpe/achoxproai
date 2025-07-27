'use server';

/**
 * @fileOverview A simple "Hello World" flow for Genkit.
 *
 * - helloFlow - A function that takes a name and generates a greeting.
 */

import {ai} from '@/ai/genkit';
import { gemini15Flash } from '@genkit-ai/googleai';

// The main function that can be called from other parts of the application.
export async function runHelloFlow(name: string): Promise<string> {
  return helloFlow(name);
}

// The Genkit flow definition.
const helloFlow = ai.defineFlow(
  {
    name: 'helloFlow',
    model: gemini15Flash, // set default model for this flow
  },
  async (name: string) => {
    // Make a generation request to the model.
    const response = await ai.generate({
      prompt: `Hello Gemini, my name is ${name}`,
    });

    // Return the generated text.
    return response.text();
  }
);
