
"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Building, DollarSign, Wand2 } from "lucide-react";
import { useProjectStore, type Project } from "@/hooks/use-project-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function TemplatesPage() {
    const { projects, isLoading } = useProjectStore();
    const router = useRouter();

    const handleUseTemplate = (template: Project) => {
        const query = new URLSearchParams({
            template: JSON.stringify({
                projectName: `${template.title} (نسخة)`,
                location: template.location,
                projectDescription: template.scopeOfWork || `مشروع جديد مبني على قالب: ${template.title}`,
                // Pass the full plan as a template
                projectAnalysis: {
                    projectType: template.projectType || 'other',
                    quality: template.quality || 'standard',
                    initialBlueprintPrompt: template.scopeOfWork || `مشروع جديد مبني على قالب: ${template.title}`,
                },
                costEstimation: template.costEstimation,
                riskAnalysis: template.riskAnalysis,
                ganttChartData: template.ganttChartData,
            }),
        }).toString();

        router.push(`/dashboard/projects/new?${query}`);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">مكتبة قوالب المشاريع</h1>
                <p className="text-muted-foreground">ابدأ مشروعك الجديد بخطة متكاملة بنقرة زر.</p>
            </div>

            <Card className="shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle>اختر مشروعًا سابقًا لاستخدامه كقالب</CardTitle>
                    <CardDescription>
                        استخدم أحد مشاريعك المكتملة أو الحالية كنقطة انطلاق قوية لمشروعك التالي. سيتم نسخ الخطة الكاملة للمشروع بما في ذلك التكاليف والجدول الزمني والمخاطر.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                             <Card key={i} className="overflow-hidden shadow-lg flex flex-col">
                                 <Skeleton className="bg-muted h-48 w-full" />
                                 <CardHeader><Skeleton className="h-6 w-3/4 bg-muted rounded-md" /></CardHeader>
                                 <CardContent className="flex-grow space-y-2">
                                     <Skeleton className="h-5 w-1/2 bg-muted rounded-md" />
                                     <Skeleton className="h-5 w-2/3 bg-muted rounded-md" />
                                 </CardContent>
                                 <CardFooter><Skeleton className="h-10 w-full bg-muted rounded-md" /></CardFooter>
                            </Card>
                        ))
                    ) : (
                        projects.map((template) => (
                            <Card key={template.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                                <Image src={template.imageUrl} alt={template.title} width={400} height={200} className="w-full h-48 object-cover" data-ai-hint={template.imageHint} />
                                <CardHeader>
                                    <CardTitle>{template.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-primary" />
                                        <span>{template.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-primary" />
                                        <span>تقدير الميزانية: {template.budget.toLocaleString('ar-SA')} {template.currency}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full gap-2" onClick={() => handleUseTemplate(template)}>
                                        <Wand2 className="h-4 w-4" />
                                        استخدام هذا المشروع كقالب
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                     {!isLoading && projects.length === 0 && (
                        <p className="text-muted-foreground col-span-full text-center py-10">لا توجد مشاريع حتى الآن لإنشاء قوالب منها.</p>
                     )}
                </CardContent>
            </Card>
        </div>
    );
}
