// src/ai/flows/analyze-blueprint.types.ts
import {z} from 'zod';

export const AnalyzeBlueprintInputSchema = z.object({
  blueprintDataUri: z
    .string()
    .describe(
      "A blueprint file (PDF, DWG, DXF, JPG, PNG), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeBlueprintInput = z.infer<typeof AnalyzeBlueprintInputSchema>;

export const AnalyzeBlueprintOutputSchema = z.object({
  scopeOfWork: z.string().describe("A summary of the scope of work based on the blueprint."),
  warnings: z.array(z.object({
    category: z.enum(['Structural', 'Architectural', 'Electrical', 'Mechanical', 'Plumbing', 'Code Compliance', 'General']).describe("The category of the identified warning."),
    severity: z.enum(['High', 'Medium', 'Low']).describe("The severity level of the warning."),
    description: z.string().describe("A clear description of the warning, referencing Saudi Building Codes (SBC) where applicable."),
    recommendation: z.string().describe("An actionable recommendation to mitigate the identified risk."),
  })).describe("A list of potential engineering errors, inconsistencies, or risks found in the blueprint."),
  quantities: z.object({
    area: z.string().describe('The total area of the blueprint.'),
    length: z.string().describe('The total length of lines in the blueprint.'),
    objectCounts: z
      .record(z.string(), z.number())
      .describe('Counts of different objects identified in the blueprint (e.g., doors, windows, columns).'),
  }),
  requiredItems: z.array(z.object({
      item: z.string().describe("The name of the required construction item."),
      reason: z.string().describe("The reason or context for requiring this item based on the blueprint."),
  })).describe("A list of required items or materials to execute the plan."),
});
export type AnalyzeBlueprintOutput = z.infer<typeof AnalyzeBlueprintOutputSchema>;
