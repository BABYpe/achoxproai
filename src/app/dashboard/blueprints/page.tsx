"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "@/components/file-uploader";
import { analyzeBlueprint, type AnalyzeBlueprintOutput } from "@/ai/flows/analyze-blueprint";
import { useToast } from "@/hooks/use-toast";
import { Loader, BarChart, Maximize, ListTree } from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BlueprintsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeBlueprintOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

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
        toast({
          title: "نجاح",
          description: "تم تحليل المخطط بنجاح.",
        });
      };
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "فشل التحليل",
        description: "حدث خطأ أثناء تحليل المخطط. الرجاء المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">تحليل المخططات بالذكاء الاصطناعي</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle>رفع المخطط</CardTitle>
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
                        <div className="relative w-full h-96 bg-secondary rounded-lg overflow-hidden">
                           <Image src={previewUrl} alt="معاينة المخطط" layout="fill" objectFit="contain" />
                        </div>
                    </CardContent>
                </Card>
             )}
        </div>
        <div className="lg:col-span-1">
             <Card className="shadow-lg rounded-2xl sticky top-20">
                <CardHeader>
                    <CardTitle>نتائج التحليل</CardTitle>
                </CardHeader>
                <CardContent>
                     {isLoading && (
                         <div className="flex flex-col items-center justify-center gap-4 py-10 text-muted-foreground">
                             <Loader className="h-10 w-10 animate-spin text-primary" />
                             <p>يقوم الذكاء الاصطناعي بتحليل المخطط...</p>
                         </div>
                     )}
                    {analysisResult && (
                       <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="font-bold"><BarChart className="ml-2 h-5 w-5 text-accent"/>الكميات</AccordionTrigger>
                            <AccordionContent>
                               <div className="space-y-2 text-sm">
                                  <div className="flex justify-between"><span>المساحة الإجمالية:</span> <span className="font-mono">{analysisResult.quantities.area}</span></div>
                                   <div className="flex justify-between"><span>الطول الإجمالي للخطوط:</span> <span className="font-mono">{analysisResult.quantities.length}</span></div>
                               </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                            <AccordionTrigger className="font-bold"><ListTree className="ml-2 h-5 w-5 text-accent"/>تعداد العناصر</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2 text-sm">
                                {Object.entries(analysisResult.quantities.objectCounts).map(([key, value]) => (
                                    <div className="flex justify-between" key={key}><span>{key}:</span> <span className="font-mono">{value}</span></div>
                                ))}
                                </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                    )}
                     {!isLoading && !analysisResult && (
                         <div className="flex flex-col items-center justify-center gap-4 py-10 text-muted-foreground">
                            <Maximize className="h-10 w-10" />
                            <p>ستظهر نتائج التحليل هنا.</p>
                        </div>
                     )}
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
