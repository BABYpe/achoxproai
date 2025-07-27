
"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { useProjectStore, type Project } from '@/hooks/use-project-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader, Wand2, ShieldAlert, ShieldCheck, ShieldQuestion, AlertTriangle, Briefcase, FileText, PiggyBank, Sprout } from 'lucide-react';
import { analyzeRisks, type AnalyzeRisksOutput } from '@/ai/flows/analyze-risks';
import { Badge } from '@/components/ui/badge';
import { differenceInDays } from 'date-fns';

type Risk = AnalyzeRisksOutput['risks'][number];

const getImpactVariant = (impact: Risk['impact']) => {
    switch(impact) {
        case 'High': return 'destructive';
        case 'Medium': return 'default';
        case 'Low': return 'secondary';
        default: return 'outline';
    }
}

const getProbabilityVariant = (probability: Risk['probability']) => {
     switch(probability) {
        case 'High': return 'destructive';
        case 'Medium': return 'default';
        case 'Low': return 'secondary';
        default: return 'outline';
    }
}

const getCategoryIcon = (category: Risk['category']) => {
    const iconClass = "w-5 h-5 mr-2";
    switch (category) {
        case 'Operational': return <Briefcase className={iconClass} />;
        case 'Financial': return <PiggyBank className={iconClass} />;
        case 'Technical': return <Sprout className={iconClass} />;
        case 'Legal': return <FileText className={iconClass} />;
        case 'External': return <AlertTriangle className={iconClass} />;
        default: return <ShieldQuestion className={iconClass} />;
    }
}

export default function RiskAnalysisPage() {
    const { projects, isLoading: projectsLoading } = useProjectStore();
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalyzeRisksOutput | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (!projectsLoading && projects.length > 0 && !selectedProjectId) {
            setSelectedProjectId(projects[0].id!);
        }
    }, [projectsLoading, projects, selectedProjectId]);
    
    const selectedProject = useMemo(() => {
        return projects.find(p => p.id === selectedProjectId);
    }, [selectedProjectId, projects]);

    const handleAnalyze = async () => {
        if (!selectedProject) {
            toast({ title: "خطأ", description: "الرجاء اختيار مشروع أولاً.", variant: "destructive" });
            return;
        }
        
         if (!selectedProject.description) {
             toast({ 
                title: "بيانات غير كافية", 
                description: "هذا المشروع لا يحتوي على وصف كافٍ لنطاق العمل لتحليل المخاطر. يرجى تحديث المشروع من صفحة تفاصيله.", 
                variant: "destructive",
                duration: 8000,
             });
             return;
        }

        setIsAnalyzing(true);
        setAnalysisResult(null);

        try {
            const durationInDays = differenceInDays(new Date(selectedProject.endDate!), new Date(selectedProject.createdAt!));

            const result = await analyzeRisks({
                project: {
                    title: selectedProject.title,
                    description: selectedProject.description,
                    budget: selectedProject.budget || 0,
                    currency: selectedProject.currency || 'SAR',
                    durationInDays: isNaN(durationInDays) ? 90 : durationInDays,
                },
            });
            setAnalysisResult(result);
            toast({ title: "نجاح!", description: "اكتمل تحليل المخاطر بنجاح." });
        } catch (error) {
            console.error("Risk analysis failed:", error);
            toast({
                title: "فشل التحليل",
                description: "حدث خطأ أثناء تحليل المخاطر. الرجاء المحاولة مرة أخرى.",
                variant: "destructive",
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">المحلل الذكي للمخاطر</h1>
                <div className="w-[300px]">
                    <Select onValueChange={v => { setSelectedProjectId(v); setAnalysisResult(null); }} value={selectedProjectId || ''}>
                        <SelectTrigger><SelectValue placeholder="اختر مشروعاً لتحليله" /></SelectTrigger>
                        <SelectContent>
                            {projects.map(p => <SelectItem key={p.id} value={p.id!}>{p.title}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className="shadow-xl rounded-2xl">
                 <CardHeader>
                    <CardTitle>تحليل المخاطر الاستباقي</CardTitle>
                    <CardDescription>اختر مشروعاً واضغط على زر التحليل ليقوم المستشار الذكي بتحديد المخاطر المحتملة واقتراح حلول لها.</CardDescription>
                </CardHeader>
                 <CardContent>
                     {isAnalyzing ? (
                         <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                            <Loader className="h-16 w-16 animate-spin text-primary" />
                             <p className="font-semibold text-lg">يقوم مستشار المخاطر بفحص المشروع...</p>
                        </div>
                    ) : analysisResult ? (
                        <div className="space-y-6">
                            {analysisResult.risks.map((risk, index) => (
                                <Card key={index} className="shadow-md">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-lg">
                                            {getCategoryIcon(risk.category)}
                                            {risk.description}
                                        </CardTitle>
                                        <div className="flex items-center gap-4 pt-2">
                                            <Badge variant={getImpactVariant(risk.impact)}>
                                                التأثير: {risk.impact === 'High' ? 'عالي' : risk.impact === 'Medium' ? 'متوسط' : 'منخفض'}
                                            </Badge>
                                             <Badge variant={getProbabilityVariant(risk.probability)}>
                                                الاحتمالية: {risk.probability === 'High' ? 'عالية' : risk.probability === 'Medium' ? 'متوسطة' : 'منخفضة'}
                                            </Badge>
                                             <Badge variant="outline">
                                                الفئة: {risk.category === 'Operational' ? 'تشغيلي' : risk.category === 'Financial' ? 'مالي' : risk.category === 'Technical' ? 'تقني' : risk.category === 'Legal' ? 'قانوني' : 'خارجي'}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="p-4 bg-secondary/50 rounded-lg flex items-start gap-3">
                                            <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-semibold">إجراءات التخفيف المقترحة</h4>
                                                <p className="text-muted-foreground">{risk.mitigation}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                            <ShieldQuestion className="h-16 w-16" />
                             {projects.length > 0 ? (
                                <>
                                 <p className="font-semibold text-lg">بانتظار الأوامر لتحليل المشروع</p>
                                 <p>اضغط على الزر أدناه لبدء عملية تحليل المخاطر.</p>
                                </>
                             ): (
                                 <p className="font-semibold text-lg">لا توجد مشاريع لعرضها.</p>
                             )}
                        </div>
                    )}
                 </CardContent>
                 <CardFooter>
                    <Button onClick={handleAnalyze} disabled={!selectedProjectId || isAnalyzing || projectsLoading} className="w-full" size="lg">
                        {isAnalyzing ? <Loader className="ml-2 h-4 w-4 animate-spin" /> : <Wand2 className="ml-2 h-4 w-4" />}
                        تحليل مخاطر المشروع المختار
                    </Button>
                 </CardFooter>
            </Card>
        </div>
    );
}
