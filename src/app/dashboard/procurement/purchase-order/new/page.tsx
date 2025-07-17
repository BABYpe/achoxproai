
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { useToast } from '@/hooks/use-toast';
import { useProcurementStore } from '@/hooks/use-procurement-store';
import { useProjectStore } from '@/hooks/use-project-store';
import { PlusCircle, Trash2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const poItemSchema = z.object({
  description: z.string().min(1, "الوصف مطلوب"),
  quantity: z.number().min(1, "الكمية يجب أن تكون 1 على الأقل"),
  unitPrice: z.number().min(0, "السعر لا يمكن أن يكون سالبًا"),
});

const purchaseOrderSchema = z.object({
  supplierId: z.string().min(1, "يجب اختيار مورد"),
  projectId: z.string().min(1, "يجب ربط الطلب بمشروع"),
  date: z.date(),
  items: z.array(poItemSchema).min(1, "يجب إضافة بند واحد على الأقل"),
  notes: z.string().optional(),
});

type PurchaseOrderForm = z.infer<typeof purchaseOrderSchema>;

export default function NewPurchaseOrderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { suppliers, addPurchaseOrder } = useProcurementStore();
  const { projects } = useProjectStore();

  const { control, register, handleSubmit, watch, formState: { errors } } = useForm<PurchaseOrderForm>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      date: new Date(),
      items: [{ description: '', quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchItems = watch("items");
  const totalAmount = watchItems.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0);

  const onSubmit = (data: PurchaseOrderForm) => {
    const supplier = suppliers.find(s => s.id === parseInt(data.supplierId));
    if (!supplier) return;

    addPurchaseOrder({
      id: `PO-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`,
      supplier: supplier.name,
      date: data.date.toLocaleDateString('en-CA'), // YYYY-MM-DD
      status: 'بانتظار الموافقة',
      total: totalAmount,
      items: data.items,
      projectId: data.projectId,
      notes: data.notes,
    });

    toast({ title: "تم إنشاء طلب الشراء بنجاح", description: "يمكنك الآن تتبعه من صفحة المشتريات." });
    router.push('/dashboard/procurement');
  };

  return (
    <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">إنشاء طلب شراء جديد</h1>
            <Button variant="outline" asChild>
                <Link href="/dashboard/procurement">
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    العودة إلى المشتريات
                </Link>
            </Button>
        </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>تفاصيل طلب الشراء</CardTitle>
            <CardDescription>أدخل جميع المعلومات المطلوبة لإصدار أمر شراء رسمي.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>المورد</Label>
                <Controller
                  name="supplierId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger><SelectValue placeholder="اختر موردًا" /></SelectTrigger>
                      <SelectContent>
                        {suppliers.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.supplierId && <p className="text-destructive text-sm">{errors.supplierId.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>المشروع</Label>
                 <Controller
                  name="projectId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger><SelectValue placeholder="اختر مشروعًا" /></SelectTrigger>
                      <SelectContent>
                        {projects.map(p => <SelectItem key={p.id} value={p.id!}>{p.title}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.projectId && <p className="text-destructive text-sm">{errors.projectId.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>تاريخ الطلب</Label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => <DatePicker date={field.value} onDateChange={field.onChange} />}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">بنود الطلب</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50%]">الوصف</TableHead>
                    <TableHead>الكمية</TableHead>
                    <TableHead>سعر الوحدة</TableHead>
                    <TableHead>الإجمالي</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <Input {...register(`items.${index}.description`)} placeholder="وصف البند" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" {...register(`items.${index}.quantity`, { valueAsNumber: true })} placeholder="0" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" {...register(`items.${index}.unitPrice`, { valueAsNumber: true })} placeholder="0.00" />
                      </TableCell>
                      <TableCell className="font-mono">
                        {(watchItems[index]?.quantity * watchItems[index]?.unitPrice || 0).toLocaleString('ar-SA')}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button type="button" variant="outline" size="sm" className="gap-1" onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}>
                <PlusCircle className="h-4 w-4" />
                إضافة بند جديد
              </Button>
               {errors.items && <p className="text-destructive text-sm">{errors.items.message || errors.items.root?.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                    <Label htmlFor="notes">ملاحظات إضافية</Label>
                    <Textarea id="notes" {...register("notes")} placeholder="أي شروط أو تفاصيل أخرى تتعلق بالطلب..." />
                </div>
                 <Card className="bg-secondary/50">
                    <CardHeader className="p-4">
                        <CardTitle>الإجمالي الكلي</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                         <p className="text-3xl font-bold font-mono">{totalAmount.toLocaleString('ar-SA', { style: 'currency', currency: 'SAR' })}</p>
                    </CardContent>
                </Card>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" size="lg" className="gap-2">
                <Save className="h-4 w-4" />
                حفظ وإصدار طلب الشراء
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
