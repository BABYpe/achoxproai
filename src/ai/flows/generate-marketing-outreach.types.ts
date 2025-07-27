// src/ai/flows/generate-marketing-outreach.types.ts
import {z} from 'zod';

export const GenerateMarketingOutreachInputSchema = z.object({
  targetAudienceDescription: z.string().describe('A description of the target audience or ideal customer profile.'),
  senderCompanyName: z.string().describe('The name of the company sending the email.'),
  senderCompanySpecialty: z.string().describe('A brief description of what the sending company specializes in.'),
});
export type GenerateMarketingOutreachInput = z.infer<typeof GenerateMarketingOutreachInputSchema>;


export const GenerateMarketingOutreachOutputSchema = z.object({
  leads: z.array(z.object({
    companyName: z.string().describe('The name of the potential lead company.'),
    email: z.string().describe('The suggested contact email for the lead.'),
    reason: z.string().describe('A brief reason why this company is a good potential lead.'),
  })).describe('A list of generated potential leads.'),
  persuasiveEmail: z.object({
    subject: z.string().describe('The suggested subject line for the email.'),
    body: z.string().describe('The generated professional and persuasive marketing email body. The email should be in Arabic, professionally formatted, and ready to be sent.'),
  }),
});
export type GenerateMarketingOutreachOutput = z.infer<typeof GenerateMarketingOutreachOutputSchema>;
