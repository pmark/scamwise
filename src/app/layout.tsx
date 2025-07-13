import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Script from 'next/script';
import { FirebaseAnalytics } from '@/components/firebase-analytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://scamwise.martianrover.com'), // Replace with your actual domain
  title: {
    default: 'ScamWise - Your Personal Scam-Spotting Coach',
    template: '%s | ScamWise',
  },
  description:
    'Build confidence in spotting scams. Get quick answers or let our Coach Approach guide you. Simple, private, and designed to make you more confident.',
  keywords: [
    'scam detector',
    'phishing checker',
    'email scanner',
    'text message scam',
    'online safety',
    'fraud prevention',
    'scam analysis',
  ],
  openGraph: {
    title: 'ScamWise - Your Personal Scam-Spotting Coach',
    description: 'Trust Your Instincts. We\'ll Help You Verify Them.',
    type: 'website',
    locale: 'en_US',
    url: 'https://scamwise.martianrover.com', // Replace with your actual domain
    siteName: 'ScamWise',
    images: [
      {
        url: '/opengraph-image.png', // The dynamically generated image
        width: 1200,
        height: 630,
        alt: 'ScamWise - Your Personal Scam-Spotting Coach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScamWise - Your Personal Scam-Spotting Coach',
    description: 'Trust Your Instincts. We\'ll Help You Verify Them.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased bg-background text-foreground flex flex-col min-h-screen">
        <FirebaseAnalytics />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KL008XDLZS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KL008XDLZS');
          `}
        </Script>
      </body>
    </html>
  );
}
