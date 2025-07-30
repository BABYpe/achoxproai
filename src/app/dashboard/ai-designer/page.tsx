
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader, Wand2, BarChart, Building, RefreshCw, ZoomIn, FileText, Download, Camera, Bolt, Wind, Droplets } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateBlueprintImage, type GenerateBlueprintImageOutput } from "@/ai/flows/generate-blueprint-image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const designSchema = z.object({
  projectType: z.enum(['residential_villa', 'commercial_building', 'event_hall', 'office_space', 'restaurant', 'other']),
  quality: z.enum(['standard', 'premium', 'luxury']),
  area: z.string().min(2, "الرجاء إدخال مساحة صحيحة"),
  prompt: z.string().min(20, "الرجاء كتابة وصف لا يقل عن 20 حرفًا."),
});

type DesignFormData = z.infer<typeof designSchema>;


const BlueprintDisplayCard = ({ title, icon, dataUri, onDownload }: { title: string, icon: React.ElementType, dataUri: string, onDownload: (format: 'pdf' | 'dwg') => void }) => {
    const Icon = icon;
    return (
        <Card className="bg-secondary/50">
            <CardHeader className="flex-row justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Icon className="text-primary w-6 h-6"/>
                    {title}
                </CardTitle>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 ml-2"/>
                            تنزيل
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => onDownload('pdf')}>
                            تنزيل بصيغة PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onDownload('dwg')}>
                           تنزيل بصيغة DWG
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <div className="relative w-full aspect-video bg-secondary rounded-lg overflow-hidden border group">
                    <Image src={dataUri} alt={title} layout="fill" objectFit="contain" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <Button variant="secondary" size="icon"><ZoomIn className="h-5 w-5"/></Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


export default function AiDesignerPage() {
  const [generationResult, setGenerationResult] = useState<GenerateBlueprintImageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<DesignFormData>({
    resolver: zodResolver(designSchema),
    defaultValues: {
        projectType: 'residential_villa',
        quality: 'premium',
        area: "300",
        prompt: "فيلا مودرن طابقين مع واجهة زجاجية كبيرة، حديقة خلفية مع مسبح، تصميم داخلي مفتوح يربط بين غرفة المعيشة والطعام، مطبخ أمريكي مع جزيرة، 4 غرف نوم ماستر في الطابق العلوي مع شرفات خاصة."
    }
  });


  const handleGenerate = async (data: DesignFormData) => {
    setIsLoading(true);
    setGenerationResult(null);

    try {
      const result = await generateBlueprintImage(data);
      setGenerationResult(result);
        toast({
          title: "نجاح",
          description: "تم إنشاء حزمة المخططات الهندسية بنجاح.",
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
    if (!generationResult?.architecturalBlueprintDataUri) return;
    sessionStorage.setItem('generatedBlueprint', generationResult.architecturalBlueprintDataUri);
    router.push('/dashboard/blueprints?from=designer');
  }

  const handleDownloadImage = (dataUri: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
     toast({
        title: `جاري تنزيل ${filename}`,
        description: `سيتم حفظ الملف في مجلد التنزيلات الخاص بك.`,
      });
  };


  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">المصمم المعماري الذكي</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        <div className="lg:col-span-1 flex flex-col gap-6">
            <Card className="shadow-lg rounded-2xl sticky top-20">
                <form onSubmit={handleSubmit(handleGenerate)}>
                    <CardHeader>
                        <CardTitle>وصف التصميم</CardTitle>
                        <CardDescription>حوّل أفكارك إلى حزمة مخططات هندسية متكاملة وتصورات واقعية. صف ما تريد تصميمه، وسيقوم الذكاء الاصطناعي بالباقي.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                                <Label htmlFor="projectType">نوع المشروع</Label>
                                <Controller
                                    name="projectType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="residential_villa">فيلا سكنية</SelectItem>
                                                <SelectItem value="commercial_building">مبنى تجاري</SelectItem>
                                                <SelectItem value="interior_finishing">تشطيبات داخلية</SelectItem>
                                                <SelectItem value="event_hall">قاعة مناسبات</SelectItem>
                                                <SelectItem value="office_space">مساحات مكتبية</SelectItem>
                                                <SelectItem value="restaurant">مطعم</SelectItem>
                                                <SelectItem value="other">أخرى</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="quality">مستوى الجودة</Label>
                                 <Controller
                                    name="quality"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="standard">قياسي</SelectItem>
                                                <SelectItem value="premium">ممتاز</SelectItem>
                                                <SelectItem value="luxury">فاخر</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="area">المساحة التقريبية (متر مربع)</Label>
                            <Controller name="area" control={control} render={({ field }) => <Input {...field} type="number" placeholder="300" />} />
                            {errors.area && <p className="text-xs text-destructive">{errors.area.message}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="design-prompt">اكتب وصفًا تفصيليًا للتصميم</Label>
                            <Controller name="prompt" control={control} render={({ field }) => 
                                <Textarea 
                                    id="design-prompt" 
                                    rows={6}
                                    {...field}
                                    placeholder="مثال: مخطط طابق أرضي لفيلا مودرن، مع مجلس وصالة طعام مفتوحة على الحديقة، ومطبخ كبير مع جزيرة وسطية، وثلاث غرف نوم ماستر."
                                />
                            } />
                            {errors.prompt && <p className="text-xs text-destructive">{errors.prompt.message}</p>}
                         </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isLoading} className="w-full font-bold text-lg py-6">
                            {isLoading ? (
                                <>
                                <Loader className="ml-2 h-4 w-4 animate-spin" />
                                جاري التصميم...
                                </>
                            ) : (
                                <><Wand2 className="ml-2 h-4 w-4" /> إنشاء حزمة المخططات</>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
        <div className="lg:col-span-2">
             <Card className="shadow-lg rounded-2xl min-h-[700px]">
                <CardHeader>
                    <CardTitle>حزمة المخططات الهندسية</CardTitle>
                    <CardDescription>ستظهر هنا المخططات الفنية المتخصصة التي تم إنشاؤها بواسطة الذكاء الاصطناعي.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     {isLoading && (
                         <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                             <Loader className="h-16 w-16 animate-spin text-primary" />
                             <p className="font-semibold text-lg">يعمل المهندس الذكي على رسم أفكارك...</p>
                             <p className="text-sm text-center">قد تستغرق هذه العملية دقيقة أو أكثر لتوليد جميع المخططات.</p>
                         </div>
                     )}
                    {generationResult ? (
                        <div className="space-y-6">
                            <Tabs defaultValue="architectural" className="w-full">
                                <TabsList className="grid w-full grid-cols-5">
                                    <TabsTrigger value="architectural"><Building className="w-4 h-4 ml-1"/> معماري</TabsTrigger>
                                    <TabsTrigger value="electrical"><Bolt className="w-4 h-4 ml-1"/> كهرباء</TabsTrigger>
                                    <TabsTrigger value="hvac"><Wind className="w-4 h-4 ml-1"/> تكييف</TabsTrigger>
                                    <TabsTrigger value="plumbing"><Droplets className="w-4 h-4 ml-1"/> صحي</TabsTrigger>
                                    <TabsTrigger value="perspectives"><Camera className="w-4 h-4 ml-1"/> 3D</TabsTrigger>
                                </TabsList>
                                <TabsContent value="architectural" className="pt-4">
                                     <BlueprintDisplayCard 
                                        title="المخطط المعماري (2D)" 
                                        icon={Building} 
                                        dataUri={generationResult.architecturalBlueprintDataUri} 
                                        onDownload={(format) => handleDownloadImage(generationResult.architecturalBlueprintDataUri, `architectural-plan.${format}`)}
                                     />
                                </TabsContent>
                                 <TabsContent value="electrical" className="pt-4">
                                     <BlueprintDisplayCard 
                                        title="مخطط الكهرباء" 
                                        icon={Bolt} 
                                        dataUri={generationResult.electricalBlueprintDataUri} 
                                        onDownload={(format) => handleDownloadImage(generationResult.electricalBlueprintDataUri, `electrical-plan.${format}`)}
                                     />
                                </TabsContent>
                                <TabsContent value="hvac" className="pt-4">
                                     <BlueprintDisplayCard 
                                        title="مخطط التكييف (HVAC)" 
                                        icon={Wind} 
                                        dataUri={generationResult.hvacBlueprintDataUri} 
                                        onDownload={(format) => handleDownloadImage(generationResult.hvacBlueprintDataUri, `hvac-plan.${format}`)}
                                     />
                                </TabsContent>
                                <TabsContent value="plumbing" className="pt-4">
                                     <BlueprintDisplayCard 
                                        title="مخطط الصحي والتغذية" 
                                        icon={Droplets} 
                                        dataUri={generationResult.plumbingBlueprintDataUri} 
                                        onDownload={(format) => handleDownloadImage(generationResult.plumbingBlueprintDataUri, `plumbing-plan.${format}`)}
                                     />
                                </TabsContent>
                                <TabsContent value="perspectives" className="pt-4">
                                     <Card className="bg-secondary/50">
                                         <CardHeader>
                                             <CardTitle className="text-lg flex items-center gap-2">
                                                 <Camera className="text-primary w-6 h-6"/>
                                                 التصورات ثلاثية الأبعاد (3D)
                                             </CardTitle>
                                         </CardHeader>
                                        <CardContent>
                                             <Carousel className="w-full">
                                                <CarouselContent>
                                                    {generationResult.perspectiveDataUris.map((uri, index) => (
                                                        <CarouselItem key={index}>
                                                            <div className="p-1">
                                                                <div className="relative w-full h-80 bg-secondary rounded-lg overflow-hidden border group">
                                                                    <Image src={uri} alt={`التصور الخارجي المولد ${index + 1}`} layout="fill" objectFit="cover" />
                                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                                        <Button variant="secondary" size="icon"><ZoomIn className="h-5 w-5"/></Button>
                                                                        <Button variant="secondary" size="sm" onClick={() => handleDownloadImage(uri, `perspective-3d-${index + 1}.png`)}>
                                                                            <Download className="w-4 h-4 ml-2"/>
                                                                            تنزيل
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                <CarouselPrevious />
                                                <CarouselNext />
                                            </Carousel>
                                        </CardContent>
                                     </Card>
                                </TabsContent>
                            </Tabs>

                            <div className="flex gap-4 pt-4">
                                <Button onClick={handleAnalyzeGeneratedBlueprint} className="w-full" size="lg">
                                    <BarChart className="ml-2 h-4 w-4" />
                                    تحليل المخطط المعماري واستخراج الكميات
                                </Button>
                                 <Button onClick={handleSubmit(handleGenerate)} variant="outline" size="lg">
                                    <RefreshCw className="ml-2 h-4 w-4" />
                                    إعادة المحاولة
                                </Button>
                            </div>
                       </div>
                    ) : !isLoading && (
                         <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                            <Wand2 className="h-16 w-16" />
                            <p className="text-center font-semibold text-lg">بانتظار إبداعك</p>
                            <p className="text-center">اكتب وصفًا للتصميم الذي تحلم به في اللوحة الجانبية، ودع المهندس الذكي يحوله إلى حقيقة.</p>
                        </div>
                     )}
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
