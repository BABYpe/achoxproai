
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

const masterBoqItems = [
    // --- الأعمال الترابية ---
    { id: "EAR-001", category: "أعمال ترابية وحفريات", description: "حفر أساسات في تربة عادية", unit: "م³", quantity: 1, unitPrice: 45, total: 45 },
    { id: "EAR-002", category: "أعمال ترابية وحفريات", description: "ردم من ناتج الحفر مع الرش والدك", unit: "م³", quantity: 1, unitPrice: 25, total: 25 },
    { id: "EAR-003", category: "أعمال ترابية وحفريات", description: "توريد وتنفيذ طبقة إحلال (بيسكورس)", unit: "م³", quantity: 1, unitPrice: 80, total: 80 },

    // --- الأعمال الخرسانية ---
    { id: "CON-001", category: "أعمال خرسانية", description: "خرسانة نظافة أسفل القواعد", unit: "م³", quantity: 1, unitPrice: 380, total: 380 },
    { id: "CON-002", category: "أعمال خرسانية", description: "خرسانة مسلحة للقواعد", unit: "م³", quantity: 1, unitPrice: 450, total: 450 },
    { id: "CON-003", category: "أعمال خرسانية", description: "خرسانة مسلحة للأعمدة", unit: "م³", quantity: 1, unitPrice: 550, total: 550 },
    { id: "CON-004", category: "أعمال خرسانية", description: "خرسانة مسلحة للأسقف (Solid Slab)", unit: "م³", quantity: 1, unitPrice: 600, total: 600 },
    { id: "CON-005", category: "أعمال خرسانية", description: "حديد تسليح (توريد وتركيب)", unit: "طن", quantity: 1, unitPrice: 4200, total: 4200 },

    // --- أعمال المباني والبياض ---
    { id: "MAS-001", category: "أعمال مباني وبياض", description: "بناء بلوك أسمنتي مصمت 20 سم", unit: "م²", quantity: 1, unitPrice: 65, total: 65 },
    { id: "MAS-002", category: "أعمال مباني وبياض", description: "بناء بلوك أسمنتي مفرغ 20 سم", unit: "م²", quantity: 1, unitPrice: 55, total: 55 },
    { id: "MAS-003", category: "أعمال مباني وبياض", description: "لياسة (بياض) داخلية", unit: "م²", quantity: 1, unitPrice: 28, total: 28 },
    { id: "MAS-004", category: "أعمال مباني وبياض", description: "لياسة (بياض) خارجية", unit: "م²", quantity: 1, unitPrice: 35, total: 35 },

    // --- أعمال العزل ---
    { id: "INS-001", category: "أعمال عزل", description: "عزل مائي للأسطح (لفائف بيتومين)", unit: "م²", quantity: 1, unitPrice: 40, total: 40 },
    { id: "INS-002", category: "أعمال عزل", description: "عزل حراري للأسطح (بوليسترين)", unit: "م²", quantity: 1, unitPrice: 50, total: 50 },

    // --- أعمال السباكة ---
    { id: "PLM-001", category: "أعمال سباكة", description: "تأسيس نقطة تغذية مياه (حار/بارد)", unit: "نقطة", quantity: 1, unitPrice: 250, total: 250 },
    { id: "PLM-002", category: "أعمال سباكة", description: "تأسيس نقطة صرف صحي", unit: "نقطة", quantity: 1, unitPrice: 200, total: 200 },

    // --- أعمال الكهرباء ---
    { id: "ELE-001", category: "أعمال كهرباء", description: "تأسيس نقطة إنارة", unit: "نقطة", quantity: 1, unitPrice: 180, total: 180 },
    { id: "ELE-002", category: "أعمال كهرباء", description: "تأسيس نقطة فيش كهرباء (بريزة)", unit: "نقطة", quantity: 1, unitPrice: 160, total: 160 },

    // --- أعمال الدهانات ---
    { id: "PNT-001", category: "أعمال دهانات", description: "دهان بلاستيك داخلي (وجهان)", unit: "م²", quantity: 1, unitPrice: 22, total: 22 },
    { id: "PNT-002", category: "أعمال دهانات", description: "دهان خارجي (بروفايل)", unit: "م²", quantity: 1, unitPrice: 45, total: 45 },

    // --- تجهيزات الفعاليات ---
    { id: "EVT-001", category: "تجهيزات فنية وتقنية (فعاليات)", description: "تأجير شاشة LED (سعر للمتر المربع/لليوم)", unit: "م²/يوم", quantity: 1, unitPrice: 350, total: 350 },
    { id: "EVT-002", category: "تجهيزات فنية وتقنية (فعاليات)", description: "نظام صوتي متكامل (سماعات، مايكروفون، خلاط صوت) - (لليوم)", unit: "مقطوعة", quantity: 1, unitPrice: 5000, total: 5000 },
    { id: "EVT-003", category: "ديكورات وتشطيبات مؤقتة (فعاليات)", description: "بناء وتجهيز جناح معرض (ستاند)", unit: "م²", quantity: 1, unitPrice: 800, total: 800 },
    { id: "EVT-004", category: "خدمات مساندة للفعاليات", description: "خدمات تنظيم وإدارة حشود (للساعة/للفرد)", unit: "ساعة/فرد", quantity: 1, unitPrice: 120, total: 120 },
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
    z.number().min(0, "سعر الوحدة يجب أن تكون رقمًا موجبًا")
  ),
});

type BoqItemForm = z.infer<typeof boqItemSchema>;

export default function BoqPage() {
  const [boqItems, setBoqItems] = useState(masterBoqItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { control, handleSubmit, reset } = useForm<BoqItemForm>({
    resolver: zodResolver(boqItemSchema),
    defaultValues: {
      id: `EXT-${Math.floor(Math.random() * 900) + 100}`,
      description: "",
      category: "بنود إضافية",
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
      description: `تمت إضافة البند "${data.description}" إلى قاعدة البيانات.`,
    });
    setIsDialogOpen(false);
    reset({
        id: `EXT-${Math.floor(Math.random() * 900) + 100}`,
        description: "",
        category: "بنود إضافية",
        unit: "مقطوعة",
        quantity: 1,
        unitPrice: 0,
    });
  };

  const categories = [...new Set(boqItems.map(item => item.category))].sort();
  
  const handleImportExport = () => {
    toast({
      title: "ميزة احترافية",
      description: "استيراد وتصدير جداول الكميات متاح في الخطط المدفوعة.",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">قاعدة بيانات بنود الأعمال (Master BOQ)</h1>
          <div className="flex gap-2">
              <Button variant="outline" className="gap-1" onClick={handleImportExport}>
                  <Upload className="h-4 w-4" />
                  استيراد
              </Button>
              <Button variant="outline" className="gap-1" onClick={handleImportExport}>
                  <Download className="h-4 w-4" />
                  تصدير
              </Button>
              <Button className="gap-1" onClick={() => setIsDialogOpen(true)}>
                  <PlusCircle className="h-4 w-4" />
                  إضافة بند قياسي
              </Button>
          </div>
        </div>

        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>قائمة البنود القياسية</CardTitle>
            <CardDescription>هذه هي قاعدة البيانات المركزية لبنود الأعمال وتكاليفها التقديرية. تستخدم هذه البيانات في تسعير المشاريع الجديدة.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">رقم البند</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>الوحدة</TableHead>
                  <TableHead className="text-right">التكلفة التقديرية للوحدة (ر.س)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map(category => (
                  <React.Fragment key={category}>
                    <TableRow className="bg-secondary/50 hover:bg-secondary/70">
                      <TableCell colSpan={4} className="font-bold text-primary">{category}</TableCell>
                    </TableRow>
                    {boqItems.filter(item => item.category === category).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-right font-mono text-primary font-semibold">{item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة بند قياسي جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل البند الجديد ليتم إضافته إلى قاعدة البيانات الرئيسية.
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
                <Label htmlFor="item-price" className="text-right">التكلفة التقديرية للوحدة</Label>
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
