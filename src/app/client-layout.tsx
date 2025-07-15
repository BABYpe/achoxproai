'use client';

import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n: i18nInstance } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    const language = i18nInstance.language;
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [i18nInstance.language]);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
