
'use server';
/**
 * @fileOverview A financial analysis AI agent.
 *
 * - analyzeFinancials - A function that analyzes project financials.
 * - AnalyzeFinancialsInput - The input type for the function.
 * - AnalyzeFinancialsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzeFinancialsInputSchema = z.object({
  project: z.object({
    title: z.string().describe('The title of the project.'),
    status: z.string().describe('The current status of the project.'),
    progress: z.number().describe('The completion progress percentage.'),
    budget: z.number().describe('The total budget of the project.'),
    currency: z.string().describe('The currency of the budget (e.g., SAR).'),
  }).describe("The project data object."),
  transactions: z.array(z.object({
      description: z.string(),
      amount: z.number(),
      category: z.string(),
      date: z.string(),
  })).describe("A list of financial transactions for the project."),
});

export type AnalyzeFinancialsInput = z.infer<typeof AnalyzeFinancialsInputSchema>;


const AnalyzeFinancialsOutputSchema = z.object({
  executiveSummary: z.string().describe("A concise summary of the project's financial health, written in Arabic."),
  risks: z.array(z.string()).describe("A list of potential financial risks identified from the data, written in Arabic."),
  recommendations: z.array(z.string()).describe("A list of actionable recommendations to improve financial performance, written in Arabic."),
});

export type AnalyzeFinancialsOutput = z.infer<typeof AnalyzeFinancialsOutputSchema>;


export async function analyzeFinancials(
  input: AnalyzeFinancialsInput
): Promise<AnalyzeFinancialsOutput> {
  return analyzeFinancialsFlow(input);
}


const prompt = ai.definePrompt({
  name: 'analyzeFinancialsPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: AnalyzeFinancialsInputSchema},
  output: {schema: AnalyzeFinancialsOutputSchema},
  prompt: `You are a Senior Financial Analyst and Risk Manager for a major construction company in Saudi Arabia. Your task is to provide a professional financial analysis report in ARABIC based on the provided project data.

**Project Data:**
- **Project Title:** {{{project.title}}}
- **Status:** {{{project.status}}}
- **Progress:** {{{project.progress}}}%
- **Budget:** {{{project.budget}}} {{{project.currency}}}
- **Transactions:**
{{#each transactions}}
  - {{date}}: {{description}} ({{category}}) - {{amount}} {{{project.currency}}}
{{/each}}

**Instructions:**
1.  **Calculate Key Metrics (Internal Thought Process):**
    *   First, calculate the total spending by summing all transaction amounts.
    *   Then, calculate the remaining budget (Budget - Total Spending).
    *   Then, calculate the spending per category.
    *   Finally, calculate the burn rate (Total Spending / Budget) and compare it to the project progress ({{{project.progress}}}%).

2.  **Write an Executive Summary:** Based on your calculations, provide a brief, professional summary in Arabic of the project's financial health. Is the spending aligned with the progress? Is it on track, over budget, or performing well?

3.  **Identify Potential Risks:** Based on the data and your calculated metrics, identify 2-3 key financial risks. Examples could be:
    *   "معدل الصرف الحالي (مثلاً 50%) أعلى من نسبة الإنجاز (مثلاً 30%)، مما قد يؤدي إلى نفاذ الميزانية قبل اكتمال المشروع."
    *   "تركز المصاريف بشكل كبير في فئة 'مواد البناء'، مما قد يشير إلى عدم وجود أسعار تنافسية أو هدر في المواد."
    *   "عدم وجود معاملات مسجلة لفئة 'أجور العمال' قد يشير إلى تأخر في الدفع أو عدم تسجيل دقيق."

4.  **Provide Actionable Recommendations:** Based on the identified risks, provide 2-3 concrete recommendations in Arabic. Examples:
    *   "مراجعة العقود مع الموردين الرئيسيين للحصول على أسعار أفضل أو البحث عن موردين بدلاء."
    *   "إعادة تقييم الجدول الزمني للمشروع ليتناسب مع الميزانية المتبقية."
    *   "تطبيق نظام أكثر صرامة لتسجيل جميع المصروفات بشكل فوري."

5.  **Output:** Provide the entire analysis in the required JSON format with all text in Arabic. Be professional, data-driven, and concise. Your analysis must be based on the numbers you calculated.
`,
});

const analyzeFinancialsFlow = ai.defineFlow(
  {
    name: 'analyzeFinancialsFlow',
    inputSchema: AnalyzeFinancialsInputSchema,
    outputSchema: AnalyzeFinancialsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
