import Link from 'next/link';
import { Coffee } from 'lucide-react';

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
            <a
              href="https://coff.ee/scamwise"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline flex items-center gap-1.5"
            >
              <Coffee className="h-4 w-4" />
              Buy me a coffee
            </a>
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
