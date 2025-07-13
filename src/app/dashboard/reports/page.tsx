
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
import { Skeleton } from '@/components/ui/skeleton';

// A simple markdown to HTML renderer
const MarkdownRenderer = ({ content }: { content: string }) => {
    // Basic replacements for Markdown features. For a more robust solution, a library like 'marked' or 'react-markdown' would be better.
    let htmlContent = content
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-5 mb-3 border-b pb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-6 mb-4 border-b pb-3">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/(\<li\>.*?\<\/li\>)/gim, '<ul class="list-disc list-outside space-y-1 my-3">$1</ul>')
      .replace(/\\n/g, '<br />');

    return <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};


export default function ReportsPage() {
    const { projects, isLoading: projectsLoading } = useProjectStore();
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
        if (!project) {
            toast({
                title: 'خطأ',
                description: 'لم يتم العثور على المشروع المحدد.',
                variant: 'destructive',
            });
            setIsLoading(false);
            return;
        };

        try {
            const report = await generateReport({ project });
            setResult(report);
            toast({
                title: 'نجاح!',
                description: 'تم توليد التقرير بنجاح.',
            })
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
                                {projectsLoading ? (
                                    <Skeleton className="h-10 w-full" />
                                ) : (
                                    <Select onValueChange={setSelectedProjectId} name="project">
                                        <SelectTrigger id="project">
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
                                <div className="p-4 bg-secondary/30 rounded-lg">
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
