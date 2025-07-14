
"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Building, DollarSign, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { initialProjects } from "@/lib/initial-projects";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TemplatesPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleUseTemplate = (template: typeof initialProjects[0]) => {
        const query = new URLSearchParams({
            template: JSON.stringify({
                projectName: `${template.title} (نسخة)`,
                location: template.location,
                projectDescription: template.scopeOfWork || `مشروع جديد مبني على قالب: ${template.title}`,
            }),
        }).toString();

        router.push(`/dashboard/projects/new?${query}`);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">مكتبة قوالب المشاريع</h1>
                <p className="text-muted-foreground">ابدأ مشروعك الجديد بنقرة زر.</p>
            </div>

            <Card className="shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle>اختر قالبًا لتبدأ</CardTitle>
                    <CardDescription>
                        استخدم أحد هذه المشاريع كنقطة انطلاق قوية لمشروعك التالي. يمكنك تخصيص جميع التفاصيل لاحقًا.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {initialProjects.map((template) => (
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
                                    استخدام هذا القالب
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
