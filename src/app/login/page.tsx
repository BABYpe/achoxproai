
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
import { Logo } from "@/components/logo";
import Image from "next/image";
import i18n from "../i18n"


export default async function LoginPage() {
  const { t } = await i18n.changeLanguage(i18n.language);
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
