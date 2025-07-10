
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useProjectStore, type Project } from "@/hooks/use-project-store"

export default function NewProjectPage() {
    const { toast } = useToast()
    const router = useRouter()
    const addProject = useProjectStore((state) => state.addProject);
    
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const newProject: Project = {
            title: formData.get("projectName") as string,
            status: "مخطط له",
            variant: "outline",
            location: formData.get("location") as string,
            imageUrl: "https://placehold.co/600x400.png",
            imageHint: "construction site",
            progress: 0,
            budget: Number(formData.get("budget")) || 0,
            currency: "SAR",
            lat: 24.7136, // Default to Riyadh for now
            lng: 46.6753,
            manager: "علي محمد", // Default manager
            endDate: endDate?.toISOString().split('T')[0] || "",
            // Add other fields from your form
        };

        addProject(newProject);
        
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
                                <Input id="projectName" name="projectName" placeholder="مثال: بناء فيلا سكنية بحي الياسمين" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="clientName">اسم العميل</Label>
                                <Input id="clientName" name="clientName" placeholder="مثال: شركة التطوير العقاري المتقدمة" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="projectDescription">وصف المشروع</Label>
                            <Textarea id="projectDescription" name="projectDescription" placeholder="وصف موجز لنطاق العمل والأهداف الرئيسية للمشروع." />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="location">موقع المشروع</Label>
                                <Input id="location" name="location" placeholder="مثال: الرياض، حي الملقا" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="budget">الميزانية التقديرية (ر.س)</Label>
                                <Input id="budget" name="budget" type="number" placeholder="1500000" />
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="startDate">تاريخ البدء المخطط له</Label>
                                <DatePicker id="startDate" date={startDate} onDateChange={setStartDate} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="endDate">تاريخ الانتهاء المخطط له</Label>
                                <DatePicker id="endDate" date={endDate} onDateChange={setEndDate} />
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

    