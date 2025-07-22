
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
import { Loader, ArrowLeft, Wand2, Users, GanttChartSquare, ClipboardList, Info, ShieldCheck, FileText, CheckCircle, Lightbulb, Scaling, Bolt, Wrench, Building, AlertTriangle, Printer, BarChart, ListTree, Calculator } from "lucide-react"
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { APIProvider } from "@vis.gl/react-google-maps"
import { PlacesAutocomplete } from "@/components/places-autocomplete"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { differenceInDays, format } from "date-fns"
import { useTranslation } from "react-i18next"
import type { AnalyzeBlueprintOutput } from "@/ai/flows/analyze-blueprint.types"

const projectSchema = z.object({
    id: z.string().optional(), // For editing existing projects
    projectName: z.string().min(1, "اسم المشروع مطلوب"),
    projectDescription: z.string().min(10, "يرجى تقديم وصف لا يقل عن 10 أحرف."),
    location: z.string().min(1, "موقع المشروع مطلوب"),
});

type ProjectFormData = z.infer<typeof projectSchema>;
type Warning = AnalyzeBlueprintOutput['warnings'][number];

const getSeverityVariant = (severity: Warning['severity']) => {
    switch (severity) {
        case 'High': return 'destructive';
        case 'Medium': return 'default';
        case 'Low': return 'secondary';
        default: return 'outline';
    }
}

const getCategoryIcon = (category: Warning['category']) => {
    const iconClass = "w-5 h-5 ml-2";
    switch(category) {
        case 'Structural': return <Building className={iconClass} />;
        case 'Architectural': return <Scaling className={iconClass} />;
        case 'Electrical': return <Bolt className={iconClass} />;
        case 'Mechanical':
        case 'Plumbing':
            return <Wrench className={iconClass} />;
        case 'Code Compliance': return <ShieldCheck className={iconClass} />;
        default: return <AlertTriangle className={iconClass} />;
    }
}


function NewProjectPageContent() {
    const { t } = useTranslation();
    const { toast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams();
    const { addProject, updateProject } = useProjectStore.getState();
    
    const [isLoading, setIsLoading] = useState(false);
    const [blueprintFile, setBlueprintFile] = useState<File | null>(null);
    const [generatedPlan, setGeneratedPlan] = useState<GenerateComprehensivePlanOutput | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset, setValue: setFormValue } = useForm<ProjectFormData>({
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
                reset(templateData);

                // If template contains a full plan, set it
                if (templateData.costEstimation) {
                    setGeneratedPlan(templateData);
                }
                
                if (templateData.id) {
                    setIsEditing(true);
                     toast({
                        title: "وضع التعديل",
                        description: "تم تحميل بيانات المشروع. يمكنك الآن تعديلها وإنشاء خطة محدثة.",
                    });
                } else {
                    setIsEditing(false);
                    toast({
                        title: "تم تحميل القالب",
                        description: templateData.costEstimation 
                            ? "تم تحميل الخطة المتكاملة من القالب. يمكنك مراجعتها وحفظ المشروع."
                            : "يمكنك الآن تعديل التفاصيل أو إنشاء الخطة مباشرة.",
                    });
                }
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
                description: `يمكنك الآن مراجعة الخطة و${isEditing ? 'تحديث' : 'حفظ'} المشروع.`,
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
        const formData = control._formValues;

        try {
            let imageUrl = "https://placehold.co/600x400.png";
            let imageHint = "construction site";
            
            if (blueprintFile) {
                 imageUrl = await uploadFile(blueprintFile, "project-images");
                 imageHint = "custom project image"
            }
            
            const projectData: Partial<Project> = {
                title: generatedPlan.projectName,
                status: "مخطط له",
                variant: "outline",
                location: generatedPlan.location,
                // Only update image if a new one was uploaded
                ...(blueprintFile && { imageUrl, imageHint }),
                progress: 0,
                budget: parseFloat(generatedPlan.costEstimation.totalEstimatedCost.replace(/[^0-9.]/g, '')),
                currency: generatedPlan.costEstimation.totalEstimatedCost.replace(/[0-9,.\s]/g, ''),
                lat: 24.7136,
                lng: 46.6753,
                manager: "علي محمد",
                endDate: generatedPlan.costEstimation.ganttChartData.slice(-1)[0]?.end || "",
                ganttChartData: generatedPlan.costEstimation.ganttChartData,
                projectType: generatedPlan.projectAnalysis.projectType,
                quality: generatedPlan.projectAnalysis.quality,
                scopeOfWork: generatedPlan.blueprintAnalysis?.scopeOfWork || generatedPlan.projectAnalysis.initialBlueprintPrompt || '',
                costEstimation: generatedPlan.costEstimation,
                riskAnalysis: generatedPlan.riskAnalysis,
            };

            if (isEditing && formData.id) {
                await updateProject(formData.id, projectData);
                 toast({
                    title: "تم تحديث المشروع بنجاح!",
                })
                router.push(`/dashboard/projects/${formData.id}`);
            } else {
                 await addProject(projectData as Omit<Project, 'id' | 'createdAt'>);
                 toast({
                    title: "تم حفظ المشروع بنجاح!",
                    description: "تمت إضافة المشروع الجديد إلى قاعدة البيانات.",
                })
                router.push("/dashboard/projects");
            }


        } catch (error) {
            console.error("Failed to save project", error);
            toast({ title: `فشل ${isEditing ? 'تحديث' : 'حفظ'} المشروع`, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    }
    
    const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
        if (place?.formatted_address) {
            setFormValue('location', place.formatted_address);
        }
    };
    
    const handleExport = () => {
        toast({ title: "قيد التطوير", description: "سيتم تفعيل ميزة تصدير الخطة كملف PDF قريبًا." });
    }

    return (
        <div className="flex flex-col gap-8">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{isEditing ? 'تعديل المشروع' : 'إنشاء مشروع جديد بالذكاء الاصطناعي'}</h1>
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
                            {isEditing && (
                                 <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>أنت في وضع التعديل</AlertTitle>
                                    <AlertDescription>
                                        يمكنك تحديث البيانات وتوليد خطة جديدة للمشروع الحالي.
                                    </AlertDescription>
                                </Alert>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="projectName">اسم المشروع</Label>
                                <Controller name="projectName" control={control} render={({ field }) => <Input {...field} placeholder="مثال: بناء فيلا سكنية بحي الياسمين" />} />
                                {errors.projectName && <p className="text-destructive text-sm mt-1">{errors.projectName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">موقع المشروع</Label>
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <PlacesAutocomplete onPlaceSelect={handlePlaceSelect} />
                                    )}
                                />
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
                            <CardHeader className="flex-row items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-2xl text-white">{t('newProject.plan.title', { projectName: generatedPlan.projectName })}</CardTitle>
                                    <p className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mt-2">{generatedPlan.costEstimation.totalEstimatedCost}</p>
                                    <p className="text-sm mt-1 text-white/80">{t('newProject.plan.totalCost')}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                     <Button onClick={handleSaveProject} disabled={isLoading} variant="secondary">
                                        {isLoading ? t('newProject.plan.saving') : isEditing ? t('newProject.plan.updateProject') : t('newProject.plan.saveProject')}
                                    </Button>
                                    <Button onClick={handleExport} variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                                       <Printer className="w-4 h-4 ml-2"/>
                                       {t('newProject.plan.exportPdf')}
                                    </Button>
                                </div>
                            </CardHeader>
                        </Card>
                       <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">{t('newProject.tabs.overview')}</TabsTrigger>
                                <TabsTrigger value="financial">{t('newProject.tabs.financial')}</TabsTrigger>
                                <TabsTrigger value="execution">{t('newProject.tabs.execution')}</TabsTrigger>
                                <TabsTrigger value="blueprint" disabled={!generatedPlan.blueprintAnalysis}>{t('newProject.tabs.blueprint')}</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview">
                               <Card>
                                   <CardHeader><CardTitle>{t('newProject.overview.summary')}</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label>{t('newProject.overview.projectType')}</Label>
                                            <p className="font-semibold">{t(`projectTypes.${generatedPlan.projectAnalysis.projectType}`)}</p>
                                        </div>
                                        <div>
                                            <Label>{t('newProject.overview.qualityLevel')}</Label>
                                            <p className="font-semibold">{t(`qualityLevels.${generatedPlan.projectAnalysis.quality}`)}</p>
                                        </div>
                                        <div>
                                            <Label>{t('newProject.overview.scope')}</Label>
                                            <p className="text-muted-foreground text-sm p-3 bg-secondary/30 rounded-md border">{generatedPlan.blueprintAnalysis?.scopeOfWork || generatedPlan.projectAnalysis.initialBlueprintPrompt}</p>
                                        </div>
                                    </CardContent>
                               </Card>
                            </TabsContent>
                            <TabsContent value="financial">
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader><CardTitle>{t('newProject.boq.title')}</CardTitle></CardHeader>
                                        <CardContent>
                                             <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>{t('newProject.boq.item')}</TableHead>
                                                        <TableHead>{t('newProject.boq.unit')}</TableHead>
                                                        <TableHead>{t('newProject.boq.quantity')}</TableHead>
                                                        <TableHead>{t('newProject.boq.unitPrice')}</TableHead>
                                                        <TableHead>{t('newProject.boq.total')}</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {generatedPlan.costEstimation.boq.map((item) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell className="font-medium">{item.description}</TableCell>
                                                        <TableCell>{item.unit}</TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell className="font-mono">{item.unitPrice.toLocaleString('en-US')} {t('currency.sar')}</TableCell>
                                                        <TableCell className="font-mono font-semibold">{item.total.toLocaleString('en-US')} {t('currency.sar')}</TableCell>
                                                    </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader><CardTitle>{t('newProject.risks.title')}</CardTitle></CardHeader>
                                        <CardContent>
                                           <div className="space-y-2">
                                                {generatedPlan.costEstimation.financialRisks.map((riskItem, index) => (
                                                    <div key={index} className="p-3 bg-secondary/50 rounded-lg">
                                                        <p className="font-semibold">{riskItem.risk}</p>
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            <span className="font-medium text-foreground">{t('newProject.risks.mitigation')}:</span> {riskItem.mitigation}
                                                        </p>
                                                    </div>
                                                ))}
                                                {generatedPlan.costEstimation.financialRisks.length === 0 && (
                                                    <p className="text-muted-foreground">{t('newProject.risks.none')}</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                             <TabsContent value="execution">
                                 <div className="space-y-6">
                                      <Card>
                                        <CardHeader><CardTitle>{t('newProject.gantt.title')}</CardTitle></CardHeader>
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
                                                        <span>{t('newProject.gantt.duration', { count: task.duration })}</span>
                                                    </div>
                                                    <Progress value={task.progress} className="h-2" />
                                                </div>
                                            ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                     <Card>
                                        <CardHeader><CardTitle>{t('newProject.crew.title')}</CardTitle></CardHeader>
                                        <CardContent>
                                             <div className="flex items-baseline gap-4">
                                                <p className="text-4xl font-bold">{generatedPlan.costEstimation.crewRecommendation.totalPersonnel}</p>
                                                <p className="text-muted-foreground">{t('newProject.crew.person')}</p>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                                {Object.entries(generatedPlan.costEstimation.crewRecommendation.breakdown).map(([role, count]) => (
                                                    <div key={role} className="bg-secondary/50 p-3 rounded-lg">
                                                        <p className="font-semibold">{role}</p>
                                                        <p className="text-2xl font-bold text-primary">{count as number}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                 </div>
                             </TabsContent>
                              <TabsContent value="blueprint">
                                 <Card>
                                     <CardHeader><CardTitle>{t('newProject.blueprint.title')}</CardTitle></CardHeader>
                                     <CardContent className="space-y-6">
                                          {/* Warnings */}
                                        <div>
                                            <h3 className="font-bold mb-2">{t('newProject.blueprint.warnings.title')} ({generatedPlan.blueprintAnalysis!.warnings.length})</h3>
                                             {generatedPlan.blueprintAnalysis!.warnings.length > 0 ? (
                                                <div className="space-y-3">
                                                    {generatedPlan.blueprintAnalysis!.warnings.map((warning, index) => (
                                                        <div key={index} className="border p-3 rounded-lg">
                                                            <div className="flex justify-between items-center font-semibold">
                                                            <span className="flex items-center">
                                                                {getCategoryIcon(warning.category)}
                                                                {warning.category}
                                                            </span>
                                                                <Badge variant={getSeverityVariant(warning.severity)}>
                                                                    {t(`severities.${warning.severity}`)}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground mt-2">{warning.description}</p>
                                                            <div className="mt-2 pt-2 border-t border-dashed flex items-start gap-2 text-primary">
                                                                <Lightbulb className="w-4 h-4 mt-1 flex-shrink-0" />
                                                                <p className="text-sm">{warning.recommendation}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                             ) : (
                                                <div className="flex items-center gap-2 text-green-600">
                                                    <CheckCircle className="h-4 w-4" />
                                                    <p className="text-sm">{t('newProject.blueprint.warnings.none')}</p>
                                                </div>
                                             )}
                                        </div>
                                         {/* Quantities */}
                                        <div>
                                            <h3 className="font-bold mb-2">{t('newProject.blueprint.quantities.title')}</h3>
                                            <div className="space-y-2 text-sm p-3 bg-secondary/30 rounded-md border">
                                                <div className="flex justify-between"><span>{t('newProject.blueprint.quantities.area')}:</span> <span className="font-mono">{generatedPlan.blueprintAnalysis!.quantities.area}</span></div>
                                                <div className="flex justify-between"><span>{t('newProject.blueprint.quantities.length')}:</span> <span className="font-mono">{generatedPlan.blueprintAnalysis!.quantities.length}</span></div>
                                                <h4 className="font-semibold mt-2 pt-2 border-t">{t('newProject.blueprint.quantities.objects')}:</h4>
                                                {Object.entries(generatedPlan.blueprintAnalysis!.quantities.objectCounts).map(([key, value]) => (
                                                    <div className="flex justify-between" key={key}><span>{key}:</span> <span className="font-mono">{value}</span></div>
                                                ))}
                                            </div>
                                        </div>
                                     </CardContent>
                                 </Card>
                             </TabsContent>
                       </Tabs>
                       </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default function NewProjectPage() {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        return (
            <div className="container mx-auto p-4">
                <Alert variant="destructive">
                    <AlertTitle>خطأ في الإعدادات</AlertTitle>
                    <AlertDescription>
                        مفتاح واجهة برمجة تطبيقات خرائط Google غير مهيأ. يرجى إضافته إلى متغيرات البيئة.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <NewProjectPageContent />
            </APIProvider>
        </Suspense>
    )
}
