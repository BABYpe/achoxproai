
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { FileUploader } from "@/components/file-uploader";
import { analyzeBlueprint, type AnalyzeBlueprintOutput } from "@/ai/flows/analyze-blueprint";
import { useToast } from "@/hooks/use-toast";
import { Loader, BarChart, Maximize, ListTree, Calculator, AlertTriangle, FileText, CheckCircle, Lightbulb, ShieldCheck, Building, Bolt, Wrench, Scaling } from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

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

export default function BlueprintsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeBlueprintOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFileFromDesigner = useCallback(async (dataUri: string) => {
    try {
        setIsLoading(true);
        setAnalysisResult(null);
        setFile(null);
        setPreviewUrl(dataUri); // Show preview immediately

        const result = await analyzeBlueprint({ blueprintDataUri: dataUri });
        setAnalysisResult(result);
        toast({ title: "نجاح", description: "تم تحليل المخطط المولد بنجاح." });
    } catch(error) {
        console.error("Analysis failed:", error);
        toast({ title: "فشل التحليل", variant: "destructive" });
    } finally {
        setIsLoading(false);
        // Clean up session storage
        sessionStorage.removeItem('generatedBlueprint');
        // Clean up URL params
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
    }
  }, [toast]);

  useEffect(() => {
      const fromDesigner = searchParams.get('from') === 'designer';
      const generatedBlueprint = sessionStorage.getItem('generatedBlueprint');
      if(fromDesigner && generatedBlueprint) {
        handleFileFromDesigner(generatedBlueprint);
      }
  }, [searchParams, handleFileFromDesigner]);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    setAnalysisResult(null);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "خطأ",
        description: "الرجاء تحديد ملف مخطط أولاً.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64File = reader.result as string;
        const result = await analyzeBlueprint({ blueprintDataUri: base64File });
        setAnalysisResult(result);
        setIsLoading(false); 
        toast({
          title: "نجاح",
          description: "تم تحليل المخطط بنجاح.",
        });
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        toast({
            title: "فشل قراءة الملف",
            description: "حدث خطأ أثناء قراءة الملف. الرجاء المحاولة مرة أخرى.",
            variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "فشل التحليل",
        description: "حدث خطأ أثناء تحليل المخطط. الرجاء المحاولة مرة أخرى.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleUseForEstimation = () => {
    // This function can be expanded to pass more data to the cost estimation page
    const area = analysisResult?.quantities.area ? parseFloat(analysisResult.quantities.area.replace(/[^\d.-]/g, '')) : NaN;
    const projectDescription = `تحليل وتقدير تكلفة مشروع بناءً على مخطط.
    ملخص نطاق العمل: ${analysisResult?.scopeOfWork}
    المواد المطلوبة: ${analysisResult?.requiredItems.map(i => i.item).join(', ')}`;

    const template = {
        projectName: `مشروع جديد بناءً على مخطط ${file?.name || 'مولد'}`,
        projectDescription,
        location: "" // User will fill this in
    };

    const query = new URLSearchParams({ template: JSON.stringify(template) }).toString();
    router.push(`/dashboard/projects/new?${query}`);
  };


  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">تحليل المخططات بالذكاء الاصطناعي</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle>رفع المخطط</CardTitle>
                    <CardDescription>ارفع ملف المخطط ليقوم المستشار الهندسي الذكي بتحليله بشكل شامل.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FileUploader onFileSelect={handleFileSelect} />
                </CardContent>
                <CardFooter>
                     <Button onClick={handleAnalyze} disabled={!file || isLoading} className="w-full font-bold text-lg py-6">
                        {isLoading ? (
                            <>
                            <Loader className="ml-2 h-4 w-4 animate-spin" />
                            جاري التحليل...
                            </>
                        ) : (
                            "تحليل المخطط"
                        )}
                    </Button>
                </CardFooter>
            </Card>
             {previewUrl && (
                 <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle>معاينة المخطط</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <div className="relative w-full h-96 bg-secondary rounded-lg overflow-hidden border">
                           <Image src={previewUrl} alt="معاينة المخطط" fill style={{ objectFit: 'contain' }} />
                        </div>
                    </CardContent>
                </Card>
             )}
        </div>
        <div className="lg:col-span-1">
             <Card className="shadow-lg rounded-2xl sticky top-20">
                <CardHeader>
                    <CardTitle>تقرير المستشار الهندسي</CardTitle>
                    <CardDescription>ملخص شامل لتحليل المخطط بواسطة الذكاء الاصطناعي.</CardDescription>
                </CardHeader>
                <CardContent className="min-h-[300px]">
                     {isLoading && (
                         <div className="flex flex-col items-center justify-center gap-4 py-10 text-muted-foreground">
                             <Loader className="h-10 w-10 animate-spin text-primary" />
                             <p>يقوم المستشار الذكي بتحليل المخطط...</p>
                         </div>
                     )}
                    {analysisResult ? (
                        <div className="flex flex-col gap-2">
                           {/* Scope of Work */}
                            <Card className="bg-secondary/30">
                                <CardHeader className="p-4">
                                    <CardTitle className="text-base flex items-center"><FileText className="ml-2 h-5 w-5 text-accent"/>ملخص نطاق العمل</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                                    {analysisResult.scopeOfWork}
                                </CardContent>
                            </Card>

                             {/* Warnings */}
                            <Card>
                                <CardHeader className="p-4">
                                     <CardTitle className="text-base flex items-center">
                                        <AlertTriangle className="ml-2 h-5 w-5 text-destructive"/>
                                        التحذيرات والمخاطر ({analysisResult.warnings.length})
                                     </CardTitle>
                                </CardHeader>
                                {analysisResult.warnings.length > 0 ? (
                                    <CardContent className="p-4 pt-0 space-y-3">
                                        {analysisResult.warnings.map((warning, index) => (
                                            <div key={index} className="border p-3 rounded-lg">
                                                <div className="flex justify-between items-center font-semibold">
                                                   <span className="flex items-center">
                                                       {getCategoryIcon(warning.category)}
                                                       {warning.category}
                                                   </span>
                                                    <Badge variant={getSeverityVariant(warning.severity)}>
                                                        {warning.severity === "High" ? "خطورة عالية" : warning.severity === "Medium" ? "متوسطة" : "منخفضة"}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-2">{warning.description}</p>
                                                 <div className="mt-2 pt-2 border-t border-dashed flex items-start gap-2 text-primary">
                                                    <Lightbulb className="w-4 h-4 mt-1 flex-shrink-0" />
                                                    <p className="text-sm">{warning.recommendation}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                ) : (
                                     <CardContent className="p-4 pt-0">
                                        <div className="flex items-center gap-2 text-green-600">
                                            <CheckCircle className="h-4 w-4" />
                                            <p className="text-sm">ممتاز! لم يتم العثور على مخاطر واضحة في المخطط.</p>
                                        </div>
                                    </CardContent>
                                )}
                            </Card>
                            
                            {/* Accordion for other details */}
                            <Accordion type="multiple" className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="font-bold text-base flex-1"><BarChart className="ml-2 h-5 w-5 text-accent"/>الكميات المستخرجة</AccordionTrigger>
                                    <AccordionContent className="space-y-2 text-sm pr-2">
                                        <div className="flex justify-between"><span>المساحة الإجمالية:</span> <span className="font-mono">{analysisResult.quantities.area}</span></div>
                                        <div className="flex justify-between"><span>الطول الإجمالي للخطوط:</span> <span className="font-mono">{analysisResult.quantities.length}</span></div>
                                        <h4 className="font-semibold mt-2 pt-2 border-t">تعداد العناصر:</h4>
                                        {Object.entries(analysisResult.quantities.objectCounts).map(([key, value]) => (
                                            <div className="flex justify-between" key={key}><span>{key}:</span> <span className="font-mono">{value}</span></div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="font-bold text-base flex-1"><ListTree className="ml-2 h-5 w-5 text-accent"/>بنود العمل المقترحة</AccordionTrigger>
                                    <AccordionContent className="space-y-2 text-sm pr-2">
                                         <ul className="list-disc list-outside space-y-2 pl-4">
                                            {analysisResult.requiredItems.map((item, index) => (
                                                <li key={index}><strong>{item.item}:</strong> {item.reason}</li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <Button onClick={handleUseForEstimation} className="w-full mt-4">
                                <Calculator className="ml-2 h-4 w-4" />
                                إنشاء خطة وتقدير تكلفة من هذا التحليل
                            </Button>
                       </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center gap-4 py-10 text-muted-foreground">
                            <Maximize className="h-10 w-10" />
                            <p className="text-center">ستظهر نتائج التحليل الشامل هنا بعد رفع المخطط.</p>
                        </div>
                     )}
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
