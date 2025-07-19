
'use server';
/**
 * @fileOverview An AI agent for generating professional price quotes.
 *
 * - generateQuote - A function that handles the quote generation process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateQuoteInputSchema = z.object({
    companyName: z.string().describe("The name of the company sending the quote."),
    clientName: z.string().describe("The name of the client receiving the quote."),
    consultantName: z.string().describe("The name of the consulting firm supervising the project."),
    projectName: z.string().describe("The name of the project."),
    quoteDate: z.string().describe("The date the quote is being generated (YYYY-MM-DD)."),
    boq: z.array(z.object({
        id: z.string(),
        description: z.string(),
        unit: z.string(),
        quantity: z.number(),
        unitPrice: z.number(),
        total: z.number(),
    })).describe("The Bill of Quantities for the project."),
});

export type GenerateQuoteInput = z.infer<typeof GenerateQuoteInputSchema>;


const GenerateQuoteOutputSchema = z.object({
  markdownQuote: z.string().describe("The full, professional price quote formatted in Markdown."),
});

export type GenerateQuoteOutput = z.infer<typeof GenerateQuoteOutputSchema>;


export async function generateQuote(
  input: GenerateQuoteInput
): Promise<GenerateQuoteOutput> {
  return generateQuoteFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generateQuotePrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: GenerateQuoteInputSchema},
  output: {schema: GenerateQuoteOutputSchema},
  prompt: `You are a Senior Contracts and Tendering Manager in a major Saudi construction company. Your task is to generate a comprehensive and highly professional price quote in ARABIC, formatted in Markdown.

Use the provided data to construct the quote. The quote must be formal, well-structured, and include all necessary commercial and legal clauses based on best practices in the Saudi market.

**Data Provided:**
- **From:** {{{companyName}}}
- **To (Client):** {{{clientName}}}
- **To (Consultant):** {{{consultantName}}}
- **Project:** {{{projectName}}}
- **Date:** {{{quoteDate}}}
- **Bill of Quantities (BOQ):**
{{#each boq}}
  - **Item:** {{description}} | **Qty:** {{quantity}} | **Unit:** {{unit}} | **Total:** {{total}} SAR
{{/each}}


**CRITICAL INSTRUCTIONS - Structure the Markdown output as follows:**

1.  **Header:** Start with the company name, a reference number (e.g., "عرض سعر رقم: QC-{{quoteDate}}-001"), and the date.
2.  **Addressees:** Clearly address the quote to the Client and the Consultant.
3.  **Subject Line:** A clear subject line, e.g., "الموضوع: عرض سعر لأعمال... في مشروع...".
4.  **Introduction:** A formal introductory paragraph referencing their request for a quote.
5.  **Price Table:** Create a clean Markdown table for the BOQ with columns: "م", "البيان", "الوحدة", "الكمية", "سعر الوحدة", "الإجمالي".
6.  **Total:** Clearly state the total amount in numbers and words (e.g., "الإجمالي (فقط مائة وستة وثلاثون ألف ريال سعودي لا غير)").
7.  **Commercial & Legal Terms (VERY IMPORTANT):** This section is what makes the quote professional. You **MUST** generate realistic and standard clauses. Include:
    *   **مدة التنفيذ (Execution Period):** Propose a realistic duration in working days.
    *   **شروط الدفع (Payment Terms):** Propose a standard payment structure. A common structure is a 50% advance payment and the rest in progress payments.
    *   **آلية صرف المستخلصات (Invoicing Mechanism):** Describe the process of submitting invoices to the consultant for approval.
    *   **ضمان الأعمال (Work Guarantee):** Specify a standard retention percentage (e.g., 10%) to be deducted from invoices and released after the maintenance period.
    *   **ملاحظات (Notes):** Add a clause stating the price is valid for a specific period (e.g., 15 days) and does not include VAT.
8.  **Closing:** End with a formal closing ("وتفضلوا بقبول فائق الاحترام والتقدير...") and the sender's company name and title (e.g., "إدارة العقود والتسعير").

Generate the complete and professional Markdown quote now.
`,
});

const generateQuoteFlow = ai.defineFlow(
  {
    name: 'generateQuoteFlow',
    inputSchema: GenerateQuoteInputSchema,
    outputSchema: GenerateQuoteOutputSchema,
  },
  async input => {
    // In a real app, you could add logic here to fetch company details or format data.
    const {output} = await prompt(input);
    // The AI is expected to return the full markdown content in the 'markdownQuote' field.
    return { markdownQuote: output!.markdownQuote };
  }
);
