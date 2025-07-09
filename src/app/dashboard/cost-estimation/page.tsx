"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast'
import { estimateProjectCost, type EstimateProjectCostOutput } from '@/ai/flows/estimate-project-cost'
import { Loader, Wand2, DollarSign } from 'lucide-react'

export default function CostEstimationPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<EstimateProjectCostOutput | null>(null)
    const { toast } = useToast()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setResult(null)

        const formData = new FormData(event.currentTarget)
        const data = {
            location: formData.get('location') as string,
            size: formData.get('size') as string,
            type: formData.get('type') as string,
        }

        if (!data.location || !data.size || !data.type) {
            toast({
                title: 'حقول مطلوبة',
                description: 'يرجى ملء جميع الحقول للحصول على تقدير.',
                variant: 'destructive',
            })
            setIsLoading(false)
            return
        }

        try {
            const estimation = await estimateProjectCost(data)
            setResult(estimation)
        } catch (error) {
            console.error(error)
            toast({
                title: 'حدث خطأ',
                description: 'لم نتمكن من الحصول على تقدير. الرجاء المحاولة مرة أخرى.',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">تقدير تكاليف المشروع بالذكاء الاصطناعي</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-xl rounded-2xl">
                    <CardHeader>
                        <CardTitle>معلومات المشروع</CardTitle>
                        <CardDescription>أدخل تفاصيل مشروعك للحصول على تقدير للتكلفة.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="location">موقع المشروع</Label>
                                <Input id="location" name="location" placeholder="مثال: الرياض، المملكة العربية السعودية" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="size">مساحة المشروع (متر مربع)</Label>
                                <Input id="size" name="size" type="number" placeholder="مثال: 500" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">نوع المشروع</Label>
                                <Select name="type">
                                    <SelectTrigger id="type">
                                        <SelectValue placeholder="اختر نوع المشروع" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="residential">سكني</SelectItem>
                                        <SelectItem value="commercial">تجاري</SelectItem>
                                        <SelectItem value="industrial">صناعي</SelectItem>
                                        <SelectItem value="infrastructure">بنية تحتية</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" disabled={isLoading} className="w-full font-bold text-lg py-6">
                                {isLoading ? (
                                    <>
                                        <Loader className="ml-2 h-4 w-4 animate-spin" />
                                        جاري حساب التكلفة...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="ml-2 h-4 w-4" />
                                        تقدير التكلفة
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <div className="flex items-center justify-center">
                    <Card className="w-full shadow-xl rounded-2xl bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground">
                        <CardHeader>
                            <CardTitle className="text-2xl text-white">التكلفة التقديرية</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center h-48">
                                {isLoading ? (
                                    <Loader className="h-12 w-12 animate-spin text-white" />
                                ) : result ? (
                                    <div className="text-center">
                                        <p className="text-lg text-primary-foreground/80">نطاق التكلفة المتوقع</p>
                                        <p className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">{result.costRange}</p>
                                    </div>
                                ) : (
                                    <div className="text-center text-primary-foreground/70">
                                        <DollarSign className="h-12 w-12 mx-auto mb-2" />
                                        <p>ستظهر نتيجة تقدير التكلفة هنا.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
