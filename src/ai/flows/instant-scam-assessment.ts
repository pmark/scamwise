'use server';
/**
 * @fileOverview AI flow for instant scam assessment.
 *
 * - assessScam - A function that assesses the likelihood of a message being a scam.
 * - AssessScamInput - The input type for the assessScam function.
 * - AssessScamOutput - The return type for the assessScam function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessScamInputSchema = z.object({
  message: z.string().describe('The message to assess for scam likelihood.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the potential scam, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AssessScamInput = z.infer<typeof AssessScamInputSchema>;

const AssessScamOutputSchema = z.object({
  riskLevel: z
    .enum(['safe', 'be careful', 'likely a scam'])
    .describe('The risk level of the message.'),
  reasoning: z.string().describe('The reasoning behind the risk assessment.'),
});
export type AssessScamOutput = z.infer<typeof AssessScamOutputSchema>;

export async function assessScam(
  input: AssessScamInput
): Promise<AssessScamOutput> {
  return assessScamFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessScamPrompt',
  input: {schema: AssessScamInputSchema},
  output: {schema: AssessScamOutputSchema},
  prompt: `You are a scam detection expert. Analyze the following message and/or image to determine if it is a scam.

{{#if message}}Message: {{{message}}}{{/if}}
{{#if photoDataUri}}Photo: {{media url=photoDataUri}}{{/if}}

Provide a risk assessment and reasoning. The risk assessment must be one of the following values: 'safe', 'be careful', or 'likely a scam'.

If there is no message and only an image, analyze the image. If there is no image and only a message, analyze the message. If both are present, use both as context.

Output the response in JSON format. The JSON must conform to the following schema:
${JSON.stringify(AssessScamOutputSchema.describe(''))}`,
});

const assessScamFlow = ai.defineFlow(
  {
    name: 'assessScamFlow',
    inputSchema: AssessScamInputSchema,
    outputSchema: AssessScamOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
