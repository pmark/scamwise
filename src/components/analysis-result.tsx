'use client';

import type { AssessScamOutput } from '@/ai/flows/instant-scam-assessment';
import type { CoachApproachOutput } from '@/ai/flows/coach-approach';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldAlert, ShieldX, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type AnalysisResultType =
  | (AssessScamOutput & { type: 'instant' })
  | (CoachApproachOutput & { type: 'coach' });

interface AnalysisResultProps {
  result: AnalysisResultType;
  originalMessage: string;
}

const riskConfig = {
  safe: {
    label: 'Looks Safe',
    icon: <Shield className="h-6 w-6 text-[hsl(var(--chart-2))]" />,
    variant: 'secondary',
    className: 'border-[hsl(var(--chart-2))]',
  },
  'be careful': {
    label: 'Be Careful',
    icon: <ShieldAlert className="h-6 w-6 text-primary" />,
    variant: 'secondary',
    className: 'border-primary',
  },
  'likely a scam': {
    label: 'Likely a Scam',
    icon: <ShieldX className="h-6 w-6 text-destructive" />,
    variant: 'destructive',
    className: 'border-destructive',
  },
} as const;

export function AnalysisResult({ result, originalMessage }: AnalysisResultProps) {
  const { toast } = useToast();

  const handleShare = () => {
    let shareText = '';
    if (result.type === 'instant') {
      shareText = `I checked a message with ScamSensei and it's been flagged as "${
        result.riskLevel
      }".\n\nOriginal message:\n"${originalMessage}"\n\nReasoning from ScamSensei:\n${
        result.reasoning
      }`;
    } else {
      shareText = `I analyzed a message with ScamSensei's Coach Approach.\n\nOriginal message:\n"${originalMessage}"\n\nHere's what it asked me to consider:\n${
        result.question
      }`;
    }

    if (navigator.share) {
      navigator
        .share({
          title: 'ScamSensei Analysis Result',
          text: shareText,
        })
        .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: 'Copied to clipboard!',
          description: 'You can now paste this to share.',
        });
      });
    }
  };

  if (result.type === 'instant') {
    const config = riskConfig[result.riskLevel];
    return (
      <Card className={config.className}>
        <CardHeader>
          <div className="flex items-center gap-4">
            {config.icon}
            <div>
              <CardTitle className="text-2xl">{config.label}</CardTitle>
              <Badge variant={config.variant} className="mt-1">
                {result.riskLevel}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">Here's why:</h3>
          <p className="text-foreground/90 whitespace-pre-wrap">
            {result.reasoning}
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleShare} variant="ghost">
            <Share2 className="mr-2 h-4 w-4" />
            Share with Family
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (result.type === 'coach') {
    return (
      <Card className="bg-secondary">
        <CardHeader>
          <CardTitle className="text-2xl">Coach's Question</CardTitle>
          <CardDescription>
            Think about this and see what you notice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <blockquote className="border-l-4 border-accent pl-4">
            <p className="text-lg font-medium text-foreground/90">
              "{result.question}"
            </p>
          </blockquote>
          {result.isScam && result.reason && (
            <div className="mt-4 p-4 rounded-md bg-destructive/10">
              <h3 className="font-bold text-destructive">Heads up!</h3>
              <p className="text-destructive/90">{result.reason}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleShare} variant="ghost">
            <Share2 className="mr-2 h-4 w-4" />
            Share with Family
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return null;
}
