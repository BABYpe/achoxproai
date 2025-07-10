
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function NewProjectPage() {
    const { toast } = useToast()
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // In a real app, you would handle form submission to a backend here.
        toast({
            title: "تم إنشاء المشروع بنجاح!",
            description: "تمت إضافة المشروع الجديد إلى قائمة مشاريعك.",
        })
        router.push("/dashboard/projects")
    }

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold">إنشاء مشروع جديد</h1>
            <Card className="shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle>تفاصيل المشروع</CardTitle>
                    <CardDescription>أدخل المعلومات الأساسية لمشروعك الجديد.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="projectName">اسم المشروع</Label>
                                <Input id="projectName" placeholder="مثال: بناء فيلا سكنية بحي الياسمين" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="clientName">اسم العميل</Label>
                                <Input id="clientName" placeholder="مثال: شركة التطوير العقاري المتقدمة" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="projectDescription">وصف المشروع</Label>
                            <Textarea id="projectDescription" placeholder="وصف موجز لنطاق العمل والأهداف الرئيسية للمشروع." />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="location">موقع المشروع</Label>
                                <Input id="location" placeholder="مثال: الرياض، حي الملقا" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="budget">الميزانية التقديرية (ر.س)</Label>
                                <Input id="budget" type="number" placeholder="1500000" />
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="startDate">تاريخ البدء المخطط له</Label>
                                <DatePicker id="startDate" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="endDate">تاريخ الانتهاء المخطط له</Label>
                                <DatePicker id="endDate" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="font-bold text-lg py-6 px-8">إنشاء المشروع</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
