import Link from 'next/link';
import { BuyMeACoffeeButton } from './buy-me-a-coffee-button';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ScamWise. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <BuyMeACoffeeButton />
          </nav>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          ScamWise is for informational purposes only and does not constitute
          legal or financial advice.
        </p>
      </div>
    </footer>
  );
}
