
'use client';
import type {Metadata} from 'next';
import { Cairo } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import './i18n'; // Import i18n configuration
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import { CookieBanner } from '@/components/cookie-banner';

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
  const { i18n: i18nInstance } = useTranslation();
  const language = i18nInstance.language;

  return (
    <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker,drawing,geometry`}
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
            <CookieBanner />
          </ThemeProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}
