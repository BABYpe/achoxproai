
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
import { Loader, ArrowLeft, Wand2 } from "lucide-react"
import Link from "next/link"
import { FileUploader } from "@/components/file-uploader"
import { uploadFile } from "@/services/storage"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { analyzeProjectDescription } from "@/ai/flows/analyze-project-description"

const projectSchema = z.object({
    projectName: z.string().min(1, "اسم المشروع مطلوب"),
    location: z.string().min(1, "موقع المشروع مطلوب"),
    projectDescription: z.string().min(10, "يرجى تقديم وصف لا يقل عن 10 أحرف."),
    budget: z.number().positive("الميزانية يجب أن تكون رقمًا موجبًا").optional(),
    endDate: z.date().optional(),
    projectType: z.string().min(1, "نوع المشروع مطلوب"),
    quality: z.string().min(1, "مستوى الجودة مطلوب"),
});

type ProjectFormData = z.infer<typeof projectSchema>;


export default function NewProjectPage() {
    const { toast } = useToast()
    const router = useRouter()
    const addProject = useProjectStore((state) => state.addProject);
    
    const [isLoading, setIsLoading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [projectImage, setProjectImage] = useState<File | null>(null);

    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            projectName: "",
            location: "",
            projectDescription: "",
            projectType: "",
            quality: "",
        },
    });

    const projectDescriptionValue = watch("projectDescription");

    const handleFileSelect = (file: File | null) => {
        setProjectImage(file);
    };

    const handleAnalyzeDescription = async () => {
        if (!projectDescriptionValue) {
            toast({
                title: "وصف مطلوب",
                description: "يرجى كتابة وصف للمشروع أولاً.",
                variant: "destructive"
            });
            return;
        }
        setIsAnalyzing(true);
        try {
            const result = await analyzeProjectDescription({ description: projectDescriptionValue });
            setValue("projectType", result.projectType, { shouldValidate: true });
            setValue("quality", result.quality, { shouldValidate: true });
            toast({
                title: "تم التحليل بنجاح",
                description: "تم اقتراح نوع المشروع ومستوى الجودة.",
            });
        } catch (error) {
            console.error("Analysis failed:", error);
            toast({
                title: "فشل التحليل",
                description: "لم نتمكن من تحليل الوصف. الرجاء المحاولة مرة أخرى.",
                variant: "destructive",
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    const onSubmit = async (data: ProjectFormData) => {
        setIsLoading(true);
        
        let imageUrl = "https://placehold.co/600x400.png";
        let imageHint = "construction site";

        try {
            if (projectImage) {
                toast({ title: "جاري رفع صورة المشروع..." });
                imageUrl = await uploadFile(projectImage, "project-images");
                imageHint = "custom project image";
            }

            const newProject: Omit<Project, 'id' | 'createdAt'> = {
                title: data.projectName,
                status: "مخطط له",
                variant: "outline",
                location: data.location,
                imageUrl: imageUrl,
                imageHint: imageHint,
                progress: 0,
                budget: data.budget || 0,
                currency: "SAR",
                lat: 24.7136, // Default to Riyadh for now
                lng: 46.6753,
                manager: "علي محمد", // Default manager
                endDate: data.endDate?.toISOString().split('T')[0] || "",
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
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>تفاصيل المشروع</CardTitle>
                        <CardDescription>أدخل المعلومات الأساسية لمشروعك الجديد ليتم حفظه في قاعدة البيانات.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="projectName">اسم المشروع</Label>
                            <Controller name="projectName" control={control} render={({ field }) => <Input {...field} placeholder="مثال: بناء فيلا سكنية بحي الياسمين" />} />
                            {errors.projectName && <p className="text-destructive text-sm mt-1">{errors.projectName.message}</p>}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="projectDescription">وصف المشروع</Label>
                            <div className="relative">
                                <Controller name="projectDescription" control={control} render={({ field }) => (
                                    <Textarea 
                                        {...field}
                                        placeholder="وصف موجز لنطاق العمل والأهداف الرئيسية للمشروع."
                                        rows={4}
                                        className="pr-40"
                                    />
                                )} />
                                <Button type="button" size="sm" variant="outline" className="absolute top-2 right-2 gap-1" onClick={handleAnalyzeDescription} disabled={isAnalyzing}>
                                    {isAnalyzing ? <Loader className="h-4 w-4 animate-spin"/> : <Wand2 className="h-4 w-4" />}
                                    تحليل بالـ AI
                                </Button>
                            </div>
                            {errors.projectDescription && <p className="text-destructive text-sm mt-1">{errors.projectDescription.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="projectType">نوع المشروع</Label>
                                <Controller name="projectType" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger><SelectValue placeholder="اختر نوع المشروع" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="residential_villa">فيلا سكنية</SelectItem>
                                            <SelectItem value="interior_finishing">تشطيبات داخلية</SelectItem>
                                            <SelectItem value="commercial_building">مبنى تجاري</SelectItem>
                                            <SelectItem value="event_setup">تجهيز فعالية</SelectItem>
                                            <SelectItem value="other">أخرى</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )} />
                                {errors.projectType && <p className="text-destructive text-sm mt-1">{errors.projectType.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quality">مستوى الجودة</Label>
                                <Controller name="quality" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger><SelectValue placeholder="اختر مستوى الجودة" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="standard">أساسي (Standard)</SelectItem>
                                            <SelectItem value="premium">ممتاز (Premium)</SelectItem>
                                            <SelectItem value="luxury">فاخر (Luxury)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )} />
                                {errors.quality && <p className="text-destructive text-sm mt-1">{errors.quality.message}</p>}
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="location">موقع المشروع</Label>
                                <Controller name="location" control={control} render={({ field }) => <Input {...field} placeholder="مثال: الرياض، حي الملقا" />} />
                                {errors.location && <p className="text-destructive text-sm mt-1">{errors.location.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="budget">الميزانية التقديرية (ر.س)</Label>
                                <Controller name="budget" control={control} render={({ field }) => <Input {...field} type="number" placeholder="1500000" onChange={e => field.onChange(Number(e.target.value))}/>} />
                                {errors.budget && <p className="text-destructive text-sm mt-1">{errors.budget.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="endDate">تاريخ الانتهاء المخطط له</Label>
                                <Controller name="endDate" control={control} render={({ field }) => <DatePicker id="endDate" date={field.value} onDateChange={field.onChange} />} />
                                 {errors.endDate && <p className="text-destructive text-sm mt-1">{errors.endDate.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="projectImage">صورة المشروع (اختياري)</Label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading || isAnalyzing} className="font-bold text-lg py-6 px-8">
                            {isLoading ? <><Loader className="ml-2 h-4 w-4 animate-spin" /> جاري الحفظ...</> : 'إنشاء المشروع'}
                        </Button>
                    </CardFooter>
                 </form>
            </Card>
        </div>
    )
}
