'use server';
/**
 * @fileOverview A unified AI flow for scam assessment that powers both instant and coaching modes.
 *
 * This file exports a single function:
 * - unifiedAssessment: A function that assesses a message against a checklist of scam indicators.
 */

import {ai} from '@/ai/genkit';
import {
  UnifiedAssessmentInputSchema,
  UnifiedAssessmentOutputSchema,
} from '@/ai/types';
import type {
  UnifiedAssessmentInput,
  UnifiedAssessmentOutput,
} from '@/ai/types';

export async function unifiedAssessment(
  input: UnifiedAssessmentInput
): Promise<UnifiedAssessmentOutput> {
  return unifiedAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'unifiedAssessmentPrompt',
  input: {schema: UnifiedAssessmentInputSchema},
  output: {schema: UnifiedAssessmentOutputSchema},
  prompt: `You are a scam detection expert. Your goal is to analyze a message and/or image and evaluate it against a checklist of common scam tactics.

You will provide a final verdict ('safe', 'be careful', or 'likely a scam') and a clear, actionable recommendation for the user.

Most importantly, you will fill out a checklist of evaluation points. For each point, provide your 'Yes', 'No', or 'N/A' answer and a brief reasoning for your conclusion based on the provided content.

Checklist to evaluate:
1.  **Sender Identity**: Is the sender's identity suspicious or unverified? (id: "sender_identity")
    - Question: "Is there anything suspicious about the sender's name, email, or phone number?"
    - Explanation: "Scammers often use fake email addresses, phone numbers, or social media profiles that look similar to legitimate ones."
2.  **Urgency and Pressure**: Does the message create a sense of urgency or pressure you to act quickly? (id: "urgency_pressure")
    - Question: "Are you being pressured to act immediately?"
    - Explanation: "Creating a sense of urgency is a common tactic to make you panic and bypass your better judgment."
3.  **Unusual Requests**: Does the message ask you to do something unusual, like click a strange link, send money, or provide personal information? (id: "unusual_requests")
    - Question: "Is the request unusual or unexpected?"
    - Explanation: "Be wary of requests for gift cards, wire transfers, or login credentials. Legitimate organizations rarely ask for these via unsolicited messages."
4.  **Spelling and Grammar**: Are there spelling mistakes, grammatical errors, or awkward phrasing? (id: "spelling_grammar")
    - Question: "Is the language professional and error-free?"
    - Explanation: "While not always present, errors in spelling and grammar can be a red flag that the message is not from a professional source."
5.  **Generic Greeting**: Does the message use a generic greeting like "Dear customer" instead of your name? (id: "generic_greeting")
    - Question: "Does the sender address you by name?"
    - Explanation: "If a company you do business with is contacting you, they will typically use your name."
6.  **Too Good To Be True**: Is the offer or prize mentioned too good to be true? (id: "too_good_to_be_true")
    - Question: "Does the offer seem too good to be true?"
    - Explanation: "Unexpected prize winnings or unbelievable discounts are classic scam lures."


Analyze the following content:
{{#if message}}Message: {{{message}}}{{/if}}
{{#if photoDataUri}}Photo: {{media url=photoDataUri}}{{/if}}
`,
});

const unifiedAssessmentFlow = ai.defineFlow(
  {
    name: 'unifiedAssessmentFlow',
    inputSchema: UnifiedAssessmentInputSchema,
    outputSchema: UnifiedAssessmentOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
