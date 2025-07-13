
"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreVertical, Package, PackageCheck, PackageX, DollarSign, BrainCircuit, Search, ArrowRight, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const initialInventory = [
  { sku: 'CEM-001', name: 'أسمنت بورتلاندي', category: 'مواد بناء', quantity: 500, unit: 'كيس', location: 'مستودع A-1', status: 'متوفر', value: 15.50 },
  { sku: 'REB-016', name: 'حديد تسليح 16 مم', category: 'حديد وصلب', quantity: 20, unit: 'طن', location: 'الساحة الخارجية', status: 'متوفر', value: 3200 },
  { sku: 'BLK-C20', name: 'بلوك أسمنتي 20 سم', category: 'مواد بناء', quantity: 2500, unit: 'حبة', location: 'مستودع B-3', status: 'متوفر', value: 2.5 },
  { sku: 'PVC-P04', name: 'ماسورة PVC 4 بوصة', category: 'سباكة', quantity: 35, unit: 'ماسورة (6م)', location: 'مستودع C-2', status: 'مخزون منخفض', value: 25 },
  { sku: 'WIR-E10', name: 'كابل كهرباء 10 مم', category: 'كهرباء', quantity: 5, unit: 'لفة (100م)', location: 'مستودع C-1', status: 'نفد المخزون', value: 450 },
  { sku: 'PNT-W01', name: 'دهان أبيض داخلي', category: 'دهانات', quantity: 80, unit: 'جالون', location: 'مستودع A-2', status: 'متوفر', value: 120 },
];

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'متوفر': return 'secondary';
        case 'مخزون منخفض': return 'default';
        case 'نفد المخزون': return 'destructive';
        default: return 'outline';
    }
}

export default function InventoryPage() {
    const { toast } = useToast();
    const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
    const [isMovementDialogOpen, setIsMovementDialogOpen] = useState(false);
    const [inventory, setInventory] = useState(initialInventory);
    
    const stats = React.useMemo(() => ({
        totalValue: inventory.reduce((sum, item) => sum + item.value * item.quantity, 0),
        lowStock: inventory.filter(item => item.status === 'مخزون منخفض').length,
        outOfStock: inventory.filter(item => item.status === 'نفد المخزون').length,
        itemCount: inventory.length
    }), [inventory]);


    return (
        <>
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">المخزون والمستودعات</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-1" onClick={() => setIsMovementDialogOpen(true)}>
                        <ArrowRight className="h-4 w-4" />
                        <ArrowLeft className="h-4 w-4" />
                        تسجيل حركة مخزون
                    </Button>
                    <Button className="gap-1" onClick={() => setIsItemDialogOpen(true)}>
                        <PlusCircle className="h-4 w-4" />
                        إضافة مادة جديدة
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">القيمة الإجمالية للمخزون</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalValue.toLocaleString('ar-SA', {style: 'currency', currency: 'SAR'})}</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">إجمالي الأصناف</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.itemCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">مواد قارب على النفاد</CardTitle>
                        <PackageCheck className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.lowStock}</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">مواد نفد مخزونها</CardTitle>
                        <PackageX className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.outOfStock}</div>
                    </CardContent>
                </Card>
            </div>
            
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="shadow-xl rounded-2xl lg:col-span-2">
                    <CardHeader className="flex-row justify-between items-center">
                        <div>
                            <CardTitle>قائمة المواد</CardTitle>
                            <CardDescription>جميع المواد المسجلة في نظام المستودعات.</CardDescription>
                        </div>
                         <div className="relative w-full max-w-sm">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="بحث عن مادة..." className="pr-10" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>اسم المادة</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>الكمية المتاحة</TableHead>
                                <TableHead>الموقع</TableHead>
                                <TableHead>الحالة</TableHead>
                                <TableHead className="text-right">إجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventory.map((item) => (
                            <TableRow key={item.sku}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="font-mono">{item.sku}</TableCell>
                                <TableCell>{item.quantity} {item.unit}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell><Badge variant={getStatusVariant(item.status)}>{item.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>تعديل</DropdownMenuItem>
                                            <DropdownMenuItem>عرض سجل الحركة</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card className="shadow-xl rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                    <CardHeader className="text-center">
                        <BrainCircuit className="w-12 h-12 text-primary mx-auto mb-4" />
                        <CardTitle>التنبؤ الذكي بالطلب (قريباً)</CardTitle>
                        <CardDescription>
                            سيقوم الذكاء الاصطناعي بتحليل بيانات الاستهلاك التاريخية ومعدلات الصرف في المشاريع للتنبؤ بالاحتياجات المستقبلية من المواد، مما يساعد على تحسين عمليات الشراء وتجنب أي نقص في المخزون.
                        </CardDescription>
                    </CardHeader>
                     <CardContent className="text-center text-muted-foreground">
                        <p>ترقبوا إطلاق هذه الميزة الثورية!</p>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Dialog for adding new item */}
        <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>إضافة مادة جديدة للمخزون</DialogTitle>
                    <DialogDescription>أدخل بيانات المادة ليتم تسجيلها في النظام.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-1"><Label htmlFor="item-name">اسم المادة</Label><Input id="item-name" placeholder="مثال: أسمنت مقاوم" /></div>
                    <div className="space-y-1"><Label htmlFor="item-sku">SKU (رقم التعريف)</Label><Input id="item-sku" placeholder="مثال: CEM-R01" /></div>
                    <div className="space-y-1"><Label htmlFor="item-category">الفئة</Label><Input id="item-category" placeholder="مواد بناء، سباكة، كهرباء..." /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1"><Label htmlFor="item-quantity">الكمية الأولية</Label><Input id="item-quantity" type="number" placeholder="0" /></div>
                        <div className="space-y-1"><Label htmlFor="item-unit">وحدة القياس</Label><Input id="item-unit" placeholder="كيس، طن، حبة..." /></div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">حفظ المادة</Button>
                    <DialogClose asChild><Button type="button" variant="secondary">إلغاء</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Dialog for logging a movement */}
        <Dialog open={isMovementDialogOpen} onOpenChange={setIsMovementDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>تسجيل حركة مخزون</DialogTitle>
                    <DialogDescription>سجل دخول أو خروج كمية من مادة معينة.</DialogDescription>
                </DialogHeader>
                 <div className="grid gap-4 py-4">
                    <div className="space-y-1"><Label htmlFor="mov-sku">SKU أو اسم المادة</Label><Input id="mov-sku" placeholder="ابحث عن المادة..." /></div>
                    <div className="space-y-1"><Label htmlFor="mov-type">نوع الحركة</Label>
                        {/* In a real app, this would be a Select component */}
                        <Input id="mov-type" placeholder="صرف للمشروع، إدخال من مورد..." />
                    </div>
                    <div className="space-y-1"><Label htmlFor="mov-quantity">الكمية</Label><Input id="mov-quantity" type="number" placeholder="0" /></div>
                    <div className="space-y-1"><Label htmlFor="mov-notes">ملاحظات (اختياري)</Label><Input id="mov-notes" placeholder="مرتبطة بمشروع فيلا الياسمين" /></div>
                </div>
                <DialogFooter>
                    <Button type="submit">تسجيل الحركة</Button>
                    <DialogClose asChild><Button type="button" variant="secondary">إلغاء</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    );
}
