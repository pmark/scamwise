import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">ScamWise</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Analyze
          </Link>
          <Link
            href="/practice"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Practice
          </Link>
          <Link
            href="/resources"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Resources
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium mt-8">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="sr-only">ScamWise</span>
            </Link>
            <Link href="/" className="hover:text-foreground">
              Analyze
            </Link>
            <Link href="/practice" className="text-muted-foreground hover:text-foreground">
              Practice
            </Link>
            <Link href="/resources" className="text-muted-foreground hover:text-foreground">
              Resources
            </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
