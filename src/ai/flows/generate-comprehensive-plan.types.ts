// src/ai/flows/generate-comprehensive-plan.types.ts
import {z} from 'zod';

import { AnalyzeProjectDescriptionOutputSchema } from './analyze-project-description.types';
import { AnalyzeBlueprintOutputSchema } from './analyze-blueprint.types';
import { EstimateProjectCostOutputSchema } from './estimate-project-cost.types';


export const GenerateComprehensivePlanInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDescription: z.string().describe('A textual description of the project provided by the user.'),
  location: z.string().describe('The physical location of the project (e.g., city).'),
  blueprintDataUri: z.string().optional().describe(
      "An optional blueprint file (PDF, DWG, etc.), as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateComprehensivePlanInput = z.infer<typeof GenerateComprehensivePlanInputSchema>;

export const GenerateComprehensivePlanOutputSchema = z.object({
    projectName: z.string(),
    location: z.string(),
    projectAnalysis: AnalyzeProjectDescriptionOutputSchema,
    blueprintAnalysis: AnalyzeBlueprintOutputSchema.optional(),
    costEstimation: EstimateProjectCostOutputSchema,
});
export type GenerateComprehensivePlanOutput = z.infer<typeof GenerateComprehensivePlanOutputSchema>;
