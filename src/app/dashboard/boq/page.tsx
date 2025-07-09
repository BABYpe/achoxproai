
"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Upload, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialBoqItems = [
  // --- أعمال المقاولات ---
  // الأعمال الترابية
  { id: "CW-101", category: "الأعمال الترابية", description: "حفر التربة لأنواع مختلفة من الأساسات", unit: "متر مكعب", quantity: 1500, unitPrice: 30, total: 45000 },
  { id: "CW-102", category: "الأعمال الترابية", description: "ردم التربة على طبقات مع الدمك", unit: "متر مكعب", quantity: 1200, unitPrice: 25, total: 30000 },
  { id: "CW-103", category: "الأعمال الترابية", description: "تسوية وتنظيف الموقع بالكامل", unit: "متر مربع", quantity: 5000, unitPrice: 5, total: 25000 },
  
  // الأعمال الخرسانية
  { id: "CW-201", category: "الأعمال الخرسانية", description: "صب خرسانة مسلحة للأساسات", unit: "متر مكعب", quantity: 450, unitPrice: 480, total: 216000 },
  { id: "CW-202", category: "الأعمال الخرسانية", description: "صب خرسانة مسلحة للأعمدة", unit: "متر مكعب", quantity: 150, unitPrice: 550, total: 82500 },
  { id: "CW-203", category: "الأعمال الخرسانية", description: "صب خرسانة مسلحة للأسقف", unit: "متر مكعب", quantity: 300, unitPrice: 520, total: 156000 },
  { id: "CW-204", category: "الأعمال الخرسانية", description: "توريد وتركيب حديد التسليح (Grade 60)", unit: "طن", quantity: 85, unitPrice: 3200, total: 272000 },
  { id: "CW-205", category: "الأعمال الخرسانية", description: "أعمال قوالب خشبية للأساسات والجدران", unit: "متر مربع", quantity: 1800, unitPrice: 60, total: 108000 },

  // أعمال المباني
  { id: "CW-301", category: "أعمال المباني", description: "بناء بلوك أسمنتي للجدران الخارجية", unit: "متر مربع", quantity: 2500, unitPrice: 65, total: 162500 },
  { id: "CW-302", category: "أعمال المباني", description: "لياسة داخلية للأسقف والجدران", unit: "متر مربع", quantity: 7000, unitPrice: 28, total: 196000 },
  { id: "CW-303", category: "أعمال المباني", description: "بلاط أرضيات بورسلان (60x60 سم)", unit: "متر مربع", quantity: 800, unitPrice: 120, total: 96000 },
  { id: "CW-304", category: "أعمال المباني", description: "دهانات داخلية (جوتن) - 3 أوجه", unit: "متر مربع", quantity: 7000, unitPrice: 35, total: 245000 },
  { id: "CW-305", category: "أعمال المباني", description: "توريد وتركيب أبواب خشبية داخلية", unit: "عدد", quantity: 30, unitPrice: 1200, total: 36000 },
  { id: "CW-306", category: "أعمال المباني", description: "توريد وتركيب شبابيك ألمنيوم (دبل جلاس)", unit: "عدد", quantity: 25, unitPrice: 950, total: 23750 },
  { id: "CW-307", category: "أعمال المباني", description: "عزل مائي للأسطح ودورات المياه", unit: "متر مربع", quantity: 1000, unitPrice: 55, total: 55000 },

  // الأعمال الكهربائية
  { id: "CW-401", category: "الأعمال الكهربائية", description: "تمديد كابلات وأسلاك (الفنار)", unit: "مقطوعة", quantity: 1, unitPrice: 55000, total: 55000 },
  { id: "CW-402", category: "الأعمال الكهربائية", description: "تركيب مفاتيح ومآخذ كهربائية (باناسونيك)", unit: "عدد", quantity: 250, unitPrice: 45, total: 11250 },
  { id: "CW-403", category: "الأعمال الكهربائية", description: "تركيب وحدات إضاءة LED", unit: "عدد", quantity: 180, unitPrice: 85, total: 15300 },
  { id: "CW-404", category: "الأعمال الكهربائية", description: "تركيب لوحة توزيع كهربائية رئيسية", unit: "عدد", quantity: 1, unitPrice: 7500, total: 7500 },

  // الأعمال الميكانيكية
  { id: "CW-501", category: "الأعمال الميكانيكية", description: "أعمال السباكة والتغذية والصرف (نيبرو)", unit: "مقطوعة", quantity: 1, unitPrice: 48000, total: 48000 },
  { id: "CW-502", category: "الأعمال الميكانيكية", description: "توريد وتركيب وحدات تكييف سبليت (24,000 BTU)", unit: "عدد", quantity: 12, unitPrice: 3200, total: 38400 },
  
  // --- تنظيم المؤتمرات والفعاليات ---
  // الموقع واللوجستيات
  { id: "EM-101", category: "الموقع واللوجستيات", description: "إيجار قاعة فعاليات فندقية (5 نجوم)", unit: "يوم", quantity: 2, unitPrice: 25000, total: 50000 },
  { id: "EM-102", category: "الموقع واللوجستيات", description: "تأجير نظام صوتي متكامل مع فني", unit: "يوم", quantity: 2, unitPrice: 8000, total: 16000 },
  { id: "EM-103", category: "الموقع واللوجستيات", description: "تأجير شاشة LED P3 مقاس 8x4 متر", unit: "يوم", quantity: 2, unitPrice: 12000, total: 24000 },
  { id: "EM-104", category: "الموقع واللوجستيات", description: "بناء وتجهيز مسرح (Stage) مقاس 10x6 متر", unit: "وحدة", quantity: 1, unitPrice: 15000, total: 15000 },
  { id: "EM-105", category: "الموقع واللوجستيات", description: "تصميم وتنفيذ ديكور وهوية المؤتمر", unit: "مشروع", quantity: 1, unitPrice: 35000, total: 35000 },
  { id: "EM-106", category: "الموقع واللوجستيات", description: "توفير أفراد أمن وحراسة", unit: "فرد/يوم", quantity: 10, unitPrice: 400, total: 4000 },

  // التنظيم والإدارة
  { id: "EM-201", category: "التنظيم والإدارة", description: "خدمات تخطيط وتنسيق كاملة للمؤتمر", unit: "مشروع", quantity: 1, unitPrice: 45000, total: 45000 },
  { id: "EM-202", category: "التنظيم والإدارة", description: "نظام تسجيل إلكتروني للمشاركين", unit: "مشروع", quantity: 1, unitPrice: 18000, total: 18000 },
  { id: "EM-203", category: "التنظيم والإدارة", description: "توفير فريق استقبال وتنظيم (15 فرد)", unit: "فريق/يوم", quantity: 2, unitPrice: 7000, total: 14000 },
  
  // الإعاشة والضيافة
  { id: "EM-301", category: "الإعاشة والضيافة", description: "وجبة غداء (بوفيه مفتوح) لعدد 200 شخص", unit: "شخص", quantity: 200, unitPrice: 180, total: 36000 },
  { id: "EM-302", category: "الإعاشة والضيافة", description: "استراحة قهوة ومرطبات (مرتين في اليوم)", unit: "شخص/مرة", quantity: 400, unitPrice: 45, total: 18000 },
  
  // بنود أخرى
  { id: "EM-401", category: "بنود أخرى", description: "خدمات تصوير فوتوغرافي وفيديو احترافي", unit: "مشروع", quantity: 1, unitPrice: 22000, total: 22000 },
  { id: "EM-402", category: "بنود أخرى", description: "طباعة مواد المؤتمر (برامج، بطاقات تعريف)", unit: "مقطوعة", quantity: 1, unitPrice: 9500, total: 9500 }
];

export default function BoqPage() {
  const [boqItems, setBoqItems] = useState(initialBoqItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const grandTotal = boqItems.reduce((acc, item) => acc + item.total, 0);

  const categories = [...new Set(boqItems.map(item => item.category))];

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">جداول الكميات (BOQ)</h1>
          <div className="flex gap-2">
              <Button variant="outline" className="gap-1">
                  <Upload className="h-4 w-4" />
                  استيراد
              </Button>
              <Button variant="outline" className="gap-1">
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
            <CardTitle>قاعدة بيانات البنود</CardTitle>
            <CardDescription>قائمة شاملة لبنود الأعمال للمشاريع الإنشائية والفعاليات.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">رقم البند</TableHead>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إضافة بند جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل البند الجديد في جدول الكميات. سيتم الحفظ عند الضغط على زر الحفظ.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-id" className="text-right">
                رقم البند
              </Label>
              <Input id="item-id" defaultValue="E-804" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-desc" className="text-right">
                الوصف
              </Label>
              <Input id="item-desc" placeholder="وصف تفصيلي للبند" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-unit" className="text-right">
                الوحدة
              </Label>
              <Input id="item-unit" defaultValue="مقطوعة" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-qty" className="text-right">
                الكمية
              </Label>
              <Input id="item-qty" type="number" defaultValue="1" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-price" className="text-right">
                سعر الوحدة
              </Label>
              <Input id="item-price" type="number" placeholder="0.00" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsDialogOpen(false)}>حفظ البند</Button>
            <DialogClose asChild>
                <Button type="button" variant="secondary">
                إلغاء
                </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
