
import type {Metadata} from 'next';
import { Cairo } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
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
        <meta name="description" content={metadata.description!} />
      </head>
      <body className={`${cairo.variable} font-body antialiased bg-background`}>
        {children}
        <Toaster />
      </body>
    </ClientLayout>
  );
}

    