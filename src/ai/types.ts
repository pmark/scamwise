/**
 * @fileOverview Shared types and schemas for the AI assessment flow.
 */

import {z} from 'zod';

export const ChecklistItemSchema = z.object({
  id: z
    .string()
    .describe(
      'A unique identifier for the checklist item (e.g., "urgency").'
    ),
  question: z
    .string()
    .describe('The question presented to the user for this check.'),
  explanation: z
    .string()
    .describe(
      'A brief explanation of why this check is important for spotting scams.'
    ),
  ai_answer: z
    .enum(['Yes', 'No', 'N/A'])
    .describe("The AI's answer to the checklist question."),
  ai_reasoning: z
    .string()
    .describe("The AI's reasoning for its answer."),
});
export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;

export const UnifiedAssessmentInputSchema = z.object({
  message: z.string().describe('The message to assess for scam likelihood.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the potential scam, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type UnifiedAssessmentInput = z.infer<
  typeof UnifiedAssessmentInputSchema
>;

export const UnifiedAssessmentOutputSchema = z.object({
  verdict: z
    .enum(['safe', 'be careful', 'likely a scam'])
    .describe('The overall risk level of the message.'),
  recommendation: z
    .string()
    .describe('A clear, actionable recommendation for the user.'),
  checklist: z
    .array(ChecklistItemSchema)
    .describe('An array of scam indicator checklist items.'),
});
export type UnifiedAssessmentOutput = z.infer<
  typeof UnifiedAssessmentOutputSchema
>;
