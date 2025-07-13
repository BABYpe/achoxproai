
"use client";

import Link from "next/link"
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-sm w-full shadow-xl rounded-2xl">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4">
               <Logo className="h-12 w-12 text-primary" />
            </div>
          <CardTitle className="text-2xl font-bold">{t('login.title')}</CardTitle>
          <CardDescription>
            {t('login.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t('login.password')}</Label>
                <Link
                  href="#"
                  className="mr-auto inline-block text-sm underline"
                >
                  {t('login.forgotPassword')}
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Link href="/dashboard" passHref>
              <Button asChild type="submit" className="w-full font-bold text-lg py-6">
                <a>{t('login.button')}</a>
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              {t('login.google')}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {t('login.noAccount')}{" "}
            <Link href="/register" className="underline font-bold">
              {t('login.signup')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
