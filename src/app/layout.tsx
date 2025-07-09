import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'AchoX Pro',
  description: 'منصة AchoX Pro الهندسية',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        {children}
        <Toaster />
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
