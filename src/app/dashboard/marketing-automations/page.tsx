
"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { generateMarketingOutreach, type GenerateMarketingOutreachOutput } from '@/ai/flows/generate-marketing-outreach';
import { Loader, Wand2, Send, Bot, Copy, Mail, Building, Target, CheckCircle, Eye, MousePointerClick } from 'lucide-react';
import { useCurrentUser } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
                senderCompanyName: "AchoX Pro Contracting",
                senderCompanySpecialty: "متخصصون في إدارة المشاريع الهندسية والإنشاءات باستخدام أحدث تقنيات الذكاء الاصطناعي."
            });
            setResult(outreachPlan);
            toast({
                title: 'نجاح!',
                description: 'تم إنشاء خطة الوصول للعملاء بنجاح.',
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
            <h1 className="text-3xl font-bold">أتمتة التسويق والوصول للعملاء</h1>
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                    <Card className="shadow-xl rounded-2xl sticky top-20">
                        <CardHeader>
                            <CardTitle>تحديد الجمهور المستهدف</CardTitle>
                            <CardDescription>
                                صف العميل المثالي الذي تستهدفه. سيقوم الذكاء الاصطناعي بمحاكاة البحث في الشبكات المهنية والاجتماعية لتحديد قائمة بالشركات المحتملة وصياغة رسالة مخصصة لهم.
                            </CardDescription>
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
                                <div className="space-y-2 text-sm">
                                    <p className="flex items-center justify-center gap-2"><Loader className="w-4 h-4 animate-spin"/> جاري محاكاة البحث في الشبكات المهنية...</p>
                                    <p className="flex items-center justify-center gap-2"><Loader className="w-4 h-4 animate-spin delay-75"/> جاري صياغة رسالة تسويقية مخصصة...</p>
                                </div>
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
                        <Card className="shadow-2xl rounded-2xl">
                             <CardHeader>
                                <CardTitle>خطة الحملة التسويقية</CardTitle>
                                <CardDescription>ملخص شامل لمراحل حملة الوصول للعملاء التي تم توليدها.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-6">
                                {/* Stage 1: Lead Generation */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Badge className="bg-primary/80 text-primary-foreground text-lg rounded-full w-8 h-8 flex items-center justify-center">1</Badge>
                                        <h3 className="text-lg font-semibold flex items-center gap-2"><Target className="text-primary"/> المرحلة الأولى: البحث وتحديد الأهداف</h3>
                                    </div>
                                    <div className="pl-11 space-y-3">
                                        {result.leads.map((lead, index) => (
                                            <div key={index} className="p-3 bg-secondary/50 rounded-lg border">
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
                                    </div>
                                </div>
                                
                                <Separator />

                                {/* Stage 2: Email Crafting */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                         <Badge className="bg-primary/80 text-primary-foreground text-lg rounded-full w-8 h-8 flex items-center justify-center">2</Badge>
                                        <h3 className="text-lg font-semibold flex items-center gap-2"><Send className="text-primary"/> المرحلة الثانية: صياغة الرسالة</h3>
                                    </div>
                                    <div className="pl-11 space-y-3">
                                        <div className="space-y-1">
                                            <Label>الموضوع</Label>
                                            <p className="font-semibold p-2 bg-secondary/50 rounded-md border">{result.persuasiveEmail.subject}</p>
                                        </div>
                                         <div className="space-y-1">
                                            <Label>نص الرسالة</Label>
                                            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap p-3 bg-secondary/50 rounded-md border h-48 overflow-y-auto">
                                                {result.persuasiveEmail.body}
                                            </div>
                                        </div>
                                         <Button variant="outline" size="sm" onClick={() => handleCopy(result.persuasiveEmail.body, 'نص الرسالة')}>
                                            <Copy className="ml-1 h-3 w-3" /> نسخ الرسالة بالكامل
                                        </Button>
                                    </div>
                                </div>
                                
                                <Separator />

                                {/* Stage 3: Outreach & Follow-up */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                         <Badge className="bg-primary/80 text-primary-foreground text-lg rounded-full w-8 h-8 flex items-center justify-center">3</Badge>
                                        <h3 className="text-lg font-semibold flex items-center gap-2"><CheckCircle className="text-primary"/> المرحلة الثالثة: الإرسال والمتابعة</h3>
                                    </div>
                                    <div className="pl-11 space-y-3">
                                         <Button onClick={handleSend} className="w-full gap-2" size="lg">
                                            <Send className="h-4 w-4" />
                                            بدء إرسال الحملة إلى {result.leads.length} عملاء
                                        </Button>
                                         <div className="grid grid-cols-3 gap-2 text-center text-sm text-muted-foreground">
                                             <div className="bg-secondary/50 p-2 rounded-md"><p>تم الإرسال</p><p className="font-bold text-lg text-foreground">0</p></div>
                                             <div className="bg-secondary/50 p-2 rounded-md"><p>تم الفتح</p><p className="font-bold text-lg text-foreground">0</p></div>
                                             <div className="bg-secondary/50 p-2 rounded-md"><p>تم النقر</p><p className="font-bold text-lg text-foreground">0</p></div>
                                        </div>
                                         <p className="text-xs text-center text-muted-foreground">سيتم تحديث هذه الإحصائيات بعد إرسال الحملة (ميزة قيد التطوير).</p>
                                    </div>
                                </div>
                             </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
