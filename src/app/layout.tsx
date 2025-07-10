
'use client';
import type {Metadata} from 'next';
import { Cairo } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import './i18n'; // Import i18n configuration
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { use } from 'react';

const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
})

// Metadata can't be dynamically generated in a client component.
// We'll manage the title dynamically if needed using other methods.
// export const metadata: Metadata = {
//   title: 'AchoX Pro AI',
//   description: 'منصة AchoX Pro AI هي شريكك الذكي الذي يقرأ كراسات الشروط، يحلل المخططات، يسعّر المشاريع بدقة، ويولد خطط عمل متكاملة.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { language } = use(i18n);

  return (
    <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <title>AchoX Pro AI</title>
         <meta
          name="description"
          content="منصة AchoX Pro AI هي شريكك الذكي الذي يقرأ كراسات الشروط، يحلل المخططات، يسعّر المشاريع بدقة، ويولد خطط عمل متكاملة."
        />
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${cairo.variable} font-body antialiased bg-background`}>
       <I18nextProvider i18n={i18n}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}
