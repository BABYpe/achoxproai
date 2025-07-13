'use server';

/**
 * @fileOverview A project report generation AI agent.
 *
 * - generateReport - A function that handles the project report generation process.
 * - GenerateReportInput - The input type for the generateReport function.
 * - GenerateReportOutput - The return type for the generateReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { type Project } from '@/hooks/use-project-store';

const GenerateReportInputSchema = z.object({
  project: z.object({
    title: z.string().describe('The title of the project.'),
    status: z.string().describe('The current status of the project.'),
    progress: z.number().describe('The completion progress percentage.'),
    budget: z.number().describe('The total budget of the project.'),
    currency: z.string().describe('The currency of the budget (e.g., SAR).'),
    endDate: z.string().describe('The planned end date of the project.'),
    manager: z.string().describe('The name of the project manager.'),
  }).describe("The project data object containing all necessary details.")
});
export type GenerateReportInput = z.infer<typeof GenerateReportInputSchema>;

const GenerateReportOutputSchema = z.object({
  report: z.string().describe('The generated project status report in Markdown format.'),
});
export type GenerateReportOutput = z.infer<typeof GenerateReportOutputSchema>;

export async function generateReport(
  input: GenerateReportInput
): Promise<GenerateReportOutput> {
  return generateReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportPrompt',
  model: 'gemini-1.5-flash-latest',
  input: {schema: GenerateReportInputSchema},
  output: {schema: GenerateReportOutputSchema},
  prompt: `You are a professional Senior Project Manager in a major construction company in Saudi Arabia. Your task is to generate a comprehensive and well-structured project status report in Arabic.

Use the following project data object to create the report. The report must be in Markdown format, easy to read, and professional in tone. It should include an introduction, a summary of the current status with progress, a budget overview, key achievements, potential risks or challenges, and a concluding summary.

**Project Data:**
- **Project Title:** {{{project.title}}}
- **Current Status:** {{{project.status}}}
- **Progress:** {{{project.progress}}}%
- **Total Budget:** {{{project.budget}}} {{{project.currency}}}
- **Planned End Date:** {{{project.endDate}}}
- **Project Manager:** {{{project.manager}}}

Structure the report clearly with appropriate headings. Be concise but thorough.

Generate the report now.
`,
});

const generateReportFlow = ai.defineFlow(
  {
    name: 'generateReportFlow',
    inputSchema: GenerateReportInputSchema,
    outputSchema: GenerateReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
