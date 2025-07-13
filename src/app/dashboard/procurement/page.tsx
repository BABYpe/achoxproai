
"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Building, Star, Phone, Mail, MoreVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const mockPurchaseOrders = [
  { id: "PO-2024-001", supplier: "شركة مواد البناء الحديثة", date: "2024-07-15", status: "تم التسليم", total: "15,450.00 ر.س", variant: "default" },
  { id: "PO-2024-002", supplier: "مصنع الخرسانة الجاهزة", date: "2024-07-18", status: "قيد المعالجة", total: "88,000.00 ر.س", variant: "secondary" },
  { id: "PO-2024-003", supplier: "تكنو للأدوات الكهربائية", date: "2024-07-20", status: "بانتظار الموافقة", total: "9,200.00 ر.س", variant: "outline" },
  { id: "PO-2024-004", supplier: "شركة مواد البناء الحديثة", date: "2024-07-21", status: "ملغي", total: "12,100.00 ر.س", variant: "destructive" },
  { id: "PO-2024-005", supplier: "مورد مواد السباكة", date: "2024-07-22", status: "تم التسليم", total: "23,500.00 ر.س", variant: "default" },
];

const mockSuppliers = [
  { id: 1, name: "شركة مواد البناء الحديثة", specialty: "مواد بناء عامة", rating: 4.8, phone: "011-456-7890", email: "sales@modernb.com" },
  { id: 2, name: "مصنع الخرسانة الجاهزة", specialty: "خرسانة وحديد", rating: 4.5, phone: "012-654-3210", email: "info@readymix.sa" },
  { id: 3, name: "تكنو للأدوات الكهربائية", specialty: "كهرباء وإضاءة", rating: 4.2, phone: "013-789-0123", email: "contact@techno-electric.com" },
  { id: 4, name: "مورد مواد السباكة", specialty: "سباكة وصرف صحي", rating: 4.6, phone: "055-123-4567", email: "plumbing.supplies@email.com" },
];

export default function ProcurementPage() {
    const { toast } = useToast();
    const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
    const [isPoDialogOpen, setIsPoDialogOpen] = useState(false);

    const handleAddSupplier = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({ title: "تمت إضافة المورد بنجاح" });
        setIsSupplierDialogOpen(false);
    }
     const handleAddPo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({ title: "تم إنشاء طلب الشراء بنجاح" });
        setIsPoDialogOpen(false);
    }

  return (
    <>
    <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">المشتريات والموردون</h1>
            <div className="flex gap-2">
                 <Button className="gap-1" onClick={() => setIsSupplierDialogOpen(true)}>
                    <PlusCircle className="h-4 w-4" />
                    إضافة مورد جديد
                </Button>
                <Button className="gap-1" variant="default" onClick={() => setIsPoDialogOpen(true)}>
                    <PlusCircle className="h-4 w-4" />
                    إنشاء طلب شراء
                </Button>
            </div>
        </div>

        <Tabs defaultValue="purchase-orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="purchase-orders">أوامر الشراء</TabsTrigger>
                <TabsTrigger value="suppliers">قائمة الموردين</TabsTrigger>
            </TabsList>
            <TabsContent value="purchase-orders">
                <Card className="shadow-xl rounded-2xl">
                    <CardHeader>
                        <CardTitle>سجل أوامر الشراء</CardTitle>
                        <CardDescription>تتبع جميع طلبات الشراء الخاصة بمشاريعك من هنا.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[150px]">رقم الطلب</TableHead>
                                <TableHead>المورد</TableHead>
                                <TableHead>تاريخ الطلب</TableHead>
                                <TableHead>الحالة</TableHead>
                                <TableHead className="text-right">الإجمالي</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockPurchaseOrders.map((po) => (
                                <TableRow key={po.id}>
                                    <TableCell className="font-mono">{po.id}</TableCell>
                                    <TableCell className="font-medium">{po.supplier}</TableCell>
                                    <TableCell>{po.date}</TableCell>
                                    <TableCell><Badge variant={po.variant as any}>{po.status}</Badge></TableCell>
                                    <TableCell className="text-right font-mono font-semibold">{po.total}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="suppliers">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mockSuppliers.map(supplier => (
                        <Card key={supplier.id} className="shadow-lg rounded-2xl hover:shadow-2xl transition-shadow duration-300">
                             <CardHeader className="flex flex-row items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                                    <CardDescription className="flex items-center gap-1 mt-1">
                                        <Building className="h-4 w-4" /> {supplier.specialty}
                                    </CardDescription>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>تعديل</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-1 text-primary font-bold">
                                    <Star className="h-5 w-5 fill-current" />
                                    <span>{supplier.rating} / 5.0</span>
                                </div>
                                <div className="text-sm text-muted-foreground space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        <span>{supplier.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        <span>{supplier.email}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    </div>

    {/* Add Supplier Dialog */}
    <Dialog open={isSupplierDialogOpen} onOpenChange={setIsSupplierDialogOpen}>
    <DialogContent className="sm:max-w-md">
        <form onSubmit={handleAddSupplier}>
            <DialogHeader>
                <DialogTitle>إضافة مورد جديد</DialogTitle>
                <DialogDescription>أدخل بيانات المورد لإضافته إلى قاعدة البيانات.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="space-y-1"><Label htmlFor="s-name">اسم المورد</Label><Input id="s-name" placeholder="شركة التوريدات الممتازة" /></div>
                <div className="space-y-1"><Label htmlFor="s-spec">التخصص</Label><Input id="s-spec" placeholder="مواد بناء، كهرباء، سباكة..." /></div>
                <div className="space-y-1"><Label htmlFor="s-phone">رقم الهاتف</Label><Input id="s-phone" type="tel" placeholder="05xxxxxxxx" /></div>
                <div className="space-y-1"><Label htmlFor="s-email">البريد الإلكتروني</Label><Input id="s-email" type="email" placeholder="contact@supplier.com" /></div>
            </div>
            <DialogFooter>
                <Button type="submit">حفظ المورد</Button>
                <DialogClose asChild><Button type="button" variant="secondary">إلغاء</Button></DialogClose>
            </DialogFooter>
        </form>
    </DialogContent>
    </Dialog>

    {/* Create PO Dialog */}
    <Dialog open={isPoDialogOpen} onOpenChange={setIsPoDialogOpen}>
    <DialogContent className="sm:max-w-lg">
         <form onSubmit={handleAddPo}>
            <DialogHeader>
                <DialogTitle>إنشاء طلب شراء جديد</DialogTitle>
                <DialogDescription>املأ تفاصيل طلب الشراء لإرساله للمورد.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                 {/* In a real app, this would be a search/select component */}
                <div className="space-y-1"><Label htmlFor="po-supplier">المورد</Label><Input id="po-supplier" placeholder="ابحث عن مورد..." /></div>
                <div className="space-y-1"><Label htmlFor="po-project">المشروع</Label><Input id="po-project" placeholder="اختر المشروع المرتبط بالطلب" /></div>
                 {/* Items would be added dynamically in a real app */}
                <div className="space-y-1"><Label>البنود</Label><div className="border rounded-lg p-4 text-center text-muted-foreground">منطقة إضافة البنود (قيد التطوير)</div></div>
            </div>
            <DialogFooter>
                <Button type="submit">إرسال الطلب</Button>
                <DialogClose asChild><Button type="button" variant="secondary">إلغاء</Button></DialogClose>
            </DialogFooter>
        </form>
    </DialogContent>
    </Dialog>
    </>
  );
}
