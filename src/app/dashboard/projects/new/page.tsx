
"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { useProjectStore, type Project } from "@/hooks/use-project-store"
import { Loader, ArrowLeft, Wand2, FileText, Users, GanttChartSquare, ClipboardList } from "lucide-react"
import Link from "next/link"
import { FileUploader } from "@/components/file-uploader"
import { uploadFile } from "@/services/storage"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { generateComprehensivePlan, type GenerateComprehensivePlanOutput } from "@/ai/flows/generate-comprehensive-plan"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const projectSchema = z.object({
    projectName: z.string().min(1, "اسم المشروع مطلوب"),
    projectDescription: z.string().min(10, "يرجى تقديم وصف لا يقل عن 10 أحرف."),
    location: z.string().min(1, "موقع المشروع مطلوب"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

function NewProjectPageContent() {
    const { toast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams();
    const addProject = useProjectStore((state) => state.addProject);
    
    const [isLoading, setIsLoading] = useState(false);
    const [blueprintFile, setBlueprintFile] = useState<File | null>(null);
    const [generatedPlan, setGeneratedPlan] = useState<GenerateComprehensivePlanOutput | null>(null);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            projectName: "",
            projectDescription: "",
            location: "",
        },
    });

    useEffect(() => {
        const templateParam = searchParams.get('template');
        if (templateParam) {
            try {
                const templateData = JSON.parse(templateParam);
                reset(templateData); // Set form values from template
                 toast({
                    title: "تم تحميل القالب",
                    description: "يمكنك الآن تعديل التفاصيل أو إنشاء الخطة مباشرة.",
                });
            } catch (error) {
                console.error("Failed to parse template data:", error);
                toast({
                    title: "خطأ في تحميل القالب",
                    variant: "destructive",
                });
            }
        }
    }, [searchParams, reset, toast]);


    const handleFileSelect = (file: File | null) => {
        setBlueprintFile(file);
    };

    const handleGeneratePlan = async (data: ProjectFormData) => {
        setIsLoading(true);
        setGeneratedPlan(null);
        
        try {
            let blueprintDataUri: string | undefined = undefined;
            if (blueprintFile) {
                toast({ title: "جاري رفع المخطط..." });
                const reader = new FileReader();
                blueprintDataUri = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blueprintFile);
                });
            }

            toast({ title: "يقوم العقل المدبر بتحليل مشروعك...", description: "قد تستغرق هذه العملية بضع لحظات." });
            const result = await generateComprehensivePlan({
                projectName: data.projectName,
                projectDescription: data.projectDescription,
                location: data.location,
                blueprintDataUri,
            });

            setGeneratedPlan(result);
            toast({
                title: "تم إنشاء الخطة بنجاح!",
                description: "يمكنك الآن مراجعة الخطة وحفظ المشروع.",
            });

        } catch (error) {
             console.error("Plan generation failed:", error);
            toast({
                title: "خطأ في إنشاء الخطة",
                description: "لم نتمكن من إنشاء الخطة. الرجاء المحاولة مرة أخرى.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleSaveProject = async () => {
        if (!generatedPlan) return;
        setIsLoading(true);
        try {
            let imageUrl = "https://placehold.co/600x400.png";
            let imageHint = "construction site";
            
            if (blueprintFile) {
                 imageUrl = await uploadFile(blueprintFile, "project-images");
                 imageHint = "custom project image"
            }
            
            const newProject: Omit<Project, 'id' | 'createdAt'> = {
                title: generatedPlan.projectName,
                status: "مخطط له",
                variant: "outline",
                location: generatedPlan.location,
                imageUrl,
                imageHint,
                progress: 0,
                budget: parseFloat(generatedPlan.costEstimation.totalEstimatedCost.replace(/[^0-9.]/g, '')),
                currency: generatedPlan.costEstimation.totalEstimatedCost.replace(/[0-9,.\s]/g, ''),
                lat: 24.7136, // Default, can be improved with geocoding
                lng: 46.6753,
                manager: "علي محمد", // Default manager
                endDate: generatedPlan.costEstimation.ganttChartData.slice(-1)[0]?.end || "",
                ganttChartData: generatedPlan.costEstimation.ganttChartData,
                projectType: generatedPlan.projectAnalysis.projectType,
                quality: generatedPlan.projectAnalysis.quality,
                scopeOfWork: generatedPlan.blueprintAnalysis?.scopeOfWork || generatedPlan.projectAnalysis.initialBlueprintPrompt || '',
            };

            await addProject(newProject);
             toast({
                title: "تم حفظ المشروع بنجاح!",
                description: "تمت إضافة المشروع الجديد إلى قاعدة البيانات.",
            })
            router.push("/dashboard/projects");

        } catch (error) {
            console.error("Failed to save project", error);
            toast({ title: "فشل حفظ المشروع", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-8">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">إنشاء مشروع جديد بالذكاء الاصطناعي</h1>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/projects">
                        <ArrowLeft className="ml-2 h-4 w-4" />
                        العودة إلى قائمة المشاريع
                    </Link>
                </Button>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <Card className="shadow-xl rounded-2xl lg:col-span-1 sticky top-20">
                     <form onSubmit={handleSubmit(handleGeneratePlan)}>
                        <CardHeader>
                            <CardTitle>فكرة المشروع</CardTitle>
                            <CardDescription>أدخل التفاصيل الأساسية، وسيقوم العقل المدبر بتوليد خطة متكاملة.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="projectName">اسم المشروع</Label>
                                <Controller name="projectName" control={control} render={({ field }) => <Input {...field} placeholder="مثال: بناء فيلا سكنية بحي الياسمين" />} />
                                {errors.projectName && <p className="text-destructive text-sm mt-1">{errors.projectName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">موقع المشروع</Label>
                                <Controller name="location" control={control} render={({ field }) => <Input {...field} placeholder="مثال: الرياض، حي الملقا" />} />
                                {errors.location && <p className="text-destructive text-sm mt-1">{errors.location.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="projectDescription">وصف المشروع</Label>
                                <Controller name="projectDescription" control={control} render={({ field }) => (
                                    <Textarea 
                                        {...field}
                                        placeholder="وصف موجز لنطاق العمل والأهداف الرئيسية للمشروع."
                                        rows={4}
                                    />
                                )} />
                                {errors.projectDescription && <p className="text-destructive text-sm mt-1">{errors.projectDescription.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="projectImage">المخطط الهندسي (اختياري)</Label>
                                <FileUploader onFileSelect={handleFileSelect} />
                                <p className="text-xs text-muted-foreground">رفع المخطط يوفر تحليلًا أكثر دقة.</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isLoading} className="w-full font-bold text-lg py-6">
                                {isLoading ? <><Loader className="ml-2 h-4 w-4 animate-spin" /> جاري التخطيط...</> : <><Wand2 className="ml-2 h-4 w-4" /> إنشاء خطة المشروع</>}
                            </Button>
                        </CardFooter>
                     </form>
                </Card>
                
                <div className="lg:col-span-2 space-y-8">
                     {!generatedPlan && !isLoading && (
                        <Card className="w-full shadow-xl rounded-2xl min-h-[600px] flex items-center justify-center">
                            <div className="text-center text-muted-foreground p-8">
                                <Wand2 className="h-16 w-16 mx-auto mb-4 text-primary/30" />
                                <h3 className="text-xl font-semibold text-foreground">بانتظار فكرة مشروعك</h3>
                                <p>ستظهر الخطة الهندسية والمالية المتكاملة هنا بعد إدخال المعلومات والضغط على زر الإنشاء.</p>
                            </div>
                        </Card>
                    )}
                    {isLoading && !generatedPlan && (
                        <Card className="w-full shadow-xl rounded-2xl min-h-[600px] flex items-center justify-center">
                            <div className="text-center text-muted-foreground p-8">
                                <Loader className="h-16 w-16 mx-auto mb-4 animate-spin text-primary" />
                                <h3 className="text-xl font-semibold text-foreground">يقوم العقل المدبر ببناء الخطة...</h3>
                                <p>يتم الآن تحليل المتطلبات، وحساب التكاليف، وبناء الجدول الزمني.</p>
                            </div>
                        </Card>
                    )}
                    {generatedPlan && (
                        <>
                             <Card className="w-full shadow-xl rounded-2xl bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground">
                                <CardHeader className="flex-row items-center justify-between">
                                    <CardTitle className="text-2xl text-white">الخطة المتكاملة لمشروع: {generatedPlan.projectName}</CardTitle>
                                     <Button onClick={handleSaveProject} disabled={isLoading} variant="secondary">
                                        {isLoading ? "جاري الحفظ..." : "اعتماد الخطة وحفظ المشروع"}
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">{generatedPlan.costEstimation.totalEstimatedCost}</p>
                                    <p className="text-sm mt-1 text-white/80">التكلفة الإجمالية التقديرية</p>
                                </CardContent>
                            </Card>

                            <Card className="shadow-xl rounded-2xl">
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <Users className="w-6 h-6 text-primary" />
                                    <CardTitle>توصيات فريق العمل</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-4">
                                        <p className="text-4xl font-bold">{generatedPlan.costEstimation.crewRecommendation.totalPersonnel}</p>
                                        <p className="text-muted-foreground">شخص</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                        {Object.entries(generatedPlan.costEstimation.crewRecommendation.breakdown).map(([role, count]) => (
                                            <div key={role} className="bg-secondary/50 p-3 rounded-lg">
                                                <p className="font-semibold">{role}</p>
                                                <p className="text-2xl font-bold text-primary">{count}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                             <Card className="shadow-xl rounded-2xl">
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <ClipboardList className="w-6 h-6 text-primary" />
                                    <CardTitle>جدول الكميات المفصل (BOQ)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>البند</TableHead>
                                                <TableHead>الوحدة</TableHead>
                                                <TableHead>الكمية</TableHead>
                                                <TableHead>سعر الوحدة</TableHead>
                                                <TableHead>الإجمالي</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {generatedPlan.costEstimation.boq.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.description}</TableCell>
                                                <TableCell>{item.unit}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell className="font-mono">{item.unitPrice.toLocaleString()} ر.س</TableCell>
                                                <TableCell className="font-mono font-semibold">{item.total.toLocaleString()} ر.س</TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <Card className="shadow-xl rounded-2xl">
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <GanttChartSquare className="w-6 h-6 text-primary" />
                                    <CardTitle>الجدول الزمني للمشروع (Gantt Chart)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                    {generatedPlan.costEstimation.ganttChartData.map(task => (
                                        <div key={task.id}>
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="font-semibold">{task.task}</p>
                                                <Badge variant="secondary">{task.responsible}</Badge>
                                            </div>
                                            <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                                                <span>{task.start} &rarr; {task.end}</span>
                                                <span>المدة: {task.duration} أيام</span>
                                            </div>
                                            <Progress value={task.progress} className="h-2" />
                                        </div>
                                    ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default function NewProjectPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NewProjectPageContent />
        </Suspense>
    )
}
