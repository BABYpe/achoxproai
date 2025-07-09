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

const GenerateReportInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
  projectStatus: z.string().describe('The current status of the project.'),
  projectBudget: z.string().describe('The total budget of the project.'),
  boqSummary: z
    .string()
    .describe('A summary of the Bill of Quantities (BOQ) for the project.'),
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
  input: {schema: GenerateReportInputSchema},
  output: {schema: GenerateReportOutputSchema},
  prompt: `You are a professional Senior Project Manager in a major construction company. Your task is to generate a comprehensive and well-structured project status report.

Use the following project data to create the report. The report should be in Markdown format, easy to read, and professional in tone. It should include sections for Introduction, Current Status, Budget Overview, and a summary of the Bill of Quantities.

**Project Data:**
- **Project Title:** {{{projectTitle}}}
- **Current Status:** {{{projectStatus}}}
- **Total Budget:** {{{projectBudget}}}
- **Bill of Quantities Summary:**
{{{boqSummary}}}

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
