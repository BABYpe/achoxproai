"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Upload, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const initialBoqItems = [
  // --- تكاليف المحتوى والتصميم والإنتاج ---
  { id: "CDP-001", category: "تكاليف المحتوى والتصميم والإنتاج", description: "أتعاب خبراء التصميم الإبداعي", unit: "مقطوعة", quantity: 1, unitPrice: 2000000, total: 2000000 },
  { id: "CDP-002", category: "تكاليف المحتوى والتصميم والإنتاج", description: "إنتاج المحتوى الرقمي (فيديوهات، برومو، 3D، مسرحيات)", unit: "مقطوعة", quantity: 1, unitPrice: 3000000, total: 3000000 },
  { id: "CDP-003", category: "تكاليف المحتوى والتصميم والإنتاج", description: "تكلفة تصميم وتصنيع أزياء الشخصيات", unit: "مقطوعة", quantity: 1, unitPrice: 500000, total: 500000 },
  { id: "CDP-004", category: "تكاليف المحتوى والتصميم والإنتاج", description: "تكلفة تصميم وتصنيع الهدايا التذكارية المميزة", unit: "مقطوعة", quantity: 1, unitPrice: 1000000, total: 1000000 },
  { id: "CDP-005", category: "تكاليف المحتوى والتصميم والإنتاج", description: "أتعاب خبراء المحتوى البيئي (استشاريين)", unit: "مقطوعة", quantity: 1, unitPrice: 1000000, total: 1000000 },

  // --- تكاليف التقنيات والمعدات ---
  { id: "TE-001", category: "تكاليف التقنيات والمعدات", description: "أجهزة الواقع الافتراضي والمعزز والممتد (VR/ER/XR/EL)", unit: "مقطوعة", quantity: 1, unitPrice: 4000000, total: 4000000 },
  { id: "TE-002", category: "تكاليف التقنيات والمعدات", description: "شاشات العرض التفاعلية وغير التقليدية", unit: "مقطوعة", quantity: 1, unitPrice: 3000000, total: 3000000 },
  { id: "TE-003", category: "تكاليف التقنيات والمعدات", description: "أنظمة الصوت والإضاءة الاحترافية", unit: "مقطوعة", quantity: 1, unitPrice: 2500000, total: 2500000 },
  { id: "TE-004", category: "تكاليف التقنيات والمعدات", description: "أجهزة العرض الضوئي والـ Projection Mapping", unit: "مقطوعة", quantity: 1, unitPrice: 1500000, total: 1500000 },
  { id: "TE-005", category: "تكاليف التقنيات والمعدات", description: "طابعات ثلاثية الأبعاد وموادها", unit: "مقطوعة", quantity: 1, unitPrice: 1000000, total: 1000000 },
  { id: "TE-006", category: "تكاليف التقنيات والمعدات", description: "برمجيات التحكم والتشغيل", unit: "مقطوعة", quantity: 1, unitPrice: 500000, total: 500000 },

  // --- تكاليف الإنشاءات والتجهيز والتركيب ---
  { id: "CI-001", category: "تكاليف الإنشاءات والتجهيز والتركيب", description: "استئجار المواقع والقاعات", unit: "مقطوعة", quantity: 1, unitPrice: 4000000, total: 4000000 },
  { id: "CI-002", category: "تكاليف الإنشاءات والتجهيز والتركيب", description: "تصميم وتصنيع وتركيب الأجنحة والديكورات", unit: "مقطوعة", quantity: 1, unitPrice: 4000000, total: 4000000 },
  { id: "CI-003", category: "تكاليف الإنشاءات والتجهيز والتركيب", description: "تصميم وتوريد اللافتات والعلامات الإرشادية", unit: "مقطوعة", quantity: 1, unitPrice: 1000000, total: 1000000 },
  { id: "CI-004", category: "تكاليف الإنشاءات والتجهيز والتركيب", description: "خدمات النقل والتركيب والفك", unit: "مقطوعة", quantity: 1, unitPrice: 1000000, total: 1000000 },

  // --- تكاليف الموارد البشرية ---
  { id: "HR-001", category: "تكاليف الموارد البشرية", description: "رواتب وأجور فريق إدارة المشروع", unit: "مقطوعة", quantity: 1, unitPrice: 4000000, total: 4000000 },
  { id: "HR-002", category: "تكاليف الموارد البشرية", description: "رواتب وأجور فريق الدعم الفني الميداني", unit: "مقطوعة", quantity: 1, unitPrice: 3000000, total: 3000000 },
  { id: "HR-003", category: "تكاليف الموارد البشرية", description: "رواتب وأجور فريق إدارة الحشود", unit: "مقطوعة", quantity: 1, unitPrice: 2500000, total: 2500000 },
  { id: "HR-004", category: "تكاليف الموارد البشرية", description: "رواتب وأجور فريق التصوير والتصميم (أثناء التنفيذ)", unit: "مقطوعة", quantity: 1, unitPrice: 1500000, total: 1500000 },
  { id: "HR-005", category: "تكاليف الموارد البشرية", description: "أجور خبراء قياس الأثر وإعداد التقارير", unit: "مقطوعة", quantity: 1, unitPrice: 1000000, total: 1000000 },
  { id: "HR-006", category: "تكاليف الموارد البشرية", description: "تكاليف السفر والإقامة والمعيشة لفريق العمل", unit: "مقطوعة", quantity: 1, unitPrice: 500000, total: 500000 },

  // --- تكاليف التشغيل والدعم اللوجستي ---
  { id: "OLS-001", category: "تكاليف التشغيل والدعم اللوجستي", description: "الضيافة", unit: "مقطوعة", quantity: 1, unitPrice: 1500000, total: 1500000 },
  { id: "OLS-002", category: "تكاليف التشغيل والدعم اللوجستي", description: "صيانة دورية للتقنيات والمعدات", unit: "مقطوعة", quantity: 1, unitPrice: 1000000, total: 1000000 },
  { id: "OLS-003", category: "تكاليف التشغيل والدعم اللوجستي", description: "تأمين على الفعاليات والمعدات", unit: "مقطوعة", quantity: 1, unitPrice: 1000000, total: 1000000 },
  { id: "OLS-004", category: "تكاليف التشغيل والدعم اللوجستي", description: "تكاليف إدارية وتشغيلية متنوعة", unit: "مقطوعة", quantity: 1, unitPrice: 1500000, total: 1500000 },

  // --- تكاليف قياس الأثر والتقارير ---
  { id: "IMR-001", category: "تكاليف قياس الأثر والتقارير", description: "برمجيات تحليل البيانات", unit: "مقطوعة", quantity: 1, unitPrice: 500000, total: 500000 },
  { id: "IMR-002", category: "تكاليف قياس الأثر والتقارير", description: "أتعاب خبراء تقييم الأثر", unit: "مقطوعة", quantity: 1, unitPrice: 500000, total: 500000 },
  { id: "IMR-003", category: "تكاليف قياس الأثر والتقارير", description: "إنتاج التقارير النهائية", unit: "مقطوعة", quantity: 1, unitPrice: 500000, total: 500000 },

  // --- احتياطي الطوارئ والمخاطر ---
  { id: "ER-001", category: "احتياطي الطوارئ والمخاطر", description: "احتياطي لمواجهة المخاطر والطوارئ (2%)", unit: "مقطوعة", quantity: 1, unitPrice: 1000000, total: 1000000 },
];

const boqItemSchema = z.object({
  id: z.string().min(1, "رقم البند مطلوب"),
  description: z.string().min(1, "الوصف مطلوب"),
  category: z.string().min(1, "الفئة مطلوبة"),
  unit: z.string().min(1, "الوحدة مطلوبة"),
  quantity: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "الكمية يجب أن تكون رقمًا موجبًا")
  ),
  unitPrice: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "سعر الوحدة يجب أن يكون رقمًا موجبًا")
  ),
});

type BoqItemForm = z.infer<typeof boqItemSchema>;

export default function BoqPage() {
  const [boqItems, setBoqItems] = useState(initialBoqItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const grandTotal = boqItems.reduce((acc, item) => acc + item.total, 0);

  const { control, handleSubmit, reset } = useForm<BoqItemForm>({
    resolver: zodResolver(boqItemSchema),
    defaultValues: {
      id: `E-${Math.floor(Math.random() * 900) + 100}`,
      description: "",
      category: "تكاليف متنوعة",
      unit: "مقطوعة",
      quantity: 1,
      unitPrice: 0,
    },
  });

  const onSubmit: SubmitHandler<BoqItemForm> = (data) => {
    const newItem = {
      ...data,
      total: data.quantity * data.unitPrice,
    };
    setBoqItems((prevItems) => [...prevItems, newItem]);
    toast({
      title: "تمت الإضافة بنجاح",
      description: `تمت إضافة البند "${data.description}" إلى جدول الكميات.`,
    });
    setIsDialogOpen(false);
    reset({
        id: `E-${Math.floor(Math.random() * 900) + 100}`,
        description: "",
        category: "تكاليف متنوعة",
        unit: "مقطوعة",
        quantity: 1,
        unitPrice: 0,
    });
  };

  const categories = [...new Set(boqItems.map(item => item.category))].sort();
  
  const handleImport = () => {
    toast({
      title: "قيد التطوير",
      description: "ميزة استيراد جداول الكميات قيد التطوير حاليًا.",
    });
  };

  const handleExport = () => {
    toast({
      title: "قيد التطوير",
      description: "ميزة تصدير جداول الكميات قيد التطوير حاليًا.",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">جداول الكميات (BOQ)</h1>
          <div className="flex gap-2">
              <Button variant="outline" className="gap-1" onClick={handleImport}>
                  <Upload className="h-4 w-4" />
                  استيراد
              </Button>
              <Button variant="outline" className="gap-1" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                  تصدير
              </Button>
              <Button className="gap-1" onClick={() => setIsDialogOpen(true)}>
                  <PlusCircle className="h-4 w-4" />
                  إضافة بند جديد
              </Button>
          </div>
        </div>

        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>قاعدة بيانات بنود مشروع "رؤية الفطرة"</CardTitle>
            <CardDescription>قائمة التكاليف المفصلة لمشروع تعزيز الوعي البيئي.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">رقم البند</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>الوحدة</TableHead>
                  <TableHead className="text-right">الكمية</TableHead>
                  <TableHead className="text-right">سعر الوحدة (ر.س)</TableHead>
                  <TableHead className="text-right">الإجمالي (ر.س)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map(category => (
                  <React.Fragment key={category}>
                    <TableRow className="bg-secondary/50 hover:bg-secondary/70">
                      <TableCell colSpan={6} className="font-bold text-primary">{category}</TableCell>
                    </TableRow>
                    {boqItems.filter(item => item.category === category).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-right font-mono">{item.quantity.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-mono">{item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right font-mono text-primary font-semibold">{item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end mt-6 pr-4">
              <div className="w-full md:w-1/3">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">المجموع الفرعي</span>
                  <span className="font-mono">{grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} ر.س</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">ضريبة القيمة المضافة (15%)</span>
                  <span className="font-mono">{(grandTotal * 0.15).toLocaleString('en-US', { minimumFractionDigits: 2 })} ر.س</span>
                </div>
                <div className="flex justify-between py-4 text-xl text-primary">
                  <span className="font-bold">الإجمالي الكلي</span>
                  <span className="font-bold font-mono">{(grandTotal * 1.15).toLocaleString('en-US', { minimumFractionDigits: 2 })} ر.س</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة بند جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل البند الجديد في جدول الكميات. سيتم الحفظ عند الضغط على زر الحفظ.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-id" className="text-right">رقم البند</Label>
                <Controller name="id" control={control} render={({ field }) => <Input id="item-id" className="col-span-3" {...field} />} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-desc" className="text-right">الوصف</Label>
                <Controller name="description" control={control} render={({ field }) => <Input id="item-desc" placeholder="وصف تفصيلي للبند" className="col-span-3" {...field} />} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-category" className="text-right">الفئة</Label>
                <Controller name="category" control={control} render={({ field }) => <Input id="item-category" placeholder="فئة البند" className="col-span-3" {...field} />} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-unit" className="text-right">الوحدة</Label>
                <Controller name="unit" control={control} render={({ field }) => <Input id="item-unit" className="col-span-3" {...field} />} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-qty" className="text-right">الكمية</Label>
                <Controller name="quantity" control={control} render={({ field }) => <Input id="item-qty" type="number" className="col-span-3" {...field} />} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-price" className="text-right">سعر الوحدة</Label>
                <Controller name="unitPrice" control={control} render={({ field }) => <Input id="item-price" type="number" placeholder="0.00" className="col-span-3" {...field} />} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">حفظ البند</Button>
              <DialogClose asChild>
                  <Button type="button" variant="secondary">إلغاء</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
