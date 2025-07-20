
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader, Wand2, BarChart, ImageIcon, Building, RefreshCw, ZoomIn, FileText } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { generateBlueprintImage, type GenerateBlueprintImageOutput } from "@/ai/flows/generate-blueprint-image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function AiDesignerPage() {
  const [generationResult, setGenerationResult] = useState<GenerateBlueprintImageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();
  const router = useRouter();


  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "خطأ",
        description: "الرجاء كتابة وصف للتصميم المطلوب.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGenerationResult(null);

    try {
      const result = await generateBlueprintImage({ prompt });
      setGenerationResult(result);
        toast({
          title: "نجاح",
          description: "تم إنشاء التصميم بنجاح.",
        });
    } catch (error) {
      console.error("Generation failed:", error);
      toast({
        title: "فشل إنشاء التصميم",
        description: "حدث خطأ أثناء إنشاء التصميم. قد يكون هناك ضغط على الخدمة، الرجاء المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
        setIsLoading(false);
    }
  };

  const handleAnalyzeGeneratedBlueprint = () => {
    if (!generationResult?.blueprintDataUri) return;
    // We can't send the data URI directly in a GET request.
    // In a real app, we might store it temporarily and pass an ID,
    // but for this prototype, we'll just navigate to the page with a flag.
    sessionStorage.setItem('generatedBlueprint', generationResult.blueprintDataUri);
    router.push('/dashboard/blueprints?from=designer');
  }


  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">المصمم المعماري الذكي</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        <div className="lg:col-span-1 flex flex-col gap-6">
            <Card className="shadow-lg rounded-2xl sticky top-20">
                <CardHeader>
                    <CardTitle>وصف التصميم</CardTitle>
                    <CardDescription>حوّل أفكارك إلى مخططات وتصورات واقعية. صف ما تريد تصميمه، وسيقوم الذكاء الاصطناعي بالباقي.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="design-prompt">اكتب وصفًا تفصيليًا للتصميم</Label>
                        <Textarea 
                            id="design-prompt" 
                            rows={8}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="مثال: مخطط طابق أرضي لفيلا مودرن بمساحة 300 متر مربع، مع مجلس وصالة طعام مفتوحة على الحديقة، ومطبخ كبير مع جزيرة وسطية، وثلاث غرف نوم ماستر."
                        />
                     </div>
                </CardContent>
                 <CardFooter>
                    <Button onClick={handleGenerate} disabled={isLoading} className="w-full font-bold text-lg py-6">
                        {isLoading ? (
                            <>
                            <Loader className="ml-2 h-4 w-4 animate-spin" />
                            جاري التصميم...
                            </>
                        ) : (
                            <><Wand2 className="ml-2 h-4 w-4" /> إنشاء التصميم</>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
        <div className="lg:col-span-2">
             <Card className="shadow-lg rounded-2xl min-h-[700px]">
                <CardHeader>
                    <CardTitle>التصاميم المولدة</CardTitle>
                    <CardDescription>ستظهر المخططات والتصورات التي تم إنشاؤها هنا.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     {isLoading && (
                         <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                             <Loader className="h-16 w-16 animate-spin text-primary" />
                             <p className="font-semibold text-lg">يعمل المصمم الذكي على رسم أفكارك...</p>
                             <p className="text-sm text-center">قد تستغرق هذه العملية دقيقة أو أكثر.</p>
                         </div>
                     )}
                    {generationResult ? (
                        <div className="space-y-6">
                             <Alert>
                                <Wand2 className="h-4 w-4" />
                                <AlertTitle>نجاح!</AlertTitle>
                                <AlertDescription>
                                    هذه هي التصاميم الأولية بناءً على وصفك. يمكنك الآن تحليل المخطط أو إعادة المحاولة بوصف مختلف.
                                </AlertDescription>
                            </Alert>

                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><FileText className="text-primary"/> مخطط معماري (2D)</h3>
                                <div className="relative w-full h-96 bg-secondary rounded-lg overflow-hidden border group">
                                    <Image src={generationResult.blueprintDataUri} alt="المخطط المعماري المولد" layout="fill" objectFit="contain" />
                                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <Button variant="secondary" size="icon"><ZoomIn className="h-5 w-5"/></Button>
                                    </div>
                                </div>
                            </div>
                             <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Building className="text-primary"/> تصور خارجي (3D)</h3>
                                <div className="relative w-full h-80 bg-secondary rounded-lg overflow-hidden border group">
                                   <Image src={generationResult.perspectiveDataUri} alt="التصور الخارجي المولد" layout="fill" objectFit="cover" />
                                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <Button variant="secondary" size="icon"><ZoomIn className="h-5 w-5"/></Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button onClick={handleAnalyzeGeneratedBlueprint} className="w-full" size="lg">
                                    <BarChart className="ml-2 h-4 w-4" />
                                    تحليل المخطط واستخراج الكميات
                                </Button>
                                 <Button onClick={handleGenerate} variant="outline" size="lg">
                                    <RefreshCw className="ml-2 h-4 w-4" />
                                    إعادة المحاولة
                                </Button>
                            </div>
                       </div>
                    ) : !isLoading && (
                         <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                            <Wand2 className="h-16 w-16" />
                            <p className="text-center font-semibold text-lg">بانتظار إبداعك</p>
                            <p className="text-center">اكتب وصفًا للتصميم الذي تحلم به في اللوحة الجانبية، ودع المصمم الذكي يحوله إلى حقيقة.</p>
                        </div>
                     )}
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
