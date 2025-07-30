
"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, FileText, FileSignature, FilePieChart, Briefcase, Download, Bot, History, CheckCircle, FileUp, MoreVertical, FilePlus2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatCard } from "@/components/stat-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const documentLog = [
    { id: 'DOC-001', type: 'مخطط', name: 'المخططات المعمارية المعتمدة', project: 'بناء فيلا فاخرة في حي الياسمين', version: 3, status: 'معتمد', date: '2024-07-20', by: 'علي محمد' },
    { id: 'DOC-002', type: 'عقد', name: 'عقد المقاول الرئيسي', project: 'بناء فيلا فاخرة في حي الياسمين', version: 1, status: 'موقع', date: '2024-07-18', by: 'سارة عبدالله' },
    { id: 'DOC-003', type: 'تقرير', name: 'تقرير تقدم أسبوعي', project: 'إنشاء برج المكاتب الذكي بجدة', version: 5, status: 'موزع', date: '2024-07-15', by: 'روبوت التقارير' },
    { id: 'DOC-004', type: 'أمر شراء', name: 'PO-2024-002 - مصنع الخرسانة الجاهزة', project: 'إنشاء برج المكاتب الذكي بجدة', version: 1, status: 'قيد المعالجة', date: '2024-07-18', by: 'خالد الغامدي' },
    { id: 'DOC-005', type: 'مخطط', name: 'تحليل أولي لمخطط الواجهة', project: 'تطوير مول الرياض بارك', version: 1, status: 'قيد المراجعة', date: '2024-07-21', by: 'المستشار الذكي' },
    { id: 'DOC-006', type: 'عرض سعر', name: 'QT-2024-1055 - عرض سعر لشركة العميل', project: 'تجهيز فعالية إطلاق سيارة كهربائية', version: 2, status: 'تم الإرسال', date: '2024-07-19', by: 'نورة القحطاني' },
];

const auditLog = [
    { id: 'AUD-001', icon: FilePlus2, text: "قام <strong>علي محمد</strong> بإنشاء مشروع <strong>بناء فيلا فاخرة</strong>.", timestamp: "2024-07-22T10:00:00Z" },
    { id: 'AUD-002', icon: Bot, text: "قام <strong>المستشار الذكي</strong> بتحليل المخطط <strong>'مخطط الواجهة'</strong>.", timestamp: "2024-07-21T14:30:00Z" },
    { id: 'AUD-003', icon: History, text: "تم تحديث حالة المشروع <strong>تجهيز فعالية</strong> إلى <strong>مكتمل</strong>.", timestamp: "2024-07-21T09:15:00Z" },
    { id: 'AUD-004', icon: CheckCircle, text: "تم اعتماد المستند <strong>'المخططات المعمارية v2'</strong> بواسطة <strong>سارة عبدالله</strong>.", timestamp: "2024-07-20T11:00:00Z" },
    { id: 'AUD-005', icon: Bot, text: "قام <strong>روبوت التقارير</strong> بتوليد تقرير أسبوعي لمشروع <strong>برج المكاتب</strong>.", timestamp: "2024-07-19T17:00:00Z" },
    { id: 'AUD-006', icon: FileSignature, text: "تم إصدار أمر الشراء <strong>PO-2024-002</strong> للمورد <strong>مصنع الخرسانة</strong>.", timestamp: "2024-07-18T16:45:00Z" },
];


const getStatusVariant = (status: string) => {
    switch (status) {
        case 'معتمد':
        case 'موقع':
            return 'default';
        case 'موزع':
        case 'تم الإرسال':
             return 'secondary';
        case 'قيد المراجعة':
        case 'قيد المعالجة':
            return 'outline';
        default:
            return 'destructive';
    }
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case 'مخطط': return <FileText className="h-4 w-4 text-muted-foreground" />;
        case 'عقد':
        case 'أمر شراء':
        case 'عرض سعر': 
            return <FileSignature className="h-4 w-4 text-muted-foreground" />;
        case 'تقرير': return <FilePieChart className="h-4 w-4 text-muted-foreground" />;
        default: return <Briefcase className="h-4 w-4 text-muted-foreground" />;
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="إجمالي الوثائق" value={documentLog.length.toString()} icon={Briefcase} />
            <StatCard title="وثائق قيد المراجعة" value={documentLog.filter(d => d.status.includes("قيد")).length.toString()} icon={History} description="بانتظار الموافقة" />
            <StatCard title="وثائق معتمدة" value={documentLog.filter(d => d.status === "معتمد" || d.status === "موقع").length.toString()} icon={CheckCircle} description="مكتملة ومؤرشفة" />
            <StatCard title="أنشطة اليوم" value={auditLog.filter(a => new Date(a.timestamp).toDateString() === new Date().toDateString()).length.toString()} icon={Bot} description="تم توثيقها آليًا" />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                 <Card className="shadow-xl rounded-2xl">
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
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>مراجعة وتدقيق</DropdownMenuItem>
                                                <DropdownMenuItem>توزيع على المعنيين</DropdownMenuItem>
                                                <DropdownMenuItem>تنزيل الوثيقة</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
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
                        {auditLog.map(log => {
                             const LogIcon = log.icon;
                             return (
                                 <div key={log.id} className="flex gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                                       <LogIcon className="w-4 h-4 text-muted-foreground"/>
                                    </div>
                                    <div className="text-sm">
                                        <p dangerouslySetInnerHTML={{ __html: log.text }} />
                                        <p className="text-xs text-muted-foreground mt-1">{new Date(log.timestamp).toLocaleString('ar-SA')}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </CardContent>
                 </Card>
            </div>
        </div>
    </div>
  );
}
