
import type {Metadata} from 'next';
import { Cairo } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import ClientLayout from './client-layout';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieBanner } from '@/components/cookie-banner';

const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
})

// Default metadata
export const metadata: Metadata = {
  title: 'MDAMAI | منصة إدارة المشاريع الذكية',
  description: 'منصة MDAMAI هي شريكك الذكي الذي يقرأ كراسات الشروط، يحلل المخططات، يسعّر المشاريع بدقة، ويولد خطط عمل متكاملة.',
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
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster />
            <CookieBanner />
        </ThemeProvider>
      </body>
    </ClientLayout>
  );
}
