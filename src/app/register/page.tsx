
"use client"

import { useState } from "react";
import Link from "next/link"
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
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/logo";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function RegisterPage() {
  const [agreed, setAgreed] = useState(false);
  const { t } = useTranslation();

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background p-4 overflow-hidden">
        <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
            alt="Abstract background"
            fill
            className="absolute inset-0 z-0 object-cover"
            data-ai-hint="abstract background"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10"></div>
      <Card className="mx-auto max-w-sm w-full shadow-xl rounded-2xl z-20 bg-card/70 backdrop-blur-lg border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">إنشاء حساب جديد في AchoX Pro</CardTitle>
          <CardDescription>
            {t('register.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">{t('register.firstName')}</Label>
                  <Input id="first-name" placeholder={t('register.firstNamePlaceholder')} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">{t('register.lastName')}</Label>
                  <Input id="last-name" placeholder={t('register.lastNamePlaceholder')} required />
                </div>
              </div>
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
                <Label htmlFor="password">{t('login.password')}</Label>
                <Input id="password" type="password" required />
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('register.agree')}{" "}
                  <Link href="/terms" className="underline text-primary hover:text-primary/80">
                    {t('register.terms')}
                  </Link>{" "}
                  {t('register.and')}{" "}
                  <Link href="/privacy" className="underline text-primary hover:text-primary/80">
                    {t('register.privacy')}
                  </Link>
                </label>
              </div>
              
              <Link href="/dashboard" passHref legacyBehavior>
                <Button type="submit" className="w-full font-bold text-lg py-6" disabled={!agreed}>
                    {t('register.createAccount')}
                </Button>
              </Link>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('register.hasAccount')}{" "}
            <Link href="/login" className="underline font-bold">
              {t('login.button')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
