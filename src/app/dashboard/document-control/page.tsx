
"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Bot, Download, Filter, FileText, FileSignature, FilePieChart, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data simulating documents and activities from across the platform
const documentLog = [
    { id: 'DOC-001', type: 'مخطط', name: 'المخططات المعمارية المعتمدة', project: 'بناء فيلا فاخرة في حي الياسمين', version: 3, status: 'معتمد', date: '2024-07-20', by: 'علي محمد' },
    { id: 'DOC-002', type: 'عقد', name: 'عقد المقاول الرئيسي', project: 'بناء فيلا فاخرة في حي الياسمين', version: 1, status: 'موقع', date: '2024-07-18', by: 'سارة عبدالله' },
    { id: 'DOC-003', type: 'تقرير', name: 'تقرير تقدم أسبوعي', project: 'إنشاء برج المكاتب الذكي بجدة', version: 5, status: 'موزع', date: '2024-07-15', by: 'روبوت التقارير' },
    { id: 'DOC-004', type: 'أمر شراء', name: 'PO-2024-002 - مصنع الخرسانة الجاهزة', project: 'إنشاء برج المكاتب الذكي بجدة', version: 1, status: 'قيد المعالجة', date: '2024-07-18', by: 'خالد الغامدي' },
    { id: 'DOC-005', type: 'مخطط', name: 'تحليل أولي لمخطط الواجهة', project: 'تطوير مول الرياض بارك', version: 1, status: 'قيد المراجعة', date: '2024-07-21', by: 'المستشار الذكي' },
    { id: 'DOC-006', type: 'عرض سعر', name: 'QT-2024-1055 - عرض سعر لشركة العميل', project: 'تجهيز فعالية إطلاق سيارة كهربائية', version: 2, status: 'تم الإرسال', date: '2024-07-19', by: 'نورة القحطاني' },
];

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'معتمد':
        case 'موقع':
        case 'موزع':
            return 'default';
        case 'قيد المراجعة':
        case 'قيد المعالجة':
            return 'secondary';
        case 'تم الإرسال':
            return 'outline';
        default:
            return 'destructive';
    }
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case 'مخطط': return <FileText className="h-4 w-4" />;
        case 'عقد':
        case 'أمر شراء':
        case 'عرض سعر': 
            return <FileSignature className="h-4 w-4" />;
        case 'تقرير': return <FilePieChart className="h-4 w-4" />;
        default: return <Briefcase className="h-4 w-4" />;
    }
}


export default function DocumentControlPage() {
  
  return (
    <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">مركز التحكم بالوثائق (DC)</h1>
             <div className="flex gap-2">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="بحث في الوثائق..." className="pr-10" />
                </div>
                <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    تصفية
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                 <Tabs defaultValue="all">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">كل الوثائق</TabsTrigger>
                        <TabsTrigger value="blueprints">المخططات</TabsTrigger>
                        <TabsTrigger value="contracts">العقود والمشتريات</TabsTrigger>
                        <TabsTrigger value="reports">التقارير</TabsTrigger>
                    </TabsList>
                    <Card className="shadow-xl rounded-2xl mt-4">
                        <CardHeader>
                            <CardTitle>سجل الوثائق المركزي</CardTitle>
                            <CardDescription>قائمة بجميع المستندات والوثائق عبر كل المشاريع.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>اسم الوثيقة</TableHead>
                                    <TableHead>المشروع</TableHead>
                                    <TableHead>الإصدار</TableHead>
                                    <TableHead>الحالة</TableHead>
                                    <TableHead className="text-right">إجراء</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {documentLog.map((doc) => (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                {getTypeIcon(doc.type)}
                                                <span>{doc.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{doc.project}</TableCell>
                                        <TableCell className="font-mono">v{doc.version}.0</TableCell>
                                        <TableCell><Badge variant={getStatusVariant(doc.status)}>{doc.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" className="gap-1">
                                                <Download className="h-3 w-3" />
                                                تحميل
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Tabs>
            </div>

            <div className="lg:col-span-1">
                 <Card className="shadow-xl rounded-2xl sticky top-20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Bot className="w-6 h-6 text-primary"/>
                           سجل التدقيق الذكي
                        </CardTitle>
                        <CardDescription>
                            يقوم هذا الروبوت بتوثيق جميع الأنشطة الهامة في المنصة بشكل آلي.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {documentLog.map(log => (
                             <div key={log.id} className="flex gap-3">
                                <Avatar className="w-8 h-8 border-2 border-primary/50">
                                    <AvatarFallback>{log.by.substring(0,1)}</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <p>
                                        <span className="font-semibold">{log.by}</span> 
                                        {` قام بإنشاء وثيقة (${log.type}) جديدة للمشروع `}
                                        <span className="font-medium text-primary">{log.project}</span>.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">{new Date(log.date).toLocaleString('ar-SA')}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                 </Card>
            </div>
        </div>
    </div>
  );
}
