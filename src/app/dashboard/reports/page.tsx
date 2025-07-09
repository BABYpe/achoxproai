"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { generateReport, type GenerateReportOutput } from '@/ai/flows/generate-report';
import { Loader, Wand2, FileText } from 'lucide-react';
import React from 'react';

// Mock data, in a real app this would come from a database
const projects = [
  { id: "P-001", title: "مشروع فيلا سكنية", status: "قيد التنفيذ", budget: "1.2M SAR" },
  { id: "P-002", title: "مبنى تجاري متعدد الطوابق", status: "مكتمل", budget: "5.5M SAR" },
  { id: "P-003", title: "تطوير مجمع سكني", status: "مخطط له", budget: "25M SAR" },
  { id: "P-004", title: "تجديد فندق فاخر", status: "متأخر", budget: "12M SAR" },
];

const boqItems = [
  { id: "B-101", description: "أعمال الحفر والردم", quantity: 1200, unit: "م³" },
  { id: "C-201", description: "خرسانة مسلحة للقواعد", quantity: 450, unit: "م³" },
  { id: "S-301", description: "حديد تسليح", quantity: 85, unit: "طن" },
  { id: "A-401", description: "أعمال المباني بالطوب", quantity: 2500, unit: "م²" },
];

export default function ReportsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateReportOutput | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const { toast } = useToast();

    const handleSubmit = async () => {
        if (!selectedProjectId) {
            toast({
                title: 'خطأ',
                description: 'الرجاء اختيار مشروع أولاً.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setResult(null);

        const project = projects.find(p => p.id === selectedProjectId);
        if (!project) return;

        // For demo, we'll stringify the mock BOQ data.
        const boqSummary = boqItems.map(item => `- ${item.description}: ${item.quantity} ${item.unit}`).join('\n');

        try {
            const report = await generateReport({
                projectTitle: project.title,
                projectStatus: project.status,
                projectBudget: project.budget,
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
        const htmlContent = content
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-3 mb-1">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mt-2 mb-1">$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
            .replace(/(\r\n|\n|\r)/gm, '<br />')
            .replace(/(<br\s*\/?>\s*){2,}/g, '<br /><br />'); // handle multiple newlines

        return <div dangerouslySetInnerHTML={{ __html: htmlContent.replace(/(<li.*<\/li>)/g, '<ul>$1</ul>') }} />;
    };


    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">توليد تقارير المشاريع</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card className="shadow-xl rounded-2xl sticky top-20">
                        <CardHeader>
                            <CardTitle>اختيار المشروع</CardTitle>
                            <CardDescription>اختر المشروع الذي تود توليد تقرير له.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="project">المشروع</Label>
                                <Select onValueChange={setSelectedProjectId} name="project">
                                    <SelectTrigger id="project">
                                        <SelectValue placeholder="اختر مشروعاً" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projects.map(p => (
                                            <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleSubmit} disabled={isLoading || !selectedProjectId} className="w-full font-bold text-lg py-6">
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
                                <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-secondary/30 rounded-lg">
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
