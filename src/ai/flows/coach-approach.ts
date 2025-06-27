'use server';

/**
 * @fileOverview Implements the Coach Approach flow, guiding users through analyzing suspicious messages with simple questions to help them identify scam indicators.
 *
 * - coachApproach - A function that initiates the coaching process.
 * - CoachApproachInput - The input type for the coachApproach function.
 * - CoachApproachOutput - The return type for the coachApproach function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CoachApproachInputSchema = z.object({
  message: z.string().describe('The suspicious message to analyze.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the potential scam, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CoachApproachInput = z.infer<typeof CoachApproachInputSchema>;

const CoachApproachOutputSchema = z.object({
  question: z
    .string()
    .describe('A guiding question to help the user analyze the message.'),
  isScam: z
    .boolean()
    .optional()
    .describe('Whether the message is likely a scam.'),
  reason: z
    .string()
    .optional()
    .describe('The reasoning behind the scam assessment.'),
});
export type CoachApproachOutput = z.infer<typeof CoachApproachOutputSchema>;

export async function coachApproach(
  input: CoachApproachInput
): Promise<CoachApproachOutput> {
  return coachApproachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'coachApproachPrompt',
  input: {schema: CoachApproachInputSchema},
  output: {schema: CoachApproachOutputSchema},
  prompt: `You are a scam-spotting coach, helping users identify potential scams in messages or images.

  Analyze the following message and/or image and pose a simple question to guide the user in identifying scam indicators. Focus on sender, language, links, and requests.
  If the content is clearly a scam, you can set the isScam output to true and provide a reason. Otherwise, focus on asking a guiding question.

  {{#if message}}Message: {{{message}}}{{/if}}
  {{#if photoDataUri}}Photo: {{media url=photoDataUri}}{{/if}}
  `,
});

const coachApproachFlow = ai.defineFlow(
  {
    name: 'coachApproachFlow',
    inputSchema: CoachApproachInputSchema,
    outputSchema: CoachApproachOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
