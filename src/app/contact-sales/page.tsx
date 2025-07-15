"use client";

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
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"
import { useTranslation } from "react-i18next";
import Image from "next/image";


export default function ContactSalesPage() {
  const { t } = useTranslation();
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background p-4 overflow-hidden">
        <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932"
            alt="Team working together"
            fill
            className="absolute inset-0 z-0 object-cover"
            data-ai-hint="team work"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10"></div>
      <div className="absolute top-4 left-4 z-20">
        <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
          <Link href="/">
             <ArrowLeft className="ml-2 h-4 w-4" />
             {t('returnToHome')}
          </Link>
        </Button>
      </div>
      <Card className="mx-auto max-w-xl w-full shadow-xl rounded-2xl z-20 bg-card/70 backdrop-blur-lg border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">{t('contactSales.title')}</CardTitle>
          <CardDescription>
            {t('contactSales.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">{t('contactSales.firstName')}</Label>
                <Input id="first-name" placeholder={t('contactSales.firstNamePlaceholder')} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">{t('contactSales.lastName')}</Label>
                <Input id="last-name" placeholder={t('contactSales.lastNamePlaceholder')} required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t('contactSales.workEmail')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@company.com"
                required
              />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="company">{t('contactSales.companyName')}</Label>
                    <Input id="company" placeholder={t('contactSales.companyNamePlaceholder')} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="company-size">{t('contactSales.companySize')}</Label>
                    <Input id="company-size" placeholder={t('contactSales.companySizePlaceholder')} />
                </div>
             </div>
             <div className="grid gap-2">
              <Label htmlFor="phone">{t('contactSales.phoneNumber')}</Label>
              <Input id="phone" type="tel" placeholder="05xxxxxxxx" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">{t('contactSales.helpMessage')}</Label>
              <Textarea id="message" placeholder={t('contactSales.helpMessagePlaceholder')} />
            </div>
            <Button type="submit" className="w-full font-bold text-lg py-6">
              {t('contactSales.submitButton')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
