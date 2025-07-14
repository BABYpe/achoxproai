
'use server';

/**
 * @fileOverview A master AI agent that orchestrates other flows to generate a complete project plan.
 *
 * This flow acts as the "brain" of the platform, taking high-level user input
 * and generating a comprehensive plan by calling specialized AI flows for analysis and estimation.
 *
 * - generateComprehensivePlan - The main orchestrator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { format } from 'date-fns';

// Import the flows this orchestrator will use
import { analyzeProjectDescription } from './analyze-project-description';
import { type AnalyzeProjectDescriptionOutput, AnalyzeProjectDescriptionOutputSchema } from './analyze-project-description.types';
import { analyzeBlueprint } from './analyze-blueprint';
import { type AnalyzeBlueprintOutput, AnalyzeBlueprintOutputSchema } from './analyze-blueprint.types';
import { estimateProjectCost } from './estimate-project-cost';
import { type EstimateProjectCostOutput, EstimateProjectCostOutputSchema } from './estimate-project-cost.types';


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


export async function generateComprehensivePlan(input: GenerateComprehensivePlanInput): Promise<GenerateComprehensivePlanOutput> {
  return comprehensivePlanFlow(input);
}


const comprehensivePlanFlow = ai.defineFlow(
  {
    name: 'comprehensivePlanFlow',
    inputSchema: GenerateComprehensivePlanInputSchema,
    outputSchema: GenerateComprehensivePlanOutputSchema,
  },
  async (input) => {
    // Step 1: Analyze the initial text description to get project type and quality.
    const projectAnalysis = await analyzeProjectDescription({ description: input.projectDescription });

    let blueprintAnalysis: AnalyzeBlueprintOutput | undefined = undefined;
    let finalScopeOfWork = input.projectDescription;
    let projectSize = "500"; // Default size if not determined otherwise

    // Step 2: If a blueprint is provided, analyze it. This is a more detailed source of truth.
    if (input.blueprintDataUri) {
        blueprintAnalysis = await analyzeBlueprint({ blueprintDataUri: input.blueprintDataUri });
        
        // The scope of work from the blueprint is more accurate, so we use it.
        finalScopeOfWork = `
        **User Description:** ${input.projectDescription}
        
        **Blueprint Analysis Summary:** ${blueprintAnalysis.scopeOfWork}

        **Required Items from Blueprint:**
        ${blueprintAnalysis.requiredItems.map(item => `- ${item.item}: ${item.reason}`).join('\n')}
        `;
        
        // Extract area from blueprint analysis to use as project size
        const areaMatch = blueprintAnalysis.quantities.area.match(/[\d.]+/);
        if (areaMatch) {
            projectSize = areaMatch[0];
        }
    }

    // Step 3: Use the gathered information to estimate project cost and create a plan.
    const costEstimation = await estimateProjectCost({
        location: input.location,
        size: projectSize,
        type: projectAnalysis.projectType,
        quality: projectAnalysis.quality,
        scopeOfWork: finalScopeOfWork,
        currentDate: format(new Date(), 'yyyy-MM-dd'),
    });

    // Step 4: Assemble and return the final comprehensive plan.
    return {
        projectName: input.projectName,
        location: input.location,
        projectAnalysis,
        blueprintAnalysis,
        costEstimation,
    };
  }
);
