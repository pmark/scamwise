'use server';

import {
  assessScam,
  AssessScamInput,
  AssessScamOutput,
} from '@/ai/flows/instant-scam-assessment';
import {
  coachApproach,
  CoachApproachInput,
  CoachApproachOutput,
} from '@/ai/flows/coach-approach';

export async function getInstantAssessment(
  input: AssessScamInput
): Promise<AssessScamOutput> {
  return await assessScam(input);
}

export async function getCoachApproach(
  input: CoachApproachInput
): Promise<CoachApproachOutput> {
  return await coachApproach(input);
}
