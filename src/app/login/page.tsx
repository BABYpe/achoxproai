
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo";
import Image from "next/image";
import { useTranslation } from "react-i18next";


export default function LoginPage() {
  const { t } = useTranslation();
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background p-4 overflow-hidden">
        <Image
            src="https://images.unsplash.com/photo-1600585152220-406b9b26a2d7?q=80&w=2070"
            alt="Modern building architecture"
            fill
            className="absolute inset-0 z-0 object-cover"
            data-ai-hint="building architecture"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10"></div>
      <Card className="mx-auto max-w-md w-full shadow-xl rounded-2xl z-20 bg-card/80 backdrop-blur-lg border-primary/20">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4">
               <Logo className="h-12 w-12 text-primary" />
            </div>
          <CardTitle className="text-2xl font-bold">تسجيل الدخول إلى AchoX Pro</CardTitle>
          <CardDescription>
            {t('login.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">البريد الإلكتروني</TabsTrigger>
                    <TabsTrigger value="account_number">رقم الحساب</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                    <div className="grid gap-4 pt-4">
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
                        <Button asChild type="submit" className="w-full font-bold text-lg py-6 mt-2">
                        <Link href="/dashboard">{t('login.button')}</Link>
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value="account_number">
                     <div className="grid gap-4 pt-4">
                        <div className="grid gap-2">
                            <Label htmlFor="account-number">رقم الحساب</Label>
                            <Input
                                id="account-number"
                                type="text"
                                placeholder="ادخل رقم حسابك"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                           <Label htmlFor="account-password">كلمة المرور</Label>
                           <Input id="account-password" type="password" required />
                        </div>
                        <Button asChild type="submit" className="w-full font-bold text-lg py-6 mt-2">
                            <Link href="/dashboard">{t('login.button')}</Link>
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  أو
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              {t('login.google')}
            </Button>
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
