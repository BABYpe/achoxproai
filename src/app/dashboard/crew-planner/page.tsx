
"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { useProjectStore } from '@/hooks/use-project-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, UserCheck } from 'lucide-react';
import { UsersGroupIcon } from '@/components/icons/users-group-icon';
import { estimateProjectCost, type EstimateProjectCostOutput } from '@/ai/flows/estimate-project-cost';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type CrewRecommendation = EstimateProjectCostOutput['crewRecommendation'];

export default function CrewPlannerPage() {
    const { projects, isLoading: projectsLoading } = useProjectStore();
    const { toast } = useToast();
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [crew, setCrew] = useState<CrewRecommendation | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    
    useEffect(() => {
        if (!projectsLoading && projects.length > 0 && !selectedProjectId) {
            setSelectedProjectId(projects[0].id!);
        }
    }, [projects, projectsLoading, selectedProjectId]);

    const selectedProject = useMemo(() => {
        return projects.find(p => p.id === selectedProjectId);
    }, [selectedProjectId, projects]);

    const handleGenerateCrew = async () => {
        if (!selectedProject) {
            toast({ title: "خطأ", description: "الرجاء اختيار مشروع أولاً.", variant: "destructive" });
            return;
        }

        if (!selectedProject.scopeOfWork || !selectedProject.projectType || !selectedProject.quality) {
             toast({ 
                title: "بيانات غير كافية", 
                description: "هذا المشروع لا يحتوي على تفاصيل كافية لتوليد فريق عمل. يرجى استخدام ميزة 'استخدام كقالب' من صفحة القوالب لتحديث المشروع.", 
                variant: "destructive",
                duration: 8000,
             });
             return;
        }


        setIsGenerating(true);
        setCrew(null);

        try {
            const estimation = await estimateProjectCost({
                location: selectedProject.location,
                size: (selectedProject.budget / 7000).toFixed(0), // Approximate size
                type: selectedProject.projectType, 
                quality: selectedProject.quality,
                scopeOfWork: selectedProject.scopeOfWork,
                currentDate: format(new Date(), 'yyyy-MM-dd'),
            });
            setCrew(estimation.crewRecommendation);
             toast({ title: "نجاح!", description: "تم حساب الطاقم المقترح." });

        } catch (error) {
            console.error(error);
            toast({ title: "خطأ", description: "فشل حساب الطاقم، الرجاء المحاولة مرة أخرى.", variant: "destructive" });
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">مخطط فريق العمل</h1>
                <div className="flex items-center gap-2">
                     <div className="w-[300px]">
                         {projectsLoading ? <Loader className="animate-spin" /> : (
                            <Select onValueChange={v => {setSelectedProjectId(v); setCrew(null);}} value={selectedProjectId || ''}>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر مشروعاً" />
                                </SelectTrigger>
                                <SelectContent>
                                    {projects.map(p => (
                                        <SelectItem key={p.id} value={p.id!}>{p.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                         )}
                    </div>
                     <Button onClick={handleGenerateCrew} disabled={!selectedProjectId || isGenerating}>
                        {isGenerating && <Loader className="ml-2 h-4 w-4 animate-spin" />}
                        حساب الطاقم المقترح
                    </Button>
                </div>
            </div>

            <Card className="shadow-xl rounded-2xl min-h-[600px]">
                <CardHeader>
                    <CardTitle>توصيات فريق العمل للمشروع</CardTitle>
                    <CardDescription>يقوم الذكاء الاصطناعي بتحليل متطلبات المشروع لتقدير حجم ونوع الفريق المطلوب.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isGenerating ? (
                         <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                            <Loader className="h-16 w-16 animate-spin text-primary" />
                             <p className="font-semibold text-lg">جاري تحليل متطلبات المشروع...</p>
                        </div>
                    ) : crew ? (
                        <div className="flex flex-col items-center text-center gap-8 pt-10">
                            <div className="relative">
                                <UsersGroupIcon className="w-24 h-24 text-primary" />
                            </div>
                            <div className="flex items-baseline gap-4">
                                <p className="text-7xl font-bold">{crew.totalPersonnel}</p>
                                <p className="text-2xl text-muted-foreground">شخص</p>
                            </div>
                            <p className="text-xl font-semibold">إجمالي الفريق المقترح</p>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full max-w-4xl">
                                {Object.entries(crew.breakdown).map(([role, count]) => (
                                    <div key={role} className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center gap-2 shadow-sm">
                                        <UserCheck className="w-8 h-8 text-primary" />
                                        <p className="font-bold text-lg">{role}</p>
                                        <p className="text-4xl font-black text-foreground">{count}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                            <UsersGroupIcon className="h-16 w-16" />
                             {projects.length > 0 ? (
                                <>
                                 <p className="font-semibold text-lg">الرجاء اختيار مشروع والضغط على زر الحساب</p>
                                 <p>لعرض الفريق المقترح من قبل الذكاء الاصطناعي.</p>
                                </>
                             ): (
                                 <p className="font-semibold text-lg">لا توجد مشاريع لعرضها.</p>
                             )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
