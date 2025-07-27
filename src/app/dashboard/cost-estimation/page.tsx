
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader } from 'lucide-react'
import Link from 'next/link'


export default function CostEstimationPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the new project creation page which is now the main entry point for planning.
        router.replace('/dashboard/projects/new');
    }, [router]);

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold">مخطط المشاريع الذكي</h1>
            <Card className="w-full shadow-xl rounded-2xl min-h-[600px] flex items-center justify-center">
                <CardContent>
                    <div className="text-center text-muted-foreground p-8">
                        <Loader className="h-16 w-16 mx-auto mb-4 animate-spin text-primary" />
                        <h3 className="text-xl font-semibold text-foreground">جاري إعادة التوجيه...</h3>
                        <p className="mt-2">
                            تم دمج هذه الميزة في صفحة "إنشاء مشروع جديد" لتوفير تجربة متكاملة.
                        </p>
                        <Button asChild variant="link" className="mt-4">
                            <Link href="/dashboard/projects/new">
                                انقر هنا إذا لم يتم إعادة توجيهك
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
