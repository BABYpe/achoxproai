
'use server';

/**
 * @fileOverview An AI agent for lead generation and marketing outreach.
 *
 * - generateMarketingOutreach - A function that generates a leads and a marketing email.
 * - GenerateMarketingOutreachInput - The input type for the generateMarketingOutreach function.
 * - GenerateMarketingOutreachOutput - The return type for the generateMarketingOutreach function.
 */

import {ai} from '@/ai/genkit';
import { GenerateMarketingOutreachInputSchema, GenerateMarketingOutreachOutputSchema, type GenerateMarketingOutreachInput, type GenerateMarketingOutreachOutput } from './generate-marketing-outreach.types';


export async function generateMarketingOutreach(input: GenerateMarketingOutreachInput): Promise<GenerateMarketingOutreachOutput> {
  return generateMarketingOutreachFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generateMarketingOutreachPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: GenerateMarketingOutreachInputSchema},
  output: {schema: GenerateMarketingOutreachOutputSchema},
  prompt: `You are a world-class B2B Marketing and Sales Strategist specializing in the Saudi Arabian construction and events market.

**Your Task:**
Based on the user's input, you will perform two critical functions:
1.  **Lead Generation:** Generate a list of 3-5 highly relevant, albeit hypothetical, potential client companies in Saudi Arabia that match the target audience description. For each lead, provide a fictional but realistic company name, a plausible contact email (e.g., info@company.sa, projects@company.com), and a short justification for why they are a good fit.
2.  **Craft a Persuasive Email:** Write a professional and compelling marketing email in ARABIC. The email should be addressed to a potential client, introducing the sender's company and its services, highlighting the value proposition, and ending with a clear call to action (e.g., scheduling a meeting).

**User's Input:**
- **Target Audience:** "{{targetAudienceDescription}}"
- **Sender's Company Name:** "{{senderCompanyName}}"
- **Sender's Company Specialty:** "{{senderCompanySpecialty}}"

**CRITICAL INSTRUCTIONS:**
- The email must be in professional, formal Arabic.
- The tone should be confident, persuasive, and respectful.
- The output must be in the required JSON format.

Generate the leads and the marketing email now.
`,
});

const generateMarketingOutreachFlow = ai.defineFlow(
  {
    name: 'generateMarketingOutreachFlow',
    inputSchema: GenerateMarketingOutreachInputSchema,
    outputSchema: GenerateMarketingOutreachOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
