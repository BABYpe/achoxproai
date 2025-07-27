
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
  prompt: `You are a world-class B2B Marketing and Sales Strategist specializing in the Saudi Arabian construction and events market. Your knowledge is based on a vast dataset of public information from professional networks, social media, and company websites.

**Your Task:**
Based on the user's input, you will perform two critical functions:
1.  **Lead Generation:**
    *   Generate a list of 3-5 real or highly realistic potential client companies in Saudi Arabia that perfectly match the target audience description.
    *   For each lead, provide the company name, a plausible contact email (e.g., projects@company.sa, info@company.com), and a short, sharp justification for why they are an excellent fit based on your knowledge.

2.  **Craft a Persuasive Email:**
    *   Write a professional and compelling marketing email in ARABIC.
    *   The email should be addressed to a potential client, introducing the sender's company and its services.
    *   Crucially, the email should be subtly tailored, as if you have some knowledge of the target company (e.g., "Noticed your recent projects in the luxury villa sector...").
    *   End with a clear call to action (e.g., scheduling a meeting).

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
