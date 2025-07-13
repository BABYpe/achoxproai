
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useCurrentUser } from "@/lib/auth"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const { toast } = useToast()
  const currentUser = useCurrentUser()

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث معلومات ملفك الشخصي.",
    })
  }

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
        title: "تم تحديث كلمة المرور",
        description: "تم تغيير كلمة المرور الخاصة بك بنجاح.",
    })
  }

  const handleNotificationsChange = () => {
     toast({
        title: "تم حفظ الإعدادات",
        description: "تم تحديث تفضيلات الإشعارات الخاصة بك.",
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">الإعدادات</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle>الملف الشخصي</CardTitle>
                <CardDescription>قم بتحديث صورتك ومعلوماتك الشخصية هنا.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleProfileSubmit}>
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.fallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Label htmlFor="picture">صورة الملف الشخصي</Label>
                      <Input id="picture" type="file" className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        يُفضل استخدام صورة مربعة (PNG, JPG) لا تتجاوز 2 ميجابايت.
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="first-name">الاسم الأول</Label>
                        <Input id="first-name" defaultValue={currentUser.name.split(' ')[0]} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">الاسم الأخير</Label>
                        <Input id="last-name" defaultValue={currentUser.name.split(' ').slice(1).join(' ')} />
                      </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-title">المسمى الوظيفي</Label>
                    <Input id="job-title" defaultValue="مهندس مشروع" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" defaultValue={currentUser.email} disabled />
                     <p className="text-xs text-muted-foreground">
                        لا يمكن تغيير البريد الإلكتروني بعد التسجيل.
                      </p>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">حفظ التغييرات</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Security Card */}
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle>الأمان</CardTitle>
                <CardDescription>
                  تأكد من استخدام كلمة مرور قوية للحفاظ على أمان حسابك.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handlePasswordChange}>
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

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-8">
             {/* Subscription Card */}
            <Card className="shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle>الاشتراك والفوترة</CardTitle>
                    <CardDescription>إدارة تفاصيل خطتك الحالية.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                        <div>
                            <p className="text-sm text-muted-foreground">خطتك الحالية</p>
                            <p className="text-lg font-bold text-primary">{currentUser.plan}</p>
                        </div>
                        {currentUser.isAdmin && <Badge>مسؤول</Badge>}
                    </div>
                     <Button className="w-full">إدارة الفواتير والاشتراك</Button>
                </CardContent>
            </Card>

            {/* Notifications Card */}
            <Card className="shadow-xl rounded-2xl">
                 <CardHeader>
                    <CardTitle>الإشعارات</CardTitle>
                    <CardDescription>اختر كيف تريد تلقي التحديثات.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="project-updates" className="font-semibold">تحديثات المشاريع</Label>
                            <p className="text-xs text-muted-foreground">عند تغيير حالة مشروع أو إضافة تعليق.</p>
                        </div>
                        <Switch id="project-updates" defaultChecked onChange={handleNotificationsChange} />
                    </div>
                     <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="task-mentions" className="font-semibold">المهام والتعيينات</Label>
                             <p className="text-xs text-muted-foreground">عندما يتم تعيين مهمة لك.</p>
                        </div>
                        <Switch id="task-mentions" defaultChecked onChange={handleNotificationsChange} />
                    </div>
                     <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="platform-updates" className="font-semibold">العروض والتحديثات</Label>
                            <p className="text-xs text-muted-foreground">حول الميزات الجديدة والعروض الخاصة.</p>
                        </div>
                        <Switch id="platform-updates" onChange={handleNotificationsChange} />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
