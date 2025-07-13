
import type {Metadata} from 'next';
import { Cairo } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script';
import './globals.css';
import ClientLayout from './client-layout';

const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
})

// Default metadata
export const metadata: Metadata = {
  title: 'AchoX Pro AI | منصة إدارة المشاريع الذكية',
  description: 'منصة AchoX Pro AI هي شريكك الذكي الذي يقرأ كراسات الشروط، يحلل المخططات، يسعّر المشاريع بدقة، ويولد خطط عمل متكاملة.',
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClientLayout>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
         <link rel="sitemap" href="/sitemap.xml" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <meta name="description" content={metadata.description!} />
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker,drawing,geometry`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${cairo.variable} font-body antialiased bg-background`}>
        {children}
        <Toaster />
      </body>
    </ClientLayout>
  );
}
