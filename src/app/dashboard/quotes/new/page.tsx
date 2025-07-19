
"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useProcurementStore } from '@/hooks/use-procurement-store';
import { useProjectStore } from '@/hooks/use-project-store';
import { generateQuote, type GenerateQuoteOutput } from '@/ai/flows/generate-quote';
import { Loader, ArrowLeft, Wand2, FileSignature, Save } from 'lucide-react';
import Link from 'next/link';
import { MarkdownRenderer } from '@/components/markdown-renderer';

const quoteRequestSchema = z.object({
  projectId: z.string().min(1, "يجب اختيار مشروع"),
  clientName: z.string().min(1, "اسم العميل مطلوب"),
  consultantName: z.string().min(1, "اسم الاستشاري مطلوب"),
});

type QuoteRequestForm = z.infer<typeof quoteRequestSchema>;

export default function NewQuotePage() {
    const router = useRouter();
    const { toast } = useToast();
    const { addQuote } = useProcurementStore();
    const { projects, getProjectById } = useProjectStore();

    const [isLoading, setIsLoading] = useState(false);
    const [generatedQuote, setGeneratedQuote] = useState<GenerateQuoteOutput | null>(null);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [boq, setBoq] = useState<any[]>([]);

    const { control, handleSubmit, watch, formState: { errors } } = useForm<QuoteRequestForm>({
        resolver: zodResolver(quoteRequestSchema),
    });

    const projectId = watch("projectId");

    useEffect(() => {
        const fetchProjectData = async () => {
            if (projectId) {
                const project = await getProjectById(projectId);
                setSelectedProject(project);

                if (project?.costEstimation?.boq) {
                    setBoq(project.costEstimation.boq);
                } else {
                    // Fallback to generating a mock BOQ if none exists
                    setBoq([
                        { id: '1', description: `أعمال إنشائية لمشروع: ${project?.title}`, unit: 'مقطوعية', quantity: 1, unitPrice: project?.budget || 100000, total: project?.budget || 100000 }
                    ]);
                }
            }
        };
        fetchProjectData();
    }, [projectId, getProjectById]);

    const handleGenerate = async (data: QuoteRequestForm) => {
        if (!selectedProject || boq.length === 0) {
            toast({ title: "بيانات غير كافية", description: "المشروع المختار لا يحتوي على جدول كميات.", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        setGeneratedQuote(null);

        try {
            const result = await generateQuote({
                companyName: "AchoX Pro Contracting",
                clientName: data.clientName,
                consultantName: data.consultantName,
                projectName: selectedProject.title,
                quoteDate: new Date().toISOString().split('T')[0],
                boq: boq,
            });
            setGeneratedQuote(result);
            toast({ title: "تم إنشاء عرض السعر بنجاح!" });
        } catch (error) {
            console.error(error);
            toast({ title: "فشل إنشاء عرض السعر", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleSaveQuote = () => {
        if (!generatedQuote || !selectedProject) return;

        const totalAmount = boq.reduce((sum, item) => sum + item.total, 0);

        addQuote({
            id: `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
            projectId: selectedProject.id,
            projectName: selectedProject.title,
            clientName: control._formValues.clientName,
            date: new Date().toLocaleDateString('en-CA'),
            totalAmount: totalAmount,
            status: 'مسودة',
            markdownContent: generatedQuote.markdownQuote,
        });

        toast({ title: "تم حفظ عرض السعر بنجاح!" });
        router.push('/dashboard/quotes');
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">إنشاء عرض سعر جديد</h1>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/quotes">
                        <ArrowLeft className="ml-2 h-4 w-4" />
                        العودة إلى عروض الأسعار
                    </Link>
                </Button>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <Card className="lg:col-span-1 shadow-xl rounded-2xl sticky top-20">
                    <form onSubmit={handleSubmit(handleGenerate)}>
                        <CardHeader>
                            <CardTitle>معلومات العرض</CardTitle>
                            <CardDescription>اختر مشروعًا وأدخل التفاصيل ليقوم الذكاء الاصطناعي بصياغة عرض سعر احترافي.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>المشروع المرتبط</Label>
                                <Controller
                                    name="projectId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue placeholder="اختر مشروعًا" /></SelectTrigger>
                                            <SelectContent>
                                                {projects.map(p => <SelectItem key={p.id} value={p.id!}>{p.title}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.projectId && <p className="text-destructive text-sm">{errors.projectId.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>اسم العميل</Label>
                                <Controller name="clientName" control={control} render={({ field }) => <Input {...field} placeholder="شركة العميل" />} />
                                {errors.clientName && <p className="text-destructive text-sm">{errors.clientName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>اسم الاستشاري</Label>
                                <Controller name="consultantName" control={control} render={({ field }) => <Input {...field} placeholder="مكتب الاستشارات الهندسية" />} />
                                {errors.consultantName && <p className="text-destructive text-sm">{errors.consultantName.message}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isLoading || !projectId} className="w-full text-lg py-6 font-bold">
                                {isLoading ? <Loader className="ml-2 h-4 w-4 animate-spin" /> : <Wand2 className="ml-2 h-4 w-4" />}
                                إنشاء عرض السعر
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <div className="lg:col-span-2">
                    <Card className="shadow-xl rounded-2xl min-h-[500px]">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div>
                                <CardTitle>معاينة عرض السعر</CardTitle>
                                <CardDescription>سيظهر عرض السعر المولد بواسطة الذكاء الاصطناعي هنا.</CardDescription>
                            </div>
                            {generatedQuote && (
                                <Button onClick={handleSaveQuote} disabled={isLoading} className="gap-2">
                                    <Save className="h-4 w-4"/>
                                    حفظ
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent>
                            {isLoading && (
                                <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                                    <Loader className="h-12 w-12 animate-spin text-primary" />
                                    <p>يقوم مدير العقود الذكي بصياغة العرض...</p>
                                </div>
                            )}
                            {generatedQuote ? (
                                <div className="p-4 bg-secondary/30 rounded-lg border">
                                    <MarkdownRenderer content={generatedQuote.markdownQuote} />
                                </div>
                            ) : !isLoading && (
                                <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                                    <FileSignature className="h-12 w-12" />
                                    <p className="text-center">أدخل البيانات المطلوبة واضغط على زر الإنشاء.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
