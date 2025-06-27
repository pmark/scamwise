import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LifeBuoy } from 'lucide-react';

const resources = [
  {
    title: 'Federal Trade Commission (FTC)',
    description:
      'Report fraud, identity theft, or bad business practices to the U.S. government\'s consumer protection agency.',
    link: 'https://www.ftc.gov/complaint',
    linkText: 'Report to FTC',
  },
  {
    title: 'FBI Internet Crime Complaint Center (IC3)',
    description:
      'For cybercrime victims, the IC3 provides a central hub for reporting internet-related criminal complaints.',
    link: 'https://www.ic3.gov/',
    linkText: 'Visit IC3',
  },
  {
    title: 'AARP Fraud Watch Network',
    description:
      'A free resource for all. Get access to a scam-tracking map, and a helpline for when you\'re feeling worried.',
    link: 'https://www.aarp.org/money/scams-fraud/watchdog-network/',
    linkText: 'AARP Fraud Watch',
  },
  {
    title: 'National Elder Fraud Hotline',
    description:
      'For adults ages 60 and older who have experienced fraud. Provides personalized support and guidance.',
    link: 'tel:833-372-8311',
    linkText: 'Call 833-372-8311',
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Support Resources
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          You're not alone. If you've been targeted by a scam, these
          organizations can help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
        {resources.map((resource) => (
          <Card key={resource.title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild>
                <Link
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.linkText}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
