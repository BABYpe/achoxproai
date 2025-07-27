
"use client"

import React, { useState, useRef } from 'react';
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
import { Camera, PlusCircle, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  const { toast } = useToast()
  const currentUser = useCurrentUser()
  
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);
  const [coverUrl, setCoverUrl] = useState("https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=1200");
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, message: string) => {
    e.preventDefault();
    toast({
        title: "تم الحفظ بنجاح",
        description: message,
    })
  }
  
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
        toast({ title: "تم تحديث الصورة بنجاح!" });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">ملف التعريف والإعدادات</h1>
      
      {/* Professional Profile Card */}
      <Card className="shadow-xl rounded-2xl overflow-hidden">
        <div className="relative h-40 bg-muted group">
            <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" data-ai-hint="office desk background" />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Button size="sm" variant="secondary" className="absolute bottom-4 right-4 gap-1 z-10" onClick={() => coverInputRef.current?.click()}>
                <Camera className="w-4 h-4"/>
                تغيير الغلاف
            </Button>
            <input 
              type="file" 
              ref={coverInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => handleImageChange(e, setCoverUrl)} 
            />
        </div>
        <CardContent className="relative p-6 pt-0">
            <div className="flex items-end gap-6 -mt-16">
                <div className="relative group">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                      <AvatarImage src={avatarUrl} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.fallback}</AvatarFallback>
                    </Avatar>
                     <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full z-10" onClick={() => avatarInputRef.current?.click()}>
                        <Camera className="w-4 h-4"/>
                    </Button>
                    <input 
                      type="file" 
                      ref={avatarInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => handleImageChange(e, setAvatarUrl)} 
                    />
                </div>
                <div className="pb-4 flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                        <Badge variant={currentUser.isAdmin ? "default" : "secondary"}>
                            {currentUser.isAdmin ? "مسؤول" : "مستخدم احترافي"}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">مهندس مشروع أول | متخصص في إدارة المشاريع الضخمة</p>
                </div>
            </div>
        </CardContent>
      </Card>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
            {/* Career Profile Card */}
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle>الملف المهني</CardTitle>
                <CardDescription>اعرض مسيرتك المهنية وخبراتك لإضفاء طابع احترافي على حسابك.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={(e) => handleFormSubmit(e, "تم تحديث ملفك المهني.")}>
                    <div className="space-y-2">
                        <Label htmlFor="bio">نبذة تعريفية</Label>
                        <Textarea id="bio" rows={3} placeholder="اكتب نبذة مختصرة عنك وعن خبراتك الرئيسية..." />
                    </div>
                     <Separator />
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>الخبرات العملية</Label>
                            <Button type="button" variant="outline" size="sm" className="gap-1"><PlusCircle className="w-4 h-4"/> إضافة خبرة</Button>
                        </div>
                        <div className="space-y-3">
                            {/* Example Experience Item */}
                            <div className="flex gap-4 p-3 rounded-lg border bg-secondary/30">
                                <div className="flex-1 space-y-1">
                                    <Input defaultValue="مدير مشروع" placeholder="المسمى الوظيفي" />
                                    <Input defaultValue="شركة البناء الحديث" placeholder="اسم الشركة" />
                                    <div className="flex gap-2 items-center">
                                         <Input defaultValue="2020" placeholder="سنة البدء" />
                                         <span>-</span>
                                         <Input defaultValue="حتى الآن" placeholder="سنة الانتهاء" />
                                    </div>
                                </div>
                                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4"/></Button>
                            </div>
                        </div>
                     </div>
                      <Separator />
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>المؤهلات والشهادات</Label>
                            <Button type="button" variant="outline" size="sm" className="gap-1"><PlusCircle className="w-4 h-4"/> إضافة مؤهل</Button>
                        </div>
                         <div className="space-y-3">
                             <div className="flex gap-4 p-3 rounded-lg border bg-secondary/30">
                                <div className="flex-1 space-y-1">
                                    <Input defaultValue="بكالوريوس في الهندسة المدنية" placeholder="المؤهل أو الشهادة" />
                                    <Input defaultValue="جامعة الملك فهد للبترول والمعادن" placeholder="المؤسسة التعليمية" />
                                </div>
                                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4"/></Button>
                            </div>
                         </div>
                     </div>

                  <div className="flex justify-end">
                    <Button type="submit">حفظ الملف المهني</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Profile Card */}
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle>معلومات الحساب</CardTitle>
                <CardDescription>تحديث معلوماتك الشخصية الأساسية.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={(e) => handleFormSubmit(e, "تم تحديث معلومات حسابك.")}>
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
                <form className="space-y-6" onSubmit={(e) => handleFormSubmit(e, "تم تحديث كلمة المرور.")}>
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
                        <Switch id="project-updates" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="task-mentions" className="font-semibold">المهام والتعيينات</Label>
                             <p className="text-xs text-muted-foreground">عندما يتم تعيين مهمة لك.</p>
                        </div>
                        <Switch id="task-mentions" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="platform-updates" className="font-semibold">العروض والتحديثات</Label>
                            <p className="text-xs text-muted-foreground">حول الميزات الجديدة والعروض الخاصة.</p>
                        </div>
                        <Switch id="platform-updates" />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
