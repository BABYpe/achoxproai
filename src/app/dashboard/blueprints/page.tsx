
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileUploader } from "@/components/file-uploader";
import { analyzeBlueprint, type AnalyzeBlueprintOutput } from "@/ai/flows/analyze-blueprint";
import { useToast } from "@/hooks/use-toast";
import { Loader, BarChart, Maximize, ListTree, Calculator, AlertTriangle, FileText, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function BlueprintsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeBlueprintOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleFileSelect = (selectedFile: File) => {
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
    if (analysisResult?.quantities.area) {
      const area = parseFloat(analysisResult.quantities.area.replace(/[^\d.-]/g, ''));
      if (!isNaN(area)) {
          router.push(`/dashboard/cost-estimation?area=${area}`);
      } else {
         toast({
            title: "خطأ في البيانات",
            description: "لا يمكن استخدام المساحة المستخرجة. الرجاء المحاولة مرة أخرى.",
            variant: "destructive",
        });
      }
    }
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
                    <CardDescription>ارفع ملف المخطط ليقوم الذكاء الاصطناعي بتحليله بشكل شامل.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <FileUploader onFileSelect={handleFileSelect} />
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
                </CardContent>
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
                    <CardTitle>نتائج التحليل</CardTitle>
                    <CardDescription>ملخص شامل لتحليل المخطط بواسطة الذكاء الاصطناعي.</CardDescription>
                </CardHeader>
                <CardContent className="min-h-[300px]">
                     {isLoading && (
                         <div className="flex flex-col items-center justify-center gap-4 py-10 text-muted-foreground">
                             <Loader className="h-10 w-10 animate-spin text-primary" />
                             <p>يقوم الذكاء الاصطناعي بتحليل المخطط...</p>
                         </div>
                     )}
                    {analysisResult && (
                        <div className="flex flex-col gap-4">
                            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="font-bold text-base"><FileText className="ml-2 h-5 w-5 text-accent"/>ملخص التحليل</AccordionTrigger>
                                    <AccordionContent className="text-sm text-muted-foreground pr-2">
                                        {analysisResult.scopeOfWork}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="font-bold text-base">
                                        <div className="flex items-center">
                                            <AlertTriangle className="ml-2 h-5 w-5 text-destructive"/>الأخطاء والملاحظات
                                            <Badge variant={analysisResult.errorsFound.length > 0 ? "destructive" : "secondary"} className="mr-2">
                                                {analysisResult.errorsFound.length}
                                            </Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2 text-sm pr-2">
                                        {analysisResult.errorsFound.length > 0 ? (
                                            <ul className="list-disc list-outside space-y-1 pl-4">
                                                {analysisResult.errorsFound.map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <CheckCircle className="h-4 w-4" />
                                                <p>لم يتم العثور على أخطاء واضحة.</p>
                                            </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="font-bold text-base"><BarChart className="ml-2 h-5 w-5 text-accent"/>الكميات المستخرجة</AccordionTrigger>
                                    <AccordionContent className="space-y-2 text-sm pr-2">
                                        <div className="flex justify-between"><span>المساحة الإجمالية:</span> <span className="font-mono">{analysisResult.quantities.area}</span></div>
                                        <div className="flex justify-between"><span>الطول الإجمالي للخطوط:</span> <span className="font-mono">{analysisResult.quantities.length}</span></div>
                                        <h4 className="font-semibold mt-2 pt-2 border-t">تعداد العناصر:</h4>
                                        {Object.entries(analysisResult.quantities.objectCounts).map(([key, value]) => (
                                            <div className="flex justify-between" key={key}><span>{key}:</span> <span className="font-mono">{value}</span></div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="font-bold text-base"><ListTree className="ml-2 h-5 w-5 text-accent"/>بنود العمل المقترحة</AccordionTrigger>
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
                                استخدام النتائج لتقدير التكلفة
                            </Button>
                       </div>
                    )}
                     {!isLoading && !analysisResult && (
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
