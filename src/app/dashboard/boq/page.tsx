import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Upload, Download } from "lucide-react";

const boqItems = [
  { id: "B-101", description: "أعمال الحفر والردم لموقع المشروع حسب المخططات", unit: "م³", quantity: 1250, unitPrice: 25, total: 31250 },
  { id: "C-201", description: "خرسانة مسلحة للقواعد، مقاومة 35 نيوتن/مم²", unit: "م³", quantity: 450, unitPrice: 350, total: 157500 },
  { id: "C-202", description: "خرسانة مسلحة للأعمدة الطابق الأرضي", unit: "م³", quantity: 150, unitPrice: 420, total: 63000 },
  { id: "C-203", description: "خرسانة مسلحة للأسقف والأدراج", unit: "م³", quantity: 320, unitPrice: 400, total: 128000 },
  { id: "S-301", description: "حديد تسليح عالي المقاومة (Grade 60)", unit: "طن", quantity: 85, unitPrice: 2800, total: 238000 },
  { id: "A-401", description: "أعمال المباني بالطوب الأسمنتي المعزول للجدران الخارجية", unit: "م²", quantity: 2500, unitPrice: 55, total: 137500 },
  { id: "A-402", description: "أعمال المباني بالطوب الأحمر للقواطع الداخلية", unit: "م²", quantity: 1800, unitPrice: 45, total: 81000 },
  { id: "F-501", description: "أعمال اللياسة الداخلية والخارجية بسماكة 2 سم", unit: "م²", quantity: 6000, unitPrice: 22, total: 132000 },
  { id: "P-601", description: "أعمال الدهانات الداخلية (ثلاثة أوجه) - نوع جوتن", unit: "م²", quantity: 5500, unitPrice: 28, total: 154000 },
  { id: "E-701", description: "تمديدات كهربائية (أسلاك + مواسير) - نوع الفنار", unit: "مقطوعة", quantity: 1, unitPrice: 45000, total: 45000 },
  { id: "M-801", description: "أعمال السباكة والتغذية والصرف - نوع نيبرو", unit: "مقطوعة", quantity: 1, unitPrice: 38000, total: 38000 },
];

export default function BoqPage() {
  const grandTotal = boqItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="flex flex-col gap-4">
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
            <Button className="gap-1">
                <PlusCircle className="h-4 w-4" />
                إضافة بند جديد
            </Button>
        </div>
      </div>
      <Card className="shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle>مشروع فيلا سكنية - الإصدار 1.2</CardTitle>
          <CardDescription>قائمة بنود جدول الكميات للمشروع الحالي.</CardDescription>
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
              {boqItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="text-right font-mono">{item.quantity.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell className="text-right font-mono text-primary font-semibold">{item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                </TableRow>
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
  )
}
