
"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast'
import { estimateProjectCost, type EstimateProjectCostOutput } from '@/ai/flows/estimate-project-cost'
import { Loader, Wand2, DollarSign, FileText, Users, GanttChartSquare, ClipboardList, Milestone } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export default function CostEstimationPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<EstimateProjectCostOutput | null>(null)
    const { toast } = useToast()
    const searchParams = useSearchParams()

    const [size, setSize] = useState('');

    useEffect(() => {
        const areaParam = searchParams.get('area');
        if (areaParam) {
            setSize(areaParam);
        }
    }, [searchParams]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setResult(null)

        const formData = new FormData(event.currentTarget)
        const data = {
            location: formData.get('location') as string,
            size: formData.get('size') as string,
            type: formData.get('type') as string,
            quality: formData.get('quality') as "standard" | "premium" | "luxury",
            scopeOfWork: formData.get('scopeOfWork') as string,
        }

        if (!data.location || !data.size || !data.type || !data.quality || !data.scopeOfWork) {
            toast({
                title: 'حقول مطلوبة',
                description: 'يرجى ملء جميع الحقول للحصول على تقدير وتخطيط دقيق.',
                variant: 'destructive',
            })
            setIsLoading(false)
            return
        }

        try {
            const estimation = await estimateProjectCost(data)
            setResult(estimation)
            toast({
                title: 'نجاح!',
                description: 'تم إنشاء خطة المشروع بنجاح.',
            })
        } catch (error) {
            console.error(error)
            toast({
                title: 'حدث خطأ',
                description: 'لم نتمكن من إنشاء الخطة. الرجاء المحاولة مرة أخرى.',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold">مخطط المشاريع الذكي</h1>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                    <Card className="shadow-xl rounded-2xl sticky top-20">
                        <CardHeader>
                            <CardTitle>معلومات المشروع</CardTitle>
                            <CardDescription>أدخل تفاصيل مشروعك ليقوم الذكاء الاصطناعي ببناء خطة متكاملة.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="location">موقع المشروع</Label>
                                    <Input id="location" name="location" placeholder="مثال: الرياض" defaultValue="Riyadh" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="size">مساحة المشروع (متر مربع)</Label>
                                    <Input id="size" name="size" type="number" placeholder="مثال: 500" value={size} onChange={(e) => setSize(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="type">نوع المشروع</Label>
                                    <Select name="type" defaultValue="residential">
                                        <SelectTrigger id="type"><SelectValue placeholder="اختر نوع المشروع" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="residential">فيلا سكنية</SelectItem>
                                            <SelectItem value="commercial">مبنى تجاري</SelectItem>
                                            <SelectItem value="event_setup">تجهيز فعالية</SelectItem>
                                            <SelectItem value="exhibition">تجهيز معرض</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="quality">مستوى الجودة</Label>
                                    <Select name="quality" defaultValue="premium">
                                        <SelectTrigger id="quality"><SelectValue placeholder="اختر مستوى الجودة" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="standard">أساسي (Standard)</SelectItem>
                                            <SelectItem value="premium">ممتاز (Premium)</SelectItem>
                                            <SelectItem value="luxury">فاخر (Luxury)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="scopeOfWork">وصف نطاق العمل</Label>
                                    <Textarea id="scopeOfWork" name="scopeOfWork" placeholder="صف باختصار الأعمال الرئيسية المطلوبة. مثال: بناء فيلا دورين مع ملحق، تشطيب فاخر..." />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full font-bold text-lg py-6 mt-4">
                                    {isLoading ? <><Loader className="ml-2 h-4 w-4 animate-spin" /> جاري التخطيط...</> : <><Wand2 className="ml-2 h-4 w-4" /> إنشاء خطة المشروع</>}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-8">
                    {!result && !isLoading && (
                        <Card className="w-full shadow-xl rounded-2xl min-h-[600px] flex items-center justify-center">
                            <div className="text-center text-muted-foreground p-8">
                                <Milestone className="h-16 w-16 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-foreground">بانتظار بيانات مشروعك</h3>
                                <p>ستظهر خطة المشروع المتكاملة هنا بعد إدخال المعلومات والضغط على زر الإنشاء.</p>
                            </div>
                        </Card>
                    )}
                    {isLoading && (
                        <Card className="w-full shadow-xl rounded-2xl min-h-[600px] flex items-center justify-center">
                            <div className="text-center text-muted-foreground p-8">
                                <Loader className="h-16 w-16 mx-auto mb-4 animate-spin text-primary" />
                                <h3 className="text-xl font-semibold text-foreground">يقوم الذكاء الاصطناعي ببناء الخطة...</h3>
                                <p>قد تستغرق هذه العملية بضع لحظات.</p>
                            </div>
                        </Card>
                    )}
                    {result && (
                        <>
                            <Card className="w-full shadow-xl rounded-2xl bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-white">التكلفة الإجمالية التقديرية</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">{result.totalEstimatedCost}</p>
                                </CardContent>
                            </Card>

                            <Card className="shadow-xl rounded-2xl">
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <Users className="w-6 h-6 text-primary" />
                                    <CardTitle>توصيات فريق العمل</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-4">
                                        <p className="text-4xl font-bold">{result.crewRecommendation.totalPersonnel}</p>
                                        <p className="text-muted-foreground">شخص</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                        {Object.entries(result.crewRecommendation.breakdown).map(([role, count]) => (
                                            <div key={role} className="bg-secondary/50 p-3 rounded-lg">
                                                <p className="font-semibold">{role}</p>
                                                <p className="text-2xl font-bold text-primary">{count}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                             <Card className="shadow-xl rounded-2xl">
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <ClipboardList className="w-6 h-6 text-primary" />
                                    <CardTitle>جدول الكميات المفصل (BOQ)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>البند</TableHead>
                                                <TableHead>الوحدة</TableHead>
                                                <TableHead>الكمية</TableHead>
                                                <TableHead>سعر الوحدة</TableHead>
                                                <TableHead>الإجمالي</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {result.boq.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.description}</TableCell>
                                                <TableCell>{item.unit}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell className="font-mono">{item.unitPrice.toLocaleString()} ر.س</TableCell>
                                                <TableCell className="font-mono font-semibold">{item.total.toLocaleString()} ر.س</TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <Card className="shadow-xl rounded-2xl">
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <GanttChartSquare className="w-6 h-6 text-primary" />
                                    <CardTitle>الجدول الزمني للمشروع (Gantt Chart)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                    {result.ganttChartData.map(task => (
                                        <div key={task.id}>
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="font-semibold">{task.task}</p>
                                                <Badge variant="secondary">{task.responsible}</Badge>
                                            </div>
                                            <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                                                <span>{task.start} &rarr; {task.end}</span>
                                                <span>المدة: {task.duration} أيام</span>
                                            </div>
                                            <Progress value={task.progress} className="h-2" />
                                        </div>
                                    ))}
                                    </div>
                                </CardContent>
                            </Card>

                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
