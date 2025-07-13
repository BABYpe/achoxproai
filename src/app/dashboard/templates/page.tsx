
"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, GanttChartSquare, DollarSign, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const planningTemplates = [
  { title: "نموذج جدول زمني استباقي لأسبوعين", description: "لتخطيط المهام والأنشطة للأسبوعين القادمين." },
  { title: "نموذج جدول زمني استباقي لثلاثة أسابيع", description: "نظرة مستقبلية متوسطة المدى لأنشطة المشروع." },
  { title: "نموذج جدول زمني استباقي لأربعة أسابيع", description: "تخطيط شهري للمهام والموارد الرئيسية." },
  { title: "حاسبة المسار الحرج", description: "أداة لتحديد أطول سلسلة من المهام وتأثيرها على الجدول الزمني." },
  { title: "نموذج طريقة المسار الحرج خطوة بخطوة", description: "قالب منظم لتطبيق منهجية المسار الحرج على مشروعك." },
];

const financialTemplates = [
  { title: "نموذج ميزانية الأعمال", description: "قالب شامل لتخطيط ميزانية الشركة أو المشاريع الكبرى." },
  { title: "ميزانية بناء المنازل", description: "نموذج مخصص لتتبع تكاليف بناء المشاريع السكنية." },
  { title: "نموذج التدفق النقدي البسيط لمشروع البناء", description: "لتتبع السيولة النقدية الداخلة والخارجة." },
  { title: "نموذج مراقبة تكاليف مشروع البناء", description: "لمقارنة التكاليف الفعلية مع الميزانية المخطط لها." },
  { title: "تقدير تكلفة البناء", description: "قالب تفصيلي لتقدير التكاليف الأولية للمشروع." },
  { title: "نموذج تتبع التكاليف الأسبوعي", description: "لتسجيل ومراقبة المصروفات بشكل أسبوعي." },
];

const reportingTemplates = [
  { title: "نموذج تقرير حالة المشروع", description: "قالب قياسي لتقديم تحديثات منتظمة عن حالة المشروع." },
  { title: "نموذج تقرير أداء المشروع", description: "لتقييم أداء المشروع مقابل الأهداف المحددة." },
  { title: "تقرير التقدم اليومي", description: "لتوثيق الإنجازات والتحديات اليومية في الموقع." },
  { title: "نموذج تقرير تقدم الإنشاءات", description: "تقرير متخصص يركز على تقدم الأعمال الإنشائية." },
  { title: "نموذج سجل الدروس المستفادة", description: "لتوثيق المعرفة والخبرات المكتسبة من المشروع." },
  { title: "نموذج سجل المخاطر", description: "لتحديد وتتبع وإدارة المخاطر المحتملة في المشروع." },
  { title: "نموذج متتبع وثائق المشروع", description: "لتنظيم وإدارة جميع مستندات ووثائق المشروع." },
];

const TemplateCard = ({ title, description }: { title: string, description: string }) => {
    const { toast } = useToast();
    
    const handleDownload = () => {
        toast({
            title: "ميزة احترافية",
            description: "تحميل القوالب متاح في الخطط المدفوعة.",
        });
    }

    return (
        <Card className="shadow-md rounded-xl hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{description}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleDownload}>
                    <Download className="h-5 w-5 text-primary" />
                </Button>
            </CardContent>
        </Card>
    )
}

export default function TemplatesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">مكتبة القوالب</h1>
        <p className="text-muted-foreground">موارد جاهزة لتسريع وإدارة مشاريعك بكفاءة.</p>
      </div>

      <Tabs defaultValue="planning" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="planning" className="gap-1"><GanttChartSquare className="h-4 w-4"/> تخطيط وجدولة</TabsTrigger>
          <TabsTrigger value="financial" className="gap-1"><DollarSign className="h-4 w-4"/> إدارة مالية</TabsTrigger>
          <TabsTrigger value="reporting" className="gap-1"><FileText className="h-4 w-4"/> تقارير وتوثيق</TabsTrigger>
        </TabsList>
        
        <TabsContent value="planning">
          <Card className="shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle>قوالب تخطيط وجدولة المشاريع</CardTitle>
              <CardDescription>أدوات تساعدك على بناء جداول زمنية دقيقة وتتبع التقدم بفعالية.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {planningTemplates.map((template, index) => (
                <TemplateCard key={index} title={template.title} description={template.description} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card className="shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle>قوالب الإدارة المالية</CardTitle>
              <CardDescription>أدوات لإدارة الميزانيات، تتبع التكاليف، ومراقبة التدفقات النقدية لمشاريعك.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {financialTemplates.map((template, index) => (
                <TemplateCard key={index} title={template.title} description={template.description} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reporting">
          <Card className="shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle>قوالب التقارير والتوثيق</CardTitle>
              <CardDescription>نماذج جاهزة لتوثيق كل جوانب المشروع، من التقارير اليومية إلى سجلات المخاطر والدروس المستفادة.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {reportingTemplates.map((template, index) => (
                <TemplateCard key={index} title={template.title} description={template.description} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
