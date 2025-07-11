
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

export default function RegisterPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-sm w-full shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">إنشاء حساب جديد في AchoX Pro AI</CardTitle>
          <CardDescription>
            أدخل معلوماتك أدناه لإنشاء حساب
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">الاسم الأول</Label>
                  <Input id="first-name" placeholder="أحمد" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">الاسم الأخير</Label>
                  <Input id="last-name" placeholder="علي" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input id="password" type="password" required />
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  أوافق على{" "}
                  <Link href="/terms" className="underline text-primary hover:text-primary/80">
                    شروط الخدمة
                  </Link>{" "}
                  و{" "}
                  <Link href="/privacy" className="underline text-primary hover:text-primary/80">
                    سياسة الخصوصية
                  </Link>
                </label>
              </div>

              <Link href="/dashboard" passHref>
                  <Button asChild type="submit" className="w-full font-bold text-lg py-6" disabled={!agreed}>
                    <a>إنشاء حساب</a>
                  </Button>
              </Link>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="underline font-bold">
              تسجيل الدخول
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
