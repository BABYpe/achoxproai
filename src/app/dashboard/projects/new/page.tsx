"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useProjectStore, type Project } from "@/hooks/use-project-store"
import { Loader, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FileUploader } from "@/components/file-uploader"
import { uploadFile } from "@/services/storage"

export default function NewProjectPage() {
    const { toast } = useToast()
    const router = useRouter()
    const addProject = useProjectStore((state) => state.addProject);
    
    const [endDate, setEndDate] = useState<Date>();
    const [isLoading, setIsLoading] = useState(false);
    const [projectImage, setProjectImage] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setProjectImage(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        
        let imageUrl = "https://placehold.co/600x400.png";
        let imageHint = "construction site";

        try {
            if (projectImage) {
                toast({ title: "جاري رفع صورة المشروع..." });
                imageUrl = await uploadFile(projectImage, "project-images");
                imageHint = "custom project image"; // Or you can generate hints later
            }

            const newProject: Omit<Project, 'id' | 'createdAt'> = {
                title: formData.get("projectName") as string,
                status: "مخطط له",
                variant: "outline",
                location: formData.get("location") as string,
                imageUrl: imageUrl,
                imageHint: imageHint,
                progress: 0,
                budget: Number(formData.get("budget")) || 0,
                currency: "SAR",
                lat: 24.7136, // Default to Riyadh for now
                lng: 46.6753,
                manager: "علي محمد", // Default manager
                endDate: endDate?.toISOString().split('T')[0] || "",
            };

            await addProject(newProject);
            toast({
                title: "تم إنشاء المشروع بنجاح!",
                description: "تمت إضافة المشروع الجديد إلى قاعدة البيانات.",
            })
            router.push("/dashboard/projects")
        } catch (error) {
             console.error("Project creation failed:", error);
            toast({
                title: "خطأ في إنشاء المشروع",
                description: "لم نتمكن من حفظ المشروع. الرجاء المحاولة مرة أخرى.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-8">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">إنشاء مشروع جديد</h1>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/projects">
                        <ArrowLeft className="ml-2 h-4 w-4" />
                        العودة إلى قائمة المشاريع
                    </Link>
                </Button>
            </div>
            <Card className="shadow-xl rounded-2xl">
                 <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>تفاصيل المشروع</CardTitle>
                        <CardDescription>أدخل المعلومات الأساسية لمشروعك الجديد ليتم حفظه في قاعدة البيانات.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="projectName">اسم المشروع</Label>
                                <Input id="projectName" name="projectName" placeholder="مثال: بناء فيلا سكنية بحي الياسمين" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="location">موقع المشروع</Label>
                                <Input id="location" name="location" placeholder="مثال: الرياض، حي الملقا" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="projectDescription">وصف المشروع</Label>
                            <Textarea 
                                id="projectDescription" 
                                name="projectDescription" 
                                placeholder="وصف موجز لنطاق العمل والأهداف الرئيسية للمشروع."
                                rows={3}
                            />
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="projectImage">صورة المشروع</Label>
                             <FileUploader onFileSelect={handleFileSelect} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="budget">الميزانية التقديرية (ر.س)</Label>
                                <Input id="budget" name="budget" type="number" placeholder="1500000" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="endDate">تاريخ الانتهاء المخطط له</Label>
                                <DatePicker id="endDate" date={endDate} onDateChange={setEndDate} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading} className="font-bold text-lg py-6 px-8">
                            {isLoading ? <><Loader className="ml-2 h-4 w-4 animate-spin" /> جاري الحفظ...</> : 'إنشاء المشروع'}
                        </Button>
                    </CardFooter>
                 </form>
            </Card>
        </div>
    )
}
