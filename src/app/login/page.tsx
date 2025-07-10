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
import { HardHat } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-sm w-full shadow-xl rounded-2xl">
        <CardHeader className="text-center">
            <div className="inline-block bg-primary/10 p-3 rounded-full mx-auto mb-4">
               <HardHat className="h-8 w-8 text-primary" />
            </div>
          <CardTitle className="text-2xl font-bold">تسجيل الدخول إلى AchoX Pro AI</CardTitle>
          <CardDescription>
            أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">كلمة المرور</Label>
                <Link
                  href="#"
                  className="mr-auto inline-block text-sm underline"
                >
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Link href="/dashboard" className="w-full">
              <Button type="submit" className="w-full font-bold text-lg py-6">
                تسجيل الدخول
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              تسجيل الدخول باستخدام جوجل
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            ليس لديك حساب؟{" "}
            <Link href="/register" className="underline font-bold">
              إنشاء حساب
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
