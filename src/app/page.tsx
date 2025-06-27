import { ScamAnalyzer } from '@/components/scam-analyzer';

export default function Home() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tighter">
          Trust Your Instincts.
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">
          We'll Help You Verify Them.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
          Feeling unsure about a message? You've come to the right place.
          ScamSensei helps you analyze suspicious texts, emails, and phone
          calls, empowering you to spot scams with confidence.
        </p>
      </div>

      <ScamAnalyzer />
    </div>
  );
}
