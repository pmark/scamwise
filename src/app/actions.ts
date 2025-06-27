'use server';

import {unifiedAssessment} from '@/ai/flows/unified-assessment';
import type {
  UnifiedAssessmentInput,
  UnifiedAssessmentOutput,
} from '@/ai/types';

export async function getUnifiedAssessment(
  input: UnifiedAssessmentInput
): Promise<UnifiedAssessmentOutput> {
  return await unifiedAssessment(input);
}
