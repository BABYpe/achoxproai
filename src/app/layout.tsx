import type { Metadata, Viewport } from 'next';
import { Cairo } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import ClientLayout from './client-layout';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieBanner } from '@/components/cookie-banner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PerformanceMonitor } from '@/components/performance-monitor';
import { QueryProvider } from '@/components/query-provider';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  display: 'swap',
  variable: '--font-cairo',
})

const APP_NAME = "AchoX Pro";
const APP_DEFAULT_TITLE = "AchoX Pro | منصة إدارة المشاريع الذكية";
const APP_TITLE_TEMPLATE = "%s | AchoX Pro";
const APP_DESCRIPTION = "شريكك الذكي في إدارة المشاريع الهندسية والفعاليات. حلل المخططات، سعّر المشاريع بدقة، وولد خطط عمل متكاملة بالذكاء الاصطناعي.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: "#FFD700", // Or your primary color
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ar" dir='rtl' suppressHydrationWarning>
      <head>
         <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className={`${cairo.variable} font-body antialiased bg-background`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <QueryProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
            <Toaster />
            <CookieBanner />
            <PerformanceMonitor />
            <Analytics />
            <SpeedInsights />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}