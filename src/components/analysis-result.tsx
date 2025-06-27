'use client';

import { useState } from 'react';
import type {
  UnifiedAssessmentOutput,
  ChecklistItem,
} from '@/ai/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertCircle,
  CheckCircle2,
  Shield,
  ShieldAlert,
  ShieldX,
  RefreshCw,
  Info,
} from 'lucide-react';
import { BuyMeACoffeeButton } from './buy-me-a-coffee-button';

interface AnalysisResultProps {
  result: UnifiedAssessmentOutput;
  mode: 'instant' | 'coach';
  onReset: () => void;
}

const riskConfig = {
  safe: {
    label: 'Looks Safe',
    icon: <Shield className="h-8 w-8 text-[hsl(var(--chart-2))]" />,
    className: 'border-[hsl(var(--chart-2))]',
  },
  'be careful': {
    label: 'Be Careful',
    icon: <ShieldAlert className="h-8 w-8 text-primary" />,
    className: 'border-primary',
  },
  'likely a scam': {
    label: 'Likely a Scam',
    icon: <ShieldX className="h-8 w-8 text-destructive" />,
    className: 'border-destructive',
  },
} as const;

function VerdictCard({
  verdict,
  recommendation,
  onReset,
}: {
  verdict: UnifiedAssessmentOutput['verdict'];
  recommendation: string;
  onReset: () => void;
}) {
  const config = riskConfig[verdict];
  return (
    <Card className={config.className}>
      <CardHeader>
        <div className="flex items-center gap-4">
          {config.icon}
          <CardTitle className="text-3xl">{config.label}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2 text-lg">Our Recommendation:</h3>
        <p className="text-foreground/90">{recommendation}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-4">
        <Button onClick={onReset} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Analyze Another
        </Button>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-2">
            This service has real costs to run. Your support is greatly
            appreciated!
          </p>
          <BuyMeACoffeeButton />
        </div>
      </CardFooter>
    </Card>
  );
}

function InstantAnalysis({
  result,
  onReset,
}: Omit<AnalysisResultProps, 'mode'>) {
  return (
    <div className="space-y-8">
      <VerdictCard
        verdict={result.verdict}
        recommendation={result.recommendation}
        onReset={onReset}
      />
      <Card>
        <CardHeader>
          <CardTitle>Analysis Checklist</CardTitle>
          <CardDescription>
            Here's a point-by-point breakdown of our assessment. Click on any
            item to see our reasoning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {result.checklist.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    {item.ai_answer === 'Yes' ? (
                      <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="h-6 w-6 text-[hsl(var(--chart-2))] flex-shrink-0" />
                    )}
                    <span className="text-base">{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-secondary/50 rounded-b-md space-y-4">
                  <div className="flex gap-2">
                    <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="italic text-muted-foreground">
                      {item.explanation}
                    </p>
                  </div>
                  <p className="whitespace-pre-wrap">{item.ai_reasoning}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

function CoachingAnalysis({
  result,
  onReset,
}: Omit<AnalysisResultProps, 'mode'>) {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<{
    userAnswer: 'Yes' | 'No';
    isCorrect: boolean;
  } | null>(null);

  const currentItem = result.checklist[step];

  const handleAnswer = (userAnswer: 'Yes' | 'No') => {
    const aiAnswer = currentItem.ai_answer;
    const isCorrect = userAnswer === aiAnswer || aiAnswer === 'N/A';
    setFeedback({ userAnswer, isCorrect });
  };

  const handleNext = () => {
    setFeedback(null);
    setStep((prev) => prev + 1);
  };

  if (step >= result.checklist.length) {
    return (
      <div className="space-y-8">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Coaching Complete! Here's the final verdict.
        </h2>
        <VerdictCard
          verdict={result.verdict}
          recommendation={result.recommendation}
          onReset={onReset}
        />
      </div>
    );
  }

  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle className="text-2xl">
          Coaching Mode ({step + 1} / {result.checklist.length})
        </CardTitle>
        <CardDescription>
          Let's analyze this together. What do you think?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <blockquote className="border-l-4 border-accent pl-4">
          <p className="text-xl font-medium text-foreground/90">
            "{currentItem.question}"
          </p>
        </blockquote>
        <div className="flex gap-2 text-sm items-start bg-background/50 p-3 rounded-md">
          <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-muted-foreground">{currentItem.explanation}</p>
        </div>

        {!feedback && (
          <div className="flex justify-center gap-4 pt-4">
            <Button
              size="lg"
              variant="destructive"
              onClick={() => handleAnswer('Yes')}
              className="w-32"
            >
              <AlertCircle className="mr-2 h-5 w-5" /> Yes
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-32"
              onClick={() => handleAnswer('No')}
            >
              <CheckCircle2 className="mr-2 h-5 w-5" /> No
            </Button>
          </div>
        )}

        {feedback && (
          <div className="p-4 rounded-md border bg-background animate-in fade-in">
            <h3 className="font-bold mb-2 text-lg">
              {feedback.isCorrect ? 'You got it!' : "That's a tricky one."}
            </h3>
            <p className="mb-4">
              You answered{' '}
              <span className="font-bold">{feedback.userAnswer}</span>. Our AI
              said <span className="font-bold">{currentItem.ai_answer}</span>.
            </p>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {currentItem.ai_reasoning}
            </p>
          </div>
        )}
      </CardContent>
      {feedback && (
        <CardFooter>
          <Button onClick={handleNext} className="w-full">
            {step === result.checklist.length - 1
              ? 'See Final Verdict'
              : 'Next Question'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export function AnalysisResult({ result, mode, onReset }: AnalysisResultProps) {
  if (mode === 'instant') {
    return <InstantAnalysis result={result} onReset={onReset} />;
  }
  if (mode === 'coach') {
    return <CoachingAnalysis result={result} onReset={onReset} />;
  }
  return null;
}
