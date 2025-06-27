import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const practiceScenarios = [
  {
    type: 'scam',
    title: 'The "Urgent Bank Alert"',
    message:
      'Your bank account has been locked due to suspicious activity. Click here to verify your identity now: [suspicious link]',
    explanation:
      "Banks rarely send security alerts via text with clickable links. The urgency is a classic pressure tactic to make you act without thinking. Always log in to your bank's website directly, never through a link.",
  },
  {
    type: 'scam',
    title: 'The "You Won!" Prize',
    message:
      "CONGRATULATIONS! You've won a new iPhone. To claim your prize, please pay a small shipping fee of $1.99. Enter your card details here: [phishing website]",
    explanation:
      "Legitimate prizes don't require you to pay. This is a common trick to steal your credit card information. If it sounds too good to be true, it probably is.",
  },
  {
    type: 'safe',
    title: 'A Legit Appointment Reminder',
    message:
      'Reminder: You have an appointment with Dr. Smith tomorrow at 2 PM. Please call 555-123-4567 to reschedule.',
    explanation:
      "This message is informational, doesn't ask for personal data, and provides a clear, standard phone number. It lacks urgency or any suspicious requests.",
  },
  {
    type: 'scam',
    title: 'The "Problem with your Delivery" Ploy',
    message:
      'USPS: We had a problem with your package delivery. Please visit [fake tracking site] to provide your details for redelivery.',
    explanation:
      'Delivery services like USPS or FedEx will leave a notice on your door if they miss you. They won\'t text you with a link asking for personal information to rearrange delivery.',
  },
];

export default function PracticePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Practice Mode
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Hone your scam-spotting skills in a safe environment. Review these
          real-world examples to learn the common red flags.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-12">
        <Accordion type="single" collapsible className="w-full">
          {practiceScenarios.map((scenario, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg hover:no-underline text-left">
                <div className="flex items-center gap-4">
                  {scenario.type === 'scam' ? (
                    <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="h-6 w-6 text-[hsl(var(--chart-2))] flex-shrink-0" />
                  )}
                  <span>{scenario.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-background rounded-b-md">
                <blockquote className="border-l-4 pl-4 italic text-muted-foreground mb-4">
                  "{scenario.message}"
                </blockquote>
                <h4 className="font-semibold mb-2">Analysis:</h4>
                <p>{scenario.explanation}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
