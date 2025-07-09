
"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Upload, Download, FilePlus2, X, Bot } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialBoqItems = [
  // 1. Earthworks
  { id: "B-101", category: "الأعمال الترابية", description: "أعمال الحفر والردم لموقع المشروع حسب المخططات", unit: "م³", quantity: 1250, unitPrice: 25, total: 31250 },
  { id: "B-102", category: "الأعمال الترابية", description: "توريد ورص طبقة بيسكورس سماكة 30 سم", unit: "م²", quantity: 850, unitPrice: 45, total: 38250 },

  // 2. Concrete Works
  { id: "C-201", category: "أعمال الخرسانة", description: "خرسانة عادية للنظافة أسفل القواعد", unit: "م³", quantity: 120, unitPrice: 280, total: 33600 },
  { id: "C-202", category: "أعمال الخرسانة", description: "خرسانة مسلحة للقواعد، مقاومة 35 نيوتن/مم²", unit: "م³", quantity: 450, unitPrice: 480, total: 216000 },
  
  // 3. Steel Works
  { id: "S-301", category: "أعمال الحديد", description: "حديد تسليح عالي المقاومة (Grade 60)", unit: "طن", quantity: 85, unitPrice: 3100, total: 263500 },

  // 4. Masonry Works
  { id: "A-401", category: "أعمال المباني", description: "أعمال المباني بالطوب الأسمنتي المعزول للجدران الخارجية", unit: "م²", quantity: 2500, unitPrice: 65, total: 162500 },
  
  // 5. Finishing Works
  { id: "F-501", category: "التشطيبات", description: "أعمال اللياسة الداخلية والخارجية بسماكة 2 سم", unit: "م²", quantity: 6000, unitPrice: 28, total: 168000 },
  { id: "P-601", category: "التشطيبات", description: "أعمال الدهانات الداخلية (ثلاثة أوجه) - نوع جوتن", unit: "م²", quantity: 5500, unitPrice: 35, total: 192500 },
  { id: "T-701", category: "التشطيبات", description: "توريد وتركيب بلاط بورسلان للأرضيات 60x60 سم", unit: "م²", quantity: 750, unitPrice: 120, total: 90000 },

  // 6. MEP Works
  { id: "E-801", category: "الأعمال الكهروميكانيكية", description: "تمديدات كهربائية (أسلاك + مواسير) - نوع الفنار", unit: "مقطوعة", quantity: 1, unitPrice: 55000, total: 55000 },
  { id: "M-802", category: "الأعمال الكهروميكانيكية", description: "أعمال السباكة والتغذية والصرف - نوع نيبرو", unit: "مقطوعة", quantity: 1, unitPrice: 48000, total: 48000 },

  // 7. Event & Exhibition Works
  { id: "EV-901", category: "تجهيز الفعاليات والمعارض", description: "تصنيع وتركيب منصة عرض رئيسية (Stage) مقاس 10x6 متر", unit: "مقطوعة", quantity: 1, unitPrice: 15000, total: 15000 },
  { id: "EV-902", category: "تجهيز الفعاليات والمعارض", description: "توريد وتركيب نظام إضاءة احترافي (Trussing & Lighting)", unit: "مقطوعة", quantity: 1, unitPrice: 25000, total: 25000 },
  { id: "EV-903", category: "تجهيز الفعاليات والمعارض", description: "بناء و تجهيز أجنحة عرض (Booths) مقاس 3x3 متر", unit: "عدد", quantity: 20, unitPrice: 2500, total: 50000 },
  { id: "EV-904", category: "تجهيز الفعاليات والمعارض", description: "توريد وتركيب شاشات عرض LED P3", unit: "م²", quantity: 24, unitPrice: 1800, total: 43200 },
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
