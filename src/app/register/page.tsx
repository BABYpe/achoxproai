
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

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-sm w-full shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <div className="inline-block bg-primary/10 p-3 rounded-full mx-auto mb-4">
            <HardHat className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">إنشاء حساب جديد في AchoX Pro AI</CardTitle>
          <CardDescription>
            أدخل معلوماتك أدناه لإنشاء حساب
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input id="phone" type="tel" placeholder="05xxxxxxxx" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">اسم الشركة</Label>
              <Input id="company" placeholder="شركة الإنشاءات الحديثة" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="job-title">المسمى الوظيفي</Label>
              <Input id="job-title" placeholder="مهندس مدني" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input id="password" type="password" />
            </div>
            <Link href="/dashboard">
                <Button type="submit" className="w-full font-bold text-lg py-6">
                إنشاء حساب
                </Button>
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="underline font-bold">
              تسجيل الدخول
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

    