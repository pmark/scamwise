'use client';

import { useState } from 'react';
import type { AssessScamOutput } from '@/ai/flows/instant-scam-assessment';
import type { CoachApproachOutput } from '@/ai/flows/coach-approach';
import { getCoachApproach, getInstantAssessment } from '@/app/actions';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Camera, BotMessageSquare, ShieldAlert } from 'lucide-react';
import { AnalysisResult } from '@/components/analysis-result';
import { useToast } from '@/hooks/use-toast';

type AnalysisResultType =
  | (AssessScamOutput & { type: 'instant' })
  | (CoachApproachOutput & { type: 'coach' });

export function ScamAnalyzer() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResultType | null>(null);
  const { toast } = useToast();

  const handleAnalysis = async (type: 'instant' | 'coach') => {
    if (!message.trim()) {
      toast({
        title: 'Message is empty',
        description: 'Please enter a message to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      if (type === 'instant') {
        const result = await getInstantAssessment({ message });
        setAnalysisResult({ ...result, type: 'instant' });
      } else {
        const result = await getCoachApproach({ message });
        setAnalysisResult({ ...result, type: 'coach' });
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Check a Message</CardTitle>
          <CardDescription>
            Paste the message below, or type what someone said on the phone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="e.g. 'Hello, we've detected a problem with your account...'"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-base"
              disabled={isLoading}
            />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-muted-foreground"
                disabled={true}
              >
                <Camera className="mr-2 h-4 w-4" />
                Upload Photo (coming soon)
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <Button
            onClick={() => handleAnalysis('coach')}
            className="w-full sm:w-auto bg-accent hover:bg-accent/90"
            disabled={isLoading}
          >
            <BotMessageSquare className="mr-2 h-5 w-5" />
            The Coach Approach
          </Button>
          <Button
            onClick={() => handleAnalysis('instant')}
            variant="secondary"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            <ShieldAlert className="mr-2 h-5 w-5" />
            Quick Answer Mode
          </Button>
        </CardFooter>
      </Card>

      {isLoading && (
        <div className="text-center p-8">
          <div
            role="status"
            className="inline-flex items-center gap-2 text-muted-foreground"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 animate-spin text-primary fill-accent"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="text-lg">Analyzing...</span>
          </div>
        </div>
      )}

      {analysisResult && (
        <div className="mt-8 animate-in fade-in duration-500">
          <AnalysisResult
            result={analysisResult}
            originalMessage={message}
          />
        </div>
      )}
    </div>
  );
}
