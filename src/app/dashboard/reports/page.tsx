
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { generateReport, type GenerateReportOutput } from '@/ai/flows/generate-report';
import { Loader, Wand2, FileText } from 'lucide-react';
import React from 'react';
import { useProjectStore } from '@/hooks/use-project-store';

// Mock data, in a real app this would come from a database or be generated.
const boqItems = [
    { id: "B-101", description: "أعمال الحفر والردم لموقع المشروع", quantity: 1250, unit: "م³" },
    { id: "C-201", description: "خرسانة مسلحة للقواعد", quantity: 450, unit: "م³" },
    { id: "S-301", description: "حديد تسليح عالي المقاومة", quantity: 85, unit: "طن" },
    { id: "A-401", description: "أعمال المباني بالطوب الأسمنتي المعزول", quantity: 2500, unit: "م²" },
    { id: "F-501", description: "أعمال اللياسة الداخلية والخارجية", quantity: 6000, unit: "م²" },
    { id: "P-601", description: "أعمال الدهانات الداخلية (جوتن)", quantity: 5500, unit: "م²" },
    { id: "E-701", description: "تمديدات كهربائية كاملة (الفنار)", quantity: 1, unit: "مقطوعة" },
    { id: "M-801", description: "أعمال السباكة والتغذية والصرف (نيبرو)", quantity: 1, unit: "مقطوعة" },
    { id: "AC-803", description: "توريد وتركيب وحدات تكييف سبليت", quantity: 12, unit: "عدد" },
    { id: "T-701", description: "توريد وتركيب بلاط بورسلان للأرضيات", quantity: 750, unit: "م²" },
];


export default function ReportsPage() {
    const { projects } = useProjectStore();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateReportOutput | null>(null);
    const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);
    const { toast } = useToast();

    const handleSubmit = async () => {
        if (!selectedProjectTitle) {
            toast({
                title: 'خطأ',
                description: 'الرجاء اختيار مشروع أولاً.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setResult(null);

        const project = projects.find(p => p.title === selectedProjectTitle);
        if (!project) {
            setIsLoading(false);
            return;
        };

        // For demo, we'll stringify the mock BOQ data.
        const boqSummary = boqItems.map(item => `- ${item.description}: ${item.quantity} ${item.unit}`).join('\n');

        try {
            const report = await generateReport({
                projectTitle: project.title,
                projectStatus: `${project.status} - ${project.progress}% مكتمل`,
                projectBudget: `${project.budget.toLocaleString()} ${project.currency}`,
                boqSummary: boqSummary,
            });
            setResult(report);
        } catch (error) {
            console.error(error);
            toast({
                title: 'حدث خطأ',
                description: 'لم نتمكن من توليد التقرير. الرجاء المحاولة مرة أخرى.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // A simple markdown to HTML renderer
    const MarkdownRenderer = ({ content }: { content: string }) => {
        let htmlContent = ` ${content} `; // Add spaces to handle edge cases
        
        // Process headings
        htmlContent = htmlContent.replace(/\\n# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>');
        htmlContent = htmlContent.replace(/\\n## (.*$)/gim, '<h2 class="text-xl font-semibold mt-3 mb-1">$1</h2>');
        htmlContent = htmlContent.replace(/\\n### (.*$)/gim, '<h3 class="text-lg font-medium mt-2 mb-1">$1</h3>');

        // Process bold and italics
        htmlContent = htmlContent.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
        htmlContent = htmlContent.replace(/\*(.*?)\*/gim, '<em>$1</em>');

        // Process lists
        htmlContent = htmlContent.replace(/(\\n- .*)+/gim, (match) => {
            const listItems = match.trim().split('\\n').map(item => `<li class="ml-4">${item.substring(2)}</li>`).join('');
            return `<ul class="list-disc list-outside space-y-1 my-3">${listItems}</ul>`;
        });
        
        // Process newlines to <br>
        htmlContent = htmlContent.replace(/(\\r\\n|\\n|\\r)/gm, '<br />');

        return <div className="space-y-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    };


    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">توليد تقارير المشاريع</h1>
            <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1">
                    <Card className="shadow-xl rounded-2xl sticky top-20">
                        <CardHeader>
                            <CardTitle>اختيار المشروع</CardTitle>
                            <CardDescription>اختر المشروع الذي تود توليد تقرير له.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="project">المشروع</Label>
                                <Select onValueChange={setSelectedProjectTitle} name="project">
                                    <SelectTrigger id="project">
                                        <SelectValue placeholder="اختر مشروعاً" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projects.map(p => (
                                            <SelectItem key={p.title} value={p.title}>{p.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleSubmit} disabled={isLoading || !selectedProjectTitle} className="w-full font-bold text-lg py-6">
                                {isLoading ? (
                                    <>
                                        <Loader className="ml-2 h-4 w-4 animate-spin" />
                                        جاري توليد التقرير...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="ml-2 h-4 w-4" />
                                        توليد التقرير
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card className="shadow-xl rounded-2xl min-h-[500px]">
                        <CardHeader>
                            <CardTitle>التقرير المولد</CardTitle>
                             <CardDescription>سيظهر التقرير الذي تم توليده بواسطة الذكاء الاصطناعي هنا.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             {isLoading && (
                                <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                                    <Loader className="h-12 w-12 animate-spin text-primary" />
                                    <p>يقوم الذكاء الاصطناعي بكتابة التقرير...</p>
                                </div>
                             )}
                            {result ? (
                                <div className="p-4 bg-secondary/30 rounded-lg text-right">
                                    <MarkdownRenderer content={result.report} />
                                </div>
                            ) : !isLoading && (
                                 <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                                    <FileText className="h-12 w-12" />
                                    <p>اختر مشروعاً واضغط على زر التوليد.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
