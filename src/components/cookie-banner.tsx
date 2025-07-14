
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export function CookieBanner() {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // This code runs only on the client
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'true') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform transform duration-500",
        showBanner ? "translate-y-0" : "translate-y-full"
      )}
    >
        <div className="container mx-auto max-w-4xl bg-secondary text-secondary-foreground p-4 rounded-lg shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-border">
            <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary flex-shrink-0" />
                <p className="text-sm">
                    {t('cookieBanner.message')}
                </p>
            </div>
            <Button onClick={handleAccept} className="w-full sm:w-auto flex-shrink-0">
                {t('cookieBanner.accept')}
            </Button>
        </div>
    </div>
  );
}
