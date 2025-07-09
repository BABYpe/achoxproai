import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here.
    console.log("Form submitted");
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">الإعدادات</h1>
      <div className="space-y-8">
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>الملف الشخصي</CardTitle>
            <CardDescription>قم بتحديث معلومات ملفك الشخصي هنا.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="first-name">الاسم الأول</Label>
                    <Input id="first-name" defaultValue="المستخدم" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">الاسم الأخير</Label>
                    <Input id="last-name" defaultValue="الافتراضي" />
                  </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" defaultValue="user@example.com" disabled />
              </div>
               <div className="space-y-2">
                <Label htmlFor="job-title">المسمى الوظيفي</Label>
                <Input id="job-title" defaultValue="مهندس مشروع" />
              </div>
              <div className="flex justify-end">
                <Button type="submit">حفظ التغييرات</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>تغيير كلمة المرور</CardTitle>
            <CardDescription>
              تأكد من استخدام كلمة مرور قوية للحفاظ على أمان حسابك.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة المرور الجديدة</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="flex justify-end">
                <Button type="submit">تحديث كلمة المرور</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
