
"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// MOCK DATA
const MOCK_QUOTES = [
    {id: "QT-2024-1001", projectId: "proj_villa_1", projectName: "بناء فيلا فاخرة في حي الياسمين", clientName: "شركة العميل الأولى", date: "2024-07-20", totalAmount: 3450000, status: "مقبول"},
    {id: "QT-2024-1002", projectId: "proj_event_2", projectName: "تجهيز فعالية إطلاق سيارة", clientName: "شركة السيارات العالمية", date: "2024-07-18", totalAmount: 850000, status: "تم الإرسال"},
]


export default function QuotesPage() {
    const [quotes, setQuotes] = useState(MOCK_QUOTES);
    
    const getStatusVariant = (status: string) => {
        switch (status) {
            case "مقبول": return "default";
            case "تم الإرسال": return "secondary";
            case "مسودة": return "outline";
            case "مرفوض": return "destructive";
            default: return "outline";
        }
    }

  return (
    <>
    <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">عروض الأسعار</h1>
            <Button asChild className="gap-1 text-lg py-6 px-6 shadow-lg shadow-primary/30">
                <Link href="/dashboard/quotes/new">
                    <PlusCircle className="h-5 w-5" />
                    إنشاء عرض سعر جديد
                </Link>
            </Button>
        </div>

        <Card className="shadow-xl rounded-2xl">
            <CardHeader>
                <CardTitle>سجل عروض الأسعار</CardTitle>
                <CardDescription>تتبع جميع عروض الأسعار التي قمت بإنشائها وإرسالها للعملاء.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[150px]">رقم العرض</TableHead>
                        <TableHead>اسم المشروع</TableHead>
                        <TableHead>العميل</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead className="text-right">الإجمالي</TableHead>
                        <TableHead className="text-right">إجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {quotes.length > 0 ? quotes.map((quote) => (
                        <TableRow key={quote.id}>
                            <TableCell className="font-mono">{quote.id}</TableCell>
                            <TableCell className="font-medium">{quote.projectName}</TableCell>
                            <TableCell>{quote.clientName}</TableCell>
                            <TableCell>{quote.date}</TableCell>
                            <TableCell><Badge variant={getStatusVariant(quote.status)}>{quote.status}</Badge></TableCell>
                            <TableCell className="text-right font-mono font-semibold">{quote.totalAmount.toLocaleString('ar-SA', { style: 'currency', currency: 'SAR' })}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>عرض</DropdownMenuItem>
                                        <DropdownMenuItem>إرسال</DropdownMenuItem>
                                        <DropdownMenuItem>تعديل</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        )) : (
                             <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                                    لا توجد عروض أسعار بعد. ابدأ بإنشاء عرض جديد.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
    </>
  );
}

    