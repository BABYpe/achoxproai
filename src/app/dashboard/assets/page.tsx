
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreVertical, Truck, Construction, Wrench, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const initialAssets = [
  { id: 'AS-001', name: 'رافعة شوكية Caterpillar', category: 'معدات ثقيلة', status: 'متوفر', location: 'المستودع الرئيسي', variant: 'default' },
  { id: 'AS-002', name: 'شاحنة مرسيدس أكتروس', category: 'مركبات', status: 'قيد الاستخدام', location: 'مشروع فيلا الياسمين', variant: 'secondary' },
  { id: 'AS-003', name: 'مولد كهرباء 500KVA', category: 'مولدات', status: 'صيانة', location: 'ورشة الصيانة', variant: 'destructive' },
  { id: 'AS-004', name: 'مضخة خرسانة', category: 'معدات ثقيلة', status: 'متوفر', location: 'المستودع الرئيسي', variant: 'default' },
  { id: 'AS-005', name: 'مثقاب كهربائي Bosch', category: 'أدوات كهربائية', status: 'قيد الاستخدام', location: 'مشروع برج المكاتب', variant: 'secondary' },
  { id: 'AS-006', name: 'سيارة Toyota Hilux', category: 'مركبات', status: 'متوفر', location: 'المستودع الرئيسي', variant: 'default' },
];

export default function AssetsPage() {
  const { toast } = useToast();
  const [isAssetDialogOpen, setIsAssetDialogOpen] = useState(false);
  const [assets, setAssets] = useState(initialAssets);

  const handleAddAsset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAsset = {
        id: `AS-${String(assets.length + 1).padStart(3, '0')}`,
        name: formData.get('asset-name') as string,
        category: formData.get('asset-category') as string,
        status: 'متوفر' as 'متوفر',
        location: 'المستودع الرئيسي',
        variant: 'default' as 'default',
    };
    setAssets(prev => [...prev, newAsset]);
    toast({ title: "تمت إضافة الأصل بنجاح" });
    setIsAssetDialogOpen(false);
    e.currentTarget.reset();
  }
  
  const stats = React.useMemo(() => ({
    total: assets.length,
    available: assets.filter(a => a.status === 'متوفر').length,
    inUse: assets.filter(a => a.status === 'قيد الاستخدام').length,
    maintenance: assets.filter(a => a.status === 'صيانة').length,
  }), [assets]);


  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">إدارة الأصول والموارد</h1>
          <Button className="gap-1" onClick={() => setIsAssetDialogOpen(true)}>
            <PlusCircle className="h-4 w-4" />
            إضافة أصل جديد
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">إجمالي الأصول</CardTitle>
                    <Construction className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">أصول متاحة</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.available}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">أصول قيد الاستخدام</CardTitle>
                    <Truck className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.inUse}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">أصول قيد الصيانة</CardTitle>
                    <Wrench className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.maintenance}</div>
                </CardContent>
            </Card>
        </div>


        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>سجل الأصول</CardTitle>
            <CardDescription>قائمة بجميع الأصول والمعدات المملوكة للشركة.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">رقم الأصل</TableHead>
                  <TableHead>اسم الأصل</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>الموقع الحالي</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-right">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-mono">{asset.id}</TableCell>
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell><Badge variant={asset.variant as any}>{asset.status}</Badge></TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>تغيير الحالة</DropdownMenuItem>
                                <DropdownMenuItem>جدولة صيانة</DropdownMenuItem>
                                <DropdownMenuItem>عرض السجل</DropdownMenuItem>
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
      </div>

      <Dialog open={isAssetDialogOpen} onOpenChange={setIsAssetDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleAddAsset}>
            <DialogHeader>
              <DialogTitle>إضافة أصل جديد</DialogTitle>
              <DialogDescription>
                أدخل بيانات الأصل الجديد ليتم إضافته إلى السجل.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-1">
                <Label htmlFor="asset-name">اسم الأصل</Label>
                <Input id="asset-name" name="asset-name" placeholder="مثال: حفار Volvo EC220D" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="asset-category">الفئة</Label>
                <Input id="asset-category" name="asset-category" placeholder="معدات ثقيلة، مركبات، أدوات..." required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="asset-code">كود التعريف (اختياري)</Label>
                <Input id="asset-code" name="asset-code" placeholder="مثال: CAT-01-2024" />
              </div>
               <div className="space-y-1">
                <Label htmlFor="purchase-date">تاريخ الشراء (اختياري)</Label>
                <Input id="purchase-date" name="purchase-date" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">حفظ الأصل</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">إلغاء</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
