
"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { generateMarketingOutreach, type GenerateMarketingOutreachOutput } from '@/ai/flows/generate-marketing-outreach';
import { Loader, Wand2, Send, Bot, Copy, Mail, Building, Target } from 'lucide-react';
import { useCurrentUser } from '@/lib/auth';

export default function MarketingAutomationsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateMarketingOutreachOutput | null>(null);
    const [targetAudience, setTargetAudience] = useState("");
    const { toast } = useToast();
    const currentUser = useCurrentUser();

    const handleGenerate = async () => {
        if (!targetAudience) {
            toast({
                title: 'حقل مطلوب',
                description: 'الرجاء وصف العميل المستهدف أولاً.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const outreachPlan = await generateMarketingOutreach({
                targetAudienceDescription: targetAudience,
                senderCompanyName: "A.D.A.M Contracting", // This would be dynamic in a real app
                senderCompanySpecialty: "متخصصون في إدارة المشاريع الهندسية والإنشاءات باستخدام أحدث تقنيات الذكاء الاصطناعي."
            });
            setResult(outreachPlan);
            toast({
                title: 'نجاح!',
                description: 'تم توليد العملاء المحتملين والرسالة التسويقية.',
            })
        } catch (error) {
            console.error(error);
            toast({
                title: 'حدث خطأ',
                description: 'لم نتمكن من توليد الخطة التسويقية. الرجاء المحاولة مرة أخرى.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: `تم نسخ ${type}`,
            description: `تم نسخ ${type} إلى الحافظة بنجاح.`
        });
    };
    
    const handleSend = () => {
        toast({
            title: 'قيد التطوير',
            description: 'سيتم تفعيل ميزة الإرسال المباشر قريبًا.'
        })
    }

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold">المسوق الذكي</h1>
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                    <Card className="shadow-xl rounded-2xl sticky top-20">
                        <CardHeader>
                            <CardTitle>تحديد الجمهور المستهدف</CardTitle>
                            <CardDescription>صف العميل المثالي الذي تريد الوصول إليه، وسيقوم المسوق الذكي بالباقي.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-2">
                                <Label htmlFor="target-audience">صف العميل المثالي</Label>
                                <Textarea 
                                    id="target-audience" 
                                    rows={5} 
                                    placeholder="مثال: شركات التطوير العقاري الكبرى في الرياض التي تبني فلل فاخرة."
                                    value={targetAudience}
                                    onChange={(e) => setTargetAudience(e.target.value)}
                                />
                             </div>
                        </CardContent>
                         <CardFooter>
                            <Button onClick={handleGenerate} disabled={isLoading} className="w-full font-bold text-lg py-6">
                                {isLoading ? (
                                    <><Loader className="ml-2 h-4 w-4 animate-spin" /> جاري البحث والتوليد...</>
                                ) : (
                                    <><Wand2 className="ml-2 h-4 w-4" /> توليد حملة تسويقية</>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-8">
                     {isLoading && (
                        <Card className="shadow-xl rounded-2xl min-h-[500px] flex items-center justify-center">
                            <div className="text-center text-muted-foreground p-8 space-y-4">
                                <Loader className="h-16 w-16 mx-auto animate-spin text-primary" />
                                <h3 className="text-xl font-semibold text-foreground">المسوق الذكي يعمل الآن...</h3>
                                <p>يقوم بتحليل طلبك، البحث عن عملاء محتملين، وصياغة رسالة تسويقية مخصصة.</p>
                            </div>
                        </Card>
                    )}
                    
                    {!result && !isLoading && (
                        <Card className="shadow-xl rounded-2xl min-h-[500px] flex items-center justify-center">
                            <div className="text-center text-muted-foreground p-8 space-y-4">
                                <Bot className="h-16 w-16 mx-auto" />
                                <h3 className="text-xl font-semibold text-foreground">بانتظار مهمتك التسويقية</h3>
                                <p>صف العميل الذي تستهدفه، وسأقوم بتوليد قائمة بالشركات المحتملة ورسالة بريد إلكتروني مقنعة للوصول إليهم.</p>
                            </div>
                        </Card>
                    )}

                    {result && (
                        <>
                         <Card className="shadow-2xl rounded-2xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Target className="text-primary"/> عملاء محتملون مقترحون</CardTitle>
                                <CardDescription>قائمة بالشركات التي تطابق وصفك. (بيانات افتراضية للتوضيح)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {result.leads.map((lead, index) => (
                                <div key={index} className="p-4 bg-secondary/50 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold flex items-center gap-2"><Building className="text-muted-foreground" /> {lead.companyName}</p>
                                            <p className="text-sm text-primary flex items-center gap-2 mt-1"><Mail className="text-muted-foreground" /> {lead.email}</p>
                                        </div>
                                        <Button size="sm" variant="outline" onClick={() => handleCopy(lead.email, 'البريد الإلكتروني')}>
                                            <Copy className="ml-1 h-3 w-3" /> نسخ
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2 border-r-2 border-primary pr-2">{lead.reason}</p>
                                </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card className="shadow-2xl rounded-2xl mt-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Send className="text-primary"/> مسودة الرسالة التسويقية</CardTitle>
                                <CardDescription>رسالة احترافية ومقنعة جاهزة للإرسال.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <Label>الموضوع</Label>
                                    <div className="flex items-center gap-2">
                                         <p className="flex-1 font-semibold p-2 bg-secondary/50 rounded-md">{result.persuasiveEmail.subject}</p>
                                         <Button size="sm" variant="outline" onClick={() => handleCopy(result.persuasiveEmail.subject, 'الموضوع')}>
                                            <Copy className="ml-1 h-3 w-3" /> نسخ
                                        </Button>
                                    </div>
                                </div>
                                 <div className="space-y-1">
                                    <Label>نص الرسالة</Label>
                                    <div className="relative">
                                         <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap p-4 bg-secondary/50 rounded-md border h-64 overflow-y-auto">
                                            {result.persuasiveEmail.body}
                                        </div>
                                         <Button size="sm" variant="outline" className="absolute top-2 left-2" onClick={() => handleCopy(result.persuasiveEmail.body, 'نص الرسالة')}>
                                            <Copy className="ml-1 h-3 w-3" /> نسخ
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                             <CardFooter className="flex justify-end">
                                <Button onClick={handleSend} className="gap-2">
                                    <Send className="h-4 w-4" />
                                    إرسال إلى العملاء المحددين
                                </Button>
                             </CardFooter>
                        </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
