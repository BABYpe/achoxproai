'use client';

import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieBanner } from '@/components/cookie-banner';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n: i18nInstance } = useTranslation();
  const language = i18nInstance.language;

  return (
    <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CookieBanner />
        </ThemeProvider>
      </I18nextProvider>
    </html>
  );
}
