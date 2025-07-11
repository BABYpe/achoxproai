
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
import { HardHat, ArrowLeft } from "lucide-react"

export default function ContactSalesPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link href="/">
             <ArrowLeft className="ml-2 h-4 w-4" />
             العودة إلى الرئيسية
          </Link>
        </Button>
      </div>
      <Card className="mx-auto max-w-xl w-full shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <div className="inline-block bg-primary/10 p-3 rounded-full mx-auto mb-4">
            <HardHat className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">تواصل مع فريق المبيعات</CardTitle>
          <CardDescription>
            هل أنت مستعد للارتقاء بأعمالك؟ املأ النموذج أدناه وسيتواصل معك أحد خبرائنا.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
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
              <Label htmlFor="email">البريد الإلكتروني للعمل</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@company.com"
                required
              />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="company">اسم الشركة</Label>
                    <Input id="company" placeholder="شركة الإنشاءات الحديثة" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="company-size">حجم الشركة</Label>
                    <Input id="company-size" placeholder="50-100 موظف" />
                </div>
             </div>
             <div className="grid gap-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input id="phone" type="tel" placeholder="05xxxxxxxx" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">كيف يمكننا مساعدتك؟</Label>
              <Textarea id="message" placeholder="أخبرنا عن احتياجاتك أو استفساراتك..." />
            </div>
            <Button type="submit" className="w-full font-bold text-lg py-6">
              إرسال الطلب
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
